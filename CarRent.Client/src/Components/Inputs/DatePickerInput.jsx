import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Controller } from "react-hook-form";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns";

export default function DatePickerInput({ label, name, control, error, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const formatSelectedDate = (date) => {
    if (!date) return "";
    return format(new Date(date), "dd/MM/yyyy");
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
                {value ? formatSelectedDate(value) : "Select date"}
              </div>
              {isOpen && (
                <div className="absolute z-50 mt-2 p-4 bg-white rounded-lg shadow-xl border border-gray-200 w-[300px]">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={prevMonth}
                      className="p-1 hover:bg-gray-100 rounded-full"
                      type="button"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <h2 className="font-semibold text-gray-900">
                      {format(currentMonth, "MMMM yyyy")}
                    </h2>
                    <button
                      onClick={nextMonth}
                      className="p-1 hover:bg-gray-100 rounded-full"
                      type="button"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div
                        key={day}
                        className="text-center text-sm font-medium text-gray-500"
                      >
                        {day}
                      </div>
                    ))}
                    {daysInMonth.map((day, idx) => (
                      <button
                        key={day.toString()}
                        type="button"
                        onClick={() => {
                          // Format the date before setting it in the form
                          const formattedDate = format(day, "yyyy-MM-dd");
                          onChange(formattedDate);
                          setIsOpen(false);
                        }}
                        className={`text-sm p-2 rounded-full hover:bg-gray-100 ${
                          value && isSameDay(new Date(value), day)
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : ""
                        } ${
                          !isSameMonth(day, currentMonth)
                            ? "text-gray-300"
                            : "text-gray-900"
                        }`}
                      >
                        {format(day, "d")}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        />
        <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none h-5 w-5" />
      </div>
      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  );
}
