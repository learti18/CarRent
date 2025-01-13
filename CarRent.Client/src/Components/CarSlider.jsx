import React from 'react'
import cars from '../cars'
import CarCard from './CarCard'

export default function CarSlider({title}) {
  return (
    <div>
      <h2 className='text-slate-500'>{title}</h2>
      <div className='grid grid-cols-4 gap-5 py-5 overflow-x-auto scrollbar-hide bg-gray-100'>
        {
          cars.slice(0,4).map(car => (
              <CarCard 
                  key={car.id} 
                  id={car.id}
                  brand={car.brand}
                  type={car.type}
                  fuelCapacity={car.fuelCapacity}
                  transmission={car.transmission}
                  seatingCapacity={car.seatingCapacity}
                  pricePerDay={car.pricePerDay}
                  image={car.image}
                  variant='slider'
              />
          ))
        }
      </div>
    </div>
  )
}
