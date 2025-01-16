import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

export default function DatePickerInput({ label, onChange, value }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <div className="w-full">
      <label className="block font-medium text-black mb-3">{label}</label>
      <div className="relative w-full">
        <DatePicker
          selected={value || selectedDate}
          onChange={handleDateChange}
          className="w-full px-5 py-3 pr-10 border-none cursor-pointer text-slate-400 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholderText="Select your date"
          dateFormat="dd/MM/yyyy"
          shouldCloseOnSelect={true}
          wrapperClassName="w-full"
        />
        <Calendar className="absolute right-6 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 pointer-events-none" />
      </div>
    </div>
  );
}
