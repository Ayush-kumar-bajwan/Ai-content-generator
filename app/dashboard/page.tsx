"use client"
import React, { useState } from 'react'
import SearchSection from './_components/SearchSection'
import TemplateList from './_components/TemplateList'

const page = () => {
  const [userSearchInput, setUserSearchInput] = useState<string>()
  return (
    <div>
      <SearchSection onSearchInput = {(value: string)=>setUserSearchInput(value)}/>
      {/*template section */}
      <TemplateList userSearchInput = {userSearchInput}/>
    </div>
  )
}

export default page