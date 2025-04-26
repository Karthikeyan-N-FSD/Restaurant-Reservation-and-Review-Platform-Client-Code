import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router";
import axios from "axios";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <UserCircleIcon className="h-8 w-8 text-gray-400" />
          <div>
            <p className="font-semibold text-gray-800">{review.userName}</p> {/* Display userName */}
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="text-gray-700 text-sm mb-2">{review.text}</p>
      <p className="text-gray-500 text-xs mb-2">
        {new Date(review.date).toLocaleDateString()}
      </p>
    </div>
  );
};

const ReviewSection = () => {
  const { id } = useParams(); // Get restaurant ID from URL
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/restaurants/${id}/reviews`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return <div className="text-center text-gray-500">No reviews found.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reviews</h2>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </ul>
    </div>
  );
};

export default ReviewSection;