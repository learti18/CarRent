import React from 'react';

export default function RadioGroup({ id, label, name, onChange, value }) {
  return (
    <div className="flex flex-col gap-3">
        <div key={id} className="flex flex-row items-center gap-2">
          <input
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={value === value}
            onChange={onChange}
            className="w-5 h-5 border-gray-300 text-blue-500 cursor-pointer transition-all appearance-none rounded-full shadow hover:shadow-md checked:bg-blue-500 outline-none focus:ring-offset-0 focus:ring-0 checked:ring-0"
          />
          <label className="text-base text-gray-700 cursor-pointer" htmlFor={id}>
            {label}
          </label>

        </div>
    </div>
  );
}
