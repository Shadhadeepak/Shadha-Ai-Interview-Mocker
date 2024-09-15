'use client'

import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import InterViewCard from './InterViewCard'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { desc, eq } from 'drizzle-orm'

const InterviewList = () => {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);

    useEffect(() => {
        if (user) {
            GetInterviewList();
        }
    }, [user]);

    const GetInterviewList = async () => {
        try {
            const result = await db.select()
                .from(MockInterview)
                .where(eq(MockInterview.createBy, user.primaryEmailAddress.emailAddress))
                .orderBy(desc(MockInterview.id));

            // console.log('Fetched interviews:', result);
            setInterviewList(result); // Update the state with the fetched data

        } catch (error) {
            console.error('Error fetching interview list:', error);
        }
    };

    return (
        <div>
            <h2 className='font-medium text-xl '>Previous Attended Interview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
                {interviewList && interviewList.map((interview, index) => (
                    <InterViewCard 
                        key={index}
                        interview={interview}
                    />
                ))}
            </div>
        </div>
    )
}

export default InterviewList
