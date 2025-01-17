"use client"


import { Navbar } from "./Navbar";
import { TemplateGallery } from "./TemplateGallery";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { DocumentsTable } from "./DocumentsTable";
import { useSearchParams } from "@/hooks/use-search-params";

export default function Home() {
  const [search] = useSearchParams("search")
  const {results, status, loadMore} = usePaginatedQuery(api.documents.get, {search}, {initialNumItems: 5})

  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        <DocumentsTable documents={results} status={status} loadMore={loadMore} /> 
      </div>
    </div> 
  );
}
