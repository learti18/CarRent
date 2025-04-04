import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import { LoaderBarsSpinner } from './../Components/LoaderBarsSpinner';

export default function UserProfile() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoaderBarsSpinner/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className='max-w-7xl mx-auto px-4 bg-white shadow-md rounded-lg'>
        {/* profile header */}
        <div className='flex items-center gap-5 p-6 border-b border-gray-200'>
            <img src="1.jpg" alt="" className='w-32 h-32 rounded-full shadow-md shadow-inner'/>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>User Name</h1>
                <h2><strong>Email:</strong> username@gmail.com</h2>
                <h2><strong>Phone:</strong> 5443654645</h2>
            </div>
        </div>

        {/*  */}
      </div>
    </div>
  );
}
