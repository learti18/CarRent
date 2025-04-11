import React, { useEffect, useCallback, useState } from "react";
import { LOCATIONS } from "../../common/constants";
import DropDown from "../Inputs/Dropdown";
import DatePickerInput from "../Inputs/DatePickerInput";
import TimePickerInput from "../Inputs/TimePickerInput";
import { useForm } from "react-hook-form";

export default function PickupDropoffInfo({
  type,
  defaultValues,
  onDataChange,
  dateConstraints = {},
}) {
  // Track the effective min date
  const [effectiveMinDate, setEffectiveMinDate] = useState(() => {
    if (type === "PickUp" && !dateConstraints.minDate) {
      return new Date().toISOString().split("T")[0];
    }
    return dateConstraints.minDate || null;
  });

  const { control, reset, watch, setValue } = useForm({
    defaultValues: defaultValues || {
      location: LOCATIONS[0],
      date: new Date().toISOString().split("T")[0],
      time: new Date().getHours() + ":00",
    },
  });

  const formDate = watch("date");
  const formData = watch(); // All form values

  // Update min date when constraints change
  useEffect(() => {
    let newMinDate = null;

    if (dateConstraints.minDate) {
      newMinDate = dateConstraints.minDate;
    } else if (type === "PickUp") {
      newMinDate = new Date().toISOString().split("T")[0];
    }

    if (newMinDate) {
      setEffectiveMinDate(newMinDate);

      // Validate current date against new constraint
      const currentDate = new Date(formDate);
      const minDate = new Date(newMinDate);

      if (currentDate < minDate) {
        setValue("date", newMinDate);
      }
    }
  }, [dateConstraints.minDate, type, formDate, setValue]);

  // Reset form when defaultValues change
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);

      // Validate against constraints
      if (dateConstraints.minDate) {
        const defaultDate = new Date(defaultValues.date);
        const minDate = new Date(dateConstraints.minDate);

        if (defaultDate < minDate) {
          setValue("date", dateConstraints.minDate);
        }
      }
    }
  }, [defaultValues, reset, dateConstraints.minDate, setValue]);

  // Handle data changes
  const handleDataChange = useCallback(
    (data) => {
      if (!onDataChange) return;

      // Validate before sending data upstream
      if (dateConstraints.minDate) {
        const selectedDate = new Date(data.date);
        const minDate = new Date(dateConstraints.minDate);

        if (selectedDate < minDate) return;
      }

      onDataChange(data);
    },
    [onDataChange, dateConstraints.minDate]
  );

  // Custom date change validator
  const handleDateChange = (date) => {
    // For pickup: enforce today as minimum
    if (type === "PickUp") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (date < today) return false;
    }

    // For parent constraints (typically dropoff)
    if (dateConstraints.minDate) {
      const selectedDate = new Date(date);
      const minDate = new Date(dateConstraints.minDate);

      if (selectedDate < minDate) return false;
    }

    return true;
  };

  // Notify parent of changes
  useEffect(() => {
    const timer = setTimeout(() => {
      handleDataChange(formData);
    }, 0);

    return () => clearTimeout(timer);
  }, [formData, handleDataChange]);

  // Common props for DropDown component
  const dropdownProps = {
    label: "",
    options: LOCATIONS,
    placeholder: "Select your location",
    control,
    name: "location",
    defaultValue: defaultValues?.location || LOCATIONS[0],
    className: "bg-white w-full",
    variant: "clean",
    popperClassName: "z-50",
    menuPosition: "left",
    containerClassName: "w-full",
  };

  // Common props for DatePickerInput component
  const datePickerProps = {
    label: "",
    name: "date",
    control,
    className: "bg-white py-2 w-full rounded-md focus:outline-none",
    minDate: effectiveMinDate,
    onChange: handleDateChange,
    popperClassName: "z-50",
    popperPlacement: "top-end",
    popperModifiers: [
      {
        name: "offset",
        options: { offset: [5, 10] },
      },
      {
        name: "preventOverflow",
        options: {
          rootBoundary: "viewport",
          tether: false,
          altAxis: true,
        },
      },
      {
        name: "zIndex",
        options: { zIndex: 50 },
      },
    ],
  };

  // Common props for TimePickerInput component
  const timePickerProps = {
    label: "",
    name: "time",
    control,
    className: "bg-white py-2",
    popperClassName: "z-50",
  };

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-white shadow-sm w-full">
      <div className="flex items-center gap-2 mb-4">
        <img
          src={type === "PickUp" ? "markdark.svg" : "marklight.svg"}
          alt=""
          className="w-5 h-5"
        />
        <h2 className="text-xl sm:text-xl font-medium">{type}</h2>
      </div>

      {/* Mobile design - stacked */}
      <div className="flex flex-col gap-3 sm:hidden p-3">
        <div className="w-full">
          <h2 className="flex flex-start font-medium mb-2 mt-3 text-lg">
            Locations
          </h2>
          <DropDown {...dropdownProps} />
        </div>
        <div className="w-full">
          <h2 className="flex flex-start font-medium mb-2 mt-3 text-lg">
            Date
          </h2>
          <DatePickerInput {...datePickerProps} />
        </div>
        <div className="w-full">
          <h2 className="flex flex-start font-medium mb-2 mt-3 text-lg">
            Time
          </h2>
          <TimePickerInput {...timePickerProps} />
        </div>
      </div>

      {/* Tablet/Desktop design - side by side */}
      <div className="hidden sm:grid sm:grid-cols-3 sm:gap-3">
        <div className="sm:border-r sm:pr-3">
          <h2 className="text-sm sm:text-base font-medium mb-1.5">Locations</h2>
          <DropDown {...dropdownProps} />
        </div>
        <div className="sm:border-r sm:pr-3">
          <h2 className="text-sm sm:text-base font-medium mb-1.5">Date</h2>
          <DatePickerInput {...datePickerProps} />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-medium mb-1.5">Time</h2>
          <TimePickerInput {...timePickerProps} />
        </div>
      </div>
    </div>
  );
}
