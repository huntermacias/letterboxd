// import { db } from '@/lib/db';

// export async function getReviews() {
//   try {
	
//     const reviews = await db.review.findMany({
//       select: {
//         id: true,
//         movieId: true,
//         body: true,
//         rating: true,
//         createdAt: true,
//         clerkUserId: true
//       }
//     });
//     // Log the number of reviews fetched
//     console.log(`Fetched ${reviews.length} reviews from the database`);

//     // Check if the reviews array is empty
//     if (reviews.length === 0) {
//       console.log('No reviews found in the database');
//     }

//     return reviews;
//   } catch (error) {
//     console.error('Error fetching reviews:', error);
//     return [];
//   }
// }
