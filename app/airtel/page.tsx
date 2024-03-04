import AirtelProductCard from '@/components/AirtelProductCard copy'
import CancelButton from '@/components/CancelButton'
import React from 'react'

function Airtel() {
  return (
    <>
      <h1 className='font-bold'>Pay with Airtel Money</h1>
      <AirtelProductCard />
      <CancelButton />
    </>
  )
}

export default Airtel