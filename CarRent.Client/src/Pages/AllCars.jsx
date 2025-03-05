import React, { useState } from 'react'
import cars from "../cars"
import CarCard from '../Components/CarCard'
import FilteringSidebar from '../Components/FilteringSidebar'
import FilterSortBar from '../Components/AllCars/FilterSortBar'
import LocationSelector from '../Components/AllCars/LocationSelector'
import { LoaderBarsSpinner } from './../Components/LoaderBarsSpinner';
import { useVehicle } from '../Hooks/useVehicle'
export default function AllCars() {

  const [isExpanded,setExpanded] = useState()
  const { getAllVehicles, deleteVehicle } = useVehicle();
  const { data: vehicles, isLoading, error } = getAllVehicles;

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
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr'>
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