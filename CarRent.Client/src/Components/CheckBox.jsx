import React from 'react'

export default function CheckBox({id,value,label,amount,name}) {
  return (
    <div className='flex flex-row items-center gap-2'>
        <input name={name} value={value} type='checkbox' id={id} className='w-4 h-4'/>
        <label className='text-base text-gray-700' htmlFor={id}>{label}</label>
        <span className='text-sm text-gray-400'>({amount})</span>
    </div>
  )
}
