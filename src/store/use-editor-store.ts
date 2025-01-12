import {create} from 'zustand'
import { type Editor } from '@tiptap/react'


interface editorState{
    editor: Editor | null;
    setEditor: (editor:Editor | null)=>void;
};


export const useEditorStore = create<editorState>((set)=>({
    editor:null,
    setEditor: (editor)=>set({editor})
}))