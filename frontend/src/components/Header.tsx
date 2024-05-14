import React from 'react'
import { Link } from 'react-router-dom'
import MobileNav from './MobileNav'
import MainNav from './MainNav'

export default function Header() {
  return (
    <div className='border-b-2 py-4'>
        <div className="container mx-auto flex justify-between items-center">
            <Link to='/' className='text-3xl font-bold tracking-tight text-custom' >
                EyeCue
            </Link>
            <div className='md:hidden'>
              <MobileNav/>
            </div>
            <div className='hidden md:block'>
              <MainNav/>
            </div>
        </div>
    </div>
  )
}
