import React from 'react'
import BillingInfo from '../Components/Payment/BillingInfo'
import RentalInfo from '../Components/Payment/RentalInfo'
import PaymentMethod from '../Components/Payment/PaymentMethod'
import Confirmation from '../Components/Payment/Confirmation'
import RentalSummary from '../Components/Payment/RentalSummary'
import { useLocation } from 'react-router-dom'
import { LoaderBarsSpinner } from '../Components/LoaderBarsSpinner'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PaymentSchema } from '../Schemas/PaymentSchema'
import toast from 'react-hot-toast'

export default function Payment() {
  const { register, handleSubmit, control, formState:{errors} } = useForm({
    resolver: yupResolver(PaymentSchema),
    defaultValues:{
      name:'',
      phone:'',
      address:'',
      city:'',
      pickup: {
        city:'',
        date:'',
        time:''
      },
      dropoff: {
        city:'',
        date:'',
        time:''
      },
      cardNumber:'',
      expiration:'',
      cardHolder:'',
      cvc:'',
      newsletter:false,
      termsConditions:false
    }
  })

  const { state } = useLocation()
  const { car } = state || {} 

  const submitForm = (data) => {
    try {
      console.log('Data: ',data)
      toast.success('Payment successful!')
    } catch(error) {
      toast.error('Payment failed')
    }
  }

  const onError = (errors) => {
    console.log('Form errors:', errors)
    toast.error('Please fill in all required fields correctly')
  }
  
  if(!car) return <div className='flex justify-center items-center min-h-screen w-full'><LoaderBarsSpinner/></div>

  return (
    <div className='bg-gray-100'>
      <div className='max-w-7xl py-10 px-6 mx-auto'>
        <form
          onSubmit={handleSubmit(submitForm, onError)} 
          className='flex flex-col lg:flex-row-reverse gap-7'
        >
          <RentalSummary car={car}/>
          <div className='flex flex-col gap-5'>
            <BillingInfo
              register={register}
              errors={errors}
            />
            <RentalInfo
              register={register}
              control={control}
              errors={errors}
            />
            <PaymentMethod
              register={register}
              control={control}
              errors={errors}
            />
            <Confirmation 
              car={car}
              register={register}
              errors={errors}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
