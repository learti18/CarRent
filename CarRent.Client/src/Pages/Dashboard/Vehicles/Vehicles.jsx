import React from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import { Link } from 'react-router-dom'
import Table from '../../../Components/Dashboard/Common/Table'
import cars from '../../../cars'
import VehicleTableRow from '../../../Components/Dashboard/Vehicles/VehicleTableRow'

export default function Vehicles() {
  const columns = [
    { key: 'vehicle', label: 'Vehicle' },
    { key: 'type', label: 'Type' },
    { key: 'capacity', label: 'Capacity' },
    { key: 'transmission', label: 'Transmission' },
    { key: 'pricePerDay', label: 'Price/Day' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' }
  ]

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-semibold'>Vehicles</h1>
          <p className='text-gray-500'>Manage your vehicle fleet</p>
        </div>
        <Link 
          to='new'
          className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'
        >
          <Plus size={20} />
          Add New Vehicle
        </Link>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='bg-white p-4 rounded-xl shadow-sm'>
          <p className='text-gray-500'>Total Vehicles</p>
          <p className='text-2xl font-semibold'>{cars.length}</p>
        </div>
        <div className='bg-white p-4 rounded-xl shadow-sm'>
          <p className='text-gray-500'>Available</p>
          <p className='text-2xl font-semibold'>{cars.length - 5}</p>
        </div>
        <div className='bg-white p-4 rounded-xl shadow-sm'>
          <p className='text-gray-500'>In Maintenance</p>
          <p className='text-2xl font-semibold'>2</p>
        </div>
      </div>

      {/* Filters */}
      <div className='flex gap-4 items-center'>
        <div className='flex-1 relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={20}/>
          <input 
            type="text"
            placeholder='Search vehicles...'
            className='w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200'
          />
        </div>
        <button className='flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50'>
          <Filter size={20}/>
          Filters
        </button>
      </div>

      {/* Vehicles Table */}
      <Table 
        columns={columns}
        data={cars}
        renderRow={(vehicle, index) => (
          <VehicleTableRow key={index} vehicle={vehicle} type="vehicle" />
        )}
      />
    </div>
  )
}
