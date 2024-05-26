import React from 'react'
import MyVenues from '../../../components/user/MyVenues'

const MyVenuesPage = () => {
  return (
    <div className='double-gradient min-h-screen flex flex-col justify-start pb-48'>
       <div className="container mx-auto p-4 lg:mt-12">
          <MyVenues />
        </div>
    </div>
  )
}

export default MyVenuesPage
