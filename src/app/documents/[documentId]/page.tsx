import React from 'react'
import {Editor} from "./editor"
import { Toolbar } from './Toolbar';
import { Navbar } from './Navbar';

interface DocumentIdPageProps{
    params: Promise<{documentId: string}>;
}

async function DocumentIdPage({params} : DocumentIdPageProps) {
    const awaitedParams = await params
    const documentId = awaitedParams.documentId;
  return (
    <div className='min-h-screen bg-[#FAFBFD]'>
      <div className='flex flex-col px-4 pt-2 gap-y-2 fixed top-0 z-10 left-0 right-0 bg-[#fafbfd] print:hidden'>
        <Navbar />
        <Toolbar />
      </div>
      <div className='pt-[114px] print:pt-0'>
        <Editor />
      </div>
      
    </div>
  )
}

export default DocumentIdPage