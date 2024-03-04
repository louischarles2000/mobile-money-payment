'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

function CancelButton() {
  const router = useRouter();

  return (
    <button
      className='text-sm text-[red] border-[1px] border-[red] p-1 block mx-auto my-5'
      onClick={() => router.back()}
      >
      Cancel
    </button>
  )
}

export default CancelButton