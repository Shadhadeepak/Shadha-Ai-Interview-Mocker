'use client'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import InterViewCard from './InterViewCard'


const InterviewList = () => {
    const {user}=useUser()
    const [InterviewList,setinterviewList]=useState([]);
    useEffect(()=>{
        user && GetInterviewList()
    },[user])
    const GetInterviewList=async()=>{
        const result = await db.select().from(MockInterview).where(eq(MockInterview.createBy,user.primaryEmailAddress.emailAddress))
        .orderBy(desc(MockInterview.id))
        setinterviewList(result)
    }

  return (
    <div>
        <h2 className='font-medium text-xl '>Previous Attended Interview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
            {
                InterviewList && InterviewList.map((Interview,index)=>(
                    <InterViewCard  key={index}
                    Interview={Interview}
                    
                    />
                ))
            }
        </div>
    </div>
  )
}

export default InterviewList