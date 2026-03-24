import React, { useState } from 'react'
import { ShipWheelIcon} from 'lucide-react';
import {Link } from 'react-router-dom';
import useSignUp from '../hooks/useSignUp';

const SignupPage = () => {
  const[signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  })

  // const QueryClient = useQueryClient();

  // const { mutate: signUpMutation, isPending, error } = useMutation({
  //   mutationFn: signupfunction,
  //   onSuccess: QueryClient.invalidateQueries({ queryKey: ['authUser'] }),
  // })
  const { signupMutation, isPending, error } = useSignUp(); 

  const handleSignUp = (e) =>{
    console.log("aaaaa");
    e.preventDefault();
    console.log(signUpData);
    signupMutation(signUpData);
  }
  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="night">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
       {/* signup form left side */}
       <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
        <div className='mb-4 flex items-center justify-start gap-2'>
          <ShipWheelIcon className="size-9 text-primary" />
          <span className='text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
            StreamChat
          </span>
        </div>
        {/* Error message if any */}
        {error && (
          <div className='alert alert-error mb-4'>
            <span>{ error.response.data.message } </span>
          </div>
        )}

        {/* Signup form */}
        <div className='w-full'>
          <form onSubmit={handleSignUp} className=''>
            <div className='space-y-4'>
              <div>
                <h2 className='text-xl font-semibold'>Create an Account</h2>
                <p className='text-sm opacity-70'>
                  Join StreamChat and art your journey today in your language learning adventure! 
                </p>
              </div>
              <div className='space-y-3 '>
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Full Name</span>
                  </label>
                  <input 
                    type='text' 
                    placeholder='Enter your full name' 
                    className='input input-bordered w-full' 
                    value={signUpData.name} 
                    onChange={(e)=> setSignUpData({...signUpData, name: e.target.value})} 
                    required 
                  />
                </div>
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input 
                    type='email' 
                    placeholder='Enter your email' 
                    className='input input-bordered w-full' 
                    value={signUpData.email} 
                    onChange={(e)=> setSignUpData({...signUpData, email: e.target.value})} 
                    required 
                  />
                </div>
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Password</span>
                  </label>
                  <input 
                    type='password' 
                    placeholder='*********' 
                    className='input input-bordered w-full' 
                    value={signUpData.password} 
                    onChange={(e)=> setSignUpData({...signUpData, password: e.target.value})} 
                    required 
                  />
                  <p className='text-xs opacity-70 mt-1'>
                    Password must be at least 6 characters long.
                  </p>
                </div>
                <div className='form-control'>
                  <label className='cursor-pointer label justify-start gap-2'>
                    <input type='checkbox' className='checkbox checkbox-sm' required />
                    <span className='label-text text-sm leading-tight'>I agree to the{" "}</span>
                    <span className='text-primary hover:underline'>terms of services</span> and {" "}
                    <span className='text-primary hover:underline'>privacy policy</span>
                  </label>
                </div>
              </div>
              <button type='submit' className='btn btn-primary w-full mt-2'>
                { isPending ? (
                  <>
                  <span className='loading loading-spinner loading-sm'></span>
                  Loading......
                  </>
                ) : (
                  "Create Account"
                ) }
              </button>
              <div className='text-center mt-4'>
                <p className='text-sm'>
                  Already have an Account?{" "}
                  <Link to='/login' className='text-primary hover:underline'>
                  Sign In
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
       </div>
        {/* signup for right Side */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/Video call-bro.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
