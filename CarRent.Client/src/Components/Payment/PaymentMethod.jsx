import React from 'react'
import DefaultInput from '../Inputs/DefaultInput'
import NumericInput from '../Inputs/NumericInput'

export default function PaymentMethod({register, control, errors}) {
  return (
    <div>
        <div className='bg-white rounded-lg py-8 px-5'>
            <h1 className='text-lg font-semibold'>Payment Method</h1>
            <div className='flex flex-row justify-between text-sm text-slate-400'>
                <p>Please enter your payment method</p>
                <p>step 3 of 4</p>
            </div>
            <div className='bg-gray-100 p-5 rounded-lg mt-5'>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex gap-2'>
                  <img src='/markdark.svg' alt="" />
                  <h3>Credit Card</h3>
                </div>
                <div className='flex gap-2'>
                  <img src="/visalogo.svg" alt="" />
                  <img src="/mastercardlogo.svg" alt="" />
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 pt-5'>
                <NumericInput
                  className='bg-white'
                  id='cardNumber'
                  name='cardNumber'
                  label='Card Number'
                  placeholder='0000 0000 0000 0000'
                  register={register}
                  error={errors.cardNumber}
                />
                <NumericInput
                  className='bg-white'
                  id='expiration'
                  name='expiration'
                  label='Expiration Date'
                  placeholder='MM/YY'
                  register={register}
                  error={errors.expiration}
                />
                <DefaultInput 
                  className='bg-white'
                  id='cardholder'
                  label='Card Holder'
                  placeholder='Card holder'
                  name='cardHolder'
                  register={register}
                  error={errors.cardHolder}
                />
                <NumericInput 
                  className='bg-white'
                  id='cvc'
                  label='CVC'
                  name='cvc'
                  placeholder='CVC'
                  register={register}
                  error={errors.cvc}
                />
              </div>
            </div>
        </div>
    </div>
  )
}
