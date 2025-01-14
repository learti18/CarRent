import React from 'react'
import cars from '../cars'
import CarCard from './CarCard'

export default function CarSlider({title}) {
  return (
    <div className='pb-5'>
      <h2 className='text-slate-500'>{title}</h2>
      <div className='flex flex-row gap-5 py-5 w-full overflow-x-auto scrollbar-hide bg-gray-100'>
        {
          cars.slice(0,4).map(car => (
              <CarCard 
                  key={car.id} 
                  {...car}
                  variant='slider'
              />
          ))
        }
      </div>
    </div>
  )
}
