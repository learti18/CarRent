import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function VehicleTableRow({ vehicle, onDelete }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const getStatusColor = (isBooked) => {
    return isBooked ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800";
  };

  const getStatusText = (isBooked) => {
    return isBooked ? "Booked" : "Available";
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <img
            src={vehicle.mainImage}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-14 h-14 object-contain rounded-lg"
          />
          <div>
            <p className="font-medium">
              {vehicle.brand} {vehicle.model}
            </p>
            <p className="text-sm text-gray-500">{vehicle.licensePlate}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className="text-gray-600">{vehicle.bodyType}</span>
      </td>
      <td className="py-4 px-6">
        <span className="text-gray-600">{vehicle.seats} seats</span>
      </td>
      <td className="py-4 px-6">
        <span className="text-gray-600">{vehicle.transmission}</span>
      </td>
      <td className="py-4 px-6">
        <span className="font-medium">${vehicle.price}/day</span>
      </td>
      <td className="py-4 px-6">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            vehicle.isBooked
          )}`}
        >
          {getStatusText(vehicle.isBooked)}
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 rounded-lg hover:bg-gray-100"
          >
            <MoreVertical size={20} className="text-gray-500" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
              <Link
                to={`edit/${vehicle.id}`}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Pencil size={16} />
                Edit
              </Link>
              <button
                onClick={() => {
                  onDelete(vehicle.id);
                  setIsMenuOpen(false);
                }}
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 gap-2 w-full"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
