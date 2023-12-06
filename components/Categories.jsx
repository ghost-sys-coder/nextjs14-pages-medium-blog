import React from 'react'
import Link from 'next/link'
import Image from 'next/image'


const Categories = ({categories}) => {
  return (
      <div className='my-10'>
          <h1 className='text-2xl font-bold text-dark-3 dark:text-light-1 text-left'>Popular Categories</h1> 
          <div className='mt-4 flex gap-5 items-center justify-start flex-wrap'>
              {categories.map((category) => (
                  <Link className='rounded-md flex gap-2 items-center px-3 py-2 bg-blue-300 text-dark-3' key={category._id} href={category.title}>
                      <Image
                          src={category.img}
                          alt={category.title}
                          width={20}
                          height={20}
                          className='rounded-full object-cover'
                      />
                      <span className='font-semibold dark:text-light-2'>{category.title}</span>
                  </Link>
              ))}
          </div>
    </div>
  )
}

export default Categories