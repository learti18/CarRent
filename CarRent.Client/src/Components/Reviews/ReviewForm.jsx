import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReviewSchema } from '../../Schemas/ReviewSchema';
import StarRating from './StarRating';

export default function ReviewForm({ onSubmit }) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(ReviewSchema),
  });

  const handleRatingChange = (rating) => {
    setValue('rating', rating);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="review" className="block text-sm font-medium text-gray-700">Your Review</label>
        <textarea
          id="review"
          {...register('review')}
          className={`mt-1 block w-full border rounded-md p-2 ${errors.review ? 'border-red-500' : 'border-gray-300'}`}
          rows="4"
          placeholder="Write your review here..."
        />
        {errors.review && <p className="text-red-500 text-sm">{errors.review.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <StarRating onChange={handleRatingChange} />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Submit Review
      </button>
    </form>
  );
}