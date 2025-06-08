import React from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Settings, Plus, Shield } from "lucide-react";
import { IMGURL } from "../../common/constants";

export default function ProfileHeader({ userData }) {
  const navigate = useNavigate();
  const { profileImageUrl, username, email, phone } = userData || {};

  return (
    <div className="mb-8 bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* User info section with patterns instead of cover photo */}
      <div className="relative">
        {/* Pattern background */}
        <div className="h-32 bg-blue-600 relative overflow-hidden">
          {/* Decorative patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
          </div>

          {/* Membership badge */}
          <div className="absolute top-4 right-5 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 text-white text-xs font-medium flex items-center">
            <Shield size={12} className="mr-1" />
            <span>Member since {new Date().getFullYear()}</span>
          </div>
        </div>

        {/* Profile section with avatar */}
        <div className="px-8 pb-6 relative">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            {/* Avatar with edit button */}
            <div className="relative -mt-12">
              <div className="w-24 h-24 rounded-xl overflow-hidden border-4 border-white shadow-md">
                <img
                  src={
                    profileImageUrl
                      ? `${IMGURL}${profileImageUrl}`
                      : "/user.png"
                  }
                  alt={username || "User"}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-1 right-1 bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-1.5 shadow-sm transition">
                <Settings size={14} />
              </button>
            </div>

            {/* User info */}
            <div className="flex-grow pt-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {username || "User"}
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 mt-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-blue-500" />
                  <span>{email || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-blue-500" />
                  <span>{phone || "Not provided"}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-4 md:mt-0 flex gap-3 ml-auto">
              <button
                onClick={() => navigate("/cars")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
              >
                <Plus size={16} />
                <span>Rent a Car</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
