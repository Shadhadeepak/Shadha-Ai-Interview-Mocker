'use client'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { v4 as uuidv4 } from 'uuid';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/geminiAi';
import { LoaderCircle, Router } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
import { useRouter } from 'next/navigation';

const AddNewInterview = () => {
    const [openDailog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState()
    const [jobDesc, setJobDesc] = useState()
    const [jobExp, setJobExp] = useState()
    const [loading,setLoading] = useState(false)
    const [jsonResponce,setJsonResponse] = useState([])
    const {user} =useUser();
    const router=useRouter();
    const onSubmit=async(e)  =>{
        setLoading(true)
        e.preventDefault()
        console.log(jobDesc,jobExp,jobPosition)
        
        const inputPromt =`Job Position:${jobPosition},Job Description:${jobDesc} years of experience:${jobExp},Depand on Job Position,Job Description & Years of Expreience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview question along with Answer in JSON format,Give us question and answer field on JSON`
    
        const result = await chatSession.sendMessage(inputPromt);
        const mockResponce=(result.response.text()).replace('```json','').replace('```','').trim()
        // console.log(JSON.parse(mockResponce));
        setJsonResponse(mockResponce)
        if(mockResponce){

            const resp = await db.insert(MockInterview)
            .values({
                mockId: uuidv4(),
                jsonMockrResp:mockResponce,
                jobPosition:jobPosition,
                jobDescription:jobDesc,
                jobExperience:jobExp,
                createBy:user?.primaryEmailAddress.emailAddress,
                createAt:moment().format('DD-MM-YYYY')
            }).returning({mockId:MockInterview.mockId})

            // console.log(resp)
            if(resp){
                setOpenDialog(false)
                router.push(`/dashboard/interview/${resp[0]?.mockId}`)
            }
            
            setJobDesc('')
            setJobPosition('')
            setJobExp('')
            setLoading(false)
            

        }
        else{
            console.log('There is an error')
        }
    }
 
    return (
        <div>
            <div className="p-8 border rounded-lg bg-primary hover:scale-105 hover:shadow-md cursor-pointer transition-all" onClick={() => setOpenDialog(true)}>
                <h2 className='font-bold text-lg text-center '>+ Add New</h2>
            </div>
            <Dialog open={openDailog}>

                <DialogContent className='bg-secondary max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us More About Your Job Interview?</DialogTitle>
                        <DialogDescription className='text-gray-900'>
                            <form action="" onSubmit={onSubmit}>

                                <div className="">
                                    <h2 className='font-bold text-2xl'></h2>
                                    <h2>Add Details about your job Position/role, Job description and years of Experience </h2>
                                    <div className="mt-7 my-3">
                                        <label htmlFor="">Job Role/Job Position</label>
                                        <Input placeHolder='Ex: Full Stack Developer, Java Developer ' value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} required />
                                    </div>
                                    <div className=" my-3">
                                        <label htmlFor="">Job Description/Tech Stack(In Short)</label>
                                        <Textarea placeHolder='React,Java,MySql 'value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} required />
                                    </div>
                                    <div className=" my-3">
                                        <label htmlFor="">Year of Exprience</label>
                                        <Input placeHolder='For Ex: 5 ' max='50' type='number' value={jobExp} onChange={(e) => setJobExp(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="flex gap-5 justify-end">
                                    <Button variant='ghost' type='button' onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type='submit' disabled={loading}>{loading ? <><LoaderCircle className='animate-spin' /> Preparing Question</> : "Start Interview"}</Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview