// import { getReviews } from "@/lib/getReviews";
import { format } from "date-fns";
import { Rating } from "react-simple-star-rating";

interface User {
  username: string;
}


interface Review {
  id: number;
  movieId: number;
  body: string;
  rating: number;
  createdAt: string; // Changed to string to match the prop format
  clerkUserId: string;
  user: User;
}

interface ReviewsComponentProps {
  reviews: Review[];
}


const ReviewsComponent = ({ reviews }: ReviewsComponentProps) => {

  if (!Array.isArray(reviews)) {
    // Handle the case where reviews is not an array
    return <div>No reviews data available.</div>;
  }
  return (
    <div className="text-white bg-[#040D12] p-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-glow">Reviews</h1>
      <div className="space-y-6">
        {reviews?.map((review) => (
          <div key={review.id} className="bg-[#000000] p-4 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <span className="icon-class text-glow mr-2"></span> {/* Replace with user icon */}
                <span className="font-semibold text-lg text-[#42A5F5]">Reviewed By: @{review.user?.username || 'Unknown'}</span>
              </div>
              <span className="text-gray-400 text-sm">
                {format(new Date(review.createdAt), "PPP")}
              </span>
            </div>
           
            <p className="text-gray-300 mb-4">Review: {review.body}</p>
            <div className="flex items-center">
              <span className="icon-class text-star-yellow mr-2"></span> {/* Replace with star icon */}
              <Rating 
  initialValue={review.rating}
  SVGstyle={{ width: '20px', height: '20px', display: 'inline-block', marginRight: '5px' }}
/>

            </div>
          </div>
        ))}
        {reviews?.length === 0 && <p className="text-center text-gray-400 text-lg">No reviews available.</p>}
      </div>
    </div>
  );
};



export default ReviewsComponent;
