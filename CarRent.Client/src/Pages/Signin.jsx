import { Link } from "react-router-dom";
import Button from "../Components/Buttons/Button";
import DefaultInput from "../Components/Inputs/DefaultInput";

export default function Signin() {
  return (
    <div className="min-h-screen w-full p-5 max-w-7xl mx-auto flex flex-col-reverse justify-center items-center md:flex-row bg-white">
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-5 m-5">
        <div className="space-y-3 mb-2">
          <h1 className="text-3xl font-bold">Welcome back</h1> 
          <p>Today is a new day. It's your day. You shape it. 
          Sign in to start managing your projects.</p>
        </div>
        <DefaultInput
          className=''
          id='email'
          label='Email'
          placeholder='Email'
          name='email'
          type='email'
        />
        <DefaultInput
          className=''
          id='password'
          label='Password'
          placeholder='********'
          minlength='8'
          name='paswword'
          type='email'
        />
        <Link className='text-blue-500 self-end'>Forgot password?</Link>
        <Button>Sign in</Button>
      </div>
      <div className="w-full h-full sm:min-h-72 md:w-1/2 bg-[url('background3.jpg')] bg-cover bg-center rounded-2xl">
        {/* image */}
      </div>
    </div>
  )
}
