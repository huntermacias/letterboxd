export interface Review {
	id: number;
	movieId: number;
	body: string;
	rating: number;
	createdAt: Date;
	updatedAt: Date;
	clerkUserId: string;
	// Include user details if you are fetching them in your query
  }
  