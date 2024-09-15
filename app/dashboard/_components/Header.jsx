'use client'
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
const HeaderPage = () => {
    
    const path=usePathname();

    return (
    
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm h-24'>
        <Image  src={'/logo.png'} width={160} height={100} alt='LOGO' /> 
        <ul className='hidden  md:flex gap-6 ' >
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path== '/dashboard' && 'text-primary font-bold' } `} >DashBoard</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path== '/questions' && 'text-primary font-bold' } `} >Questions</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path== '/howitWorks' && 'text-primary font-bold' } `} >How it Works?</li>
        </ul>
        <UserButton />
    </div>
  )
}

export default HeaderPage