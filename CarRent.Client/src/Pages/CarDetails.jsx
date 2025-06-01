import React from "react";
import { Link, useParams } from "react-router-dom";
import FilteringSidebar from "../Components/FilteringSidebar";
import CarInfo from "../Components/CarDetails/CarInfo";
import Carousel from "../Components/Carousel";
import ReviewSection from "../Components/Reviews/ReviewSection";
import CarSlider from "../Components/CarSlider";
import { LoaderBarsSpinner } from "../Components/LoaderBarsSpinner";
import { useVehicleById } from "../Queries/vehicles";
import { memo } from "react";

const API_BASE_URL = "http://localhost:5160";

function CarDetails() {
  const { id } = useParams();
  const { data: vehicle, isLoading, error } = useVehicleById(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <LoaderBarsSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full gap-4">
        <h2 className="text-xl text-red-500">Error loading vehicle details</h2>
        <Link to="/cars" className="text-blue-500 hover:underline">
          Back to all cars
        </Link>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full gap-4">
        <h2 className="text-xl">Vehicle not found</h2>
        <Link to="/cars" className="text-blue-500 hover:underline">
          Back to all cars
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col gap-10 px-6 py-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          <Carousel vehicle={vehicle} />
          <CarInfo vehicle={vehicle} />
        </div>
        <ReviewSection vehicleId={id} />
      </div>
      <div className="lg:mx-auto max-w-7xl px-6">
        <CarSlider title="Similar Vehicles" />
      </div>
    </div>
  );
}

export default memo(CarDetails);
