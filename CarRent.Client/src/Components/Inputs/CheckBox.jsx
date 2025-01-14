import React from 'react';

export default function CheckBox({ id, value, label, amount, name}) {
  return (
    <div className="flex flex-row items-center gap-2">
      <input
        name={name}
        value={value}
        type="checkbox"
        id={id}
        className="w-5 h-5 border-gray-300 text-blue-500 cursor-pointer transition-all appearance-none rounded-md shadow hover:shadow-md checked:bg-blue-500 outline-none focus:ring-offset-0 focus:ring-0 checked:ring-0"
      />
      <label className="text-base text-gray-700 cursor-pointer" htmlFor={id}>
        {label}
      </label>
      {
        amount && <span className="text-sm text-gray-400">({amount})</span>
      }
    </div>
  );
}
