import React, { useState } from 'react'
import DefaultInput from '../Inputs/DefaultInput'
import CardNumberInput from '../Inputs/CardNumberInput'
import ExpirationInput from '../Inputs/ExpirationInput'
import RadioGroup from '../Inputs/RadioGroup'

export default function PaymentMethod() {
  const [cardData,setCardData] = useState({
    cardNumber:'',
    expiration:'',
    cardHolder:'',
    cvc:''
  })

  const handleChange = (e) => {
    const { name,value } = e.target
  
    setCardData(prev => ({
      ...prev,
      [name]:value
    }))
  }

  return (
    <div>
        <div className='bg-white rounded-lg py-8 px-5'>
            <h1 className='text-lg font-bold'>Payment Method</h1>
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
                <CardNumberInput
                  id='cardNumber'
                  name='cardNumber'
                  label='Card Number'
                  placeholder='0000 0000 0000 0000'
                  required
                  className='bg-white'
                  value={cardData.cardNumber}
                  onChange={handleChange}
                />
                <ExpirationInput
                  className='bg-white'
                  id='expiration'
                  name='expiration'
                  label='Expiration Date'
                  required
                  value={cardData.expiration}
                  onChange={handleChange}
                />
                <DefaultInput 
                  className='bg-white'
                  id='cardholder'
                  label='Card Holder'
                  name='cardHolder'
                  placeholder='Card holder'
                  maxLength='20'
                  required
                  value={cardData.cardHolder}
                  onChange={handleChange}

                />
                <DefaultInput 
                  className='bg-white'
                  id='cvc'
                  label='CVC'
                  name='cvc'
                  placeholder='CVC'
                  type='text'
                  inputMode='numeric'
                  maxLength='4'
                  pattern='^[0-9]{3,4}$'
                  required
                  value={cardData.cvc}
                  onChange={handleChange}
                />
              </div>
            </div>
        </div>
    </div>
  )
}
