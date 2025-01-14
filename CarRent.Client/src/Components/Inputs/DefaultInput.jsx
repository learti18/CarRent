import React from 'react'

export default function DefaultInput({id,label,name,placeholder,type}) {
  return (
    <div className='flex flex-col gap-3 w-full'>
        <label htmlFor="id" className=''>{label}</label>
        <input 
            className='px-6 py-3 bg-gray-100 rounded-lg border-none 
                placeholder-slate-400 focus:outline-black focus:border-black'
            placeholder={placeholder}
            type={type}
            id={id}/>
    </div>
  )
}
