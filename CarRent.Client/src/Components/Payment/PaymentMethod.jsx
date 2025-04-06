import React from 'react'
import DefaultInput from '../Inputs/DefaultInput'
import NumericInput from '../Inputs/NumericInput'


export default function PaymentMethod({register, errors}) {
  return (
    <div>
        <div className='bg-white rounded-lg py-8 px-5'>
            <h1 className='text-xl font-semibold'>Payment Method</h1>
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
                  name='payment.cardNumber'
                  label='Card Number'
                  placeholder='0000 0000 0000 0000'
                  maxLength={19}
                  register={register}
                  error={errors?.payment?.cardNumber}
                />
                <NumericInput
                  className='bg-white'
                  id='expiration'
                  name='payment.expiration'
                  label='Expiration Date'
                  placeholder='MM/YY'
                  maxLength={5}
                  register={register}
                  error={errors?.payment?.expiration}
                />
                <DefaultInput 
                  className='bg-white'
                  id='cardholder'
                  label='Card Holder'
                  placeholder='Card holder'
                  name='payment.cardHolder'
                  register={register}
                  error={errors?.payment?.cardHolder}
                />
                <NumericInput 
                  className='bg-white'
                  id='cvc'
                  label='CVC'
                  name='payment.cvc'
                  placeholder='CVC'
                  maxLength={4}
                  register={register}
                  error={errors?.payment?.cvc}
                />
              </div>
            </div>
        </div>
    </div>
  )
}
