import React from 'react'
import DefaultInput from '../Inputs/DefaultInput'

export default function BillingInfo() {
  return (
    <div className='bg-white rounded-lg py-8 px-5'>
      <h1 className='text-lg font-bold'>Billing info</h1>
      <div className='flex flex-row justify-between text-sm text-slate-400'>
        <p>Please select  your rental info</p>
        <p>step 1 of 4</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 w-full pt-5'>
        <DefaultInput id={1} label={'Name'} name={'name'} placeholder='Name' type='text'/>
        <DefaultInput id={2} label={'Phone Number'} name={'phone'} placeholder='Phone number' type='number'/>
        <DefaultInput id={3} label={'Address'} name={'address'} placeholder='Address' type='text'/>
        <DefaultInput id={4} label={'Town/City'} name={'city'} placeholder='Town or city' type='text'/>
      </div>
    </div>
  )
}
