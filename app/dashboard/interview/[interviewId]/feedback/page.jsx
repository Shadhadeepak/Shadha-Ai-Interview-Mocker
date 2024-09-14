'use client'

import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const FeedBack = ({ params }) => {

    const [feedbackList, setFeedbackList] = useState([])
    useEffect(() => {
        Getfeedback()
    }, [])
    const Getfeedback = async () => {
        const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, params.interviewId)).orderBy(UserAnswer.id)
        // console.log(result);
        setFeedbackList(result)

    };
    let count=0
    
    const rate=feedbackList.map((item)=>(
        count = count+ Number(item.rating) 
    ))



    return (
        <div className='p-10'>
           {feedbackList.length === 0 ? <h2 className='font-bold text-xl text-gray-500'>No Interview Record Found</h2>: <>
            <h2 className='font-bold text-3xl text-green-500'>Congratulation!!!</h2>
            <h2 className='font-bold text-2xl'>Here is Your Interview Feedback</h2>
            <h2 className='text-primary text-lg my-3'>Your Interview Rating : <strong>{count/process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT}</strong></h2>
            <h2 className='text-sm text-gray-500'>Find below interview question with correct answer , Your Answer and feedback For improvement</h2>
            {feedbackList && feedbackList.map((item, index) => (
                <Collapsible key={index} className='mt-7'>
                    <CollapsibleTrigger className='p-2 flex justify-between bg-secondary rounded-lg my-2 text-left gap-7 w-full'>{item.question}
                        <ChevronsUpDown className='h-5 w-5' />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                       <div className="flex flex-col gap-2">
                        <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2>
                        <h2 className='p-2 border rounded-lg bg-red-50 text-blue-400 text-sm'><strong>Your Answer: {item.userAnswer}</strong></h2>
                        <h2 className='p-2 border rounded-lg bg-green-50  text-green-500 text-sm'><strong>Correct Answer: {item.correctAns}</strong></h2>
                        <h2 className='p-2 border rounded-lg bg-blue-100  text-blue-600 text-sm'><strong>Feedback: {item.correctAns}</strong></h2>
                       </div>
                    </CollapsibleContent>
                </Collapsible> 

))}
            <Link href={'/dashboard'}>

            </Link>
            </>}
            <Button>Go Home</Button>
        </div>
    )
}

export default FeedBack