import Link from 'next/link'
import React from 'react'
import Divider from './Divider'

function Navbar() {
  return (
    <div className='w-[20%] bg-[#273c75] p-5 space-y-8'>
        <Link href={'/'}>
        <h1 className='text-white text-xl font-bold cursor-pointer'>Mobile Money API Demo</h1>
        </Link>
        <div className='space-y-5'>
            <h2 className='text-md text-[#ccc]'>MTN MOMO API</h2>
            <ul className=''>
                <Link href={'/mtn/collections'}>
                    <li className='text-white pl-4 hover:bg-white hover:bg-opacity-5 py-1'>Collections</li>
                </Link>
                <Link href={'/mtn/disbursements'}>
                    <li className='text-white pl-4 hover:bg-white hover:bg-opacity-5 py-1'>Disbursements</li>
                </Link>
            </ul>
            
        </div>

        <Divider />

        <div className='space-y-5'>
            <h2 className='text-md text-[#ccc]'>Airtel Money API</h2>
            <ul className=''>
                <Link href={'/'}>
                    <li className='text-white pl-4 hover:bg-white hover:bg-opacity-5 py-1'>Collections</li>
                </Link>
                <Link href={'/'}>
                    <li className='text-white pl-4 hover:bg-white hover:bg-opacity-5 py-1'>Disbursements</li>
                </Link>
            </ul>
            
        </div>
    </div>
  )
}

export default Navbar