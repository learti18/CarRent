import React from "react";

export default function RentalStatusBreakdown({
  activeRentals,
  pendingRentals,
  completedRentals,
  totalRentals,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Rental Status</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span>Active</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">{activeRentals}</span>
            <span className="text-gray-500 text-sm ml-1">
              ({((activeRentals / totalRentals) * 100 || 0).toFixed(0)}%)
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{
              width: `${(activeRentals / totalRentals) * 100 || 0}%`,
            }}
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span>Pending</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">{pendingRentals}</span>
            <span className="text-gray-500 text-sm ml-1">
              ({((pendingRentals / totalRentals) * 100 || 0).toFixed(0)}%)
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-yellow-500 h-2.5 rounded-full"
            style={{
              width: `${(pendingRentals / totalRentals) * 100 || 0}%`,
            }}
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">{completedRentals}</span>
            <span className="text-gray-500 text-sm ml-1">
              ({((completedRentals / totalRentals) * 100 || 0).toFixed(0)}%)
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{
              width: `${(completedRentals / totalRentals) * 100 || 0}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
