import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { LoaderBarsSpinner } from "../Components/LoaderBarsSpinner";
import { getCurrentUser } from "../Utils/UserStore";
import { useAllRentals } from "../Queries/Rentals/useAllRentals";

// Import our new component modules
import ProfileHeader from "../Components/profile/ProfileHeader";
import StatsCards from "../Components/profile/StatsCards";
import ProfileTabs from "../Components/profile/ProfileTabs";
import RentalsContent from "../Components/profile/RentalsContent";
import FavoritesContent from "../Components/profile/FavoritesContent";

export default function UserProfile() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const currentUser = getCurrentUser() || {};
  const { data: rentals = [], isLoading, error } = useAllRentals();

  const [activeTab, setActiveTab] = useState("rentals");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filtered rentals based on status
  const filteredRentals =
    rentals?.filter((rental) => {
      if (statusFilter === "all") return true;
      return rental.status?.toLowerCase() === statusFilter.toLowerCase();
    }) || [];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoaderBarsSpinner />
      </div>
    );
  }

  // Calculate some stats for the dashboard
  const activeRentals =
    rentals?.filter((r) => r.status?.toLowerCase() === "active")?.length || 0;
  const completedRentals =
    rentals?.filter((r) => r.status?.toLowerCase() === "completed")?.length ||
    0;
  const totalSpent = rentals
    ?.reduce((sum, rental) => sum + (rental.amount || 0), 0)
    .toFixed(2);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-5 py-12">
      <div className="max-w-7xl px-5 mx-auto">
        {/* Profile Header Component */}
        <ProfileHeader userData={currentUser} />

        {/* Stats Cards Component */}
        <StatsCards
          activeRentals={activeRentals}
          completedRentals={completedRentals}
          totalSpent={totalSpent}
        />

        {/* Tabs Navigation Component */}
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Rentals Content */}
        {activeTab === "rentals" && (
          <RentalsContent
            isLoading={isLoading}
            error={error}
            filteredRentals={filteredRentals}
            rentals={rentals}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        )}

        {/* Favorites Content */}
        {activeTab === "favorites" && <FavoritesContent />}
      </div>
    </div>
  );
}
