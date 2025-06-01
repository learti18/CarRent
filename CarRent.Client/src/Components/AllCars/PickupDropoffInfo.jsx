import React, { useEffect, useCallback, useState, useRef } from "react";
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
  const [effectiveMinDate, setEffectiveMinDate] = useState(() => {
    if (type === "PickUp" && !dateConstraints.minDate) {
      return new Date().toISOString().split("T")[0];
    }
    return dateConstraints.minDate || null;
  });
  
  // Use a ref to track previous form data to avoid unnecessary updates
  const prevFormDataRef = useRef(defaultValues);

  const { control, reset, watch, setValue, getValues } = useForm({
    defaultValues: defaultValues || {
      location: LOCATIONS[0],
      date: new Date().toISOString().split("T")[0],
      time: new Date().getHours() + ":00",
    },
  });

  const formDate = watch("date");
  const formData = watch(); // All form values

  useEffect(() => {
    let newMinDate = null;

    if (dateConstraints.minDate) {
      newMinDate = dateConstraints.minDate;
    } else if (type === "PickUp") {
      newMinDate = new Date().toISOString().split("T")[0];
    }

    if (newMinDate) {
      setEffectiveMinDate(newMinDate);

      const currentDate = new Date(formDate);
      const minDate = new Date(newMinDate);

      if (currentDate < minDate) {
        setValue("date", newMinDate);
      }
    }
  }, [dateConstraints.minDate, type, formDate, setValue]);

  // Reset when defaultValues change
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);

      if (dateConstraints.minDate) {
        const defaultDate = new Date(defaultValues.date);
        const minDate = new Date(dateConstraints.minDate);

        if (defaultDate < minDate) {
          setValue("date", dateConstraints.minDate);
        }
      }
    }
  }, [defaultValues, reset, dateConstraints.minDate, setValue]);

  const handleDataChange = useCallback(
    (data) => {
      if (!onDataChange) return;

      if (dateConstraints.minDate) {
        const selectedDate = new Date(data.date);
        const minDate = new Date(dateConstraints.minDate);

        if (selectedDate < minDate) return;
      }

      // Check if data has changed before notifying
      const prevData = prevFormDataRef.current;
      if (
        prevData?.date === data.date &&
        prevData?.time === data.time &&
        JSON.stringify(prevData?.location) === JSON.stringify(data.location)
      ) {
        return; // Skip notification if data hasn't changed
      }
      
      // Update the reference
      prevFormDataRef.current = {...data};
      
      // Notify parent
      onDataChange(data);
    },
    [onDataChange, dateConstraints.minDate]
  );

  const handleDateChange = (date) => {
    if (type === "PickUp") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (date < today) return false;
    }

    if (dateConstraints.minDate) {
      const selectedDate = new Date(date);
      const minDate = new Date(dateConstraints.minDate);

      if (selectedDate < minDate) return false;
    }

    return true;
  };

  // Debounce data changes to avoid rapid updates
  useEffect(() => {
    // Skip initial render
    if (!prevFormDataRef.current) {
      prevFormDataRef.current = formData;
      return;
    }
    
    // Compare current form data with previous
    const prevData = prevFormDataRef.current;
    const dataChanged = 
      prevData?.date !== formData.date ||
      prevData?.time !== formData.time ||
      JSON.stringify(prevData?.location) !== JSON.stringify(formData.location);
      
    if (dataChanged) {
      // Use a timeout to debounce frequent changes
      const timer = setTimeout(() => {
        handleDataChange(formData);
      }, 300); // 300ms debounce
      
      return () => clearTimeout(timer);
    }
  }, [formData, handleDataChange]);

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
