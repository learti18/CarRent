import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating, setRating, disabled = false }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setRating(star)}
          className={`focus:outline-none transition ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
        >
          <Star
            size={24}
            className={`transition-colors ${
              star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}