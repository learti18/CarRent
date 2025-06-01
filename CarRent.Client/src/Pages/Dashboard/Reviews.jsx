import React, { useState, useEffect } from "react";
import { useFetchAllReviews } from "../../Queries/reviews/useFetchAllReviews";
import { LoaderBarsSpinner } from "../../Components/LoaderBarsSpinner";
import { Star, MessageCircle, Flag, ThumbsUp } from "lucide-react";
import StatCard from "../../Components/Dashboard/Stats/StatCard";
import RatingDistributionChart from "../../Components/Dashboard/Reviews/RatingDistributionChart";
import ReviewsList from "../../Components/Dashboard/Reviews/ReviewsList";
import { calculateReviewStats } from "../../Utils/ReviewUtils";

export default function Reviews() {
  const { data: reviews, isLoading, error } = useFetchAllReviews();
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState(0);
  const [sortBy, setSortBy] = useState("newest");
  const [flaggedReviews, setFlaggedReviews] = useState([]);

  const stats = reviews ? calculateReviewStats(reviews) : {};

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <LoaderBarsSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <p className="text-red-500">Error loading reviews: {error.message}</p>
      </div>
    );
  }
  return (
    <div className="dashboard-reviews space-y-6">
      <h1 className="dashboard-reviews__title text-2xl font-bold">
        Reviews Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="dashboard-reviews__stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Reviews"
          value={stats.total}
          icon={<MessageCircle className="text-blue-500" />}
          color="blue"
          secondaryText="total customer feedback"
          secondaryValue=""
        />
        <StatCard
          title="Average Rating"
          value={stats.average}
          icon={<Star className="text-yellow-500" />}
          color="yellow"
          secondaryText="out of 5"
          secondaryValue=""
        />
        <StatCard
          title="5-Star Reviews"
          value={stats.fiveStars}
          icon={<ThumbsUp className="text-green-500" />}
          color="green"
          secondaryText={`${
            stats.total > 0
              ? ((stats.fiveStars / stats.total) * 100).toFixed(0)
              : 0
          }% of total`}
          secondaryValue=""
        />
        <StatCard
          title="Flagged Reviews"
          value={flaggedReviews.length}
          icon={<Flag className="text-red-500" />}
          color="red"
          secondaryText="require moderation"
          secondaryValue=""
        />
      </div>
      {/* Rating Distribution */}
      <RatingDistributionChart reviewStats={stats} />

      {/* Reviews List */}
      <ReviewsList
        reviews={reviews}
        searchTerm={searchTerm}
        filterRating={filterRating}
      />
    </div>
  );
}
