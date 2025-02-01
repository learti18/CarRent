import { Link } from "react-router-dom"
import Button from "../../Components/Buttons/Button"
import DefaultInput from "../../Components/Inputs/DefaultInput"
import { Lock, Mail } from 'lucide-react'
import AuthLayout from "../../Components/Auth/AuthLayout"
import AuthHero from "../../Components/Auth/AuthHero"
import SocialLogin from "../../Components/Auth/SocialLogin"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { SignInSchema } from "../../Schemas/SignInSchema"
import Logo from "../../Components/Logo"

export default function Signin() {
  
  const { register, handleSubmit, formState:{errors} } = useForm({
    resolver: yupResolver(SignInSchema),
    defaultValues:{
      email:'',
      password:'',
    }
  })

  const submitForm = (data) => {
    console.log('Data: ',data)
  }

  const formSection = (
    <>
      {/* mobile image */}
      <div className="relative md:hidden rounded-xl overflow-hidden">
        <div className="absolute top-5 left-5 z-10">
          <div className="px-5 py-2 rounded-xl bg-white/10 backdrop-blur-md shadow-lg 
                        transition-all duration-300 hover:bg-white/20">
            <Logo variant="gradient" />
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-15 rounded-2xl"></div>
        <img src="background4.jpg" alt="car image" className="w-full h-56 md:h-72 object-cover" />
      </div>

      <form
        onSubmit={handleSubmit(submitForm)} 
        className="flex flex-col gap-3 w-full">
        <div className="space-y-3 mb-5">
          <h1 className="text-3xl text-blue-500 font-semibold">Welcome back👋</h1> 
          <p className="text-gray-700">Today is a new day. It's your day. You shape it.</p>
        </div>
        <DefaultInput 
          icon={<Mail size={16}/>} 
          id='email' 
          label='Email' 
          placeholder='Email' 
          name='email' 
          type='email'
          register={register}
          error={errors.email} 
        />
        <DefaultInput 
          icon={<Lock size={16}/>} 
          id='password' 
          label='Password' 
          placeholder='********'  
          name='password' 
          type='password'
          register={register} 
          error={errors.password}
        />
        <Link className='text-blue-500 self-end'>Forgot password?</Link>
        <Button>Sign in</Button>
        
        <SocialLogin type="sign in" />

        <p className="text-center text-sm text-gray-500 mt-2">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:text-blue-600 font-medium">Sign up</Link>
        </p>
      </form>
    </>
  )

  return (
    <AuthLayout 
      formSection={formSection}
      heroSection={
        <AuthHero 
          title="Premium Car Rentals" 
          description="Experience luxury and comfort with our premium fleet."
        />
      }
    />
  )
}
