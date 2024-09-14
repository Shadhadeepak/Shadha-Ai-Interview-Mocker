import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { MockInterview, UserAnswer } from '@/utils/schema';
import { chatSession } from '@/utils/geminiAi';
import { db } from '@/utils/db';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
// import {UserAnswer} from '@/utils/schema'
const RecordAnswerSection = ({ activeQuestionIndex, mockInterviewQuestion, interviewData }) => {
    const [userAnswer, setUserAnswer] = useState('');
    const { user } = useUser();
    const [loading, setLoading] = useState(false)
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    useEffect(() => {
        results.map((res) => setUserAnswer((prev) => prev + res.transcript));
    }, [results]);
    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            updateUserAnswer()
        }
    }, [userAnswer])
    const SaveUserAnswer = async () => {
        if (isRecording) {
            // setLoading(true)
            stopSpeechToText()


        }
        else {
            startSpeechToText()
        }
    }

    const updateUserAnswer = async () => {
        setLoading(true)
        const feedBackPromt = `question:${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer:${userAnswer}, Depand on Question and User Answer for given interview question Please give us rating for answer and feedback as area of improvement if any , in just 3 to 5 lines
            to improve it in JSON format with rating field and feedback Field`
        const result = await chatSession.sendMessage(feedBackPromt)

        const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '').trim()
        console.log(mockJsonResp);
        const JSONMockResp = JSON.parse(mockJsonResp);


        const resp = await db.insert(UserAnswer)
            .values({
                mockIdRef: interviewData?.mockId,
                questionDb: mockInterviewQuestion[activeQuestionIndex]?.question,
                correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                userAns: userAnswer,
                feesback: JSONMockResp?.feedback,
                rating: JSONMockResp?.rating,
                userEmail: user?.primaryEmailAddress.emailAddress,
                createAt: moment().format('DD-MM-YYYY')

            })
        if (resp) {
            toast('user Answer Recorded Successfully')
            setUserAnswer('')
            setResults([])
        }
        setResults([])
        //    setUserAnswer('')
        setLoading(false)

    }
    return (
        <div className="flex items-center justify-center flex-col">
            <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
                <Image src="/214713.png" width={200} height={200} className="absolute" />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10,
                    }}
                />
            </div>
            <Button disabled={loading} variant='outline' className="my-10" onClick={SaveUserAnswer}>
                {isRecording ? (
                    <h2 className="text-red-600 flex gap-1">
                        <Mic /> Stop Recording...
                    </h2>
                ) : (
                    <h2 className='flex gap-1 text-primary'><Mic /> Record Answer</h2>

                )}

            </Button>

        </div>
    );
};

export default RecordAnswerSection;
