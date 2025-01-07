"use client"
import { TEMPLATE } from '@/app/dashboard/_components/TemplateList'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

interface PROPS{
    selectedTemplate? : TEMPLATE,
    useFormInput  :any,
    loading: boolean,
}

const FormSection = ({selectedTemplate ,useFormInput, loading}: PROPS) => {

    const [formData, setFormData] = useState<any>();

    const handleInputChange = (e:any) => {
        const {name, value} = e.target;

        setFormData({...formData, [name] : value});
    }
    
    const onSubmit = (e : any)=>{
        e.preventDefault();
        useFormInput(formData);
    }
  return (
    <div className='p-5 rounded-lg shadow-md border bg-white'>
        {/*@ts-ignore*/}
        <Image src={selectedTemplate?.icon} alt='icon' width={70} height={70} />
        <h2 className='font-bold text-2xl text-primary mb-2'>{selectedTemplate?.name}</h2>
        <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>

        <form className='mt-6' onSubmit={onSubmit}>
                {selectedTemplate?.form?.map((item,index)=>(
                    <div className='my-2 flex flex-col gap-2 mb-7' key={index}>
                        <label className='font-bold'>{item.label}</label>
                        {item.field == 'input'? <Input name= {item.name} required ={item?.required} onChange={handleInputChange}/> :
                        item.field == "textarea" ? <Textarea name= {item.name} required ={item?.required} onChange={handleInputChange} /> : null}
                    </div>
                ))}
                <Button type= "submit" className='w-full p-6' disabled={loading}>{loading && <LoaderIcon className='animate-spin'/>}Generate</Button>
        </form>
    </div>
  )
}

export default FormSection