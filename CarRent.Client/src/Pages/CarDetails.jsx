import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import cars from '../cars'

export default function CarDetails() {
  const { carID } = useParams()
  const [car,setCar] = useState()
  useEffect(()=>{
    if(carID){
      setCar(cars.find(car => car.id == carID))
    }
  },[carID])
  
  console.log(car)
  return (
    <div>
      
    </div>
  )
}
