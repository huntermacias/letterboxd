import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

// api/reviews.ts
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end('Method Not Allowed');
  }

  // Hardcoded values for testing
  const clerkUserId = 'user_2bPc3HCyrCaKS8piwsvNhNTjLEW';
  const movieId = 787699;
  const body = 'awful';
  const rating = 3;

  try {
      // Check if the user exists
      const user = await db.user.findUnique({
          where: { clerkUserId: clerkUserId },
      });

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Create the review
      const review = await db.review.create({
          data: {
              movieId, // Assuming this is an integer in your database
              body,
              rating,
              clerkUserId, // Directly use clerkUserId since it's already a string
          },
      });

      return res.status(200).json(review);
  } catch (error: any) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export default handler;
