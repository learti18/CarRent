import React from "react";
import ReviewCard from "./ReviewCard";
import { useVehicleReviews } from "../../Queries/reviews/useVehicleReviews";
import { LoaderBarsSpinner } from "../LoaderBarsSpinner";

export default function ReviewSection({ vehicleId }) {
  const { data: reviews, isLoading, error } = useVehicleReviews(vehicleId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <LoaderBarsSpinner />
      </div>
    );
  }

  return (
    <div className="p-7 rounded-xl bg-white w-full">
      <div className="flex items-center gap-4 border-b pb-4">
        <h1 className="text-xl font-semibold">Reviews</h1>
        <span className="text-white rounded-md bg-blue-600 px-4 py-1">
          {reviews.length}
        </span>
      </div>
      <div className="pt-4 space-y-7">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              avatar={review.userAvatar}
              userName={review.username}
              userTitle={review.userTitle}
              description={review.comment}
              rating={review.rating}
              createdAt={review.dateCreated}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center w-full gap-4 p-4">
            <h2 className="text-xl text-gray-500">No reviews yet</h2>
            <p className="text-gray-400 text-sm">
              Be the first to review this vehicle!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
