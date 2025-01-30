import React, { useState } from 'react'
import Button from './../../../Components/Buttons/Button';
import ImageUpload from '../../../Components/Inputs/ImageUpload';
import DefaultInput from './../../../Components/Inputs/DefaultInput';
import YearPicker from '../../../Components/Inputs/YearPicker';
import DropDown from '../../../Components/Inputs/Dropdown';
import CheckBox from './../../../Components/Inputs/CheckBox';
import { VEHICLE_FEATURES } from './../../../VehicleFeatures';
import { BODY_TYPES, FUEL_TYPES, SEAT_OPTIONS, TRANSMISSIONS } from '../../../common/constants';

export default function AddVehicle() {

  const [vehicle,setVehicle] = useState({
    brand:'',
    model:'',
    makeYear:'',
    licensePlates:'',
    pricePerDay:'',
    bodyType:'',
    transmission:'',
    seatingCapacity:'',
    fuelCapacity:'',
    fuelType:'',
    location:'',
    features:[],
    images:[]
  })

  const handleChange = (e) => {
      const {value,name, type, checked} = e.target

      if(type === 'checkbox'){
        setVehicle(prev => ({
          ...prev,
          features: checked
            ? [...prev.features, name]
            : prev.features.filter(feature => feature !== name)
        }))

        return
      }

      setVehicle({
        ...vehicle,
        [name]:value
      })
  }
  const handleImageChange = (newImages) => {
    setVehicle(prev => ({
      ...prev,
      images: newImages
    }))
  }

  return (
    <div className='flex flex-col gap-10'>
      {/* header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold'>Add Vehicle</h1>
          <p className='text-gray-500'>Enter Info for your new vehicle</p>
        </div>
        <Button>Save Vehicle</Button>
      </div>
      {/* iamge upload */}
      <div className=''>
        <ImageUpload
          className='w-full'
          multiple
          value={vehicle.images}
          onChange={handleImageChange}
        />
      </div>

      {/* vehicle details form */}
      <div className='space=y=5 bg-white w-full py-10 px-8 rounded-lg'>
        <h2 className='pb-5 text-xl font-semibold'>Vehicle Details</h2>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10'>
          <DefaultInput
            label='Brand'
            placeholder='Brand Name'
            name='brand'
            onChange={handleChange}
            value={vehicle.brand}
            required
          />
          <DefaultInput
            label='Model'
            placeholder='Model'
            name='model'
            onChange={handleChange}
            value={vehicle.model}
            required
          />
          <DefaultInput
            label='License Plates'
            placeholder='License Plates'
            name='licensePlates'
            onChange={handleChange}
            value={vehicle.licensePlates}
            required
          />
          <YearPicker
            label='Make Year'
            name='makeYear'
            value={vehicle.makeYear}
            onChange={handleChange}
            required
          />
          <DefaultInput
            label='Price Per Day'
            placeholder='100$'
            name='pricePerDay'
            type='number'
            value={vehicle.pricePerDay}
            onChange={handleChange}
            required
          />
          <DropDown
            label='Body Type'
            name='bodyType'
            options={BODY_TYPES}
            value={vehicle.bodyType}
            onChange={handleChange}
          />
          <DropDown
            label='Transmission'
            name='transmission'
            options={TRANSMISSIONS}
            value={vehicle.transmission}
            onChange={handleChange}
          />
          <DropDown
            label='Fuel Type'
            name='fuelType'
            options={FUEL_TYPES}
            value={vehicle.fuelType}
            onChange={handleChange}
          />
          <DefaultInput
            label='Fuel Capacity'
            placeholder='Fuel Capacity'
            name='fuelCapacity'
            type='number'
            value={vehicle.fuelCapacity}
            onChange={handleChange}
          />
          <DropDown
            label='Nr. Of Seats'
            name='seatingCapacity'
            options={SEAT_OPTIONS}
            value={vehicle.seatingCapacity}
            onChange={handleChange}
          />
        </div>

        {/* features */}
        <h2 className='text-lg text-slate-500 mt-10 mb-5'>FEATURES</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-20'>
          {
            VEHICLE_FEATURES.map(feature => (
              <CheckBox 
                key={feature.id}
                label={feature.label}
                id={feature.id}
                name={feature.id}
                onChange={handleChange}
                checked={vehicle.features.includes(feature.id)}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}
