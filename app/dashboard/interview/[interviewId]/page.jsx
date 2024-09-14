'use client'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq, relations } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Webcam from "react-webcam";
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const InterviewPage = ({ params }) => {
    const [interviewData,setInterviewData]=useState()
    const [jobDesc,setJobDesc]=useState()
    const [jobExp,setJobExp]=useState()
    const [jobPos,setJobPos]=useState()
    

    const [webCamEnabled, setWebCamEnabled] = useState(false)
    useEffect(() => {
        getInterviewIdDetails();
    }, [])

    const getInterviewIdDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))

        // console.log(result[0].jobDescription);
        setJobDesc(result[0].jobDescription)
        setJobExp(result[0].jobExperience)
        setJobPos(result[0].jobPosition)
        
        

    }

    return (
        <div className='my-10'>
            <h2 className='font-bold text-2xl'>Let's Get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">


                <div className="flex flex-col my-5 gap-5">
                    <div className=" p-5 rounded-lg flex flex-col gap-5 border">

                    <h2 className='text-lg'> <strong>Job Role/Job Position :</strong> {jobPos} </h2>
                    <h2 className='text-lg'> <strong>Job Description / Tech Stack :</strong> {jobDesc} </h2>
                    <h2 className='text-lg'> <strong>Years of Experience :</strong> {jobExp} </h2>
                    </div>
                    <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
                       
                         <h2 className='flex gap-2 items-center text-yellow-500'> <Lightbulb /><strong>Information </strong></h2>  
                         <h2 className='mt-3 '> Enable Vedio web Cam and Microphone to Start your AI Generated Mock Interview , it Has 5 question which you can Answer and at the last you will get the report on the basics of your answer. Note:we never record your vedio , web cam access you can disable at any time if you want </h2> 
                    </div>
                </div>
                <div className="text-center">
                    {
                        webCamEnabled ? (<Webcam
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            style={{

                                height: 400,
                                width: 400,
                            }} />) : <><WebcamIcon className='h-72 w-full my-7  p-10 bg-secondary rounded-lg ' /> 
                            <Button className='border border-gray-150 shadow-sm' variant='ghost' onClick={() => setWebCamEnabled(true)} >Enabel Webcam And MicroPhone</Button></>
                    }
                </div>
            </div>
            <div className="flex justify-end items-end">
                    <Link href={`/dashboard/interview/${params.interviewId}/start`}><Button  className>Start Interview</Button></Link>
            
            </div>
        </div>
    )
}

export default InterviewPage