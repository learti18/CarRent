import React, { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import PickupDropoffInfo from './PickUpDropOffInfo'

export default function LocationSelector() {
    const [isSwitched,setIsSwitched] = useState(false)
    function toggleSwitch(){
        setIsSwitched(prevState => !prevState)
    }

    return (
    <div className="pb-10 w-full">
        <div className='flex flex-col  md:flex-row relative items-center md:items-start gap-4 md:gap-10'>
            <PickupDropoffInfo type={isSwitched ? "PickUp":"Drop-Off"}/>
            <button 
                onClick={toggleSwitch}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 flex items-center 
                justify-center bg-blue-500 rounded-md shadow-[0_0_15px_rgba(37,99,235,0.5)] 
                hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] hover:bg-blue-600 transition-all z-10"
            >
                <ArrowUpDown color="#fff" size={26}/>
            </button>
            <PickupDropoffInfo type={isSwitched ? "Drop-Off":"PickUp"}/>
        </div>
    </div>
    )
}
