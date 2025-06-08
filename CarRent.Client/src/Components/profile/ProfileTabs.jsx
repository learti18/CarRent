import React from "react";
import { CarFront, HeartHandshake } from "lucide-react";

export default function ProfileTabs({ activeTab, setActiveTab }) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 border-b">
        <button
          onClick={() => setActiveTab("rentals")}
          className={`px-5 py-2.5 font-medium text-sm transition-colors relative rounded-t-lg
            ${
              activeTab === "rentals"
                ? "text-blue-600 bg-white border-t border-l border-r border-gray-200"
                : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
            }`}
        >
          <span className="flex items-center gap-2">
            <CarFront size={16} />
            <span>My Rentals</span>
          </span>
        </button>

        <button
          onClick={() => setActiveTab("favorites")}
          className={`px-5 py-2.5 font-medium text-sm transition-colors relative rounded-t-lg
            ${
              activeTab === "favorites"
                ? "text-blue-600 bg-white border-t border-l border-r border-gray-200"
                : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
            }`}
        >
          <span className="flex items-center gap-2">
            <HeartHandshake size={16} />
            <span>Favorites</span>
          </span>
        </button>
      </div>
    </div>
  );
}
