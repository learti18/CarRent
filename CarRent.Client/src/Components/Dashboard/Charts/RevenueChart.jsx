import React from "react";
import { Line } from "react-chartjs-2";

export default function RevenueChart({ data }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
      <div className="h-72">
        <Line
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
                  callback: (value) => `$${value}`,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
