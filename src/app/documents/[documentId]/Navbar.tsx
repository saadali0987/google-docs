import Image from 'next/image'
import React from 'react'

export const Navbar = () => {
  return (
    <nav>
        <Image src="/logo2.svg" alt='logo' width={36} height={36} />
    </nav>
  )
}
