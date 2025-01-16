import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import cars from '../cars'
import FilteringSidebar from '../Components/FilteringSidebar'
import CarInfo from '../Components/CarDetails/CarInfo';
import Carousel from '../Components/Carousel';
import ReviewSection from '../Components/Reviews/ReviewSection';
import CarSlider from '../Components/CarSlider';
import { LoaderBarsSpinner } from '../Components/LoaderBarsSpinner';

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

  if(!car) {
    return (
      <div className='flex justify-center items-center min-h-screen w-full'>
        <LoaderBarsSpinner/>
      </div>
    ) 
  }
  if (!car) return <div>Car not found</div>

  return (
    <div className='bg-gray-100'>
      <div className='flex flex-col gap-10 px-6 py-10 max-w-7xl mx-auto '>
        <div className='flex flex-col  md:flex-row  gap-6'>
          <Carousel car={car}/>
          <CarInfo car={car}/>
        </div>
        <ReviewSection/>
      </div>
      <div className='lg:mx-auto max-w-7xl px-6'>
        <CarSlider title='Recent'/>
        <CarSlider title='Reccommended'/>
      </div>
    </div>
  )
}
