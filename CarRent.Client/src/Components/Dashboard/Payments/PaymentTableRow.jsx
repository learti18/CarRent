import React from "react";
import { DollarSign, RefreshCw, CreditCard } from "lucide-react";

export default function PaymentTableRow({ payment }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4">{payment.id}</td>
      <td className="py-3 px-4">
        {payment.customer || `Customer #${payment.customerId}`}
      </td>
      <td className="py-3 px-4">{formatCurrency(payment.amount)}</td>
      <td className="py-3 px-4">{formatDate(payment.date)}</td>
      <td className="py-3 px-4">
        <span className="flex items-center gap-1">
          {payment.method === "Credit Card" ? (
            <CreditCard size={16} className="text-blue-500" />
          ) : (
            <DollarSign size={16} className="text-green-500" />
          )}
          {payment.method}
        </span>
      </td>
      <td className="py-3 px-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            payment.status === "Completed"
              ? "bg-green-100 text-green-800"
              : payment.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {payment.status}
        </span>
      </td>
      <td className="py-3 px-4">
        <div className="flex gap-2">
          <button className="p-1 hover:bg-blue-50 rounded" title="Process">
            <RefreshCw size={18} className="text-blue-500" />
          </button>
          <button className="p-1 hover:bg-blue-50 rounded" title="View Details">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
