'use client'
import { getMomoToken } from '@/utilities';
import { Card } from '@material-tailwind/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function AcountBalanceMTNCardItem() {
  const [ balance, setBalance ] = useState({ availableBalance: 0, currency: 'EUR' });

  // useEffect(() => {
  //   getMomoToken('/api/momo/disbursements/token')
  //   .then(( momoToken ) => {
  //     return axios.post('/api/momo/disbursements/balance', { momoToken });
  //   })
  //   .then((res) => {
  //     setBalance(res.data);
  //   })
  //   .catch(console.log);
  // }, []);

  return (
    <Card className='rounded-sm p-3 min-w-[15rem] min-h-[6.5rem] bg-[#1abc9c] text-white space-y-4'>
      <p className='font-bold text-sm'>Account Balance</p>
      <p className='font-light text-2xl'>{0} €</p>
    </Card>
  )
}

export default AcountBalanceMTNCardItem