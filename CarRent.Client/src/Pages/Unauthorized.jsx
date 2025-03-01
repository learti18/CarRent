import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react'
import Logo from '../Components/Logo'

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-2xl shadow-lg overflow-hidden max-w-lg w-full"
      >
        {/* Top accent bar */}
        <div className="h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>
        
        {/* Content */}
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <Logo variant="default" className="mb-3" />
          </div>
          
          <div className="flex flex-col items-center text-center mb-8">
            <div className="bg-red-50 p-4 rounded-full mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              >
                <ShieldAlert className="h-14 w-14 text-red-500" strokeWidth={1.5} />
              </motion.div>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-gray-800 mb-2"
            >
              Access Denied
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 mb-1"
            >
              You don't have permission to access this page.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-sm"
            >
              Please make sure you have the correct permissions or try signing in again.
            </motion.p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link 
                to="/"
                className="flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200 w-full"
              >
                <Home size={18} />
                <span>Back to Home</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}