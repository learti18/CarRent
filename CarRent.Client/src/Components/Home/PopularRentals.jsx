import { Link } from "react-router-dom";
import CarCard from "../CarCard";
import { useState } from "react";
import { usePopularRentals } from "../../Hooks/usePopularRentals";
import { LoaderBarsSpinner } from "../LoaderBarsSpinner";


export default function PopularRentals() {
  const { data: popularRentals, isLoading, error } = usePopularRentals();

  if(isLoading){
    return <LoaderBarsSpinner/>
  }
  

  return (
    <div className="flex flex-col items-center py-14 max-w-7xl mx-auto">
      <div className="space-y-6 px-5 text-center">
        <p className="text-md md:text-lg text-blue-600 bg-blue-100 px-3 py-1 rounded-lg justify-self-center">Popular rental deals</p>
        <h1 className="text-2xl md:text-4xl font-semibold">Most popular cars rental deals</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-6 px-10 md:px-6 my-12">
          
          {
            popularRentals.slice(0,4).map(car => (
              <CarCard 
                key={car.id} 
                id={car.id}
                brand={car.brand}
                type={car.type}
                fuelCapacity={car.fuelCapacity}
                transmission={car.transmission}
                seatingCapacity={car.seatingCapacity}
                pricePerDay={car.pricePerDay}
                isFavorite={car.isFavorite}
                images={car.images}
              />
            ))
          }
      </div>
      <Link
          to="cars" 
          className="text-lg text-blue-500 border-b border-blue-500 duration-200 hover:text-blue-700 hover:border-blue-700">
        View All Cars
      </Link>
    </div>
  )
}
