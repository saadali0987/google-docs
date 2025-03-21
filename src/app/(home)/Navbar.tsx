import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SearchInput } from './SearchInput'
import {UserButton, OrganizationSwitcher} from "@clerk/nextjs"

export const Navbar = () => {
  return (
    <nav className='flex items-center h-full w-full justify-between'>
        <div className='flex gap-3 items-center shrink-0 pr-6'>
            <Link href="/">
                <Image src="/logo.svg" alt='logo' width={36} height={36} />
            </Link>
            <h3 className='text-xl'>SaadDocs</h3>
        </div>

        <SearchInput />

        <div className='flex items-center gap-3 pl-6'>
          <OrganizationSwitcher afterCreateOrganizationUrl="/" afterLeaveOrganizationUrl='/' afterSelectOrganizationUrl='/' afterSelectPersonalUrl='/' />
          <UserButton />
        </div>
        
    </nav>
  )
}
