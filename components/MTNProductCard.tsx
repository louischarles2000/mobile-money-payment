'use client'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import Image from 'next/image'
import axios from 'axios'
import { v4 as uuid4 } from 'uuid'
import { useRouter } from 'next/navigation'
import Cookie from 'universal-cookie'
import { getRandomPrice } from '@/utilities'

const EXTERNAL_ID = "7835794"

function MTNProductCard(props: {  }) {
  const cookie = new Cookie();
  const router = useRouter();
  const [ momoToken, setMomoToken ] = useState(null);
  const [ momoResponse, setMomoResponse ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ phoneNumber, setPhoneNumber ] = useState('256775605783');
  const [ loading, setLoading ] = useState(false);
  const [ price, setPrice ] = useState(0);

  useEffect(() => {
    getMomoToken();
    setPrice(getRandomPrice());
  }, []);

  const handleSubmit = async () => {
    if(phoneNumber.length < 10) return;
    if(!momoToken){
      alert('Wait for Momo token!');
      return;
    }

    setLoading(true);

    const body = {
      amount: (price + (price * .1)) + '',
      currency: 'EUR',
      // externalId: EXTERNAL_ID,
      payer: {
        partyIdType: 'MSISDN',
        partyId: phoneNumber
      },
      payerMessage: 'Payment for Order',
      payeeNote: 'Payment for Order'
    }
    try {
      const ref_id = await uuid4();
      const res = await axios.post('/api/momo/request_to_pay', { momoToken, body });
      setLoading(false);
      if(res.status === 202){
        console.log(res);
        cookie.set('token', momoToken);
        router.replace(`/mtn/transaction_status?refId=${res.data.ref_id}&action=collection`);
        return
      }
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }

  const getMomoToken = async () => {
    try {
      const res = await axios.post('/api/momo/token', {})
      console.log(res);
      setMomoToken(res.data.token)
    } catch (error: any) {
      console.log(error);
      setMomoToken(null);
      setError(error);
    }
  }

  if (error) {
    return (
      <p className='text-[red]'>An Error has Occured, Please try again later</p>
    )
  }

  return (
    <div className='flex-1 my-5'>
        <p className='text-center text-sm text-[#555] mb-3'>46733123454 is the number that works for testing (Shows PENDING Status)</p>
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
            <p className='text-sm font-bold'>€ {price}</p>
          </div>
          <div className='flex justify-between items-center w-full'>
            <p className='text-sm font-normal text-[#555]'>Tax</p>
            <p className='text-sm font-bold'>10%</p>
          </div>
          <div className='flex justify-between items-center w-full'>
            <p className='text-sm font-normal text-[#555]'>Total</p>
            <p className='text-sm font-bold'>€ {price + (price * .1)}</p>
          </div>
          <div className='w-full'>
            <label className='flex justify-between items-center w-full gab-4'>
              <p className='text-sm font-normal text-[#555]'>Phone number</p>
              <input 
                type='text'
                name='phone'
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                className='flex-1 border-[1px] ml-4 p-1'
              />
            </label>
            <button
              onClick={handleSubmit}
              disabled={phoneNumber.length < 10 || loading}
              className='bg-[#f1c40f] disabled:bg-opacity-50 disabled:cursor-not-allowed py-2 px-4 text-white rounded-md shadow-md text-sm block mx-auto mt-5 cursor-pointer'
              >
              {loading ? 'Paying...' : 'Make Payment'}
            </button>
          </div>
        </Card>
      </div>
  )
}

export default MTNProductCard