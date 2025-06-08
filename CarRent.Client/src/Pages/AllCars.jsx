import React, { useState } from "react";
import CarCard from "../Components/CarCard";
import FilteringSidebar from "../Components/FilteringSidebar";
import FilterSortBar from "../Components/AllCars/FilterSortBar";
import LocationSelector from "../Components/AllCars/LocationSelector";
import SkeletonCard from "../Components/cards/SkeletonCard";
import { useSearchForm } from "../Contexts/SearchFormContext";
import { useAvailableVehicles } from "../Queries/vehicles/useAvailableVehicles";

export default function AllCars() {
  const [isExpanded, setExpanded] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const { queryParams } = useSearchForm();
  const {
    data: vehicles,
    isLoading,
    error,
  } = useAvailableVehicles(queryParams);

  // Toggle sidebar expansion for mobile
  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="relative">
        {/* Full-width white background for sidebar that extends to the left edge */}
        <div className="absolute top-0 bottom-0 left-0 bg-white hidden lg:block w-64"></div>

        {/* Main content container with max-w-7xl */}
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="">
              <FilteringSidebar
                isExpanded={isExpanded}
                toggleExpanded={toggleExpanded}
              />
            </div>
            <div className="flex-1 px-5 md:px-6 py-5 sm:py-8 overflow-hidden">
              <div className="mb-6">
                <LocationSelector />
              </div>
              <div className="flex justify-between items-center">
                <FilterSortBar toggleExpanded={toggleExpanded} />
              </div>

              {/* Loading state and error handling */}
              {error && (
                <div className="bg-red-50 p-4 rounded-md mb-4">
                  <p className="text-red-700">
                    Error loading vehicles: {error.message}
                  </p>
                </div>
              )}

              {/* Vehicle grid with loading state */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr mt-5">
                {isLoading
                  ? Array(9)
                      .fill(0)
                      .map((_, index) => (
                        <SkeletonCard key={`skeleton-${index}`} />
                      ))
                  : vehicles?.map((car) => <CarCard key={car.id} {...car} />)}
              </div>

              {/* Empty state */}
              {!isLoading && (!vehicles || vehicles.length === 0) && (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium text-gray-700">
                    No cars match your filters
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Try adjusting your filters or search criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
