import React from 'react'

export default function DefaultInput({
  id,
  label,
  required,
  error,
  className ='',
  ...props
}) {
  return (
    <div className='flex flex-col gap-3 w-full'>
        <label htmlFor={id} className=''>
          {label} {required && <span className='text-red-500'>*</span> }</label>
        <input 
            className={`px-6 py-3 bg-gray-100 rounded-lg border-none focus:ring-2 focus:ring-gray-500
                placeholder-slate-40 focus:border-black
                  ${error ? 'ring-2 ring-red-500':''}
                  ${className}`}
                {...props}
          />
          {error && <span className='text-sm text-red-500'>{error}</span> }
    </div>
  )
}
