import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function VehicleDistributionChart({ data, distribution }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Vehicle Types</h2>
      <div className="h-64 flex items-center justify-center">
        {distribution.length > 0 ? (
          <Doughnut
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        ) : (
          <p className="text-gray-400">No vehicle data available</p>
        )}
      </div>
    </div>
  );
}
