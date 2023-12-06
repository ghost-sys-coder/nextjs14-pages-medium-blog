import React from 'react'
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { signIn, signOut, useSession } from 'next-auth/react';

const inter = Inter({subsets: ['latin']})

const Login = () => {
    const { data, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return (
            <div>
                <h1 className='text-red-500 text-xl'>Loading....</h1>
            </div>
        )
    }

    if (status === 'authenticated') {
        router.push("/")
    }
  return (
      <div className='h-screen flex flex-col gap-10 justify-center items-center bg-dark-1'>
          <h1 className="text-white md:text-3xl text-2xl font-semibold">Log into your Account</h1>
          <div className='w-[300px]'>
              <button onClick={()=> signIn('google')} className='login-btns'>
                  <FcGoogle />
                  <span>Login with Google</span>
              </button>
              <button onClick={()=> signIn('github')} className='login-btns'>
                  <FaGithub />
                  <span>Login with Github</span>
              </button>
          </div>
      </div>
  )
}


Login.getLayout = function (page) {
  return (
    <>
    {page}
    </>
  );
};

export default Login