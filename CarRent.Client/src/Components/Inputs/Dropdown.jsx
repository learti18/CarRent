import React, { useState, useRef, useEffect } from "react";
import { Controller } from "react-hook-form";
import { ChevronDown } from "lucide-react";

const DropDown = ({
  label,
  options,
  placeholder,
  control,
  name,
  defaultValue,
  className = "",
  variant = "default",
  popperClassName = "",
  menuPosition = "left",
  containerClassName = "",
  error,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Determine classes based on variant
  const getInputClasses = () => {
    const baseClasses = "py-2 w-full rounded-md focus:outline-none";

    if (variant === "clean") {
      return `${baseClasses} ${className}`;
    }

    return `${baseClasses} ${className}`;
  };

  // Determine dropdown menu positioning classes
  const getMenuPositionClasses = () => {
    const baseClasses =
      "absolute z-50 mt-1 bg-white rounded-md shadow-lg overflow-auto min-w-[180px] max-w-[300px] w-full";

    if (menuPosition === "left") {
      return `${baseClasses} left-0`;
    } else if (menuPosition === "right") {
      return `${baseClasses} right-0`;
    }

    return baseClasses;
  };

  return (
    <div className={`relative ${containerClassName}`} ref={dropdownRef}>
      {label && (
        <label className="block mb-2 text-sm font-medium">{label}</label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        render={({ field }) => (
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={getInputClasses()}
            >
              <div className="flex items-center w-full">
                <span className="truncate flex-grow text-left">
                  {field.value || placeholder}
                </span>
                <ChevronDown
                  className={`transition-transform duration-200 flex-shrink-0 ml-4 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  size={18}
                />
              </div>
            </button>

            {isOpen && (
              <div className={`${getMenuPositionClasses()} ${popperClassName}`}>
                <div className="py-1 max-h-60 overflow-y-auto">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                      onClick={() => {
                        field.onChange(option);
                        setIsOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default DropDown;
