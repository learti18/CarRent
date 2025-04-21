import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReviewSchema } from "../../Schemas/ReviewSchema";
import StarRating from "./StarRating";
import { Star } from "lucide-react";

export default function ReviewForm({ onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(ReviewSchema),
  });

  const handleRatingChange = (rating) => {
    setValue("rating", rating);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          Rate Your Experience
        </label>
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <StarRating onChange={handleRatingChange} />
          {errors.rating && (
            <p className="mt-2 text-sm text-rose-500">
              {errors.rating.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="review"
          className="block text-lg font-semibold text-gray-900 mb-3"
        >
          Write Your Review
        </label>
        <div className="relative">
          <textarea
            id="review"
            {...register("review")}
            rows={10}
            className={`w-full rounded-xl border ${
              errors.review ? "border-red-500" : "border-gray-300"
            } px-5 py-4 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none`}
            placeholder="Share your experience with this vehicle..."
            disabled={isSubmitting}
          ></textarea>
          {errors.review && (
            <p className="text-red-500 text-sm mt-1">{errors.review.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 disabled:opacity-70 transition-colors"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <Star size={18} className="fill-white" />
            <span>Submit Review</span>
          </>
        )}
      </button>
    </form>
  );
}
