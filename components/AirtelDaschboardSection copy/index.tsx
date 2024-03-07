import React from 'react'
import CollectionsMTNCardItem from './CollectionsMTNCardItem'
import AcountBalanceMTNCardItem from './AcountBalanceMTNCardItem'
import DisbursementsMTNCardItem from './DisbursementsMTNCardItem'

function AirtelDaschboardSection() {
  return (
    <div>
      <div className='flex my-5 gab-5 items-center space-x-6 '>
        <AcountBalanceMTNCardItem />
        <CollectionsMTNCardItem />
        <DisbursementsMTNCardItem />
      </div>
    
    </div>
  )
}

export default AirtelDaschboardSection