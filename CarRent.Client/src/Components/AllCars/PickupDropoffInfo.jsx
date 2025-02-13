import React from 'react'
import { LOCATIONS } from '../../common/constants'

export default function PickupDropoffInfo({type}) {
  return (
    <div className='p-5 rounded-xl bg-white'>
        <div className='flex gap-2 mb-2'>
            <img src={type === "PickUp" ? 'markdark.svg':'marklight.svg'} alt="" />
            <h2 className='text-lg'>
                {type}
            </h2>
        </div>
        <div className='flex flex-row justify-between'>
            <div className='border-r-2 mr-3'>
                <h2 className='text-lg font-medium'>Locations</h2>
                <label htmlFor="underline_select" className="sr-only">Underline select</label>
                <select className="w-full text-sm text-gray-400 pl-0 border-none focus:ring-0">
                    {
                        LOCATIONS.map(location => (
                            <option>{location}</option>
                        ))
                    }
                </select>
            </div>
            <div className='border-r-2 mr-3'>
                <h2 className='text-lg font-medium'>Date</h2>
                <label htmlFor="underline_select" className="sr-only">Underline select</label>
                <select className="w-full text-sm text-gray-400 pl-0 border-none focus:ring-0">
                    <option>Select your date</option>
                    <option>Jan 1, 2025</option>
                    <option>Jan 2, 2025</option>
                </select>
            </div>
            <div>
                <h2 className='text-lg font-medium'>Time</h2>
                <label htmlFor="underline_select" className="sr-only">Underline select</label>
                <select className="w-full text-sm text-gray-400 pl-0 border-none focus:ring-0">
                    <option>Select your time</option>
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                </select>
            </div>
        </div>
    </div>
  )
}
