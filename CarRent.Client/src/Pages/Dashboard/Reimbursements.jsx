import React, { useState } from "react";
import { Search, Filter, DollarSign, CreditCard } from "lucide-react";
import Table from "../../Components/Dashboard/Common/Table";
import { useFetchAllPayments } from "../../Queries/payments/useFetchAllPayments";

export default function Reimbursements() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: payments, isLoading, error } = useFetchAllPayments();

  const columns = [
    { key: "id", label: "Payment ID" },
    { key: "cardHolder", label: "Card Holder" },
    { key: "amount", label: "Amount" },
    { key: "paidAt", label: "Payment Date" },
    { key: "userId", label: "User ID" },
  ];

  const filteredPayments =
    payments?.filter(
      (payment) =>
        payment.id.toString().includes(searchQuery.toLowerCase()) ||
        payment.cardHolder.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.userId.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const totalPayments = payments?.length || 0;
  const completedPayments =
    payments?.filter((p) => p.status === "Completed").length || 0;
  const pendingPayments =
    payments?.filter((p) => p.status === "Pending").length || 0;

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading payments: {error.message}
      </div>
    );
  }

  // Format date to a readable string
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Reimbursements</h1>
          <p className="text-gray-500">Manage all payment transactions</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500">Total Transactions</p>
          <p className="text-2xl font-semibold">{payments?.length || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500">Total Amount</p>
          <p className="text-2xl font-semibold">
            {formatCurrency(
              payments?.reduce((sum, p) => sum + p.amount, 0) || 0
            )}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500">Last Payment</p>
          <p className="text-2xl font-semibold">
            {payments && payments.length > 0
              ? formatDate(
                  payments.reduce((latest, p) =>
                    new Date(p.paidAt) > new Date(latest.paidAt) ? p : latest
                  ).paidAt
                )
              : "N/A"}
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
            placeholder="Search by ID, card holder or user ID..."
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

      {/* Payments Table */}
      {isLoading ? (
        <div className="text-center py-8">Loading payments...</div>
      ) : (
        <Table columns={columns}>
          {filteredPayments.map((payment) => (
            <tr key={payment.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">{payment.id}</td>
              <td className="py-3 px-4">
                <span className="font-medium">{payment.cardHolder}</span>
              </td>
              <td className="py-3 px-4">{formatCurrency(payment.amount)}</td>
              <td className="py-3 px-4">{formatDate(payment.paidAt)}</td>
              <td className="py-3 px-4">
                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                  {payment.userId.substring(0, 8)}...
                </span>
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
}
