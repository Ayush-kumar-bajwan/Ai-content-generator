import { UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className=' flex justify-between shadow-sm p-5 border-b-2 items-center bg-white'>
        <div className='flex gap-2 items-center p-2 border rounded-md max-w-lg bg-white'>
            <Search/>
            <input type='text' placeholder='search..'  className='outline-none'/>
        </div>
        <div className='flex gap-5 items-center'>
            <h2 className=' hidden xs:block bg-primary p-1 text-xs  rounded-full text-white cursor-pointer '>🔥Join membership just for $9.99/month</h2>
            <UserButton />
        </div>
    </div>
  )
}

export default Header