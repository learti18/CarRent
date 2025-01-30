import React from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import { Link } from 'react-router-dom'
import RentalTableRow from '../../../Components/Dashboard/Rentals/RentalTableRow'
import rentals from '../../../rentals'
import Table from '../../../Components/Dashboard/Common/Table'

export default function Rentals() {
  const columns = [
    { key: 'vehicle', label: 'Vehicle' },
    { key: 'renter', label: 'Renter' },
    { key: 'status', label: 'Status' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'price', label: 'Price' },
    { key: 'actions', label: 'Actions' }
  ]

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-semibold'>Rentals</h1>
          <p className='text-gray-500'>Manage your vehicle listings and rentals</p>
        </div>
        <Link 
          to='new'
          className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'
        >
          <Plus size={20} />
          Add New Rental
        </Link>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='bg-white p-4 rounded-xl shadow-sm'>
          <p className='text-gray-500'>Active Rentals</p>
          <p className='text-2xl font-semibold'>24</p>
        </div>
        <div className='bg-white p-4 rounded-xl shadow-sm'>
          <p className='text-gray-500'>Available Vehicles</p>
          <p className='text-2xl font-semibold'>12</p>
        </div>
        <div className='bg-white p-4 rounded-xl shadow-sm'>
          <p className='text-gray-500'>Total Revenue</p>
          <p className='text-2xl font-semibold'>$12,450</p>
        </div>
      </div>

      {/* Filters */}
      <div className='flex gap-4 items-center'>
        <div className='flex-1 relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={20}/>
          <input 
            type="text"
            placeholder='Search rentals...'
            className='w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200'
          />
        </div>
        <button className='flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50'>
          <Filter size={20}/>
          Filters
        </button>
      </div>

      {/* Rentals Table */}
      <Table 
        columns={columns}
        data={rentals}
        renderRow={(rental, index) => (
          <RentalTableRow key={index} rental={rental} type="rental" />
        )}
      />
    </div>
  )
}