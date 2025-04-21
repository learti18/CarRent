import { Fuel, LifeBuoy, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import FavoriteButton from "./Buttons/FavoriteButton";

const API_BASE_URL = "http://localhost:5160";

export default function CarCard({
  id,
  brand,
  model,
  bodyType,
  fuelType,
  transmission,
  seats,
  price,
  images,
  isFavorite,
  variant = "default",
}) {
  const isSlider = variant === "slider";
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder-car.jpg";
    return `${API_BASE_URL}${imagePath}`;
  };

  return (
    <div
      className={`flex flex-col justify-between md:gap-y-4 bg-white p-6 rounded-xl ${
        isSlider ? "min-w-72" : ""
      }`}
    >
      <div className="flex flex-col mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">
              {brand} {model}
            </h2>
            <p className="font-medium text-sm text-gray-400">{bodyType}</p>
          </div>
          <div className="flex items-center">
            <FavoriteButton id={id} isFavorite={isFavorite} />
          </div>
        </div>
      </div>
      <div
        className={`flex ${
          isSlider
            ? "flex-col space-y-4"
            : "flex-row md:flex-col sm:justify-between"
        }`}
      >
        <div className="flex justify-center relative py-8 mr-auto md:m-auto ">
          <img
            src={getImageUrl(images[0])}
            alt={`${brand} ${model}`}
            className="max-h-24 object-contain pr-4 md:pr-0"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder-car.jpg";
            }}
            loading="lazy"
          />
          <div className="absolute w-full h-24 bottom-0 top-0 mt-auto bg-gradient-to-t from-white"></div>
        </div>
        <div
          className={`flex py-5 ${
            isSlider
              ? "flex-row justify-between"
              : "flex-col md:flex-row justify-between"
          }`}
        >
          <div
            className="flex gap-1 text-gray-400"
            data-tooltip-content={`Fuel Type: ${fuelType}`}
          >
            <Fuel size={18} />
            <span className="text-xs">{fuelType}</span>
            <Tooltip />
          </div>
          <div
            className="flex gap-1 text-gray-400"
            data-tooltip-content={`Transmission: ${transmission}`}
          >
            <LifeBuoy size={18} />
            <span className="text-xs">{transmission}</span>
            <Tooltip />
          </div>
          <div
            className="flex gap-1 text-gray-400"
            data-tooltip-content={`Seating capacity: ${seats}`}
          >
            <Users size={18} />
            <span className="text-xs">{seats} People</span>
            <Tooltip />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">
          ${price}/<span className="text-gray-400 text-xs"> day</span>
        </p>
        <Link
          to={`/cars/${id}`}
          className="text-sm px-5 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
        >
          Rent Now
        </Link>
      </div>
    </div>
  );
}
