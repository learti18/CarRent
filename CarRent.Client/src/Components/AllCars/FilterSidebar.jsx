import React from 'react'
import CheckBox from '../CheckBox'

export default function FilterSidebar() {
  return (
    <div className='flex flex-col gap-14 pt-24 hidden w-1/4 pl-8  md:flex min-h-screen bg-white'>
        <div className='space-y-4'>
            <p className='text-sm text-gray-400 mb-3'>TYPE</p>
            <CheckBox
                id="sport"
                value="sport"
                label="Sport"
                amount={10}
            />
            <CheckBox
                id="suv"
                value="suv"
                label="SUV"
                amount={12}
            />
            <CheckBox
                id="mpv"
                value="mpv"
                label="MPV"
                amount={16}
            />
            <CheckBox
                id="sedan"
                value="sedan"
                label="Sedan"
                amount={20}
            />
            <CheckBox
                id="coupe"
                value="coupe"
                label="Coupe"
                amount={14}
            />
            <CheckBox
                id="hatchback"
                value="hatchback"
                label="Hatchback"
                amount={15}
            />
        </div>
        <div className=' space-y-4'>
            <p className='text-sm text-gray-400 mb-3'>CAPACITY</p>
            <CheckBox
                    id="2person"
                    value="2person"
                    label="2 Person"
                    amount={10}
                    name="capacity"
            />
            <CheckBox
                id="4person"
                value="4person"
                label="4 Person"
                amount={20}
                name="capacity"
            />
            <CheckBox
                id="6person"
                value="6person"
                label="6 Person"
                amount={20}
                name="capacity"
            />
            <CheckBox
                id="8person"
                value="8person"
                label="8 or More"
                amount={20}
                name="capacity"
            />
        </div>
        <div className='text-sm text-gray-400 mb-3'>
            <p>PRICE</p>

        </div>
    </div>
  )
}
