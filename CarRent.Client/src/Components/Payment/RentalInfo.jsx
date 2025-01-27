import React, { useState } from 'react'
import DefaultInput from '../Inputs/DefaultInput'
import DropDown from '../Inputs/DropDown'
import DatePicker from '../Inputs/DatePickerInput';
import DatePickerInput from '../Inputs/DatePickerInput';
import TimePickerInput from '../Inputs/TimePickerInput';

export default function RentalInfo() {
  const [formData,setFormData] = useState({
    pickup: {
      city:'',
      date:'',
      time:','
    },
    dropoff: {
      city:'',
      date:'',
      time:''
    }
  })
  const updateFormData = (field,key,value) => {
    setFormData((prev) => ({
      ...prev,
      [field]:{
        ...prev[field],
        [key]:value,
      },
    }))
  }
  return (
    <div>
        <div className='bg-white rounded-lg py-8 px-5'>
            <h1 className='text-lg font-semibold'>Rental Info</h1>
            <div className='flex flex-row justify-between text-sm text-slate-400'>
                <p>Please enter your billing info</p>
                <p>step 2 of 4</p>
            </div>

            {/* Pick Up info */}
            <div className='pt-5'>
              <div className='flex gap-2 mb-4'>
                <img src='/markdark.svg' alt="" className='w-4'/>
                <h1 className='text-lg'>Pick-Up</h1>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <DropDown 
                  label='Locations'
                  options={["New York", "Los Angeles", "Chicago", "Houston", "Miami"]}
                  placeholder='Select your city'
                  onSelect={(value) => updateFormData('pickup','city',value)}                 
                  />
                <DatePickerInput
                  label='Date'
                  placeholder='Select your date'
                  onDateChange={(value) => updateFormData('pickup','date',value)}
                />
                <TimePickerInput 
                  label='Time'
                  placeholder='Select your time'
                  onTimeChange={(value) => updateFormData('pickup','time',value)}
                />
              </div>

              {/* Drop off info */}
              <div className='pt-8'>
                <div className='flex gap-2 mb-4'>
                  <img src='/marklight.svg' alt="" className='w-4'/>
                  <h1 className='text-lg'>Drop-Off</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                  <DropDown 
                    label='Locations'
                    options={["New York", "Los Angeles", "Chicago", "Houston", "Miami"]}
                    placeholder='Select your city'
                    onSelect={(value) => updateFormData('dropoff','city',value)}                 
                    />
                  <DatePickerInput
                    label='Date'
                    placeholder='Select your date'
                    onDateChange={(value) => updateFormData('dropoff','date',value)}
                  />
                  <TimePickerInput 
                    label='Time'
                    placeholder='Select your time'
                    onTimeChange={(value) => updateFormData('dropoff','time',value)}
                  />
              </div>
            </div>              
          </div>
       </div>
    </div>
  )
}
