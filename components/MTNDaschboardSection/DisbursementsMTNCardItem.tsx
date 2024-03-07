'use client'
import { Card } from '@material-tailwind/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function DisbursementsMTNCardItem() {
  const [ transfers, setTransfers ] = useState([]);
  const [ total, setTotal ] = useState(0);

  useEffect(() => {
    axios.get('/api/momo/disbursements')
    .then((res) => {
        console.log(res.data)
        setTransfers(res.data.collections)
    })
    .catch(console.log);
  }, []);

  useEffect(() => {
    if(transfers.length > 0){
      const total = transfers.reduce((cum, curr: { amount: string }) => {
        return cum + parseInt(curr.amount);
      }, 0);
      setTotal(total);
    }
  }, [transfers]);

  return (
    <Card className='rounded-sm p-3 min-w-[15rem] min-h-[6.5rem] bg-[#fab1a0] text-white space-y-1'>
      <p className='font-bold text-sm'>Disbursements (Money Out)</p>
      <p className='font-light text-2xl'>{total} €</p>
      <p className='font-normal text-sm'>Total transfers: {transfers.length}</p>
    </Card>
  )
}

export default DisbursementsMTNCardItem