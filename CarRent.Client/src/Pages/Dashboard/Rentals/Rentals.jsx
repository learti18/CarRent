import React from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import RentalTableRow from "../../../Components/Dashboard/Rentals/RentalTableRow";
import Table from "../../../Components/Dashboard/Common/Table";
import { useAllRentals } from "./../../../Queries/Rentals/useAllRentals";
import { LoaderBarsSpinner } from "../../../Components/LoaderBarsSpinner";

export default function Rentals() {
  const columns = [
    { key: "vehicle", label: "Vehicle" },
    { key: "status", label: "Status" },
    { key: "pickup", label: "Start Date" },
    { key: "dropOff", label: "End Date" },
    { key: "amount", label: "Price" },
    { key: "actions", label: "Actions" },
  ];
  const { data: rentals, isLoading } = useAllRentals();
  if (isLoading) return <LoaderBarsSpinner />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Rentals</h1>
          <p className="text-gray-500">
            Manage your vehicle listings and rentals
          </p>
        </div>
        <Link
          to="new"
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <Plus size={20} />
          Add New Rental
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500">Active Rentals</p>
          <p className="text-2xl font-semibold">24</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500">Available Vehicles</p>
          <p className="text-2xl font-semibold">12</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500">Total Revenue</p>
          <p className="text-2xl font-semibold">$12,450</p>
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
            placeholder="Search rentals..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Filter size={20} />
          Filters
        </button>
      </div>

      {/* Rentals Table */}
      <Table columns={columns}>
        {rentals.length === 0 ? (
          <tr className="text-center text-gray-500">
            <td colSpan={columns.length}>No rentals found</td>
          </tr>
        ) : (
          rentals.map((rental) => (
            <RentalTableRow key={rental.id} rental={rental} />
          ))
        )}
      </Table>
    </div>
  );
}
