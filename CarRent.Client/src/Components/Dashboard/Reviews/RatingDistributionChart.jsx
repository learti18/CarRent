import React from "react";
import { Star } from "lucide-react";

export default function RatingDistributionChart({ reviewStats }) {
  const {
    fiveStars,
    fourStars,
    threeStars,
    twoStars,
    oneStars,
    total,
    percentages,
  } = reviewStats;

  return (
    <div className="rating-distribution bg-white p-6 rounded-xl shadow-sm">
      <h2 className="rating-distribution__title text-lg font-semibold mb-4">
        Rating Distribution
      </h2>
      <div className="rating-distribution__chart space-y-3">
        {[5, 4, 3, 2, 1].map((starCount) => {
          const countKey = `${
            starCount === 1
              ? "one"
              : starCount === 2
              ? "two"
              : starCount === 3
              ? "three"
              : starCount === 4
              ? "four"
              : "five"
          }Stars`;
          const count = reviewStats[countKey];
          const percentage = percentages ? percentages[countKey] : 0;

          return (
            <div
              key={starCount}
              className="rating-distribution__row flex items-center"
            >
              <div className="rating-distribution__label w-20 flex items-center">
                <span className="rating-distribution__star-count mr-1">
                  {starCount}
                </span>
                <Star className="rating-distribution__star h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="rating-distribution__bar-container flex-grow mx-4">
                <div className="rating-distribution__bar-bg w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="rating-distribution__bar bg-yellow-400 h-2.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="rating-distribution__count w-20 text-right">
                <span className="rating-distribution__count-text text-sm text-gray-500">
                  {count} ({percentage ? percentage.toFixed(0) : 0}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
