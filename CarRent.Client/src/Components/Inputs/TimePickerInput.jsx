import React, { useState } from "react";
import { Clock } from "lucide-react";
import { Controller } from "react-hook-form";
import { format } from "date-fns";

export default function TimePickerInput({ label, name, control, error, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("AM");

  const commonTimeSlots = [
    "12:00", "12:30", "1:00", "1:30", "2:00", "2:30",
    "3:00", "3:30", "4:00", "4:30", "5:00", "5:30",
    "6:00", "6:30", "7:00", "7:30", "8:00", "8:30",
    "9:00", "9:30", "10:00", "10:30", "11:00", "11:30"
  ];

  const formatTimeDisplay = (value) => {
    if (!value) return "";
    const [hours, minutes] = value.split(":");
    const hour = parseInt(hours);
    return format(new Date().setHours(hour, parseInt(minutes)), "HH:mm");
  };

  const handleTimeSelect = (time, period, onChange) => {
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours);
    
    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }
    
    const formattedTime = `${hour.toString().padStart(2, "0")}:${minutes}`;
    onChange(formattedTime);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <label className="block font-medium text-black mb-3">{label}</label>
      <div className="relative w-full">
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <div
                className={`w-full px-5 py-3 pr-10 border-none cursor-pointer ${value ? 'text-black' : 'text-slate-400'} ${className || 'bg-gray-100'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                  error ? 'border-2 border-red-500' : ''
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                {value ? formatTimeDisplay(value) : "Select time"}
              </div>
              {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:relative md:inset-auto md:bg-transparent">
                  <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl p-4 md:absolute md:bottom-auto md:top-2 md:w-72 md:rounded-xl md:shadow-xl md:border md:border-gray-200">
                    {/* AM/PM Toggle */}
                    <div className="flex justify-center mb-4 bg-gray-100 p-1 rounded-lg">
                      {["AM", "PM"].map((period) => (
                        <button
                          key={period}
                          type="button"
                          onClick={() => setSelectedPeriod(period)}
                          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors
                            ${selectedPeriod === period
                              ? "bg-white text-blue-600 shadow-sm"
                              : "text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>

                    {/* Time Grid */}
                    <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
                      {commonTimeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => handleTimeSelect(time, selectedPeriod, onChange)}
                          className="p-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {time}
                        </button>
                      ))}
                    </div>

                    {/* Mobile Close Button */}
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="mt-4 w-full py-3 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 md:hidden"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        />
        <Clock className="absolute right-6 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 pointer-events-none" />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
}
