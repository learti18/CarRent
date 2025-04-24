import React from "react";
import { IMGURL } from "../../../common/constants";
import { formatDate } from "./../../../Utils/FormatDate";

export default function RentalTableRow({ rental, onViewDetails }) {
  const {
    id,
    vehicle = {},
    status = "Pending",
    pickup,
    dropOff,
    amount = 0,
  } = rental || {};

  const getStatusStyle = (status) => {
    const styles = {
      active: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      completed: "bg-blue-100 text-blue-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return styles[status?.toLowerCase()] || "bg-yellow-100 text-yellow-700";
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-3">
        <div className="flex items-center gap-3">
          <img
            src={vehicle.mainImage ? vehicle.mainImage : "/car-placeholder.png"}
            alt={vehicle.brand || "Car"}
            className="w-20 h-20 rounded-lg object-contain p-2 bg-gray-100"
          />
          <div>
            <p className="font-medium">{vehicle.brand || "Unknown Vehicle"}</p>
            {vehicle.model && (
              <p className="text-sm text-gray-500">{vehicle.model}</p>
            )}
          </div>
        </div>
      </td>
      <td className="p-4">
        <span
          className={`px-2 py-1 rounded-full text-sm ${getStatusStyle(status)}`}
        >
          {status}
        </span>
      </td>
      <td className="p-4">{formatDate(pickup?.date)}</td>
      <td className="p-4">{formatDate(dropOff?.date)}</td>
      <td className="p-4">${amount.toFixed(2)}</td>
      <td className="p-4">
        <button
          className="text-blue-600 hover:text-blue-800"
          onClick={() => onViewDetails && onViewDetails(id)}
        >
          View Details
        </button>
      </td>
    </tr>
  );
}
