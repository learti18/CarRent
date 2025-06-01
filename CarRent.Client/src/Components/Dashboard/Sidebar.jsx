import React, { useState } from "react";
import {
  LayoutDashboard,
  Car,
  Calendar,
  Receipt,
  UserCircle,
  ChevronLeft,
  KeyRound,
  Star,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useLogout from "./../../Queries/useLogout";

export default function Sidebar() {
  const [isToggledSidebar, setIsToggledSidebar] = useState(true);
  const location = useLocation();
  const logoutMutation = useLogout();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleSidebar = () => setIsToggledSidebar((prevState) => !prevState);

  function handleLogout() {
    logoutMutation.mutateAsync();
  }

  const links = [
    {
      name: "Dashboard",
      to: "/dashboard",
      icon: <LayoutDashboard size={22} />,
    },
    { name: "Vehicles", to: "/dashboard/vehicles", icon: <Car size={22} /> },
    { name: "Rentals", to: "/dashboard/rentals", icon: <KeyRound size={22} /> },
    { name: "Reviews", to: "/dashboard/reviews", icon: <Star size={22} /> },
    ,
    {
      name: "Payments",
      to: "/dashboard/reimbursements",
      icon: <Receipt size={20} />,
    },
    // {
    //   name: "Accounts",
    //   to: "/dashboard/accounts",
    //   icon: <UserCircle size={22} />,
    // },
  ];

  return (
    <div
      className={`bg-white min-h-screen h-full transition-all duration-500 shadow-lg border-r ${
        isToggledSidebar ? "w-64" : "w-20"
      }`}
    >
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <button
            onClick={toggleSidebar}
            className="flex ml-auto text-gray-400 hover:text-blue-500 transition-colors"
          >
            <div
              className={`transform transition-transform duration-500 ${
                isToggledSidebar ? "rotate-0" : "rotate-180"
              }`}
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </div>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2 p-3 flex-grow">
          {/* Main Navigation */}
          <div className="space-y-1">
            {links.slice(0, 4).map((link) => (
              <Link
                key={link.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg duration-200 transition-all
                                ${
                                  isActive(link.to)
                                    ? "bg-blue-500 text-white font-medium"
                                    : "text-gray-500 hover:bg-blue-50 hover:text-gray-700"
                                } 
                                ${isToggledSidebar ? "" : "justify-center"}`}
                to={link.to}
              >
                <span className="flex-shrink-0">{link.icon}</span>
                {isToggledSidebar && (
                  <span className="truncate">{link.name}</span>
                )}
              </Link>
            ))}
          </div>

          {/* Settings Group - with separator */}
          <div className="mt-8 pt-4 border-t space-y-1">
            {links.slice(4).map((link) => (
              <Link
                key={link.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg duration-100 transition-colors
                                ${
                                  isActive(link.to)
                                    ? "bg-blue-500 text-white font-medium"
                                    : "text-gray-500 hover:bg-blue-50 hover:text-gray-700"
                                } 
                                ${isToggledSidebar ? "" : "justify-center"}`}
                to={link.to}
              >
                <span className="flex-shrink-0">{link.icon}</span>
                {isToggledSidebar && (
                  <span className="truncate">{link.name}</span>
                )}
              </Link>
            ))}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg duration-100 transition-colors
                          w-full text-left text-red-500 hover:bg-red-50 
                          ${isToggledSidebar ? "" : "justify-center"}`}
            >
              <span className="flex-shrink-0">
                <LogOut size={22} />
              </span>
              {isToggledSidebar && (
                <span className="truncate font-medium">Logout</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
