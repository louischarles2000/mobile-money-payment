'use client'
import { Input, Button, Card, Textarea } from '@/components/MUI'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Cookie from 'universal-cookie'

function TransferCard() {
    const cookie = new Cookie();
    const router = useRouter();
    const [ momoToken, setMomoToken ] = useState(null);
    const [ phone, setPhone ] = useState('');
    const [ amount, setAmount ] = useState(5);
    const [ note, setNote ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        getMomoToken();
      }, []);
    
    const getMomoToken = async () => {
        try {
        const res = await axios.post('/api/momo/disbursements/token', {})
        console.log(res);
        setMomoToken(res.data.token)
        } catch (error: any) {
        console.log(error);
        setMomoToken(null);
        setError(error);
        }
    }

    const handleTransfer = async () => {
        if(phone.length < 10) return;
        if(!momoToken){
          alert('Wait for Momo token!');
          return;
        }
    
        setLoading(true);
    
        const body = {
          amount: amount + '',
          currency: 'EUR',
          payee: {
            partyIdType: 'MSISDN',
            partyId: phone
          },
          payerMessage: note,
          payeeNote: 'Payment for Order'
        }
        try {
          const res = await axios.post('/api/momo/disbursements', { momoToken, body });
          setLoading(false);
          if(res.status === 202){
            console.log(res);
            cookie.set('token', momoToken);
            router.replace(`/mtn/disbursements/transaction_status?refId=${res.data.ref_id}&action=transfer`);
            return
          }
        } catch (error) {
          setLoading(false);
          console.log(error)
        }
      }

    if (error) {
        return (
          <p className='text-[red] text-center my-8'>An Error has Occured, Please try again later</p>
        )
    }
    
  return (
    <Card 
      className='w-[60%] mx-auto my-6 p-5'
      placeholder={undefined}
      >
        <p className='text-center'>Make Payment</p>
        <div className='space-y-4 mt-5'>
            <Input
              label='Phone Number'
              placeholder='Enter Number'
              type='tel'
              name='phone'
              value={phone}
              onChange={e => setPhone(e.target.value)}
              crossOrigin={undefined}
              />
            
            <Input 
                label='Amount(€)'
                type='number'
                placeholder='Enter Amount'
                value={amount}
                onChange={e => setAmount(parseInt(e.target.value))}
                crossOrigin={undefined}
                />
            
            <Textarea 
                label='Transfer note'
                rows={3}
                value={note}
                onChange={e => setNote(e.target.value)}
                />
            
            <Button
                onClick={handleTransfer}
                disabled={loading}
                className='w-full bg-[#273c75]'
                placeholder={undefined}
                >
                {loading ? 'Loading...' : 'Transfer Money'}
            </Button>
        </div>
    </Card>
  )
}

export default TransferCard