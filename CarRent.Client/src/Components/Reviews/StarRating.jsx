import React, { useState } from "react";
import { Star } from "lucide-react";

export default function StarRating({
  rating: externalRating,
  setRating: externalSetRating,
  onChange,
  disabled = false,
}) {
  const [rating, setInternalRating] = useState(externalRating || 0);
  const [hover, setHover] = useState(0);

  // Handle both onChange and setRating props
  const handleRatingChange = (newRating) => {
    setInternalRating(newRating);

    // Support both naming conventions
    if (externalSetRating && typeof externalSetRating === "function") {
      externalSetRating(newRating);
    }

    if (onChange && typeof onChange === "function") {
      onChange(newRating);
    }
  };

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            type="button"
            key={index}
            onClick={() => !disabled && handleRatingChange(ratingValue)}
            onMouseEnter={() => !disabled && setHover(ratingValue)}
            onMouseLeave={() => !disabled && setHover(0)}
            className={`focus:outline-none transition-colors ${
              disabled ? "cursor-default" : "cursor-pointer"
            }`}
          >
            <Star
              className={`transition-all duration-150 ${
                ratingValue <= (hover || rating || externalRating || 0)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
              size={28}
            />
          </button>
        );
      })}
    </div>
  );
}
