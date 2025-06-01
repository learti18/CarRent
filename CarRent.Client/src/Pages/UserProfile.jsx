import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { LoaderBarsSpinner } from "../Components/LoaderBarsSpinner";
import { getCurrentUser } from "../Utils/UserStore";
import { useAllRentals } from "../Queries/Rentals/useAllRentals";
import UserRentalCard from "../Components/cards/UserRentalCard";
import { IMGURL } from "../common/constants";
import {
  User,
  Mail,
  Phone,
  Calendar,
  CarFront,
  Settings,
  Plus,
  BarChart3,
  Clock,
  MapPin,
  Shield,
  HeartHandshake,
  Filter,
} from "lucide-react";

export default function UserProfile() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { profileImageUrl, username, email, phone } = getCurrentUser() || {};
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
        {/* Modern Profile Section */}
        <div className="mb-8 bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* User info section with patterns instead of cover photo */}
          <div className="relative">
            {/* Pattern background */}
            <div className="h-32 bg-blue-600 relative overflow-hidden">
              {/* Decorative patterns */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
              </div>

              {/* Membership badge */}
              <div className="absolute top-4 right-5 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 text-white text-xs font-medium flex items-center">
                <Shield size={12} className="mr-1" />
                <span>Member since {new Date().getFullYear()}</span>
              </div>
            </div>

            {/* Profile section with avatar */}
            <div className="px-8 pb-6 relative">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
                {/* Avatar with edit button */}
                <div className="relative -mt-12">
                  <div className="w-24 h-24 rounded-xl overflow-hidden border-4 border-white shadow-md">
                    <img
                      src={
                        profileImageUrl
                          ? `${IMGURL}${profileImageUrl}`
                          : "/user.png"
                      }
                      alt={username || "User"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-1 right-1 bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-1.5 shadow-sm transition">
                    <Settings size={14} />
                  </button>
                </div>

                {/* User info */}
                <div className="flex-grow pt-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {username || "User"}
                  </h1>
                  <div className="flex flex-col sm:flex-row gap-4 mt-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-blue-500" />
                      <span>{email || "Not provided"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-blue-500" />
                      <span>{phone || "Not provided"}</span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-4 md:mt-0 flex gap-3 ml-auto">
                  <button
                    onClick={() => navigate("/cars")}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
                  >
                    <Plus size={16} />
                    <span>Rent a Car</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Active Rentals */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <CarFront size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Active Rentals
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {activeRentals}
              </p>
            </div>
          </div>

          {/* Completed Rentals */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <Calendar size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Completed Rentals
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {completedRentals}
              </p>
            </div>
          </div>

          {/* Total Amount Spent */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
              <BarChart3 size={20} className="text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
              <p className="text-2xl font-bold text-gray-900">${totalSpent}</p>
            </div>
          </div>
        </div>

        {/* Tabs navigation - simplified and modernized */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 border-b">
            <button
              onClick={() => setActiveTab("rentals")}
              className={`px-5 py-2.5 font-medium text-sm transition-colors relative rounded-t-lg
                ${
                  activeTab === "rentals"
                    ? "text-blue-600 bg-white border-t border-l border-r border-gray-200"
                    : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                }`}
            >
              <span className="flex items-center gap-2">
                <CarFront size={16} />
                <span>My Rentals</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab("favorites")}
              className={`px-5 py-2.5 font-medium text-sm transition-colors relative rounded-t-lg
                ${
                  activeTab === "favorites"
                    ? "text-blue-600 bg-white border-t border-l border-r border-gray-200"
                    : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                }`}
            >
              <span className="flex items-center gap-2">
                <HeartHandshake size={16} />
                <span>Favorites</span>
              </span>
            </button>
          </div>
        </div>

        {/* Rentals content */}
        {activeTab === "rentals" && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <CarFront size={18} className="text-blue-600" />
                  <span>Your Rental History</span>
                </h2>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Filter size={16} className="text-gray-400" />
                    </div>
                    <select
                      className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none w-full"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock size={16} className="text-gray-400" />
                    </div>
                    <select className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none w-full">
                      <option>Sort by: Newest</option>
                      <option>Sort by: Oldest</option>
                      <option>Sort by: Price (High-Low)</option>
                      <option>Sort by: Price (Low-High)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="bg-white rounded-xl p-12 flex justify-center items-center shadow-sm border border-gray-100">
                <LoaderBarsSpinner />
              </div>
            ) : error ? (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Unable to Load Your Rentals
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {error.message ||
                    "We encountered an error while trying to load your rental history. Please try again later."}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm inline-flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span>Try Again</span>
                </button>
              </div>
            ) : !filteredRentals.length ? (
              <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="inline-flex items-center justify-center mb-6 w-20 h-20 rounded-full bg-blue-50 text-blue-500">
                  {statusFilter === "all" ? (
                    <CarFront size={32} />
                  ) : (
                    <Filter size={32} />
                  )}
                </div>

                {statusFilter === "all" ? (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      No Rentals Yet
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      You haven't rented any cars yet. Start your journey today
                      with our premium selection of vehicles!
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      No {statusFilter} Rentals Found
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      You don't have any rentals with the {statusFilter} status.
                      Try changing your filter or rent a new car.
                    </p>
                  </>
                )}

                <button
                  onClick={() => navigate("/cars")}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm inline-flex items-center gap-2"
                >
                  <CarFront size={18} />
                  <span>Browse Available Cars</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredRentals.map((rental) => (
                  <UserRentalCard
                    key={rental.id}
                    rental={rental}
                    onViewDetails={() => navigate(`/rentals/${rental.id}`)}
                  />
                ))}

                {filteredRentals.length > 0 && (
                  <div className="flex justify-center mt-6">
                    {filteredRentals.length < (rentals?.length || 0) ? (
                      <button
                        onClick={() => setStatusFilter("all")}
                        className="px-5 py-2.5 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                      >
                        <Filter size={16} />
                        <span>Clear Filters</span>
                      </button>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        Showing all {filteredRentals.length} rentals
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Favorites content (placeholder) */}
        {activeTab === "favorites" && (
          <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="inline-flex items-center justify-center mb-6 w-20 h-20 rounded-full bg-blue-50 text-blue-500">
              <HeartHandshake size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Favorites Coming Soon
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Soon you'll be able to save your favorite vehicles here for quick
              access when you want to rent them.
            </p>
            <button
              onClick={() => setActiveTab("rentals")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              Back to Rentals
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
