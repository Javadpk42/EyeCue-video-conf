import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

export default function MainNav() {
  return (
    <div>
      <Link to='/signup'>
      <Button variant='destructive' className='font-bold hover:text-custom hover:bg-white bg-custom rounded-full'>
        Sign Up Free
      </Button>
      </Link>
    </div>
  )
}
