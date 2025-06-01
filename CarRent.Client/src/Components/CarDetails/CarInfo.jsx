import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FavoriteButton from "../Buttons/FavoriteButton";
import RatingStars from "../RatingStars";
import { useSearchForm } from "../../Contexts/SearchFormContext";

export default function CarInfo({ vehicle }) {
  const { handleLocationChange } = useSearchForm();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-between gap-4 w-full lg:w-1/2 p-4 md:p-6 bg-white rounded-xl shadow-sm">
      <div className="space-y-2">
        <div className="flex justify-between">
          <h1 className="text-2xl lg:text-3xl font-bold">
            {vehicle.brand} {vehicle.model}
          </h1>
          <FavoriteButton isFavorite={vehicle.isFavorite} id={vehicle.id} />
        </div>
        <div className="flex gap-2 items-center">
          <RatingStars rating={3} />
          <p className="text-gray-600 text-sm">440+ Reviewer</p>
        </div>
      </div>

      {/* Vehicle Specs */}
      <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg">
        <h2 className="col-span-2 text-lg font-semibold mb-2">
          Vehicle Specifications
        </h2>
        <div className="flex flex-col gap-2">
          <p className="text-gray-500">Type Car</p>
          <span className="font-semibold text-gray-800">
            {vehicle.bodyType}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-gray-500">Capacity</p>
          <span className="font-semibold text-gray-800">
            {vehicle.seats} Persons
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-gray-500">Transmission</p>
          <span className="font-semibold text-gray-800">
            {vehicle.transmission}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-gray-500">Fuel Type</p>
          <span className="font-semibold text-gray-800">
            {vehicle.fuelType}
          </span>
        </div>
      </div>

      {/* Vehicle features */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">Features</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {vehicle.features.map((feature, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2 flex justify-between items-cente rounded-lg">
        <div>
          <p className="text-4xl font-bold text-gray-800">
            ${vehicle.price}
            <span className="text-gray-400 text-sm font-normal ml-1">/day</span>
          </p>
        </div>
        <Link
          to={`payment`}
          className="bg-blue-600 text-white lg:text-lg px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
        >
          Rent Now
        </Link>
      </div>
    </div>
  );
}
