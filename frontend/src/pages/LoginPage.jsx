import React, { useState } from 'react';
import { ShipWheelIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  // const queryClient = useQueryClient();
  // const { mutate: loginMutation, isPending, error } = useMutation({
  //     mutationFn: loginfunction,
  //     onSuccess: queryClient.invalidateQueries({ queryKey: ['authUser']})
  // });

  const { loginMutation, isPending, error} = useLogin();

  const handleLogin = (e) =>{
    e.preventDefault();
    loginMutation(loginData);
  }

  return (
    <div className='h-screen items-center flex justify-center p-4 sm:p-6 md:p-8' data-theme="night">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
       {/* login form section */}
       <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          {/* Logo */}
          <div className='mb-4 flex items-center justify-start gap-2'>
            <ShipWheelIcon className='text-primary size-9' />
              <span className='text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
                StreamChat
              </span>
          </div>
          {/* Error Message Displayed */}
          {error && (
            <div className='alert alert-error mb-4'>
              <span>{error.response.data.message}</span>
            </div>
          )}
          <div className='w-full'>
            <form onSubmit={handleLogin}>
              <div className='space-y-4'>
              <div>
                  <h2 className="text-xl font-semibold">Welcome Back</h2>
                  <p className="text-sm opacity-70">
                    Sign in to your account to continue your language journey
                  </p>
                </div>
                <div className='flex flex-col gap-3'>
                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input 
                    type='email'
                    placeholder='Enter your email'
                    className='input input-bordered w-full'
                    value={loginData.email}
                    onChange={(e)=> setLoginData({ ...loginData, email: e.target.value})}
                    required 
                  />
                </div>
                <div className='flex flex-col gap-3'>
                  <label className='label'>
                    <span className='label-text'>Password</span>
                  </label>
                  <input 
                    type='password'
                    placeholder='*********'
                    className='input input-bordered w-full'
                    value={loginData.password}
                    onChange={(e)=> setLoginData({ ...loginData, password: e.target.value})}
                    required 
                  />
                </div>
                <button className='btn btn-primary w-full' disabled={isPending} type='submit'>
                  {isPending ? 
                  (
                    <>
                    <span className='loading loading-spinner loading-sm'></span>
                     Signing in......
                    </>
                  ):(
                    "Sign In"
                  )
                }
                </button> 
                <div className='text-sm text-center opacity-70'>
                  Don't have an account?
                  <Link to="/signup" className='text-primary ml-1 hover:underline'>
                    Create One
                  </Link>
                </div>
              </div>
            </form>
          </div>
       </div>
       {/* Image form section */}
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

export default LoginPage
