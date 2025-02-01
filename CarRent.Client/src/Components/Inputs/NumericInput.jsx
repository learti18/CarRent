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
  allowSymbols = false,
  placeholder = "",
  maxLength
}) {
  const handleInput = (e) => {
    const input = e.target;
    const oldValue = input.value;
    const selectionStart = input.selectionStart;
    let value = input.value;

    // Remove non-digits first
    const digits = value.replace(/\D/g, '');

    // Format based on input name
    if (name === 'cardNumber') {
      // Format card number with spaces
      const parts = digits.slice(0, 16).match(/.{1,4}/g) || [];
      value = parts.join(' ');
      
      // Handle cursor position
      const newLength = value.length;
      const oldLength = oldValue.length;
      
      if (newLength > oldLength) {
        // If adding digits, move cursor to end
        setTimeout(() => input.setSelectionRange(newLength, newLength), 0);
      } else if (newLength < oldLength) {
        // If removing digits, keep cursor position
        const cursorPos = Math.max(0, selectionStart - 1);
        setTimeout(() => input.setSelectionRange(cursorPos, cursorPos), 0);
      }
    } else if (name === 'expiration') {
      // Format expiration date (MM/YY)
      const month = digits.slice(0, 2);
      const year = digits.slice(2, 4);
      value = month + (year ? '/' + year : '');
    } else {
      // For other numeric inputs
      const regex = allowSymbols ? /[^0-9+\s-]/g : /[^0-9]/g;
      value = digits.replace(regex, '');
    }

    input.value = value;
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
          maxLength={maxLength}
          type={type}
          className={`w-full px-6 py-3 bg-gray-100 rounded-lg border-none 
            focus:ring-2 focus:ring-gray-500 placeholder-slate-400
            ${icon ? "pl-10" : ""} 
            ${error ? "ring-2 ring-red-500" : ""}
            ${className}`}
          {...register(name)}
          placeholder={placeholder}
          onInput={handleInput}
          inputMode="numeric"
          autoComplete={name === 'cardNumber' ? 'cc-number' : name === 'expiration' ? 'cc-exp' : 'off'}
        />
      </div>
      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  );
}
