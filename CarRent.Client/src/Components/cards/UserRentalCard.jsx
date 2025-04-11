import React, { useState } from 'react'
import { IMGURL } from '../../common/constants'
import { formatDate } from '../../Utils/FormatDate'
import { Eye, Star, Calendar, Clock, MapPin, ChevronRight } from 'lucide-react'
import ReviewModal from '../Reviews/ReviewModal'
import { Link } from 'react-router-dom'

export default function UserRentalCard({ rental, onViewDetails }) {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    
    const {
        id,
        vehicle = {},
        status = 'Pending',
        pickup,
        dropOff,
        amount = 0,
    } = rental || {};
    
    const getStatusStyle = (status) => {
        const statusLower = status?.toLowerCase();
        const styles = {
            active: {
                bg: 'bg-green-50',
                text: 'text-green-700',
                border: 'border-green-200',
                icon: 'bg-green-100',
                dot: 'bg-green-500'
            },
            pending: {
                bg: 'bg-yellow-50',
                text: 'text-yellow-700',
                border: 'border-yellow-200',
                icon: 'bg-yellow-100',
                dot: 'bg-yellow-500'
            },
            completed: {
                bg: 'bg-blue-50',
                text: 'text-blue-700',
                border: 'border-blue-200',
                icon: 'bg-blue-100',
                dot: 'bg-blue-500'
            },
            cancelled: {
                bg: 'bg-red-50',
                text: 'text-red-700',
                border: 'border-red-200',
                icon: 'bg-red-100',
                dot: 'bg-red-500'
            }
        };
        return styles[statusLower] || styles.pending;
    };
    
    const statusStyle = getStatusStyle(status);

    return (
        <>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row h-full">
                    {/* Car image with status indicator - now full height */}
                    <div className=" sm:w-2/5 md:w-1/3 relative h-full bg-gray-50 min-h-[200px]">
                        
                        {/* Status badge positioned on top of image */}
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${statusStyle.dot} animate-pulse`}></span>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text} shadow-sm`}>
                                {status}
                            </span>
                        </div>
                        
                        {/* Full height image */}
                        <img 
                            src={vehicle.mainImage ? `${IMGURL}${vehicle.mainImage}` : "/car-placeholder.png"} 
                            alt={vehicle.brand || 'Car'} 
                            className="w-full h-full object-contain p-10 md:p-12 absolute inset-0"
                            onError={(e) => {
                                e.target.src = "/car-placeholder.png";
                            }}
                        />
                    </div>
                    
                    {/* Rental details */}
                    <div className="p-6 sm:w-3/5 md:w-2/3 flex flex-col justify-between border-l border-gray-100">
                        {/* Top section with dates */}
                        <div>
                            {/* Gradient divider for visual interest */}
                            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-5"></div>
                            
                            {/* Rental ID and summary */}
                            <div className="mb-5 flex flex-col">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {vehicle.brand} {vehicle.model}
                                    <span className="ml-2 text-sm font-normal text-gray-500">
                                        {vehicle.year && `(${vehicle.year})`}
                                    </span>
                                </h3>
                            </div>
                            
                            {/* Rental dates in a cleaner format */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full ${statusStyle.icon} flex items-center justify-center shadow-sm`}>
                                        <Calendar size={18} className={statusStyle.text} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-medium tracking-wider">Pick-up</p>
                                        <div className="flex flex-col">
                                            <p className="font-medium text-gray-900">{formatDate(pickup?.date)}</p>
                                            <div className="flex items-center gap-1">
                                                <Clock size={12} className="text-gray-400" />
                                                <p className="text-xs text-gray-500">{pickup?.time || '09:00'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full ${statusStyle.icon} flex items-center justify-center shadow-sm`}>
                                        <Calendar size={18} className={statusStyle.text} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-medium tracking-wider">Drop-off</p>
                                        <div className="flex flex-col">
                                            <p className="font-medium text-gray-900">{formatDate(dropOff?.date)}</p>
                                            <div className="flex items-center gap-1">
                                                <Clock size={12} className="text-gray-400" />
                                                <p className="text-xs text-gray-500">{dropOff?.time || '18:00'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Price and actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-100">
                            <div className="mb-4 sm:mb-0">
                                <p className="text-xs text-gray-500 uppercase font-medium tracking-wider">Total Amount</p>
                                <div className="flex items-baseline">
                                    <p className="text-2xl font-bold text-gray-900">${amount.toFixed(2)}</p>
                                    <span className="ml-1 text-xs text-gray-500">USD</span>
                                </div>
                            </div>
                            
                            <div className="flex gap-3">
                                <Link 
                                    className="flex items-center justify-center gap-1.5 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-sm"
                                    to={`/cars/${rental.vehicle.id}`}
                                >
                                    <Eye size={16} />
                                    <span>Details</span>
                                    <ChevronRight size={14} className="ml-1" />
                                </Link>
                                
                                {status === 'Completed' && (
                                    <button 
                                        className="flex items-center justify-center gap-1.5 px-5 py-2.5 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200 border border-green-100 shadow-sm hover:shadow"
                                        onClick={() => setIsReviewModalOpen(true)}
                                    >
                                        <Star size={16} />
                                        <span>Review</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Modal */}
            <ReviewModal 
                isOpen={isReviewModalOpen} 
                onClose={() => setIsReviewModalOpen(false)}
                rental={rental}
            />
        </>
    );
}