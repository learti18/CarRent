import { ArrowUpDown, SlidersHorizontal } from 'lucide-react'
import React from 'react'

export default function FilterSortBar({toggleExpanded}) {
  return (
    <div className='flex flex-row gap-5 mb-6 w-full'>
        <button 
          onClick={toggleExpanded}
          className='md:hidden flex flex-row justify-between items-center bg-blue-500 
                  text-white shadow-md w-1/2 text-left px-4 py-2 rounded-md 
                  hover:text-black hover:bg-white transition-colors duration-300'>
            Filter
            <SlidersHorizontal size={20}/>
        </button>
        <button 
            className='flex flex-row justify-between items-center bg-white shadow-md 
                    hover:bg-blue-500 hover:text-white transition-colors duration-300
                      w-1/2 md:w-52 gap-16 text-left px-4 py-2 rounded-md'>
            Sort
          <ArrowUpDown size={20}/>
        </button>
    </div>
  )
}
