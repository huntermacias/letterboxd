import { currentUser } from "@clerk/nextjs";
import { db } from "./db";

// Function to get user by external userID
export const getUserByExternalId = async (externalUserId: string) => {
    const self = await currentUser();
    if (!self) {
        throw new Error("User not found");
    }

    const user = await db.user.findUnique({
        where: { externalUserId: self.id },
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};



