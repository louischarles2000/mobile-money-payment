import Card from '@/components/Card';
import StatusCard from '@/components/StatusCard';
import React from 'react'

async function MTNTransactionStatus({ searchParams }: {
  searchParams: {
    refId: string;
  }
}) {

  return (
    <div>
      <h1 className='text-center mb-4'>Transaction Status</h1>
      <StatusCard refId={searchParams.refId}/>
    </div>
  )
}

export default MTNTransactionStatus