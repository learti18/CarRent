import { Link } from "react-router-dom";
import Button from "../Components/Buttons/Button";
import DefaultInput from "../Components/Inputs/DefaultInput";
import { Lock, Mail, User, Phone } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function Signup() {
  return (
    <div className="min-h-screen w-full px-5 py-6 md:px-14 max-w-7xl mx-auto 
              flex flex-col md:flex-row md:gap-12 lg:gap-24 bg-white">
      
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 lg:w-2/5 order-2 md:order-1 flex flex-col justify-center gap-7">
        {/* mobile image */}
        <div className="relative md:hidden rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/20 rounded-2xl"></div>
          <img
            src="background4.jpg"
            alt="car image"
            className="w-full h-56 md:h-72 object-cover"
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <div className="space-y-3 mb-5">
            <h1 className="text-3xl text-blue-500 font-bold">Create Account ✨</h1> 
            <p className="text-gray-700">Join us today! Create an account to access premium car rentals and exclusive offers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <DefaultInput
              icon={<User size={16}/>}
              id='firstname'
              label='First Name'
              placeholder='John'
              name='firstname'
              type='text'
            />
            <DefaultInput
              icon={<User size={16}/>}
              id='lastname'
              label='Last Name'
              placeholder='Doe'
              name='lastname'
              type='text'
            />
          </div>

          <DefaultInput
            icon={<Mail size={16}/>}
            id='email'
            label='Email'
            placeholder='john@example.com'
            name='email'
            type='email'
          />
          <DefaultInput
            icon={<Phone size={16}/>}
            id='phone'
            label='Phone'
            placeholder='+1234567890'
            name='phone'
            type='tel'
          />
          <DefaultInput
            icon={<Lock size={16}/>}
            id='password'
            label='Password'
            placeholder='••••••••'
            minLength='8'
            name='password'
            type='password'
          />
          <DefaultInput
            icon={<Lock size={16}/>}
            id='confirmPassword'
            label='Confirm Password'
            placeholder='••••••••'
            minLength='8'
            name='confirmPassword'
            type='password'
          />
          
          <Button className='mt-4'>Create Account</Button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-sm text-gray-500 bg-white">or sign up with</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link className="flex items-center justify-center gap-3 px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 group">
              <FcGoogle className="w-5 h-5" />
              <span className="text-gray-600 font-medium group-hover:text-gray-900">Continue with Google</span>
            </Link>
            <Link className="flex items-center justify-center gap-3 px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 group">
              <FaFacebook className="w-5 h-5 text-blue-600" />
              <span className="text-gray-600 font-medium group-hover:text-gray-900">Continue with Facebook</span>
            </Link>
          </div>

          <p className="text-center text-sm text-gray-500 mt-2">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-500 hover:text-blue-600 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Desktop image */}
      <div className="hidden md:block md:w-1/2 lg:w-3/5 order-1 md:order-2">
        <div className="relative h-full">
          <div className="absolute shadow-md inset-0 bg-gradient-to-t from-black/60 to-black/20 rounded-2xl"></div>
          <img 
            src="background4.jpg" 
            alt="Luxury car showcase" 
            className="w-full h-full shadow-md object-cover rounded-2xl"
          />
          <div className="absolute space-y-3 bottom-10 left-7 text-white">
            <h2 className="text-4xl font-bold">Join Our Community</h2>
            <p className="max-w-md text-gray-100">Get access to our premium fleet and exclusive member benefits.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
