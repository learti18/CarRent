import React from "react";
import {
  X,
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  Home,
  MapPinned,
} from "lucide-react";
import { formatDate } from "../../../Utils/FormatDate";

export default function RentalDetailsModal({ rental, onClose }) {
  if (!rental) return null;

  const {
    id,
    name,
    phone,
    address,
    city,
    pickup,
    dropOff,
    vehicle,
    amount,
    status,
  } = rental;

  const getStatusStyle = (status) => {
    const styles = {
      active: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      completed: "bg-blue-100 text-blue-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return styles[status?.toLowerCase()] || "bg-yellow-100 text-yellow-700";
  };

  const formatDateTime = (date, time) => {
    if (!date) return "N/A";
    const formattedDate = formatDate(date);
    return time ? `${formattedDate}, ${time.substring(0, 5)}` : formattedDate;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-0 m-0">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto my-0 mx-4">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold">Rental Details #{id}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Status</span>
            <span
              className={`px-3 py-1 rounded-full ${getStatusStyle(status)}`}
            >
              {status}
            </span>
          </div>

          {/* Vehicle Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <img
                src={vehicle?.mainImage || "/car-placeholder.png"}
                alt={`${vehicle?.brand} ${vehicle?.model}`}
                className="w-24 h-24 rounded-md object-contain bg-white p-2"
              />
              <div>
                <h3 className="text-lg font-medium">
                  {vehicle?.brand} {vehicle?.model}
                </h3>
                <div className="text-sm text-gray-500 mt-1">
                  <span>{vehicle?.fuelType}</span> •{" "}
                  <span>{vehicle?.transmission}</span>
                </div>
                <div className="mt-2 text-blue-600 font-medium">
                  ${vehicle?.price}/day
                </div>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-3">Customer Information</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <User size={18} className="text-gray-400 mt-0.5" />
                <div>
                  <div className="font-medium">{name}</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Phone size={18} className="text-gray-400 mt-0.5" />
                <div>{phone}</div>
              </div>
              <div className="flex items-start space-x-2">
                <Home size={18} className="text-gray-400 mt-0.5" />
                <div>{address}</div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPinned size={18} className="text-gray-400 mt-0.5" />
                <div>{city}</div>
              </div>
            </div>
          </div>

          {/* Pickup & Drop-off */}
          <div className="border-t pt-4 grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-medium flex items-center mb-2">
                <Calendar size={18} className="mr-2 text-blue-500" />
                Pickup
              </h4>
              <div className="space-y-1 ml-6">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-gray-400" />
                  <span>{pickup?.city}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-gray-400" />
                  <span>{formatDate(pickup?.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2 text-gray-400" />
                  <span>
                    {pickup?.time ? pickup.time.substring(0, 5) : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-medium flex items-center mb-2">
                <Calendar size={18} className="mr-2 text-green-500" />
                Drop-off
              </h4>
              <div className="space-y-1 ml-6">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-gray-400" />
                  <span>{dropOff?.city}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-gray-400" />
                  <span>{formatDate(dropOff?.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2 text-gray-400" />
                  <span>
                    {dropOff?.time ? dropOff.time.substring(0, 5) : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-3">Payment Details</h3>
            <div className="flex justify-between border-b pb-2">
              <span>Total</span>
              <span className="font-medium">${amount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="border-t p-4 flex justify-end space-x-2 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
