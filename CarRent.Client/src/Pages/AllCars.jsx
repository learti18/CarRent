import React, { useState } from 'react'
import cars from "../cars"
import CarCard from '../Components/CarCard'
import FilteringSidebar from '../Components/FilteringSidebar'
import FilterSortBar from '../Components/AllCars/FilterSortBar'
import LocationSelector from '../Components/AllCars/LocationSelector'

export default function AllCars() {

  const [isExpanded,setExpanded] = useState()
  function toggleExpanded(){
    setExpanded(prevState => !prevState)
  }
  
  return (
    <div className='flex flex-row bg-gray-100'>
      <FilteringSidebar isExpanded={isExpanded} toggleExpanded={toggleExpanded}/>
      <div className='px-5 py-10 mx-auto'>
        <LocationSelector/>
        <FilterSortBar toggleExpanded={toggleExpanded}/>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr'>
        {cars.map(car => (
          <CarCard 
            key={car.id} 
            {...car}
          />
          ))}
        </div>
      </div>
    </div>
  )
}