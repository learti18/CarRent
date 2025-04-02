import React, { useState, useEffect, useCallback } from 'react'
import { ArrowUpDown } from 'lucide-react'
import PickupDropoffInfo from './PickUpDropOffInfo'
import { motion, AnimatePresence } from 'framer-motion'

export default function LocationSelector({ onDataChange }) {
    const [isSwitched, setIsSwitched] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [pickupData, setPickupData] = useState({
        location: 'New York',
        date: new Date().toISOString().split('T')[0],
        time: new Date().getHours() + ':00'
    })
    const [dropoffData, setDropoffData] = useState({
        location: 'New York',
        date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0],
        time: new Date().getHours() + ':00'
    })

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)')
        setIsMobile(mediaQuery.matches)

        const handler = (e) => setIsMobile(e.matches)
        mediaQuery.addEventListener('change', handler)
        return () => mediaQuery.removeEventListener('change', handler)
    }, [])

    // Memoize data change notification to prevent infinite loops
    const notifyDataChange = useCallback(() => {
        if (onDataChange) {
            onDataChange('pickup', pickupData);
            onDataChange('dropoff', dropoffData);
        }
    }, [onDataChange, pickupData, dropoffData]);

    // Notify parent of data changes
    useEffect(() => {
        notifyDataChange();
    }, [notifyDataChange]);

    const getAnimationProps = (isFirst) => {
        if (isMobile) {
            return {
                initial: { opacity: 0, y: isFirst ? -20 : 20 },
                animate: { opacity: 1, y: 0, x: 0 }, // Force x to 0 on mobile
                exit: { opacity: 0, y: isFirst ? 20 : -20 }
            }
        }
        return {
            initial: { opacity: 0, x: isFirst ? -20 : 20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: isFirst ? 20 : -20 }
        }
    }

    function toggleSwitch(){
        setIsSwitched(prevState => !prevState)
    }

    // Handle data changes from child components
    const handlePickupDataChange = useCallback((data) => {
        setPickupData(prev => {
            // Only update if there's an actual change to prevent infinite loops
            if (JSON.stringify(prev) === JSON.stringify(data)) {
                return prev;
            }
            return data;
        });
    }, []);

    const handleDropoffDataChange = useCallback((data) => {
        setDropoffData(prev => {
            // Only update if there's an actual change to prevent infinite loops
            if (JSON.stringify(prev) === JSON.stringify(data)) {
                return prev;
            }
            return data;
        });
    }, []);

    return (
    <div className="pb-10 w-full">
        <div className='flex flex-col md:flex-row relative items-center md:items-start gap-7 md:gap-10'>
            <div className='flex-1 relative z-0 w-full text-center md:text-left'>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isSwitched ? "pickup" : "dropoff"}
                        {...getAnimationProps(true)}
                        transition={{ duration: 0.2 }}
                        className="w-full flex justify-center md:justify-start"
                    >
                        <PickupDropoffInfo 
                            type={isSwitched ? "PickUp":"Drop-Off"}
                            defaultValues={isSwitched ? pickupData : dropoffData}
                            onDataChange={isSwitched ? handlePickupDataChange : handleDropoffDataChange}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
                <motion.button 
                    onClick={toggleSwitch}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 flex items-center justify-center bg-blue-500 rounded-md 
                    shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] 
                    hover:bg-blue-600 transition-all"
                >
                    <motion.div
                        animate={{ rotate: isSwitched ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ArrowUpDown color="#fff" size={26}/>
                    </motion.div>
                </motion.button>
            </div>

            <div className='flex-1 relative z-0 w-full text-center md:text-left'>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isSwitched ? "dropoff" : "pickup"}
                        {...getAnimationProps(false)}
                        transition={{ duration: 0.2 }}
                        className="w-full flex justify-center md:justify-start"
                    >
                        <PickupDropoffInfo 
                            type={isSwitched ? "Drop-Off":"PickUp"}
                            defaultValues={isSwitched ? dropoffData : pickupData}
                            onDataChange={isSwitched ? handleDropoffDataChange : handlePickupDataChange}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    </div>
    )
}
