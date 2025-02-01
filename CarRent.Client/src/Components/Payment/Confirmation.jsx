import React from 'react'
import CheckBox from '../Inputs/CheckBox';
import Button from '../Buttons/Button';

export default function Confirmation({register}) {
  return (
    <div>
        <div className='bg-white rounded-lg py-8 px-5'>
            <h1 className='text-xl font-semibold'>Confirmation</h1>
            <div className='flex flex-row justify-between text-sm text-slate-400'>
                <p>We are getting to the end. Just few clicks and your rental is ready!</p>
                <p>step 4 of 4</p>
            </div>
            <div className='flex flex-col flex-wrap gap-6 pt-7'>
                <div className='space-y-4'>
                    <div className='p-3 rounded-md bg-gray-100'>
                        <CheckBox
                            id='newsletter'
                            value='newsletter'
                            name='newsletter'
                            label='I agree with sending an Marketing and newsletter emails. No spam, promissed!'
                            register={register}
                        />
                    </div>
                    <div className='p-3 rounded-md bg-gray-100'>
                        <CheckBox 
                            id='terms&conditions' 
                            value='terms&conditions'
                            label='I agree with our terms and conditions and privacy policy.'
                            name='termsConditions'
                            register={register}
                        />
                    </div>
                </div>
                <Button
                    type='submit' 
                    className='mr-auto'>Rent now</Button>
                <div>
                    <img src="/security-safety.svg" alt="" />
                    <h2 className='font-semibold mt-4'>All your data is safe</h2>
                    <p className='text-sm text-slate-400'>We are using the most advanced security to provide you the best experience ever.</p>
                </div>
            </div>
        </div>
    </div>
  )
}
