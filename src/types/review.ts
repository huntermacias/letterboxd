export interface Review {
	id: number;
	movieName: string;
	movieImage: string;
	reviewText: string;
	user: {
	  name: string;
	  avatar: string;
	};
	stars: number;
	commentsCount: number;
  }