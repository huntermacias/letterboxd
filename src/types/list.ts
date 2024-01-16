// types/list.ts
export interface List {
	id: number;
	name: string;
	poster_path: string;
	user: {
	  id: number;
	  name: string;
	  favorite_movies?: string[];
	  avatar?: string; // URL to the user's avatar
	};
	likes: number;
	comments: number;
	// Add other properties as needed
  }
  