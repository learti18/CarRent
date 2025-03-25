import React, { useState } from 'react'
import cars from "../cars"
import CarCard from '../Components/CarCard'
import FilteringSidebar from '../Components/FilteringSidebar'
import FilterSortBar from '../Components/AllCars/FilterSortBar'
import LocationSelector from '../Components/AllCars/LocationSelector'
import { LoaderBarsSpinner } from './../Components/LoaderBarsSpinner';
import { useAllVehicles } from '../Queries/vehicles'

export default function AllCars() {

  const [isExpanded,setExpanded] = useState()
  const { data: vehicles, isLoading } = useAllVehicles() 

  function toggleExpanded(){
    setExpanded(prevState => !prevState)
  }
  if(isLoading)
  {
    return <LoaderBarsSpinner/>
  }

  
  return (
    <div className='flex flex-row bg-gray-100'>
      <FilteringSidebar isExpanded={isExpanded} toggleExpanded={toggleExpanded}/>
      <div className='px-5 py-10 mx-auto'>
        <LocationSelector/>
        <FilterSortBar toggleExpanded={toggleExpanded}/>
        <div className='grid auto-grid-cards gap-6 auto-rows-fr'>
        {vehicles.map(car => (
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