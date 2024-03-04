'use client'
import React from 'react'
import Card from './Card'
import Image from 'next/image'

function AirtelProductCard(props: {  }) {
  const handleSubmit = () => {
    alert('Airtel Client ID Still Inactive!')
  }
  return (
    <div className='flex-1 my-5'>
        <Card>
          <p>Checkout</p>

          <p className='text-[#555] text-sm'>Product</p>
          <div className='w-full flex gab-3 items-center justify-between'>
            <Image 
              src={'/images/pic_1.webp'}
              alt='product'
              height={100}
              width={100}
              />
            <p
              className='text-sm'
              title='HP ProBook 450 G10 – Core i5 13th Gen, 16GB RAM, 512GB SSD'
              >HP ProBook 450 G10 – Core i5 13th Gen...</p>
            <p className='text-sm font-bold'>USh 2,900,000</p>
          </div>
          <div className='flex justify-between items-center w-full'>
            <p className='text-sm font-normal text-[#555]'>Tax</p>
            <p className='text-sm font-bold'>10%</p>
          </div>
          <div className='flex justify-between items-center w-full'>
            <p className='text-sm font-normal text-[#555]'>Total</p>
            <p className='text-sm font-bold'>USh 3,190,000</p>
          </div>
          <div className='w-full'>
            <div className='flex justify-between items-center w-full gab-4'>
              <p className='text-sm font-normal text-[#555]'>Phone number</p>
              <input 
                type='text'
                name='phone'
                className='flex-1 border-[1px] ml-4'
              />
            </div>
            <button
              onClick={handleSubmit}
              className='bg-[#c0392b] py-2 px-4 text-white rounded-md shadow-md text-sm block mx-auto mt-5 cursor-pointer'
              >
              {'Make Payment'}
            </button>
          </div>
        </Card>
      </div>
  )
}

export default AirtelProductCard