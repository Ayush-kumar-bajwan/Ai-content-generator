"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { FileClock, Home, Settings, Wallet } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import UsageTracker from './UsageTracker'


const SideNav = () => {
    const path = usePathname();
    const router = useRouter();

    useEffect(()=>{
        console.log(path);
    },[path])

    const handleNavigation = (menupath : string)=>{
        router.push(menupath);
    }

    const MenuList = [
        {
            name: 'Home',
            icon: Home,
            path: '/dashboard'
        },
        {
            name: 'History',
            icon: FileClock,
            path: '/dashboard/history'
        },
        {
            name: 'Billing',
            icon: Wallet,
            path: '/dashboard/billing'
        },
        {
            name: 'Setting',
            icon: Settings,
            path: '/dashboard/settings'
        },
         
    ]
  return (
    <div className=' relative h-screen border p-5 shadow-sm bg-white '>
        <div className='flex justify-center'>
            <Image src="/logo.svg" alt="logo" width={120} height={100}/> 
        </div>
            <hr className='my-6 border'/>
        <div className='mt-3'>
            {MenuList.map((menu, index)=>(
                <div key = {menu.name} className= {`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-2xl cursor-pointer items-center ${path == menu.path && 'bg-primary text-white'}`}
                onClick = {()=> handleNavigation(menu.path)}>
                   <menu.icon/>
                   <h2>{menu.name}</h2>
                </div>
            ))}
        </div>
        <div className=' absolute left-0 bottom-4 right-0'> <UsageTracker/></div>
        
    </div>
  )
}

export default SideNav