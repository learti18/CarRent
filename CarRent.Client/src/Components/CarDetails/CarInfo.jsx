import React from 'react'
import { Link } from 'react-router-dom'
import FavoriteButton from '../Buttons/FavoriteButton'
import RatingStars from '../RatingStars'

export default function CarInfo({car}) {
  return (
   <div className='flex flex-col justify-between gap-4 md:w-1/2 p-5 md:p-10 bg-white rounded-xl'>
        <div className='space-y-2'>
            <div className='flex justify-between'>
            <h1 className='text-2xl lg:text-3xl font-bold'>{car.brand}</h1>
            <FavoriteButton/>
            </div>
            <div className='flex gap-2 items-center'>
                <RatingStars rating={3}/>
                <p className='text-gray-600 text-sm'>440+ Reviewer</p>
            </div>
        </div>
        {/* rating */}
        <p className='md:text-base lg:text-xl text-gray-500 lg:leading-10'>NISMO has become the embodiment of Nissan's outstanding performance, 
          inspired by the most unforgiving proving ground, the "race track".
        </p>
        <div className='flex flex-col gap-2 lg:gap-4 font-light text-gray-400'>
            <div className='flex gap-2'>
                <p>Type Car</p>
                <span className=' font-bold text-gray-600 text-right'>{car.type}</span>    
            </div>
            <div className='flex gap-2'>
                <p>Capacity</p>
                <span className='font-bold text-gray-600'>{car.seatingCapacity} Person</span>
            </div>
            <div className='flex gap-2'>
                <p>Transmission</p>
                <span className='font-bold text-gray-600'>{car.transmission}</span>    
            </div>
            <div className='flex gap-2'>
                <p>Fuel Capacity</p>
                <span className='font-bold text-gray-600'>{car.fuelCapacity}L</span>
            </div>
        </div>
        <div className="mt-5 flex justify-between items-center">
          <p className="text-xl md:text-2xl font-bold">
              $220/
              <span className="text-gray-400 text-xs"> day</span>
          </p>
          <Link 
              to={`payment`}
              state={{car}}
              className="bg-blue-500 text-white  lg:text-lg px-5 py-2 rounded-md  transition-colors duration-300 hover:bg-blue-600">
              Rent Now
          </Link>
        </div>
    </div>
  )
}
