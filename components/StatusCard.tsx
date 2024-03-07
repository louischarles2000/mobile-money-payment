'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from './Card';
import Cookie from 'universal-cookie';
import { useRouter } from 'next/navigation';
import { getMomoToken } from '@/utilities';

function StatusCard(props: { refId: string, operation: string }) {
  const cookie = new Cookie();
  const router = useRouter();
  const [ transaction, setTransaction ] = useState<any>(null);
  const [ loading, setLoading ] = useState(true);
  const [ momoToken, setMomoToken ] = useState(null);
  const [ error, setError ] = useState<any>(null);


  useEffect(() => {
    (async() => {
      try {
        const url = props.operation === 'transfer' ? '/api/momo/disbursements/token' : '/api/momo/token';
        const token = await getMomoToken(url);
        setMomoToken(token);
      } catch (error) {
        setError(error);
      }
    })()
  }, [])
  
  useEffect(() => {
    if(!momoToken) return;

    (async () => {
      // const token = cookie.get('token');
      const url = props.operation === 'transfer' ? '/api/momo/disbursements' : '/api/momo/request_to_pay';

      console.log(url);
      console.log(props.refId)  
      try {
        const res = await axios({
          method: 'post',
          url: `${url}/${props.refId}`,       
          data: { momoToken }
        });

        console.log(res)

        const transaction_status = res.data;
        setTransaction(transaction_status);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
      }
    })();
  }, [momoToken]);

  if (loading) {
    return (
      <p className='text-center'>Loading...</p>
    )
  }
  if (!transaction) {
    return (
      <p className='text-center'>Invalid Reference ID!</p>
    )
  }

  const handleFinish = () => {
    cookie.remove('token');
    router.replace('/');
  }

  return (
    <Card>
      <p className={transaction.status === 'SUCCESSFUL' ? 'text-[green]' : 'text-[orange]'}>{transaction.status}</p>
      <div className='w-full flex justify-between items-center'>
        <p>Amount: {transaction.amount}</p>
        <p>Currency: {transaction.currency}</p>
      </div>
      <div className='w-full flex flex-wrap justify-between items-center'>
        <p className='text-sm'>External ID: {transaction.externalId}</p>
        <p className='text-sm'>Financial Transaction ID: {transaction.financialTransactionId}</p>
      </div>
      <div className='w-full justify-between items-center'>
        {transaction.payer ? (
          <p className='text-sm'>Payer: {transaction.payer.partyId}</p>
        ) : (
          <p className='text-sm'>Payee: {transaction.payee.partyId}</p>
        )}
        <p className='text-sm'>Payer Message: {transaction.payerMessage}</p>
      </div>
      <p className='text-sm w-full'>Payee Note: {transaction.payeeNote}</p>
      <p className='text-sm'>Ref: {transaction.ref}</p>
      <button
        onClick={handleFinish}
        className='bg-[#f1c40f] disabled:bg-opacity-50 disabled:cursor-not-allowed py-2 px-4 text-white rounded-md shadow-md text-sm block mx-auto mt-5 cursor-pointer'
        >
        Finish
      </button>
    </Card>
  )
}

export default StatusCard