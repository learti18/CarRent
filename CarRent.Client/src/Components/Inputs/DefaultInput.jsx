import React from 'react'

export default function DefaultInput({
  id,
  label,
  className ='',
  register,
  placeholder,
  name,
  icon,
  error,
  type = 'text'
}) {
  return (
    <div className='flex flex-col relative gap-3 w-full'>
        <label htmlFor={id} className='font-medium'>
          {label} {/*required && <span className='text-red-500'>*</span> }*/}</label>
          <div className='relative'>
            {icon && (
              <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                {icon}
              </div>
            )}
            
            <input 
              type={type}
              placeholder={placeholder}
              className={`w-full px-6 py-3 bg-gray-100 rounded-lg border-none 
                focus:ring-2 focus:ring-gray-500 placeholder-slate-400
                ${icon ? 'pl-10' : ''} 
                ${error ? 'ring-2 ring-red-500' : ''}
                ${className}`}
                {...register(name)}
                
            />
          </div>
          {error && <span className='text-sm text-red-500'>{error.message}</span> }
    </div>
  )
}
