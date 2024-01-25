// pages/api/webhooks/clerk.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
// import { db } from '@/lib/db';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
  errorFormat: 'pretty',
});

export default async function clerkWebhookHandler(req: NextApiRequest, res: NextApiResponse) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || '';
  console.log('webhook secret: ', WEBHOOK_SECRET);  

  if (!WEBHOOK_SECRET) {
    console.error('Missing Clerk webhook secret');
    res.status(500).send('Server error: Missing Clerk webhook secret');
    return;
  }

  const svix_id = req.headers['svix-id'];
  const svix_timestamp = req.headers['svix-timestamp'];
  const svix_signature = req.headers['svix-signature'];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    res.status(400).send('Error: Missing Svix headers');
    return;
  }

  const payload = req.body;
  // console.log('payload: ', payload);
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id.toString(),
      'svix-timestamp': Array.isArray(svix_timestamp) ? svix_timestamp[0] : svix_timestamp,
      'svix-signature': Array.isArray(svix_signature) ? svix_signature[0] : svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    res.status(400).send('Error verifying webhook');
    return;
  }

  const eventType = evt.type;
  console.log(`Received Clerk webhook: ${eventType}`);

  // console.log("Data to be saved:", {
  //   clerkUserId: payload.data.id,
  //   email: payload.data.email
  //   // ... other fields ...
  // });

  // Handle different event types...
  if (eventType === "user.created") {
    // Extract the primary email address ID
    const primaryEmailId = payload.data.primary_email_address_id;
  
    // Find the email object that matches the primary email ID
    const primaryEmailObj = payload.data.email_addresses.find((emailObj: any) => emailObj.id === primaryEmailId);
    
    // Extract the email address from the found object
    const primaryEmail = primaryEmailObj ? primaryEmailObj.email_address : null;
  
    if (!primaryEmail) {
      console.error("Primary email is missing in the payload");
      res.status(400).send("Primary email is required");
      return;
    }
  
    // Continue with creating the user in your database
    try {
      await prisma.user.upsert({
        where: { clerkUserId: payload.data.id },
        create: {
          clerkUserId: payload.data.id,
          username: payload.data.username,
          email: primaryEmail,
          imageUrl: payload.data.image_url,
        },
        update: {
          email: primaryEmail,
          imageUrl: payload.data.image_url,
        },
      });
      res.status(200).send('User created or updated');
    } catch (error) {
      console.error('Error in user upsert:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  

  if (eventType === "user.updated") {
    const primaryEmailId = payload.data.primary_email_address_id;
    const primaryEmailObj = payload.data.email_addresses.find((emailObj: any) => emailObj.id === primaryEmailId);
    const primaryEmail = primaryEmailObj ? primaryEmailObj.email_address : null;

    try {
      await prisma.user.update({
        where: { clerkUserId: payload.data.id },
        data: {
          email: primaryEmail, // Update email if it's included in the payload
          username: payload.data.username,
          imageUrl: payload.data.image_url,
        },
      });
      res.status(200).send('User updated');
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  if (eventType === "user.deleted") {
    try {
      await prisma.user.delete({
        where: { clerkUserId: payload.data.id },
      });
      res.status(200).send('User deleted');
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  res.status(200).send('Webhook received');
}
