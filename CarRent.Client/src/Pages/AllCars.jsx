import React, { useState } from 'react'
import cars from "../cars"
import CarCard from '../Components/CarCard'
import FilterSidebar from '../Components/AllCars/FilterSidebar'

export default function AllCars() {

  return (
    <div className='flex flex-row bg-gray-50'>
      <FilterSidebar/>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto px-5 py-24'>
        {cars.map(car => (
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
          />
        ))}
      </div>
    </div>
  )
}
