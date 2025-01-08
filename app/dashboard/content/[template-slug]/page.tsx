"use client"
import React, { useState, useContext } from 'react'
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

// Define page params type
interface PageProps {
  params: {
    'template-slug': string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

// Component definition
const Page: React.FC<PageProps> = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [outputData, setOutputData] = useState<string>('');
  
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext) ?? { totalUsage: 0, setTotalUsage: () => {} };
  const { userSubscription } = useContext(UserSubscriptionContext) ?? { userSubscription: false };
  const { setUpdateCreditUsage } = useContext(TotalCreditUsageContext) ?? { setUpdateCreditUsage: () => {} };
  
  const { user } = useUser();
  const router = useRouter();

  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === params["template-slug"]
  );

  const GenerateAiContent = async (formData: Record<string, any>) => {
    try {
      if (totalUsage >= 10000 && !userSubscription) {
        router.push('/dashboard/billing');
        return;
      }

      setLoading(true);
      const selectedPrompt = selectedTemplate?.aiPrompt;
      const finalPrompt = `${JSON.stringify(formData)}, ${selectedPrompt}`;

      const result = await chatSession.sendMessage(finalPrompt);
      const responseText = result?.response.text();
      setOutputData(responseText);
      
      if (responseText) {
        await SaveinDb(formData, selectedTemplate?.slug, responseText);
      }
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
      setUpdateCreditUsage(Date.now());
    }
  };

  const SaveinDb = async (
    formData: Record<string, any>, 
    slug: string | undefined, 
    aiResp: string
  ) => {
    try {
      if (!user?.primaryEmailAddress?.emailAddress || !slug) {
        console.error("Missing required data for saving");
        return;
      }

      const result = await db.insert(AiOutput).values({
        formData: formData,
        templateSlug: slug,
        aiResponse: aiResp,
        createdBy: user.primaryEmailAddress.emailAddress,
        createdAt: moment().format('DD/MM/yyyy'),
      });

      console.log("saved result", result);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className='p-5'>
      <Link href='/dashboard'>
        <Button className='ml-5'>
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
        <FormSection 
          selectedTemplate={selectedTemplate} 
          useFormInput={(v: Record<string, any>) => GenerateAiContent(v)} 
          loading={loading}
        />
        <div className='col-span-2'>
          <OutputSection outputData={outputData} />
        </div>
      </div>
    </div>
  );
};

export default Page;