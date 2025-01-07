import { Search } from 'lucide-react'
import React from 'react'

const SearchSection = ({onSearchInput} :any) => {
  return (
    <div className=' flex flex-col justify-center items-center p-10 bg-gradient-to-br from-purple-500 via-purple-700 to-blue-600 text-white'>
        <h2 className='text-2xl font-bold'> Browse All templates</h2>
        <p>What you would like to create today?</p>
        <div className='w-full flex justify-center'>
         <div className='flex gap-2 p-2 items-center bg-white rounded-md my-5 w-[50%]'>
         <Search className='text-primary'/>
         <input type='text' placeholder='search' className='bg-transparent w-full outline-none text-black'onChange ={(e)=> onSearchInput(e.target.value)}/>
         </div>
        </div>
    </div>
  )
} 

export default SearchSection