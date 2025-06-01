// Process rentals data for charts
export const processRentalsData = (rentals, vehicles) => {
  if (!rentals || !vehicles) {
    return {
      revenueData: [],
      rentalTrend: [],
      vehicleDistribution: [],
      revenueChartData: { labels: [], datasets: [] },
      rentalTrendData: { labels: [], datasets: [] },
      vehicleDistributionData: { labels: [], datasets: [] }
    };
  }
  
  // Monthly revenue data
  const monthlyRevenue = Array(12).fill(0);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  rentals.forEach((rental) => {
    const date = new Date(rental.pickup?.date);
    const month = date.getMonth();
    monthlyRevenue[month] += rental.amount;
  });

  // Weekly rental count
  const weeklyRentals = Array(7).fill(0);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  rentals.forEach((rental) => {
    const date = new Date(rental.pickup?.date);
    const day = date.getDay();
    weeklyRentals[day]++;
  });

  // Vehicle type distribution
  const typeCount = {};

  vehicles.forEach((vehicle) => {
    const type = vehicle.bodyType || "Other";
    typeCount[type] = (typeCount[type] || 0) + 1;
  });

  const vehicleDistribution = Object.entries(typeCount);

  // Create chart data objects
  const revenueChartData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Revenue",
        data: monthlyRevenue,
        fill: false,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const rentalTrendData = {
    labels: weekdays,
    datasets: [
      {
        label: "Rentals per day of week",
        data: weeklyRentals,
        backgroundColor: "rgba(99, 102, 241, 0.6)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 1,
      },
    ],
  };

  const vehicleDistributionData = {
    labels: vehicleDistribution.map(([type]) => type),
    datasets: [
      {
        data: vehicleDistribution.map(([, count]) => count),
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(239, 68, 68, 0.7)",
          "rgba(139, 92, 246, 0.7)",
          "rgba(14, 165, 233, 0.7)",
          "rgba(249, 115, 22, 0.7)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(14, 165, 233, 1)",
          "rgba(249, 115, 22, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return {
    monthlyRevenue,
    weeklyRentals, 
    vehicleDistribution,
    revenueChartData,
    rentalTrendData,
    vehicleDistributionData
  };
};

// Calculate dashboard statistics
export const calculateDashboardStats = (rentals, vehicles) => {
  if (!rentals || !vehicles) {
    return {
      activeRentals: 0,
      completedRentals: 0,
      pendingRentals: 0,
      totalRentals: 0,
      availableVehicles: 0,
      bookedVehicles: 0,
      totalVehicles: 0,
      totalRevenue: 0,
      averageRentalDuration: 0
    };
  }

  const activeRentals = rentals.filter((rental) => rental.status === "Active").length || 0;
  const completedRentals = rentals.filter((rental) => rental.status === "Completed").length || 0;
  const pendingRentals = rentals.filter((rental) => rental.status === "Pending").length || 0;
  const totalRentals = rentals.length || 0;

  const availableVehicles = vehicles.filter((v) => !v.isBooked).length || 0;
  const bookedVehicles = vehicles.filter((v) => v.isBooked).length || 0;
  const totalVehicles = vehicles.length || 0;

  const totalRevenue = rentals.reduce((acc, rental) => acc + rental.amount, 0) || 0;
  
  const averageRentalDuration =
    rentals.length > 0
      ? rentals.reduce((acc, rental) => {
          const pickup = new Date(rental.pickup?.date);
          const dropOff = new Date(rental.dropOff?.date);
          const days = Math.ceil((dropOff - pickup) / (1000 * 60 * 60 * 24));
          return acc + days;
        }, 0) / rentals.length
      : 0;

  return {
    activeRentals,
    completedRentals,
    pendingRentals,
    totalRentals,
    availableVehicles,
    bookedVehicles,
    totalVehicles,
    totalRevenue,
    averageRentalDuration
  };
};
