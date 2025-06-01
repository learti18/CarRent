import React from "react";

export default function StatCard({
  title,
  value,
  icon,
  color,
  secondaryText,
  secondaryValue,
}) {
  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-sm border-l-4 border-${color}-500`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className={`p-3 bg-${color}-100 rounded-lg`}>{icon}</div>
      </div>
      <div className="mt-3 text-sm">
        <span className={`text-${color}-600`}>{secondaryValue}</span>{" "}
        {secondaryText}
      </div>
    </div>
  );
}
