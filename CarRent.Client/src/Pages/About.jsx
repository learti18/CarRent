import React from 'react';
import { Shield, Clock, Car, Users, Star, Headphones, CheckCircle2, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function About() {
  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "500+", label: "Premium Cars" },
    { number: "50+", label: "Locations" },
    { number: "24/7", label: "Customer Support" }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Safe and Secure",
      description: "Comprehensive insurance coverage and well-maintained vehicles for your peace of mind."
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service to assist you whenever you need help."
    },
    {
      icon: <Car className="w-8 h-8 text-blue-500" />,
      title: "Premium Fleet",
      description: "Wide selection of well-maintained vehicles to suit every need and preference."
    }
  ];

  const team = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      image: "/team/ceo.jpg"
    },
    {
      name: "Sarah Johnson",
      role: "Operations Director",
      image: "/team/operations.jpg"
    },
    {
      name: "Michael Chen",
      role: "Customer Experience",
      image: "/team/customer.jpg"
    }
  ];

  const advantages = [
    "Flexible rental periods",
    "No hidden charges",
    "Free cancellation",
    "Online booking system",
    "Multiple pickup locations",
    "Regular maintenance",
    "GPS navigation included",
    "24/7 roadside assistance"
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 h-[500px]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img
            src="/background2.jpg"
            alt="Luxury cars"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Driving Excellence in Car Rental Services
            </h1>
            <p className="text-xl text-gray-100">
              Since 2015, we've been revolutionizing the car rental experience with 
              premium vehicles and exceptional service.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-xl shadow-xl p-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-blue-600">{stat.number}</div>
              <div className="text-gray-600 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              At EliteDrive, we're on a mission to transform the way people think about car rental. 
              We believe in making premium vehicles accessible to everyone while providing an 
              unmatched level of service and transparency.
            </p>
            <div className="grid gap-4">
              {advantages.slice(0, 4).map((advantage, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-500 w-5 h-5" />
                  <span className="text-gray-700">{advantage}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="/background4.jpg"
              alt="Premium car collection"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-lg">
              <p className="text-2xl font-bold">15+</p>
              <p>Years of Excellence</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose EliteDrive</h2>
            <p className="text-lg text-gray-600">
              Experience the perfect blend of luxury, convenience, and reliability with our 
              premium car rental services.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Experience Premium Car Rental?
          </h2>
          <Link
            to="/cars"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Browse Our Fleet
          </Link>
        </div>
      </div>
    </div>
  );
}
