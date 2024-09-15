import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const InterViewCard = ({interview}) => {
  // console.log(interview)
  
  const router = useRouter();
  const onStart=()=>{
    router.push('/dashboard/interview/'+interview?.mockId)
  }
  const FeedbackRoute=()=>{
    router.push('/dashboard/interview/'+interview?.mockId+'/feedback')
  }
    return (
    <div className='border shadow-md rounded-lg p-3'>
        <h2 className='font-bold text-primary'>{interview?.jobposition}</h2>
        <h2 className='text-sm text-gray-600'>{interview?.jobExperience} years of Experience</h2>
        <h2 className='text-xs text-gray-400'>Created At: {interview?.createAt}</h2>
        <div className="flex justify-between mt-2 gap-5">
            <Button  size='sm' variant='outline' onClick={FeedbackRoute} className='w-full'
            >Feedback</Button>
            <Button size='sm' onClick={onStart} className='w-full'>Start</Button>
        </div>
    </div>
  )
}

export default InterViewCard