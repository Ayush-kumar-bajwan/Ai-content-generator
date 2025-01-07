import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center my-5'>
        <UserProfile />
    </div>
  )
}

export default page