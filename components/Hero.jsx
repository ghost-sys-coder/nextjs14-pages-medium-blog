import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Poppins } from 'next/font/google'


const poppins = Poppins({ subsets: ['latin'] , weight: ['700', '800', '900'] });

const Hero = ({posts}) => {
  return (
      <div className='flex flex-col gap-10'>
          <h1 className='md:text-7xl text-4xl font-mono py-6 text-dark-3 dark:text-light-2'><span className='font-bold'>Hey, beastCodes here!</span> Discover my stories and creative ideas!</h1>
          <div className='flex gap-10 lg:flex-row flex-col'>
              <Image
                  src={posts[0]?.imageUrl}
                  alt={posts[0]?.category}
                  width={500}
                  height={500}
                  className='object-cover rounded-lg w-full max-lg:h-[300px]'
              />
              <div className={`flex flex-col items-start justify-center gap-6 ${poppins.className}`}>
                  <h1 className='font-bold text-xl text-dark-3 dark:text-light-1 max-lg:text-3xl'>{posts[0]?.title}</h1>
                  <div className='description' dangerouslySetInnerHTML={{__html: posts[0]?.description.slice(0, 500)}} />
                  <Link className='font-semibold px-3 py-2 rounded-md text-dark-3 bg-gray-300 max-sm:w-full max-sm:text-center hover:bg-primary-600 hover:text-light-2' href={`/posts/${posts[0]?._id}`}>Read More</Link>
              </div>
          </div>
    </div>
  )
}

export default Hero