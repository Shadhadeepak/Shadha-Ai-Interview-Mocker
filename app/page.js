import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <div className="flex flex-col  min-h-screen bg-white">
      {/* Header */}
      
      <div className='flex p-4 items-center justify-between bg-secondary shadow-sm h-24'>
        <Image  src={'/logo.png'} width={160} height={100} alt='LOGO' /> 
        <ul className='hidden  md:flex gap-6 ' >
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer  `} >DashBoard</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer`} >Questions</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer `} >How it Works?</li>
        </ul>
       
    </div>
      

      {/* Main Section */}
      <main className="text-center flex-grow flex flex-col justify-center items-center">
        <h2 className="text-4xl font-extrabold mb-2">Unlock Your Future with Confidence!</h2>
        <p className="text-lg mb-6">
          Elevate your interview skills and land your dream job with personalized mock sessions.
        </p>
        <Link href="/dashboard">
          <Button className="px-8 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-500 transition-all">
            Start Your Journey Today!
          </Button>
        </Link>
      </main>

      {/* Footer */}
      <footer className="w-full py-4">
        <div className="container mx-auto text-center"> 
          <p className="text-gray-500">© 2024 Shadha's PrepWise | Empowering candidates to interview with confidence.</p>
        </div>
      </footer>
    </div>
  );
}
