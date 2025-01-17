import { Link } from "react-router-dom";
import Button from "../Components/Buttons/Button";
import DefaultInput from "../Components/Inputs/DefaultInput";
import { Lock, Mail } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function Signin() {
  return (
    <div className="min-h-screen w-full py-6 px-6 md:px-14 mx-auto max-w-7xl
              flex flex-col md:flex-row md:gap-12 lg:gap-20 bg-white">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 lg:w-2/5 order-2 md:order-1 flex flex-col justify-center gap-7">
        {/* mobile image */}
        <div className="relative md:hidden rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-15 rounded-2xl"></div>
          <img
            src="background4.jpg"
            alt="car image"
            className="w-full h-56 md:h-72 object-cover"
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <div className="space-y-3 mb-5">
            <h1 className="text-3xl text-blue-500 font-bold">Welcome back👋</h1> 
            <p className="text-gray-700">Today is a new day. It's your day. You shape it. 
            Sign in to start managing your projects.</p>
          </div>
          <DefaultInput
            className=''
            icon={<Mail size={16}/>}
            id='email'
            label='Email'
            placeholder='Email'
            name='email'
            type='email'
          />
          <DefaultInput
            className=''
            icon={<Lock size={16}/>}
            id='password'
            label='Password'
            placeholder='********'
            minlength='8'
            name='paswword'
            type='email'
          />
          <Link className='text-blue-500 self-end'>Forgot password?</Link>
          <Button>Sign in</Button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-sm text-gray-500 bg-white">or</span>
            </div>
          </div>

          {/* social logins buttons */}
          <div className="flex  flex-col gap-3">
            <Link className="flex items-center justify-center gap-3 px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group">
              <FcGoogle className="w-5 h-5" />
              <span className="text-gray-600 font-medium group-hover:text-gray-900">Sign in with Google</span>
            </Link>
            <Link
              to='facebook' 
              className="flex items-center justify-center gap-3 px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group">
              <FaFacebook className="w-5 h-5 text-blue-600" />
              <span className="text-gray-600 font-medium group-hover:text-gray-900">Sign in with Facebook</span>
            </Link>
          </div>

          <p className="text-center text-sm text-gray-500 mt-2">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
              Sign up
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
            alt="" 
            className="w-full h-full shadow-md object-cover rounded-2xl"/>
          <div className="absolute space-y-2 bottom-10 left-7 text-white">
            <h2 className="text-4xl font-bold">Premium Car Rentals</h2>
            <p>Experience luxury and comfort with our premium fleet.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
