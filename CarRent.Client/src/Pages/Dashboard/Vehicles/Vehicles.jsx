import React, { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import Table from "../../../Components/Dashboard/Common/Table";
import VehicleTableRow from "../../../Components/Dashboard/Vehicles/VehicleTableRow";
import { useAllVehicles, useDeleteVehicle } from "../../../Queries/vehicles";

export default function Vehicles() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: vehicles, isLoading, error } = useAllVehicles();
  const { mutate: deleteVehicle, isLoading: isDeleting } = useDeleteVehicle();

  const columns = [
    { key: "vehicle", label: "Vehicle" },
    { key: "type", label: "Body Type" },
    { key: "capacity", label: "Capacity" },
    { key: "transmission", label: "Transmission" },
    { key: "pricePerDay", label: "Price/Day" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const handleDelete = (id) => {
    try {
      deleteVehicle(id);
    } catch (error) {
      console.error("Failed to delete vehicle", error);
    }
  };

  const filteredVehicles =
    vehicles?.filter(
      (vehicle) =>
        vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const availableVehicles = vehicles?.filter((v) => !v.isBooked)?.length || 0;
  const totalVehicles = vehicles?.length || 0;

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading vehicles: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Vehicles</h1>
          <p className="text-gray-500">Manage your vehicle fleet</p>
        </div>
        <Link
          to="new"
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <Plus size={20} />
          Add New Vehicle
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500">Total Vehicles</p>
          <p className="text-2xl font-semibold">{totalVehicles}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500">Available</p>
          <p className="text-2xl font-semibold">{availableVehicles}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500">Booked</p>
          <p className="text-2xl font-semibold">
            {totalVehicles - availableVehicles}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search vehicles..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Filter size={20} />
          Filters
        </button>
      </div>

      {/* Vehicles Table */}
      {isLoading ? (
        <div className="text-center py-8">Loading vehicles...</div>
      ) : (
        <Table columns={columns}>
          {filteredVehicles.map((vehicle) => (
            <VehicleTableRow
              key={vehicle.id}
              vehicle={vehicle}
              onDelete={() => handleDelete(vehicle.id)}
            />
          ))}
        </Table>
      )}
    </div>
  );
}
