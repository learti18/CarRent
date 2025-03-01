import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Car } from 'lucide-react';
import Button from '../Buttons/Button';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate()
  return (
    <div className='relative min-h-screen'>
      {/* Background with gradient */}
      <div className='absolute inset-0'>
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className='absolute inset-0 bg-[url("background4.jpg")] bg-cover bg-center'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/20'></div>
      </div>

      {/* Content */}
      <div className='max-w-7xl relative h-screen flex flex-col justify-center mx-auto px-6'>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='flex flex-col max-w-2xl gap-6'
        >
          <h1 className='text-white text-4xl md:text-5xl xl:text-7xl font-semibold leading-tight'>
            Find, book and rent a car{' '}
            <span className='relative inline-block'>
              <span className='text-blue-500'>Easily</span>
            </span>
          </h1>
          
          <p className='text-gray-200 text-sm md:text-xl'>
            Get a car wherever and whenever you need it with your iOS and Android device.
          </p>

          <div className='flex gap-4 mt-4'>
            <Button className='flex items-center gap-2 group' onClick={() => navigate('cars')}>
              Get Started
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            {/* <Button variant="outline" className='text-white border-white hover:bg-white/10'>
              Learn More
            </Button> */}
          </div>

          {/* Features */}
          <div className='flex gap-6 mt-8'>
            {[
              { icon: MapPin, text: '150+ Locations' },
              { icon: Calendar, text: 'Quick Booking' },
              { icon: Car, text: '100+ Cars' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className='flex items-center gap-2 text-white/80'
              >
                <feature.icon className="w-5 h-5 text-blue-500" />
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}