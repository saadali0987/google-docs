"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { getDocuments, getUsers } from "./actions";
import { Id } from "../../../../convex/_generated/dataModel";

interface User {
  id: string;
  name: string;
  avatar: string;
}

export function Room({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const params = useParams();

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getUsers();
        setUsers(list);
      } catch {
        console.log("failed to fetch users");
      }
    },
    []
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      authEndpoint={async ()=>{
        const endpoint = "/api/liveblocks-auth"
        const room = params.documentId as string

        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({room})
        })

        return await response.json()
      }}
      throttle={16}
      resolveUsers={({ userIds }) => {
        return userIds.map(
          (userId) => users.find((user) => userId == user.id) ?? undefined
        );
      }}
      resolveMentionSuggestions={({text}) => {
        let filteredUsers = users

        if(text){
            filteredUsers = users.filter((user)=>user.name.toLowerCase().includes(text.toLowerCase()))
        }

        return filteredUsers.map(user=>user.id)
      }}
      resolveRoomsInfo={async({roomIds}) => {
        const documents = await getDocuments(roomIds as Id<"documents">[])
        return documents.map((doc)=>({
          id: doc.id,
          name: doc.name
        }))
      }}
    >
      <RoomProvider id={params.documentId as string} initialStorage={{leftMargin: 56, rightMargin:56}}>
        <ClientSideSuspense
          fallback={<FullScreenLoader label="Room Loading" />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
