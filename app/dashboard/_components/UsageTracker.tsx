"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { AiOutput, UserSubscription } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm';
import React, { useEffect, useState, useContext } from 'react'
import { HISTORY } from '../history/page';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { TotalCreditUsageContext } from '@/app/(context)/TotalCreditUsageContent';
import { useRouter } from 'next/navigation';


const UsageTracker = () => {
    const {totalUsage, setTotalUsage} = useContext(TotalUsageContext);
    const {userSubscription, setUserSubscription} = useContext(UserSubscriptionContext);
    const {updateCreditUsage, setUpdateCreditUsage} = useContext(TotalCreditUsageContext);
    const [maxWords, setMaxWords] = useState(10000);

    const router = useRouter();

    const {user} = useUser();

    const upgradeHandler = ()=>{
        router.push("/dashboard/billing")
    }
    useEffect(()=>{
        user && getData();
        user && isUserSubscribed(); 
    },[user])

    useEffect(()=>{
        user && getData();
    },[updateCreditUsage && user])

    const getData = async()=>{
            const result : HISTORY[] = await  db.select().from(AiOutput).where(eq(AiOutput?.createdBy, user?.primaryEmailAddress?.emailAddress));
            getTotalUsage(result);
    }

    const isUserSubscribed = async()=>{
        const result = await db.select().from(UserSubscription)
        .where(eq(UserSubscription.email, user?.primaryEmailAddress?.emailAddress));

        if(result){
            setUserSubscription(true);
            setMaxWords(100000);
        }
    }

    const getTotalUsage = (result : HISTORY[]) =>{
        let total: number = 0;
        result.forEach((element => {
            total = total + Number(element.aiResponse?.length);
        }))
        console.log(total)
        setTotalUsage(total);
        
    }

  return (
    <div className='m-4'>
        <div className='bg-primary text-white p-4 w-full rounded-xl'>
       <h2 className='font-medium'>Credits</h2>
        <div className='h-2 w-full bg-[#9981f9] rounded-full'>
            <div className='h-2 bg-white rounded-full' style={{
                width: `${(totalUsage/maxWords)*100}%`
            }}></div>
        </div>
        <h2 className='text-sm'> {totalUsage}/{userSubscription? '100,000' : '10,000'} used</h2>
        </div>

        <Button variant={'secondary'} className='w-full rounded-lg my-2 text-primary' onClick={()=>upgradeHandler()}>Upgrade </Button>
    </div>
  )
}

export default UsageTracker