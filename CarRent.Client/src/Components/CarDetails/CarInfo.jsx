import React from 'react'
import { Link } from 'react-router-dom'
import FavoriteButton from '../Buttons/FavoriteButton'
import RatingStars from '../RatingStars'
import { Fuel, LifeBuoy, Users } from 'lucide-react'
import Button from '../Buttons/Button'

export default function CarInfo({ vehicle }) {
  const {
    id,
    brand,
    model,
    bodyType,
    fuelType,
    transmission,
    seats,
    price,
    isBooked,
    features = []
  } = vehicle;

  return (
    <div className='flex-1 bg-white rounded-xl p-6'>
      <div className='flex flex-col gap-6'>
        {/* Header */}
        <div className='flex justify-between items-start'>
          <div>
            <h1 className='text-2xl font-semibold'>{brand} {model}</h1>
            <p className='text-gray-500'>{bodyType}</p>
          </div>
          {isBooked && (
            <span className='px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium'>
              Currently Booked
            </span>
          )}
        </div>

        {/* Specifications */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-lg font-semibold'>Specifications</h2>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <div className='flex items-center gap-2 text-gray-600'>
              <Fuel size={20} />
              <span>{fuelType}</span>
            </div>
            <div className='flex items-center gap-2 text-gray-600'>
              <LifeBuoy size={20} />
              <span>{transmission}</span>
            </div>
            <div className='flex items-center gap-2 text-gray-600'>
              <Users size={20} />
              <span>{seats} People</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-lg font-semibold'>Features</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
            {features.map((feature, index) => (
              <div 
                key={index}
                className='flex items-center gap-2 text-gray-600'
              >
                <span>• {feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price and Rent Button */}
        <div className='flex items-center justify-between mt-4'>
          <div>
            <p className='text-2xl font-semibold'>
              ${price}
              <span className='text-gray-400 text-sm'>/day</span>
            </p>
          </div>
          {isBooked ? (
            <Button disabled>
              Currently Unavailable
            </Button>
          ) : (
            <Link to={`/cars/${id}/payment`}>
              <Button>
                Rent Now
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
