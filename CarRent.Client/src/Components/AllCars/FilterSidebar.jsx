import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import CheckBox from '../CheckBox'
import Slider from '../Slider'

export default function FilterSidebar({ isExpanded, toggleExpanded }) {
    const [rangeValues, setRangeValues] = useState({ min: 20, max: 100 });

    const handleRangeChange = (values) => {
      setRangeValues(values);
    };

    // Add effect to control body scroll
    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isExpanded]);

    return (
      <div className={`fixed md:relative inset-0 transition-all duration-300 ease-in-out z-30 
                    ${isExpanded ? 'visible bg-black/70':'invisible'} md:visible md:bg-transparent`}>
        <div className={`fixed md:relative md:h-full top-0 left-0 z-40 flex flex-col 
                        w-[85%] sm:w-[320px] md:w-[220px] lg:w-[240px] xl:w-[280px] border-r border-gray-100 
                        bg-white transform transition-transform duration-300 ease-in-out h-screen
                        ${isExpanded ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <div className="px-4 sm:px-6 md:px-8 pt-10 flex-1 overflow-y-auto scrollbar-hide">
            <button className="flex pt-12 pb-5 ml-auto md:hidden" onClick={toggleExpanded}>
              <X  size={26}/>
            </button>
            <div className="flex flex-col gap-14">
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
              <div className='text-sm text-gray-400 mb-3 space-y-5'>
                <p>PRICE</p>
                <Slider
                    min={20}
                    max={100}
                    onChange={handleRangeChange}
                />
                <div className="flex justify-between text-gray-800 text-sm mt-2">
                    <span>{`$${rangeValues.min}`}</span>
                    <span>{`$${rangeValues.max}`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
