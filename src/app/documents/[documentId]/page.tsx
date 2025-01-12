import React from 'react'
import {Editor} from "./editor"
import { Toolbar } from './Toolbar';

interface DocumentIdPageProps{
    params: Promise<{documentId: string}>;
}

async function DocumentIdPage({params} : DocumentIdPageProps) {
    const awaitedParams = await params
    const documentId = awaitedParams.documentId;
  return (
    <div className='min-h-screen bg-[#FAFBFD]'>
        <Toolbar />
        <Editor />
    </div>
  )
}

export default DocumentIdPage