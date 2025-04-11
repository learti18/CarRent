import React, { useState } from 'react';
import { X, Star, MessageSquare, ThumbsUp, MessageCircle } from 'lucide-react';
import StarRating from './StarRating';
import { toast } from 'sonner';
import { IMGURL } from '../../common/constants';
import { createPortal } from 'react-dom';

export default function ReviewModal({ isOpen, onClose, rental }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Successfully submitted
      toast.success('Review submitted successfully');
      onClose();
      
      // Reset form
      setRating(0);
      setReviewText('');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const { vehicle = {} } = rental || {};

  // Use createPortal to render directly to document.body
  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-auto">
      {/* Semi-transparent overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      
      {/* Modal positioning container */}
      <div className="fixed inset-0 py-10 px-4 pointer-events-none flex items-center justify-center overflow-auto">
        {/* Modal content container with scroll capability */}
        <div 
          className="relative max-h-[95vh] overflow-auto pointer-events-auto w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal box */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full transform transition-all">
            {/* Header with fancy gradient */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6 text-white relative">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-2 bg-white/20 hover:bg-white/30 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <span className="sr-only">Close</span>
                <X className="h-5 w-5" />
              </button>
              
              <h2 className="text-2xl font-bold">Share Your Experience</h2>
              <p className="text-blue-100 mt-1">Your feedback helps other drivers make better choices.</p>
            </div>
            
            {/* Vehicle information with improved layout */}
            <div className="flex items-center gap-6 border-b border-gray-100 p-8 bg-gray-50">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-inner">
                <img
                  src={vehicle.mainImage ? `${IMGURL}${vehicle.mainImage}` : "/car-placeholder.png"}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="h-full w-full object-contain p-2"
                  onError={(e) => {
                    e.target.src = "/car-placeholder.png";
                  }}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {vehicle.brand} {vehicle.model}
                </h3>
                <p className="text-gray-500 flex items-center gap-1.5 mt-1">
                  <span>{vehicle.year}</span>
                  {vehicle.category && (
                    <>
                      <span className="inline-block w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>{vehicle.category}</span>
                    </>
                  )}
                </p>
              </div>
            </div>
            
            {/* Review form with improved styling */}
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left column */}
                <div>
                  <div className="mb-6">
                    <label className="block text-lg font-semibold text-gray-900 mb-3">
                      Rate Your Experience
                    </label>
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                      <StarRating rating={rating} setRating={setRating} disabled={isSubmitting} />
                      <p className="mt-3 text-sm text-gray-500">
                        {rating === 5 ? "Excellent - Exceeded all expectations" :
                         rating === 4 ? "Great - Very satisfied with the experience" :
                         rating === 3 ? "Good - Satisfactory experience" :
                         rating === 2 ? "Fair - Below expectations" :
                         rating === 1 ? "Poor - Disappointed with the experience" :
                         "Select a rating"}
                      </p>
                      {rating === 0 && (
                        <p className="mt-2 text-sm text-rose-500">Please select a rating</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Review tips */}
                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                    <h4 className="text-blue-800 font-medium flex items-center gap-2 mb-3">
                      <MessageCircle size={18} />
                      <span>Review Tips</span>
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <ThumbsUp size={14} className="mt-1 flex-shrink-0" />
                        <span>Share specific details about the driving experience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ThumbsUp size={14} className="mt-1 flex-shrink-0" />
                        <span>Mention the car's performance, comfort, and features</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ThumbsUp size={14} className="mt-1 flex-shrink-0" />
                        <span>Would you recommend this vehicle to others?</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Right column */}
                <div>
                  <div className="mb-6">
                    <label htmlFor="review" className="block text-lg font-semibold text-gray-900 mb-3">
                      Write Your Review
                    </label>
                    <div className="relative">
                      <textarea
                        id="review"
                        rows={10}
                        className="w-full rounded-xl border border-gray-300 px-5 py-4 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                        placeholder="Share your experience with this vehicle..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        disabled={isSubmitting}
                      ></textarea>
                      <div className="absolute bottom-4 right-4 text-gray-400 text-sm">
                        {reviewText.length}/500
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-end gap-4 mt-6 border-t border-gray-100 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 disabled:opacity-70 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Star size={18} className="fill-white" />
                      <span>Submit Review</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}