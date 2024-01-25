import { getAuth } from '@clerk/nextjs/server';
import { NextApiRequest } from 'next';
import { db } from './db';

// Function to get user by Clerk user ID using server-side auth
export const getUserByClerkId = async (req: NextApiRequest) => {
    const auth = await getAuth(req);

    if (!auth.userId) {
        throw new Error("User not authenticated");
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: auth.userId },
    });

    if (!user) {
        throw new Error("User not found in the database");
    }

    return user;
};
