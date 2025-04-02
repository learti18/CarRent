import React, { useState, useEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { Calendar, ChevronDown, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import 'react-datepicker/dist/react-datepicker.css';

export default function DatePickerInput({ label, name, control, error, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAbove, setShowAbove] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pickerRef = useRef(null);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Prevent body scroll when modal is open on mobile
  useEffect(() => {
    if (isOpen && isMobile) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflowY = 'hidden';
      
      return () => {
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.style.overflowY = '';
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen, isMobile]);
  
  // Handle dropdown position on open
  useEffect(() => {
    if (isOpen && pickerRef.current && !isMobile) {
      const rect = pickerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - rect.bottom;
      const spaceNeeded = 320; // approximate height of calendar
      
      setShowAbove(spaceBelow < spaceNeeded);
    }
  }, [isOpen, isMobile]);
  
  // Add click outside listener to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    // Only add for desktop - mobile uses full screen modal approach
    if (isOpen && !isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isMobile]);
  
  // Format date value to string when needed
  const formatDate = (date) => {
    if (!date) return '';
    try {
      return format(new Date(date), 'yyyy-MM-dd');
    } catch (error) {
      console.error('Invalid date format:', error);
      return '';
    }
  };
  
  // Mobile modal for date picker
  const MobileDatePickerModal = ({ field }) => {
    return createPortal(
      <div 
        className="fixed inset-0 bg-white" 
        style={{ zIndex: 9999 }}
      >
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Select Date</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 p-4 overflow-auto flex flex-col items-center">
          <ReactDatePicker
            selected={field.value ? new Date(field.value) : null}
            onChange={(date) => {
              field.onChange(formatDate(date));
              setIsOpen(false);
            }}
            inline
            dateFormat="yyyy-MM-dd"
            calendarClassName="rdp w-full"
            minDate={new Date()}
          />
        </div>
        <div className="p-4 border-t border-gray-200">
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium"
            onClick={() => setIsOpen(false)}
          >
            Done
          </button>
        </div>
      </div>,
      document.body
    );
  };
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative" ref={pickerRef}>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <>
              <div
                className={`w-full flex items-center justify-between px-2 py-1.5 ${
                  error ? 'border border-red-500' : 'border-none'
                } bg-white rounded-md cursor-pointer ${className || ''}`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-gray-800 text-sm font-medium">
                    {field.value
                      ? format(new Date(field.value), 'MMM dd, yyyy')
                      : 'Select date'}
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform ${
                    isOpen ? 'transform rotate-180' : ''
                  }`}
                />
              </div>
              
              {isOpen && !isMobile && (
                <div
                  className={`absolute z-50 mt-1 bg-white shadow-lg rounded-md p-4 date-picker-dropdown ${
                    showAbove ? 'bottom-full mb-1' : 'top-full'
                  }`}
                >
                  <ReactDatePicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => {
                      field.onChange(formatDate(date));
                      setIsOpen(false);
                    }}
                    inline
                    dateFormat="yyyy-MM-dd"
                    calendarClassName="rdp"
                    minDate={new Date()}
                  />
                </div>
              )}
              
              {/* Mobile date picker modal using portal */}
              {isOpen && isMobile && <MobileDatePickerModal field={field} />}
            </>
          )}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
}
