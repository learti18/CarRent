import React from "react";
import { Bar } from "react-chartjs-2";

export default function RentalTrendChart({ data }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Rentals by Day of Week</h2>
      <div className="h-72">
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  precision: 0,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
