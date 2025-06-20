import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Slider from "./Slider";
import CheckBox from "./Inputs/CheckBox";
import { useFormContext } from "react-hook-form";

export default function FilteringSidebar({ isExpanded, toggleExpanded }) {
  const { register, setValue, watch } = useFormContext();
  const priceRange = watch("priceRange");
  const [localPriceRange, setLocalPriceRange] = useState(
    priceRange || { min: 20, max: 300 }
  );

  const handleRangeChange = (values) => {
    setLocalPriceRange(values);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (JSON.stringify(priceRange) !== JSON.stringify(localPriceRange)) {
        setValue("priceRange", localPriceRange, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localPriceRange, setValue, priceRange]);

  useEffect(() => {
    if (
      priceRange &&
      JSON.stringify(priceRange) !== JSON.stringify(localPriceRange)
    ) {
      setLocalPriceRange(priceRange);
    }
  }, [priceRange]);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isExpanded]);

  return (
    <div
      className={`fixed lg:relative transition-transform min-h-full sm:w-full md:w-1/4 min-w-64 max-w-80 duration-300 ease-in-out z-40 
                       top-0 left-0 z-50 flex flex-col pb-10 bg-white ${
                         isExpanded
                           ? "translate-x-0"
                           : "-translate-x-full lg:translate-x-0"
                       } 
                       md:border-r md:border-gray-200 md:shadow-none`}
    >
      <div className="px-4 sm:px-6 md:px-4 pt-10 flex-1 overflow-y-auto scrollbar-hide">
        <button
          className="flex pt-12 pb-5 ml-auto lg:hidden"
          onClick={toggleExpanded}
        >
          <X size={26} />
        </button>
        <div className="flex flex-col gap-14">
          <div className="space-y-4">
            <p className="text-sm text-gray-400 mb-3">TYPE</p>
            <CheckBox
              id="sport"
              value="sport"
              label="Sport"
              name="filters"
              amount={10}
              register={register}
            />
            <CheckBox
              id="suv"
              value="suv"
              label="SUV"
              name="filters"
              amount={12}
              register={register}
            />
            <CheckBox
              id="mpv"
              value="mpv"
              label="MPV"
              name="filters"
              amount={16}
              register={register}
            />
            <CheckBox
              id="sedan"
              value="sedan"
              label="Sedan"
              name="filters"
              amount={20}
              register={register}
            />
            <CheckBox
              id="coupe"
              value="coupe"
              label="Coupe"
              name="filters"
              amount={14}
              register={register}
            />
            <CheckBox
              id="hatchback"
              value="hatchback"
              label="Hatchback"
              name="filters"
              amount={15}
              register={register}
            />
          </div>
          <div className=" space-y-4">
            <p className="text-sm text-gray-400 mb-3">CAPACITY</p>
            <CheckBox
              id="2person"
              value="2person"
              label="2 Person"
              amount={10}
              name="filters"
              register={register}
            />
            <CheckBox
              id="4person"
              value="4person"
              label="4 Person"
              amount={20}
              name="filters"
              register={register}
            />
            <CheckBox
              id="6person"
              value="6person"
              label="6 Person"
              amount={20}
              name="filters"
              register={register}
            />
            <CheckBox
              id="8person"
              value="8person"
              label="8 or More"
              amount={20}
              name="filters"
              register={register}
            />
          </div>
          <div className="text-sm text-gray-400 mb-3 space-y-5">
            <p>PRICE</p>
            <Slider
              min={20}
              max={300}
              value={localPriceRange}
              onChange={handleRangeChange}
            />
            <div className="flex justify-between text-gray-800 text-sm mt-2">
              <span>{`$${localPriceRange?.min || 20}`}</span>
              <span>{`$${localPriceRange?.max || 300}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
