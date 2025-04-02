import React, { useEffect, useCallback } from 'react'
import { LOCATIONS } from '../../common/constants'
import DropDown from '../Inputs/Dropdown'
import DatePickerInput from '../Inputs/DatePickerInput'
import TimePickerInput from '../Inputs/TimePickerInput'
import { useForm } from 'react-hook-form';

export default function PickupDropoffInfo({ type, defaultValues, onDataChange }) {
    const { handleSubmit, register, control, reset, watch } = useForm({
        defaultValues: defaultValues || {
            location: LOCATIONS[0],
            date: new Date().toISOString().split('T')[0],
            time: new Date().getHours() + ':00'
        }
    });

    // Only trigger data change callback when form values actually change
    const formData = watch();
    
    // Reset form when defaultValues change
    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);
    
    // Memoize the onDataChange handler to prevent it from causing infinite loops
    const handleDataChange = useCallback((data) => {
        if (onDataChange) {
            onDataChange(data);
        }
    }, [onDataChange]);
    
    // Notify parent component when form data changes
    useEffect(() => {
        // Skip the initial render
        const timer = setTimeout(() => {
            handleDataChange(formData);
        }, 0);
        
        return () => clearTimeout(timer);
    }, [formData, handleDataChange]);

    return (
        <div className='p-4 sm:p-5 rounded-xl bg-white shadow-sm w-full'>
            <div className='flex items-center gap-2 mb-4'>
                <img src={type === "PickUp" ? 'markdark.svg':'marklight.svg'} alt="" className="w-5 h-5" />
                <h2 className='text-xl sm:text-xl font-medium'>
                    {type}
                </h2>
            </div>
            
            {/* Mobile design - stacked */}
            <div className='flex flex-col gap-3 sm:hidden'>
                <div className='w-full'>
                    <h2 className='flex flex-start font-medium mb-2'>Locations</h2>
                    <DropDown
                        label=""
                        options={LOCATIONS}
                        placeholder="Select your location"
                        register={register}
                        name="location"
                        defaultValue={defaultValues?.location || LOCATIONS[0]}
                        className="bg-white"
                        variant="clean"
                    />
                </div>
                <div className='w-full'>
                    <h2 className='flex flex-start font-medium mb-2'>Date</h2>
                    <DatePickerInput
                        label=""
                        name="date"
                        control={control}
                        className="bg-white"
                    />
                </div>
                <div className='w-full'>
                    <h2 className='flex flex-start font-medium mb-2'>Time</h2>
                    <TimePickerInput
                        label=""
                        name="time"
                        control={control}
                        className="bg-white"
                    />
                </div>
            </div>
            
            {/* Tablet/Desktop design - side by side */}
            <div className='hidden sm:grid sm:grid-cols-3 sm:gap-3'>
                <div className='sm:border-r sm:pr-3'>
                    <h2 className='text-sm sm:text-base font-medium mb-1.5'>Locations</h2>
                    <DropDown
                        label=""
                        options={LOCATIONS}
                        placeholder="Select your location"
                        register={register}
                        name="location"
                        defaultValue={defaultValues?.location || LOCATIONS[0]}
                        className="bg-white"
                        variant="clean"
                    />
                </div>
                <div className='sm:border-r sm:pr-3'>
                    <h2 className='text-sm sm:text-base font-medium mb-1.5'>Date</h2>
                    <DatePickerInput
                        label=""
                        name="date"
                        control={control}
                        className="bg-white"
                    />
                </div>
                <div>
                    <h2 className='text-sm sm:text-base font-medium mb-1.5'>Time</h2>
                    <TimePickerInput
                        label=""
                        name="time"
                        control={control}
                        className="bg-white"
                    />
                </div>
            </div>
        </div>
    )
}
