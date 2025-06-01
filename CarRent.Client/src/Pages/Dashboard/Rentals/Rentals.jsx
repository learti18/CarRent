import React, { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import RentalTableRow from "../../../Components/Dashboard/Rentals/RentalTableRow";
import RentalDetailsModal from "../../../Components/Dashboard/Rentals/RentalDetailsModal";
import Table from "../../../Components/Dashboard/Common/Table";
import { useAllRentals } from "./../../../Queries/Rentals/useAllRentals";
import { LoaderBarsSpinner } from "../../../Components/LoaderBarsSpinner";

export default function Rentals() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRental, setSelectedRental] = useState(null);

  const columns = [
    { key: "vehicle", label: "Vehicle" },
    { key: "status", label: "Status" },
    { key: "pickup", label: "Start Date" },
    { key: "dropOff", label: "End Date" },
    { key: "amount", label: "Price" },
    { key: "actions", label: "Actions" },
  ];

  const { data: rentals, isLoading } = useAllRentals();

  // Function to handle viewing rental details
  const handleViewDetails = (rental) => {
    setSelectedRental(rental);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedRental(null);
  };

  // Filter rentals based on search query
  const filteredRentals =
    rentals?.filter(
      (rental) =>
        rental.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rental.vehicle?.brand
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        rental.vehicle?.model
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        rental.status?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const activeRentals =
    rentals?.filter((r) => r.status === "Active").length || 0;
  const availableVehicles = 0; // This would need to be fetched from an API
  const totalRevenue =
    rentals?.reduce((sum, rental) => sum + rental.amount, 0) || 0;

  if (isLoading) return <LoaderBarsSpinner />;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Rentals</h1>
          <p className="text-gray-500">
            Manage your vehicle listings and rentals
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500">Active Rentals</p>
          <p className="text-2xl font-semibold">{activeRentals}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500">Available Vehicles</p>
          <p className="text-2xl font-semibold">{availableVehicles}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500">Total Revenue</p>
          <p className="text-2xl font-semibold">${totalRevenue.toFixed(2)}</p>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Rentals Table */}
      <Table columns={columns}>
        {filteredRentals.length === 0 ? (
          <tr className="text-center text-gray-500">
            <td colSpan={columns.length}>No rentals found</td>
          </tr>
        ) : (
          filteredRentals.map((rental) => (
            <RentalTableRow
              key={rental.id}
              rental={rental}
              onViewDetails={handleViewDetails}
            />
          ))
        )}
      </Table>

      {/* Rental Details Modal */}
      {selectedRental && (
        <RentalDetailsModal
          rental={selectedRental}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
