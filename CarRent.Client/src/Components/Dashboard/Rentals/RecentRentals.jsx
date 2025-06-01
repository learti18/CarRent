import React from "react";
import { Link } from "react-router-dom";
import { CalendarCheck } from "lucide-react";

export default function RecentRentals({ rentals }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Rentals</h2>
        <Link to="/dashboard/rentals" className="text-blue-500 text-sm">
          View all
        </Link>
      </div>

      {rentals && rentals.length > 0 ? (
        <div className="space-y-4">
          {rentals.slice(0, 5).map((rental, index) => (
            <div
              key={rental.id || index}
              className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0"
            >
              <div
                className={`p-2 rounded-lg ${
                  rental.status === "Active"
                    ? "bg-green-100"
                    : rental.status === "Pending"
                    ? "bg-yellow-100"
                    : "bg-blue-100"
                }`}
              >
                <CalendarCheck
                  className={`w-5 h-5 ${
                    rental.status === "Active"
                      ? "text-green-600"
                      : rental.status === "Pending"
                      ? "text-yellow-600"
                      : "text-blue-600"
                  }`}
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">
                    {rental.vehicle?.brand || "Vehicle"}{" "}
                    {rental.vehicle?.model || ""}
                  </p>
                  <span className="text-sm text-gray-500">
                    ${rental.amount?.toFixed(2) || "0.00"}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(rental.pickup?.date).toLocaleDateString()} -{" "}
                  {new Date(rental.dropOff?.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-40 text-gray-400">
          No recent rentals
        </div>
      )}
    </div>
  );
}
