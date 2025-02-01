import React from "react";

export default function NumericInput({
  id,
  label,
  className = "",
  register,
  name,
  icon,
  error,
  type = "text",
  allowSymbols = false, // Allows symbols like +, - for phone numbers
  placeholder = "",
}) {
  const handleInput = (e) => {
    const regex = allowSymbols ? /[^0-9+\s-]/g : /[^0-9]/g;
    e.target.value = e.target.value.replace(regex, ""); // Restrict non-numeric input
  };

  return (
    <div className="flex flex-col relative gap-3 w-full">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          id={id}
          type={type} // Keep as "text" to avoid losing leading zeros
          className={`w-full px-6 py-3 bg-gray-100 rounded-lg border-none 
            focus:ring-2 focus:ring-gray-500 placeholder-slate-400
            ${icon ? "pl-10" : ""} 
            ${error ? "ring-2 ring-red-500" : ""}
            ${className}`}
          {...register(name)}
          placeholder={placeholder}
          onInput={handleInput} // Prevents non-numeric input in real-time
        />
      </div>
      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  );
}
