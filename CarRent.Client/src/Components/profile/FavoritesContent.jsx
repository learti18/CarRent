import React from "react";
import { useNavigate } from "react-router-dom";
import { HeartHandshake, Search } from "lucide-react";
import { useFetchFavoriteVehicles } from "../../Queries/favorites/useFetchFavoriteVehicles";
import { LoaderBarsSpinner } from "../LoaderBarsSpinner";
import CarCard from "../CarCard";

export default function FavoritesContent() {
  const navigate = useNavigate();
  const {
    data: favoriteVehicles,
    isLoading,
    error,
  } = useFetchFavoriteVehicles();
  const hasFavorites = favoriteVehicles && favoriteVehicles.length > 0;

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-12 flex justify-center items-center shadow-sm border border-gray-100">
        <LoaderBarsSpinner />
      </div>
    );
  }

  if (error) {
    return (
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
          Unable to Load Your Favorites
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {error.message ||
            "We encountered an error while trying to load your favorite vehicles. Please try again later."}
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
    );
  }

  if (!hasFavorites) {
    return (
      <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center">
        <div className="inline-flex items-center justify-center mb-6 w-20 h-20 rounded-full bg-blue-50 text-blue-500">
          <HeartHandshake size={32} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          No Favorite Vehicles Yet
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          You haven't added any vehicles to your favorites yet. Start exploring
          our collection and save your favorite cars for quick access!
        </p>
        <button
          onClick={() => navigate("/cars")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm inline-flex items-center gap-2"
        >
          <Search size={18} />
          <span>Browse Cars</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <HeartHandshake size={18} className="text-blue-600" />
            <span>Your Favorite Vehicles</span>
          </h2>
          <p className="text-sm text-gray-500">
            {favoriteVehicles.length}{" "}
            {favoriteVehicles.length === 1 ? "vehicle" : "vehicles"} saved
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteVehicles.map((vehicle) => (
          <CarCard key={vehicle.id} {...vehicle.vehicle} isFavorite={true} />
        ))}
      </div>
    </div>
  );
}
