import React from "react";
import DashboardReviewCard from "./DashboardReviewCard";

export default function ReviewsList({ reviews, searchTerm, filterRating }) {
  return (
    <div className="reviews-list bg-white p-6 rounded-xl shadow-sm">
      <h2 className="reviews-list__title text-lg font-semibold mb-4">
        All Reviews
      </h2>

      {reviews.length > 0 ? (
        <div className="reviews-list__content space-y-6">
          {reviews.map((review) => (
            <DashboardReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="reviews-list__empty flex flex-col items-center justify-center w-full gap-4 p-8 text-gray-500">
          {searchTerm || filterRating > 0 ? (
            <>
              <p className="reviews-list__empty-text text-xl">
                No reviews match your filters
              </p>
              <button
                className="reviews-list__clear-btn mt-2 text-blue-600 hover:underline"
                onClick={onClearFilters}
              >
                Clear filters
              </button>
            </>
          ) : (
            <p className="reviews-list__empty-text text-xl">
              No reviews available
            </p>
          )}
        </div>
      )}
    </div>
  );
}
