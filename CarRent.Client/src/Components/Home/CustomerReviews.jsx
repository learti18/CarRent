import { useFetchAllReviews } from "../../Queries/reviews/useFetchAllReviews";
import RatingStars from "../RatingStars";
import { LoaderBarsSpinner } from "../LoaderBarsSpinner";
import { Link } from "react-router-dom";
import { MessageSquareQuote } from "lucide-react";

export default function CustomerReviews() {
  const { data: reviews, isLoading, error } = useFetchAllReviews();

  if (isLoading) {
    return <LoaderBarsSpinner />;
  }

  // Handle empty reviews array
  const hasReviews = reviews && reviews.length > 0;

  return (
    <div className="flex flex-col items-center py-14 max-w-7xl mx-auto">
      <div className="space-y-6 px-5 text-center">
        <p className="text-md md:text-lg text-blue-600 bg-blue-100 px-3 py-1 rounded-lg justify-self-center">
          Customer Testimonials
        </p>
        <h1 className="text-2xl md:text-4xl font-semibold">
          What our customers are saying{" "}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-10 md:px-6 my-12">
        {" "}
        {!hasReviews ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 italic">
              No reviews available yet. Be the first to leave a review!
            </p>
          </div>
        ) : (
          reviews.slice(0, 6).map((review) => (
            <div
              key={review.id}
              className="backdrop-blur-sm bg-white/70 p-8 rounded-xl shadow-lg overflow-hidden relative flex flex-col h-full border-t border-gray-200 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Decorative elements */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 rounded-full"></div>
              <div className="absolute top-1/2 -left-12 w-24 h-24 bg-blue-500/5 rounded-full"></div>

              {/* Quote text */}
              <p className="text-gray-700 leading-relaxed mb-6 relative z-10 text-lg">
                {review.comment || ""}
              </p>

              <div className="mt-auto pt-5 border-t border-gray-100 flex flex-row justify-between items-center relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-offset-2 ring-blue-500/30">
                    <img
                      src="/user.jpg"
                      alt={`${review.username} profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {review.username}
                    </h3>
                    <div className="flex items-center gap-1">
                      <RatingStars rating={review.rating} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="mb-1 text-blue-500 opacity-80">
                    <MessageSquareQuote size={16} />
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(review.dateCreated).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
