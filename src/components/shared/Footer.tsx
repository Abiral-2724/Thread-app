"use client"

import { Smile } from "lucide-react"

const Footer = () => {
  return (
    <footer className='w-full bg-dark-2 text-white py-4 mt-0.5'>
    <div className='flex justify-center items-center'>
      <p className='text-sm'>
        &copy; {new Date().getFullYear()} All Rights Reserved.
      </p>
    </div>
    <div className='flex justify-center items-center mt-2 gap-2'>

      <p className='text-sm'>Made by Abiral Jain</p>
      <Smile />
    </div>
  </footer>
  )
}

export default Footer