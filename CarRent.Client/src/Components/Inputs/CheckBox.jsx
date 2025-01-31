import React from 'react';

export default function CheckBox({ id,label, amount, name,register}) {
  return (
    <div className="flex flex-row items-center gap-2">
      <input
        id={id}
        name={name}
        type="checkbox"
        value={id}
        {...register(name)}
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
