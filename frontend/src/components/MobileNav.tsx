import React from 'react'
import {Sheet,SheetContent,SheetDescription,SheetTrigger} from './ui/sheet'
import { Menu } from 'lucide-react'
import { Button } from './ui/button'
import { Separator } from '@radix-ui/react-separator'

export default function MobileNav() {
  return (
    <Sheet>
        <SheetTrigger className='pt-2'>
            <Menu className='text-custom'/>
        </SheetTrigger>
        <SheetContent className='space-y-3'>
            <SheetDescription>
              <span>Let's Get Started</span>
            </SheetDescription>
            <Separator/>
            <SheetDescription className='flex'>
              <Button className='flex-1 font-bold hover:text-custom hover:bg-white bg-custom'>Sign Up Free</Button>
            </SheetDescription>
        </SheetContent>
    </Sheet>
  )
}
