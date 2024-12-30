import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='mt-[-120] flex flex-col justify-center items-center min-h-screen gap-10'>
      <div className='text-yellow-50 text-center text-5xl'>
        Community Page Not Found
      </div>
      <div>
        <Button variant="destructive" className='mt-4'>
         <Link href='/'>
         Home
         </Link>
          
        </Button>
      </div>
    </div>
  )
}

export default page
