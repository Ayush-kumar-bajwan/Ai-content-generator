"use client"
import React, { useContext, useState } from 'react'
import SideNav from './_components/SideNav'
import Header from './_components/Header'
import { TotalUsageContext } from '../(context)/TotalUsageContext'
import { UserSubscriptionContext } from '../(context)/UserSubscriptionContext'
import { TotalCreditUsageContext } from '../(context)/TotalCreditUsageContent'

const layout = ({children,
}: Readonly<{children: React.ReactNode}>) => {

  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [userSubscription, setUserSubscription] = useState<boolean>(false);
  const [updateCreditUsage, setUpdateCreditUsage] = useState<any>();
  return (
    <TotalUsageContext.Provider value = {{totalUsage, setTotalUsage}}>
      <UserSubscriptionContext.Provider value={{userSubscription, setUserSubscription}} >
        <TotalCreditUsageContext.Provider value={{updateCreditUsage, setUpdateCreditUsage}}>
      <div className='bg-slate-100 h-full'>
         <div className=' md:w-64 hidden md:block fixed'>
        <SideNav />
        </div>
        <div className='md:ml-64'>
            <Header/>
        {children}
        </div>
    </div>
    </TotalCreditUsageContext.Provider>
    </UserSubscriptionContext.Provider>
    </TotalUsageContext.Provider>
    
  )
}

export default layout