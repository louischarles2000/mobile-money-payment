import CancelButton from '@/components/CancelButton'
import MTNProductCard from '@/components/MTNProductCard'
import React from 'react'


async function MTN() {
  return (
    <>
      <h1 className='font-bold'>Pay with MTN MOMO</h1>
      <MTNProductCard/>
      <CancelButton />
    </>
  )
}

export default MTN