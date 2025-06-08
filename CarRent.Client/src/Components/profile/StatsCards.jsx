import React from "react";
import { CarFront, Calendar, BarChart3 } from "lucide-react";

export default function StatsCards({
  activeRentals,
  completedRentals,
  totalSpent,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Active Rentals */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
          <CarFront size={20} className="text-green-600" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Active Rentals</h3>
          <p className="text-2xl font-bold text-gray-900">{activeRentals}</p>
        </div>
      </div>

      {/* Completed Rentals */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
          <Calendar size={20} className="text-blue-600" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">
            Completed Rentals
          </h3>
          <p className="text-2xl font-bold text-gray-900">{completedRentals}</p>
        </div>
      </div>

      {/* Total Amount Spent */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center">
        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
          <BarChart3 size={20} className="text-purple-600" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
          <p className="text-2xl font-bold text-gray-900">${totalSpent}</p>
        </div>
      </div>
    </div>
  );
}
