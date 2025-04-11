import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowUpDown } from "lucide-react";
import PickupDropoffInfo from "./PickUpDropOffInfo";
import { motion, AnimatePresence } from "framer-motion";
import { LOCATIONS } from "../../common/constants";

export default function LocationSelector({ onDataChange }) {
  const [isSwitched, setIsSwitched] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pickupData, setPickupData] = useState({
    location: LOCATIONS[0],
    date: new Date().toISOString().split("T")[0],
    time: new Date().getHours() + ":00",
  });
  const [dropoffData, setDropoffData] = useState({
    location: LOCATIONS[0],
    date: new Date(new Date().setDate(new Date().getDate() + 2))
      .toISOString()
      .split("T")[0],
    time: new Date().getHours() + ":00",
  });

  // Notify parent of data changes - memoized to avoid unnecessary rerenders
  const notifyDataChange = useCallback(() => {
    if (onDataChange) {
      onDataChange("pickup", pickupData);
      onDataChange("dropoff", dropoffData);
    }
  }, [onDataChange, pickupData, dropoffData]);

  useEffect(() => {
    notifyDataChange();
  }, [notifyDataChange]);

  // Animation properties based on device type
  const getAnimationProps = (isFirst) => {
    if (isMobile) {
      return {
        initial: { opacity: 0, y: isFirst ? -20 : 20 },
        animate: { opacity: 1, y: 0, x: 0 },
        exit: { opacity: 0, y: isFirst ? 20 : -20 },
      };
    }
    return {
      initial: { opacity: 0, x: isFirst ? -20 : 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: isFirst ? 20 : -20 },
    };
  };

  // Toggle between pickup and dropoff positions
  function toggleSwitch() {
    setIsSwitched((prevState) => !prevState);
  }

  // Handle pickup data changes with validation
  const handlePickupDataChange = useCallback(
    (data) => {
      setPickupData((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(data)) {
          return prev;
        }

        // Check if dropoff needs updating
        const newPickupDate = new Date(data.date);
        const currentDropoffDate = new Date(dropoffData.date);

        if (newPickupDate > currentDropoffDate) {
          setDropoffData((prevDropoff) => ({
            ...prevDropoff,
            date: data.date,
          }));
        }

        return data;
      });
    },
    [dropoffData.date]
  );

  // Handle dropoff data changes with validation
  const handleDropoffDataChange = useCallback(
    (data) => {
      setDropoffData((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(data)) {
          return prev;
        }

        // Validate against pickup date
        const newDropoffDate = new Date(data.date);
        const currentPickupDate = new Date(pickupData.date);

        if (newDropoffDate < currentPickupDate) {
          return {
            ...data,
            date: pickupData.date,
          };
        }

        return data;
      });
    },
    [pickupData.date]
  );

  // Date constraints
  const pickupDateConstraints = useMemo(
    () => ({
      minDate: new Date().toISOString().split("T")[0],
    }),
    []
  );

  const dropoffDateConstraints = useMemo(
    () => ({
      minDate: pickupData.date,
    }),
    [pickupData.date]
  );

  return (
    <div className="pb-10 w-full">
      <div className="flex flex-col-reverse md:flex-row-reverse relative items-center md:items-start gap-7 md:gap-10">
        {/* First component (top on mobile, right on desktop) */}
        <div className="flex-1 relative w-full text-center md:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={isSwitched ? "pickup" : "dropoff"}
              {...getAnimationProps(true)}
              transition={{ duration: 0.2 }}
              className="w-full flex justify-center md:justify-start"
            >
              <PickupDropoffInfo
                type={isSwitched ? "PickUp" : "Drop-Off"}
                defaultValues={isSwitched ? pickupData : dropoffData}
                onDataChange={
                  isSwitched ? handlePickupDataChange : handleDropoffDataChange
                }
                dateConstraints={
                  isSwitched ? pickupDateConstraints : dropoffDateConstraints
                }
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Toggle button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
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
              <ArrowUpDown color="#fff" size={26} />
            </motion.div>
          </motion.button>
        </div>

        {/* Second component (bottom on mobile, left on desktop) */}
        <div className="flex-1 relative w-full text-center md:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={isSwitched ? "dropoff" : "pickup"}
              {...getAnimationProps(false)}
              transition={{ duration: 0.2 }}
              className="w-full flex justify-center md:justify-start"
            >
              <PickupDropoffInfo
                type={isSwitched ? "Drop-Off" : "PickUp"}
                defaultValues={isSwitched ? dropoffData : pickupData}
                onDataChange={
                  isSwitched ? handleDropoffDataChange : handlePickupDataChange
                }
                dateConstraints={
                  isSwitched ? dropoffDateConstraints : pickupDateConstraints
                }
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
