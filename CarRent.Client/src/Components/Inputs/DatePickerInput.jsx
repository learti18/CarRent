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

                  {/* Week days header */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div
                        key={day}
                        className="text-center text-sm font-medium text-gray-400"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: startOfMonth(currentMonth).getDay() }).map((_, index) => (
                      <div key={`empty-${index}`} className="h-8" />
                    ))}
                    {daysInMonth.map((day) => {
                      const isSelected = value && isSameDay(new Date(value), day);
                      const isCurrentMonth = isSameMonth(day, currentMonth);
                      const isCurrentDay = isToday(day);
                      
                      return (
                        <button
                          key={day.toString()}
                          onClick={() => {
                            onChange(day.toISOString());
                            setIsOpen(false);
                          }}
                          disabled={!isCurrentMonth}
                          type="button"
                          className={`h-8 w-8 flex items-center justify-center rounded-full text-sm
                            ${!isCurrentMonth ? 'text-gray-300' : 'hover:bg-gray-100'}
                            ${isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
                            ${isCurrentDay && !isSelected ? 'border border-blue-500' : ''}
                          `}
                        >
                          {format(day, "d")}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        />
        <CalendarIcon className="absolute right-6 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 pointer-events-none" />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
}
