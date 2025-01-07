"use client"
import React, { useState, useEffect, useContext } from 'react'
import FormSection from './_components/FormSection'
import OutputSection from './_components/OutputSection'
import { TEMPLATE } from '../../_components/TemplateList'
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { chatSession } from '@/utils/AiModel'

import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import { AiOutput } from '@/utils/schema'
import moment from 'moment'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { useRouter } from 'next/navigation'
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext'
import { TotalCreditUsageContext } from '@/app/(context)/TotalCreditUsageContent'






interface PROPS{
    params:{
        'template-slug'  : string,
    }
}

const createNewContent = (props: PROPS) => {

  const [loading, setLoading] = useState(false);
  const [outputData, setOutputData] = useState<string>('');
  const {totalUsage, setTotalUsage} = useContext(TotalUsageContext);
  const {userSubscription, setUserSubscription} = useContext(UserSubscriptionContext);
  const {updateCreditUsage, setUpdateCreditUsage} = useContext(TotalCreditUsageContext);
  const {user} = useUser();
  const router = useRouter();

 console.log("user",user?.primaryEmailAddress?.emailAddress)

// Unwrap the params
 const selectedTemplate: TEMPLATE | undefined = Templates?.find(
   (item) => item.slug === props.params["template-slug"]
 );
  

  

  const GenerateAiContent = async(formData: any)=>{
    //add a dialogue box or redirect to  a page
    if(totalUsage >=10000 && !userSubscription){
      router.push('/dashboard/billing');
      console.log("please upgrade");
      return;
    }
    setLoading(true);
    const selectedPrompt = selectedTemplate?.aiPrompt;
    const  finalPrompt = JSON.stringify(formData)+ ", "+ selectedPrompt;

    const result = await chatSession.sendMessage(finalPrompt);
    setOutputData(result?.response.text());
    console.log('data', result?.response.text())
     await SaveinDb(formData, selectedTemplate?.slug , result?.response.text() )
    
    setLoading(false);
    setUpdateCreditUsage(Date.now());
  }


  const SaveinDb = async(formData : any, slug : any, aiResp : string)=>{
    try {
      const result = await db.insert(AiOutput).values({
        formData : formData,
        templateSlug : slug,
        aiResponse : aiResp,
        createdBy : user?.primaryEmailAddress?.emailAddress,
        createdAt : moment().format('DD/MM/yyyy'),
        
});
console.log("saved result",result)
    } catch (error) {
      console.log("error saving data",error)
    }
    
  }


  
  

  return (
    <div className='p-5'>
      <Link href={'/dashboard'}>
      <Button className='ml-5'><ArrowLeft/> Back</Button>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
        {/*fromsection */}
        <FormSection selectedTemplate=  {selectedTemplate} useFormInput={(v : any)=> GenerateAiContent(v)} loading = {loading}/>
        
        {/*outputSection */}
        <div className='col-span-2'>
          <OutputSection outputData = {outputData}/>
        </div>
        
        </div>
    </div>
    
  )
}

export default createNewContent