import React, { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import PickupDropoffInfo from './PickUpDropOffInfo'
import { motion, AnimatePresence } from 'framer-motion'

export default function LocationSelector() {
    const [isSwitched,setIsSwitched] = useState(false)
    function toggleSwitch(){
        setIsSwitched(prevState => !prevState)
    }

    return (
    <div className="pb-10 w-full">
        <div className='flex flex-col md:flex-row relative items-center md:items-start gap-7 md:gap-10'>
            <div className='flex-1 relative z-0'>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isSwitched ? "pickup" : "dropoff"}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <PickupDropoffInfo type={isSwitched ? "PickUp":"Drop-Off"}/>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
                <motion.button 
                    onClick={toggleSwitch}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 flex items-center justify-center bg-blue-500 rounded-md 
                    shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] 
s                    hover:bg-blue-600 transition-all"
                >
                    <motion.div
                        animate={{ rotate: isSwitched ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ArrowUpDown color="#fff" size={26}/>
                    </motion.div>
                </motion.button>
            </div>

            <div className='flex-1 relative z-0'>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isSwitched ? "dropoff" : "pickup"}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <PickupDropoffInfo type={isSwitched ? "Drop-Off":"PickUp"}/>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    </div>
    )
}
