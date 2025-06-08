import React from "react";
import { useNavigate } from "react-router-dom";
import { CarFront, Filter, Clock } from "lucide-react";
import { LoaderBarsSpinner } from "../LoaderBarsSpinner";
import UserRentalCard from "../cards/UserRentalCard";

export default function RentalsContent({
  isLoading,
  error,
  filteredRentals,
  rentals,
  statusFilter,
  setStatusFilter,
}) {
  const navigate = useNavigate();

  return (
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
                You haven't rented any cars yet. Start your journey today with
                our premium selection of vehicles!
              </p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                No {statusFilter} Rentals Found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                You don't have any rentals with the {statusFilter} status. Try
                changing your filter or rent a new car.
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
  );
}
