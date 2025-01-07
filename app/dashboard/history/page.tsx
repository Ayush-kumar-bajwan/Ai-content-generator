import Templates from '@/app/(data)/Templates';
import { db } from '@/utils/db';
import { AiOutput } from '@/utils/schema';
import { currentUser } from '@clerk/nextjs/server';
import { desc, eq } from 'drizzle-orm';
import Image from 'next/image';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import CopyButton from './_components/CopyButton'; // Import the Client Component

export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string | null;
  createdAt: string | null;
}

async function History() {
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  if (!userEmail) return <div>Error: User not found.</div>;

  let HistoryList: HISTORY[] = [];
  try {
    HistoryList = await db.select().from(AiOutput)
      .where(eq(AiOutput?.createdBy, userEmail))
      .orderBy(desc(AiOutput.id));
  } catch (error) {
    console.error('Error fetching history:', error);
  }

  const GetTemplateName = (slug: string) => {
    const template = Templates?.find((item) => item.slug === slug);
    return template || { name: 'Unknown', icon: '/default-icon.png' };
  };

  return (
    <div className="m-5 p-5 border rounded-lg bg-white">
      <ToastContainer />
      <h2 className="font-bold text-3xl">History</h2>
      <p className="text-gray-500">Search your previously generated AI content</p>

      <div className="grid grid-cols-7 font-bold bg-secondary mt-5 py-3 px-3">
        <h2 className="col-span-2">TEMPLATE</h2>
        <h2 className="col-span-2">AI RESPONSE</h2>
        <h2>DATE</h2>
        <h2>WORDS</h2>
        <h2>COPY</h2>
      </div>

      {HistoryList.length === 0 ? (
        <p>No history found.</p>
      ) : (
        HistoryList.map((item, index) => (
          <div className="grid grid-cols-7 my-5 py-3 px-3" key={index}>
            <h2 className="col-span-2 flex gap-2 items-center">
              <Image
                src={GetTemplateName(item.templateSlug)?.icon}
                alt="Template Icon"
                width={25}
                height={25}
              />
              {GetTemplateName(item.templateSlug)?.name}
            </h2>
            <h2 className="col-span-2 line-clamp-3">
              {item.aiResponse ?? 'No Response'}
            </h2>
            <h2>
              {item.createdAt
                ? moment(item.createdAt, 'DD/MM/yyyy').isValid()
                  ? moment(item.createdAt, 'DD/MM/yyyy').format('DD MMM yyyy')
                  : 'Invalid Date'
                : 'Unknown Date'}
            </h2>
            <h2>{item.aiResponse?.length || 0}</h2>
            <h2>
              <CopyButton aiResponse={item.aiResponse} /> {/* Use the Client Component */}
            </h2>
          </div>
        ))
      )}
      <hr />
    </div>
  );
}

export default History;
