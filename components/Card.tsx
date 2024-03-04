import React, { ReactNode } from 'react'

function Card(props: { children: ReactNode }) {
  return (
    <div className='bg-white shadow-md p-5 border-[1px] rounded-md min-w-[40vw] flex flex-col items-center space-y-4'>
      {props.children}
    </div>
  )
}

export default Card