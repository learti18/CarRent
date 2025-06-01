import React, { useEffect } from "react";
import { useAllRentals } from "../../Queries/Rentals/useAllRentals";
import { useAllVehicles } from "../../Queries/vehicles/useAllVehicles";
import { Car, CreditCard, Clock, Calendar } from "lucide-react";
import { LoaderBarsSpinner } from "../../Components/LoaderBarsSpinner";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import StatCard from "../../Components/Dashboard/Stats/StatCard";
import RevenueChart from "../../Components/Dashboard/Charts/RevenueChart";
import RentalTrendChart from "../../Components/Dashboard/Charts/RentalTrendChart";
import VehicleDistributionChart from "../../Components/Dashboard/Charts/VehicleDistributionChart";
import RentalStatusBreakdown from "../../Components/Dashboard/Stats/RentalStatusBreakdown";
import RecentRentals from "../../Components/Dashboard/Rentals/RecentRentals";
import {
  processRentalsData,
  calculateDashboardStats,
} from "../../Utils/DashboardUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const { data: rentals, isLoading: rentalsLoading } = useAllRentals();
  const { data: vehicles, isLoading: vehiclesLoading } = useAllVehicles();

  const isLoading = rentalsLoading || vehiclesLoading;

  const {
    activeRentals,
    completedRentals,
    pendingRentals,
    totalRentals,
    availableVehicles,
    bookedVehicles,
    totalVehicles,
    totalRevenue,
    averageRentalDuration,
  } = calculateDashboardStats(rentals, vehicles);

  const {
    revenueChartData,
    rentalTrendData,
    vehicleDistribution,
    vehicleDistributionData,
  } = processRentalsData(rentals, vehicles);
  if (isLoading) {
    return <LoaderBarsSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-gray-500">
          Overview of your rental business performance
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Rentals"
          value={activeRentals}
          icon={<Calendar className="text-blue-600 w-6 h-6" />}
          color="blue"
          secondaryValue={`${(
            (activeRentals / totalRentals) * 100 || 0
          ).toFixed(1)}%`}
          secondaryText="of total rentals"
        />

        <StatCard
          title="Available Vehicles"
          value={availableVehicles}
          icon={<Car className="text-green-600 w-6 h-6" />}
          color="green"
          secondaryValue={`${(
            (availableVehicles / totalVehicles) * 100 || 0
          ).toFixed(1)}%`}
          secondaryText="of fleet available"
        />

        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={<CreditCard className="text-amber-600 w-6 h-6" />}
          color="amber"
          secondaryValue={`$${(totalRevenue / (totalRentals || 1)).toFixed(2)}`}
          secondaryText="avg. per rental"
        />

        <StatCard
          title="Avg. Rental Duration"
          value={`${averageRentalDuration.toFixed(1)} days`}
          icon={<Clock className="text-purple-600 w-6 h-6" />}
          color="purple"
          secondaryValue={totalRentals}
          secondaryText="total rentals"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueChartData} />
        <RentalTrendChart data={rentalTrendData} />
      </div>

      {/* Additional metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <VehicleDistributionChart
          data={vehicleDistributionData}
          distribution={vehicleDistribution}
        />

        <RentalStatusBreakdown
          activeRentals={activeRentals}
          pendingRentals={pendingRentals}
          completedRentals={completedRentals}
          totalRentals={totalRentals}
        />

        <RecentRentals rentals={rentals} />
      </div>
    </div>
  );
}
