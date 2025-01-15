"use client"


import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "./Navbar";
import { TemplateGallery } from "./TemplateGallery";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Home() {
  const documents = useQuery(api.documents.get)

  if(documents === undefined){
    return (
      <p>Loading...</p>
    )
  }
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        {documents?.map(doc => (
          <span key={doc._id}>{doc.title}</span>
        ))}
      </div>
    </div>
  );
}
