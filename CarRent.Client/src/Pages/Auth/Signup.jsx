import { Link } from "react-router-dom"
import Button from "../../Components/Buttons/Button"
import DefaultInput from "../../Components/Inputs/DefaultInput"
import { Lock, Mail, User, Phone } from 'lucide-react'
import AuthLayout from "../../Components/Auth/AuthLayout"
import AuthHero from "../../Components/Auth/AuthHero"
import SocialLogin from "../../Components/Auth/SocialLogin"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { RegisterSchema } from "../../Schemas/RegisterSchema"
import NumericInput from "../../Components/Inputs/NumericInput"
import Logo from "../../Components/Logo"
import useRegister from './../../Hooks/useRegister';
import { useState } from "react"

export default function Signup() {
  const [serverError,setServerError] = useState('')
  const { register,handleSubmit, formState:{errors} } = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues:{
      firstName:'',
      lastName:'',
      username:'',
      email:'',
      phone:'',
      password:'',
      confirmPassword:''
    }
  })
  const registerMutation = useRegister() 

  const onSubmit = async (data) => {
    setServerError('')

    try{
      await registerMutation.mutateAsync(data);
    }catch(err){
      setServerError(err.message)
    }
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/20 rounded-2xl"></div>
        <img src="background4.jpg" alt="car image" className="w-full h-56 md:h-72 object-cover" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full">
        <div className="space-y-3 mb-5">
          <h1 className="text-3xl text-blue-500 font-semibold">Create Account ✨</h1> 
          <p className="text-gray-700">Join us today! Create an account to access premium car rentals.</p>
        </div>

        {
          serverError && (
            <div className="bg-red-50 p-3 rounded-md text-red-600">
              {serverError}
            </div>
          )
        }
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DefaultInput 
              icon={<User size={16}/>} 
              id='firstname' 
              label='First Name' 
              placeholder='John' 
              name='firstName' 
              type='text'
              register={register}
              error={errors.firstName} 
            />
          <DefaultInput 
              icon={<User size={16}/>} 
              id='lastname' 
              label='Last Name'
              placeholder='Doe' 
              name='lastName' 
              type='text' 
              register={register}
              error={errors.lastName}
            />
        </div>
        <DefaultInput 
            icon={<User size={16}/>} 
            id='username' 
            label='Username'
            placeholder='Doe21' 
            name='username' 
            type='text' 
            register={register}
            error={errors.username}
        />
        <DefaultInput 
            icon={<Mail size={16}/>} 
            id='email' 
            label='Email' 
            placeholder='john@example.com' 
            name='email' 
            type='email'
            register={register}
            error={errors.email} 
          />
        <NumericInput 
            icon={<Phone size={16}/>}
            id='phone' 
            label='Phone' 
            placeholder='+1234567890' 
            name='phone' 
            allowSymbols
            register={register}
            error={errors.phone}
          />
        <DefaultInput 
            icon={<Lock size={16}/>} 
            id='password' 
            label='Password' 
            placeholder='••••••••' 
            name='password' 
            type='password'
            register={register}
            error={errors.password}
          />
        <DefaultInput 
            icon={<Lock size={16}/>} 
            id='confirmPassword' 
            label='Confirm Password' 
            placeholder='••••••••' 
            name='confirmPassword' 
            type='password' 
            register={register}
            error={errors.confirmPassword}
          />
        <Button type="submit" className='mt-4'>Create Account</Button>
       
        <SocialLogin type="sign up" />

        <p className="text-center text-sm text-gray-500 mt-2">
          Already have an account?{' '}
          <Link to="/sign-in" className="text-blue-500 hover:text-blue-600 font-medium">Sign in</Link>
        </p>
      </form>
    </>
  )

  return (
    <AuthLayout 
      formSection={formSection}
      heroSection={
        <AuthHero 
          title="Join Our Community" 
          description="Get access to our premium fleet and exclusive member benefits."
        />
      }
    />
  )
}
