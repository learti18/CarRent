import React, { useState, useEffect, useCallback } from 'react'
import cars from "../cars"
import CarCard from '../Components/CarCard'
import FilteringSidebar from '../Components/FilteringSidebar'
import FilterSortBar from '../Components/AllCars/FilterSortBar'
import LocationSelector from '../Components/AllCars/LocationSelector'
import { useAllVehicles } from '../Queries/vehicles'
import SkeletonCard from '../Components/cards/SkeletonCard'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

export default function AllCars() {
  const [isExpanded, setExpanded] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [locationData, setLocationData] = useState({
    pickup: {
      location: 'New York',
      date: new Date().toISOString().split('T')[0],
      time: new Date().getHours() + ':00'
    },
    dropoff: {
      location: 'New York',
      date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0],
      time: (new Date().getHours()+2) + ':00'
    }
  })
  

  // Use the location data for fetching vehicles
  const { data: vehicles, isLoading, refetch } = useAllVehicles() 
  const { register } = useForm()
  
  // Handle location data updates from LocationSelector
  const handleLocationDataChange = useCallback((type, data) => {
    setLocationData(prev => {
      // Check if data has actually changed to prevent unnecessary updates
      const currentData = prev[type.toLowerCase()];
      if (JSON.stringify(currentData) === JSON.stringify(data)) {
        return prev; // Return previous state if no change
      }
      return {
        ...prev,
        [type.toLowerCase()]: data
      };
    })
  }, []);
  
  // Search for vehicles based on location data - memoized to prevent unnecessary calls
  const searchVehicles = useCallback(() => {
    // Here you would call your API with the location data
    console.log('Searching vehicles with criteria:', locationData);
    setSearchParams({
      pickupLocation: locationData.pickup.location,
      pickupDate: locationData.pickup.date,
      dropoffLocation: locationData.dropoff.location,
      dropoffDate: locationData.dropoff.date
    })

    // For now, just refetch with existing params
    refetch({
      pickupLocation: locationData.pickup.location,
      pickupDate: locationData.pickup.date,
      pickupTime: locationData.pickup.time,
      dropoffLocation: locationData.dropoff.location,
      dropoffDate: locationData.dropoff.date,
      dropoffTime: locationData.dropoff.time
    });
  }, [locationData, refetch]);
  
  // Refetch vehicles when location data changes, with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      searchVehicles();
    }, 500); // 500ms debounce
    
    return () => clearTimeout(timer);
  }, [searchVehicles]);

  function toggleExpanded(){
    setExpanded(prevState => !prevState)
  }

  return (
    <div className='flex flex-col md:flex-row bg-gray-100 min-h-screen'>
      <FilteringSidebar isExpanded={isExpanded} toggleExpanded={toggleExpanded}/>
      <div className='flex-1 px-3 sm:px-5 py-5 sm:py-8 overflow-hidden'>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <LocationSelector onDataChange={handleLocationDataChange} />
          </div>
          <FilterSortBar 
            register={register}
            toggleExpanded={toggleExpanded}/>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr mt-5'>
          {isLoading ? (
                // Display skeleton cards while loading
                Array(9).fill(0).map((_, index) => (
                  <SkeletonCard key={`skeleton-${index}`} />
                ))
              ) : (
                // Display actual car cards when data is loaded
                vehicles?.map(car => (
                  <CarCard 
                    key={car.id} 
                    {...car}
                  />
                ))
              )}
          </div>
        </div>
      </div>
    </div>
  )
}