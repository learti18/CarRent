import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LOCATIONS } from "../../common/constants";
import PickupDropoffInfo from "./PickupDropoffInfo";
import { useSearchForm } from "../../Contexts/SearchFormContext";

function LocationSelector() {
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

  // Track data changes to avoid excessive updates
  const [pickupChanged, setPickupChanged] = useState(false);
  const [dropoffChanged, setDropoffChanged] = useState(false);

  // Get form context handlers
  const { handleLocationChange, watch } = useSearchForm();
  const rental = watch("rental");

  // Initialize with form values if available and update when they change
  useEffect(() => {
    // Skip the effect if rental data is not available
    if (!rental) return;

    const rentalPickup = rental.pickup || {};
    const rentalDropoff = rental.dropoff || {};

    // Only update if values are different but check by individual properties
    // to avoid JSON.stringify which can cause infinite loops

    // Check pickup data
    const isPickupDifferent =
      rentalPickup.date !== pickupData.date ||
      rentalPickup.time !== pickupData.time ||
      JSON.stringify(rentalPickup.location) !==
        JSON.stringify(pickupData.location);

    if (rentalPickup && isPickupDifferent) {
      setPickupData(rentalPickup);
    }

    // Check dropoff data
    const isDropoffDifferent =
      rentalDropoff.date !== dropoffData.date ||
      rentalDropoff.time !== dropoffData.time ||
      JSON.stringify(rentalDropoff.location) !==
        JSON.stringify(dropoffData.location);

    if (rentalDropoff && isDropoffDifferent) {
      setDropoffData(rentalDropoff);
    }
  }, [rental]); // Remove pickupData and dropoffData to prevent infinite loops

  // Initial notification on mount
  useEffect(() => {
    handleLocationChange("pickup", pickupData);
    handleLocationChange("dropoff", dropoffData);
  }, []); // Run only once on mount

  // Handle pickup changes
  useEffect(() => {
    if (pickupChanged) {
      handleLocationChange("pickup", pickupData);
      setPickupChanged(false);
    }
  }, [pickupChanged, pickupData, handleLocationChange]);

  // Handle dropoff changes
  useEffect(() => {
    if (dropoffChanged) {
      handleLocationChange("dropoff", dropoffData);
      setDropoffChanged(false);
    }
  }, [dropoffChanged, dropoffData, handleLocationChange]);

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

  function toggleSwitch() {
    setIsSwitched((prevState) => !prevState);
  }

  const handlePickupDataChange = useCallback(
    (data) => {
      setPickupData((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(data)) {
          return prev;
        }

        const newPickupDate = new Date(data.date);
        const currentDropoffDate = new Date(dropoffData.date);

        if (newPickupDate > currentDropoffDate) {
          setDropoffData((prevDropoff) => ({
            ...prevDropoff,
            date: data.date,
          }));
          setDropoffChanged(true);
        }

        // Mark data as changed for the effect to handle
        setPickupChanged(true);
        return data;
      });
    },
    [dropoffData.date]
  );

  const handleDropoffDataChange = useCallback(
    (data) => {
      setDropoffData((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(data)) {
          return prev;
        }

        const newDropoffDate = new Date(data.date);
        const currentPickupDate = new Date(pickupData.date);

        if (newDropoffDate < currentPickupDate) {
          const updatedData = {
            ...data,
            date: pickupData.date,
          };

          // Mark data as changed for the effect to handle
          setDropoffChanged(true);
          return updatedData;
        }

        // Mark data as changed for the effect to handle
        setDropoffChanged(true);
        return data;
      });
    },
    [pickupData.date]
  );

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

export default memo(LocationSelector);
