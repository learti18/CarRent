import React from 'react'
import BillingInfo from '../Components/Payment/BillingInfo'
import RentalInfo from '../Components/Payment/RentalInfo'
import PaymentMethod from '../Components/Payment/PaymentMethod'
import Confirmation from '../Components/Payment/Confirmation'
import RentalSummary from '../Components/Payment/RentalSummary'
import { useLocation } from 'react-router-dom'
import { LoaderBarsSpinner } from '../Components/LoaderBarsSpinner'

export default function Payment() {
  const { state } = useLocation()
  const { car } = state || {} 
  
  if(!car) return <div className='flex justify-center items-center min-h-screen w-full'><LoaderBarsSpinner/></div>

  return (
    <div className='bg-gray-100'>
      <div className='max-w-7xl py-10 px-6 mx-auto'>
        <div className='flex flex-col lg:flex-row-reverse gap-7'>
          <RentalSummary car={car}/>
          <div div className='flex flex-col gap-5'>
            <BillingInfo/>
            <RentalInfo/>
            <PaymentMethod/>
            <Confirmation car={car}/>
          </div>
        </div>
      </div>
    </div>
  )
}
