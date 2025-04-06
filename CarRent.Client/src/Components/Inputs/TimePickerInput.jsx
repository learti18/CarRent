import React, { useState, useEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';
import TimePicker from 'react-time-picker';
import { Clock, ChevronDown, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import 'react-time-picker/dist/TimePicker.css';

export default function TimePickerInput({ label, name, control, error, className, disabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAbove, setShowAbove] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pickerRef = useRef(null);
  
  // Generate time options in 30-minute intervals
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    timeOptions.push(`${hour}:00`);
    timeOptions.push(`${hour}:30`);
  }
  
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
  
  // Format time for display
  const formatTimeDisplay = (time) => {
    if (!time) return 'Select time';
    
    try {
      const [hour, minute] = time.split(':');
      const hourNum = parseInt(hour);
      const ampm = hourNum >= 12 ? 'PM' : 'AM';
      const hour12 = hourNum % 12 || 12;
      return `${hour12}:${minute} ${ampm}`;
    } catch (error) {
      console.error('Invalid time format:', error);
      return 'Select time';
    }
  };
  
  // Handle dropdown position on open
  useEffect(() => {
    if (isOpen && pickerRef.current && !isMobile) {
      const rect = pickerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - rect.bottom;
      const spaceNeeded = 300; // approximate height of time picker dropdown
      
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
  
  // Mobile modal component for time picker
  const MobileTimePickerModal = ({ field }) => {
    return createPortal(
      <div 
        className="fixed inset-0 bg-white"
        style={{ zIndex: 9999 }}
      >
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Select Time</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          <div className="react-time-picker-custom mb-4 flex justify-center">
            <TimePicker
              onChange={(value) => {
                field.onChange(value);
              }}
              value={field.value}
              format="H:mm"
              disableClock={true}
              clearIcon={null}
              className="react-time-picker-custom"
              disabled={disabled}
            />
          </div>
          
          <div className="mt-3 overflow-auto">
            {timeOptions.map((time) => (
              <button
                key={time}
                type="button"
                className={`w-full text-left px-4 py-3 rounded hover:bg-blue-50 ${
                  field.value === time ? 'bg-blue-100 font-medium' : ''
                }`}
                onClick={() => {
                  field.onChange(time);
                }}
                disabled={disabled}
              >
                {formatTimeDisplay(time)}
              </button>
            ))}
          </div>
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
                className={`w-full flex items-center justify-between ${
                  error ? 'border border-red-500' : 'border-none'
                } bg-white rounded-md ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} ${className || 'px-2 py-1.5'}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
              >
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-gray-800 text-sm font-medium">
                    {formatTimeDisplay(field.value)}
                  </span>
                </div>
                  {!disabled && (
                    <ChevronDown
                      className={`h-4 w-4 text-gray-500 transition-transform ${
                        isOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  )}
              </div>
              
              {isOpen && !isMobile && (
                <div
                  className={`absolute z-50 ${
                    showAbove ? 'bottom-full mb-1' : 'top-full mt-1'
                  } bg-white shadow-lg rounded-md p-4 time-picker-dropdown`}
                >
                  <div className="react-time-picker-custom">
                    <TimePicker
                      onChange={(value) => {
                        field.onChange(value);
                        setIsOpen(false);
                      }}
                      value={field.value}
                      format="H:mm"
                      disableClock={true}
                      clearIcon={null}
                      className="react-time-picker-custom"
                      disabled={disabled}
                    />
                  </div>
                  
                  <div className="mt-3 max-h-40 overflow-y-auto">
                    {timeOptions.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`w-full text-left px-3 py-2 rounded hover:bg-blue-50 ${
                          field.value === time ? 'bg-blue-100 font-medium' : ''
                        }`}
                        onClick={() => {
                          field.onChange(time);
                          setIsOpen(false);
                        }}
                        disabled={disabled}
                      >
                        {formatTimeDisplay(time)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Mobile time picker modal using portal */}
              {isOpen && isMobile && <MobileTimePickerModal field={field} />}
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