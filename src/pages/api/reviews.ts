import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';



// api/reviews.ts
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end('Method Not Allowed');
  }
  const { userId: clerkUserId, username,  movieId, body, rating } = req.body;


if (!clerkUserId || !movieId || !body || rating === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
}


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
            clerkUserId: clerkUserId,
        },
    });

      return res.status(200).json(review);
  } catch (error: any) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export default handler;

