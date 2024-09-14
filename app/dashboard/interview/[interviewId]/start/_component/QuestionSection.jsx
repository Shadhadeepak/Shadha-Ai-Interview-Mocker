import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

const QuestionSection = ({ mockInterviewQuestion ,activeQuestionIndex}) => {
//   console.log('mock', mockInterviewQuestion);
const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.onend = () => {
            window.speechSynthesis.cancel(); // Stops any ongoing speech synthesis
        };
        window.speechSynthesis.speak(speech);
    } else {
        alert(`Sorry, your browser doesn't support text-to-speech.`);
    }
};


  return mockInterviewQuestion && (
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestion &&
          mockInterviewQuestion.map((question, index) => (
            <h2 className={`p-2 bg-secondary  rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex==index ? ' bg-blue-500 text-white ' : null}`}>Question #{index+1}</h2>
          ))}
      </div>
          <h2 className='my-5 text-black font-semibold text-md md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
          <Volume2 className='cursor-pointer' onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}/>
          <div className="border rounded-lg p-5 bg-blue-100 mt-10">
            <h2  className='flex gap-2 items-center text-primary'>
                <Lightbulb />
                <strong>Note:</strong>
            </h2>
            <h2 className='text-sm text-primary my-2 '>
            Click on Record Answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each of question and your answer to comapre it
            </h2>
          </div>
    </div>
  );
};

export default QuestionSection;
