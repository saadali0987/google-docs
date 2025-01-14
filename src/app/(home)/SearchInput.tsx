"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSearchParams } from '@/hooks/use-search-params'
import { SearchIcon, XIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'

export const SearchInput = () => {
    const [search, setSearch] = useSearchParams("search")
    const [value, setValue] = useState(search);
    const inputRef = useRef<HTMLInputElement>(null)
    

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleClear = ()=>{
        setValue("")
        setSearch("")
        inputRef.current?.blur()
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setSearch(value )
        inputRef.current?.blur()
    }
  return (
    <div className='flex-1 flex items-center justify-center'>
        <form onSubmit={handleSubmit} className='relative max-w-[720px] w-full'>
            <Input value={value} onChange={handleChange} ref={inputRef}  placeholder='Search..' className='md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]  bg-[#f0f4f8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white' />
            <Button type='submit' size="icon" variant="ghost" className='absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full'>
                <SearchIcon />
            </Button>
            {value && (
                <Button onClick={handleClear} type='button' size="icon" variant="ghost" className='absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full'>
                <XIcon />
            </Button>
            )}

        </form>
    </div>
  )
}
 