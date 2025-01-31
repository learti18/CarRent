import React from 'react'
import Button from './../../../Components/Buttons/Button';
import ImageUpload from '../../../Components/Inputs/ImageUpload';
import DefaultInput from './../../../Components/Inputs/DefaultInput';
import YearPicker from '../../../Components/Inputs/YearPicker';
import DropDown from '../../../Components/Inputs/Dropdown';
import CheckBox from './../../../Components/Inputs/CheckBox';
import { VEHICLE_FEATURES } from './../../../VehicleFeatures';
import { BODY_TYPES, FUEL_TYPES, LOCATIONS, SEAT_OPTIONS, TRANSMISSIONS } from '../../../common/constants';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { VehicleSchema } from '../../../Schemas/VehicleSchema';

export default function AddVehicle() {
  const { handleSubmit, register, control, watch, formState:{errors} } = useForm({
    resolver: yupResolver(VehicleSchema),
    defaultValues:{
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
    }
  })

  const submitForm = (data) => {
    console.log('form data:', data)
  }

  return (
    <div className=''>
      <form
        className='flex flex-col gap-8' 
        onSubmit={handleSubmit(submitForm)}>
        
        {/* header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-semibold'>Add Vehicle</h1>
            <p className='text-gray-500'>Enter Info for your new vehicle</p>
          </div>
          <Button>Save Vehicle</Button>
        </div>

        {/* image upload */}
        <div className=''>
          <ImageUpload
            className='w-full'
            multiple
            control={control}
            register={register}
            error={errors.images}
            name='images'
          />
        </div>

        <div className='flex flex-col divide-y-2 bg-white rounded-lg'>
          {/* basic details */}
           <div className='px-8 py-10'>
              <h2 className='text-2xl uppercase font-medium mb-7'>Basic details</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10'>
                <DefaultInput
                  label='Brand'
                  placeholder='Brand Name'
                  name='brand'
                  error={errors.brand}
                  register={register}
                />
                <DefaultInput
                  label='Model'
                  placeholder='Model'
                  name='model'
                  error={errors.model}
                  register={register}
                />
                <DefaultInput
                  label='License Plates'
                  placeholder='License Plates'
                  name='licensePlates'
                  error={errors.licensePlates}
                  register={register}
                />
                <YearPicker
                  label='Make Year'
                  name='makeYear'
                  error={errors.makeYear}
                  register={register}
                  required
                />
            </div>
          </div>

          {/* specifications */}
          <div className='px-8 py-10'>
            <h2 className='text-2xl uppercase font-medium mb-7'>Specifications</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10'>
              <DropDown
                label='Body Type'
                name='bodyType'
                options={BODY_TYPES}
                error={errors.bodyType}
                register={register}
              />
              <DropDown
                label='Transmission'
                name='transmission'
                options={TRANSMISSIONS}
                error={errors.transmission}
                register={register}
              />
               <DefaultInput
                label='Fuel Capacity'
                placeholder='Fuel Capacity'
                name='fuelCapacity'
                type='number'
                error={errors.fuelCapacity}
                register={register}
              />
              <DropDown
                label='Fuel Type'
                name='fuelType'
                options={FUEL_TYPES}
                error={errors.fuelType}
                register={register}
              />
              <DropDown
                label='Nr. Of Seats'
                name='seatingCapacity'
                options={SEAT_OPTIONS}
                error={errors.seatingCapacity}
                register={register}
              />
            </div>
          </div>

          {/* pricing & location */}
          <div className='px-8 py-10'>
            <h2 className='text-2xl uppercase font-medium mb-7'>Pricing & Location</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10'>
              <DefaultInput
                label='Price Per Day'
                placeholder='100$'
                name='pricePerDay'
                type='number'
                error={errors.pricePerDay}
                register={register}
              />
              <DropDown
                label='Location'
                name='location'
                options={LOCATIONS}
                error={errors.location}
                register={register}
              />
            </div>
          </div>

          {/* features */}
          <div className='px-8 py-10'>
            <h2 className='text-2xl uppercase font-medium mb-7'>features</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-20'>
              {
                VEHICLE_FEATURES.map(feature => (
                  <CheckBox 
                      key={feature.id}
                      label={feature.label}
                      id={feature.id}
                      name='features'
                      register={register}
                    />
                ))
              }
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
