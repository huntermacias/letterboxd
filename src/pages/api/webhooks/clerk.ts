// pages/api/webhooks/clerk.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export default async function clerkWebhookHandler(req: NextApiRequest, res: NextApiResponse) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

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

  // Handle different event types...
if (eventType === "user.created") {
	const defaultUsername = payload.data.username || 'User_' + payload.data.id;
	await db.user.create({
		data: {
			clerkUserId: payload.data.id, // Assuming Clerk's user ID is stored in `clerkUserId`
			email: payload.data.email, // Assuming email is part of the payload
			username: defaultUsername,
			imageUrl: payload.data.image_url, // Assuming image URL is stored in `profile_image_url`
			password: '', // Add the required 'password' property
			// You might want to handle other fields like role if needed
		},
	});
}

  if (eventType === "user.updated") {
    await db.user.update({
      where: {
        clerkUserId: payload.data.id,
      },
      data: {
        email: payload.data.email, // Update email if it's included in the payload
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      },
    });
  }

  if (eventType === "user.deleted") {
    await db.user.delete({
      where: {
        clerkUserId: payload.data.id,
      },
    });
  }

  res.status(200).send('Webhook received');
}
