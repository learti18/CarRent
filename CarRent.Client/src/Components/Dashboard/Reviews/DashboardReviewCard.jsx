import React from "react";
import RatingStars from "../../RatingStars";
import { ThumbsUp, Flag } from "lucide-react";

export default function DashboardReviewCard({ review, onApprove, onFlag }) {
  const {
    id,
    username,
    comment,
    rating,
    dateCreated,
    vehicleMake,
    vehicleModel,
  } = review;

  return (
    <div className="dashboard-review-card border-b pb-6 last:border-0">
      <div className="dashboard-review-card__container flex flex-row gap-x-5">
        <div className="dashboard-review-card__avatar flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
          <img
            src="/user.jpg"
            alt={`${username || "User"} avatar`}
            className="dashboard-review-card__image w-full h-full object-cover object-center"
          />
        </div>
        <div className="dashboard-review-card__content flex flex-col gap-2 w-full">
          <div className="dashboard-review-card__header flex flex-row justify-between">
            <div className="dashboard-review-card__user-info">
              <h3 className="dashboard-review-card__username text-lg font-semibold">
                {username}
              </h3>
              {vehicleMake && vehicleModel && (
                <p className="dashboard-review-card__vehicle text-sm text-gray-500">
                  For Vehicle: {vehicleMake} {vehicleModel}
                </p>
              )}
            </div>
          </div>
          <div className="dashboard-review-card__meta flex flex-row justify-between">
            <span className="dashboard-review-card__date text-slate-400">
              {new Date(dateCreated).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
            <RatingStars rating={rating} />
          </div>
          <p className="dashboard-review-card__comment leading-7 tracking-wide text-slate-600">
            {comment}
          </p>
        </div>
      </div>
    </div>
  );
}
