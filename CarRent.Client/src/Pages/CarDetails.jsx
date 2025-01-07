import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import cars from '../cars'
import FilteringSidebar from '../Components/FilteringSidebar'
import CarInfo from '../Components/CarDetails/CarInfo';
import Carousel from '../Components/Carousel';

export default function CarDetails() {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const findCar = () => {
      const foundCar = cars.find(car => car.id === parseInt(id))
      setCar(foundCar)
      setLoading(false)
    }

    findCar()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!car) return <div>Car not found</div>

  return (
    <div className='flex flex-row'>
      <FilteringSidebar/>
      <div className='px-5 py-10 mx-auto bg-gray-100'>
        <div className='flex flex-col  md:flex-row  gap-6'>
          <Carousel car={car}/>
          <CarInfo car={car}/>
        </div>
      </div>
    </div>
  )
}
