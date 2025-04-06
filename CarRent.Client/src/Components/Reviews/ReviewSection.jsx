import React from 'react'
import ReviewCard from './ReviewCard'
import { useVehicleReviews } from '../../Queries/reviews/useVehicleReviews'
import { LoaderBarsSpinner } from '../LoaderBarsSpinner'

// const reviews = [
//     {
//         userAvatar:'',
//         userName:'Alex Stanton',
//         userTitle:'CEO at Bukalapak',
//         description:'We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.',
//         rating:4,
//         createdAt:'21 july 2022'
        
//     },
//     {
//         uerAvatar:'',
//         userName:'Skylar Dias',
//         userTitle:'CEO at Amazon',
//         description:'We are greatly helped by the services of the MORENT Application. Morent has low prices and also a wide variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.',
//         rating:3,
//         createdAt:'20 july 2022'
        
//     }    
// ]

export default function ReviewSection({vehicleId}) {

    const { data: reviews, isLoading, error } = useVehicleReviews(vehicleId)

    if (isLoading) {
        return (
            <div className='flex justify-center items-center min-h-screen w-full'>
                <LoaderBarsSpinner/>
            </div>
        )
    }
    
  return (
    <div className='p-7 rounded-xl bg-white w-full'>
        <div className='flex items-center gap-4 border-b pb-4'>
            <h1 className='text-xl font-semibold'>Reviews</h1>
            <span className='text-white rounded-md bg-blue-600 px-4 py-1'>13</span>
        </div>
        <div className='pt-4 space-y-7'>
            {
                reviews.map(review => (
                    <ReviewCard
                        key={review.id}
                        avatar={review.userAvatar}
                        userName={review.username}
                        userTitle={review.userTitle}
                        description={review.comment}
                        rating={review.rating}
                        createdAt={review.dateCreated}
                    />
                ))
            }
        </div>
    </div>
  )
}
