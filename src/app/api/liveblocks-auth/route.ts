import  {Liveblocks} from "@liveblocks/node"
import {ConvexHttpClient} from "convex/browser"
import {auth, currentUser} from "@clerk/nextjs/server"
import { api } from "../../../../convex/_generated/api"


const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY!
})


export async function POST(req:Request){
    const {sessionClaims} = await auth()

    console.log("session claims:", sessionClaims)

    if (!sessionClaims){
        return new Response("unauthorized", {status:401})
    }

    console.log("session claims recieved")

    const user = await currentUser()
    if(!user){
        return new Response("unauthorized", {status:401})
    }

    console.log("user recieved")

    const {room} = await req.json() 

    console.log("roomid:", room)

    const document = await convex.query(api.documents.getById, {id:room})

    if (!document) return new Response("unauthroized", {status:401})

    console.log("document recieved")

    const isOwner = document.ownerId === user.id
    const isOrganizationMember = !!(document.organizationId && document.organizationId === sessionClaims?.org_id)

    console.log("checked for owner and organization")

    if (!isOwner && !isOrganizationMember) return new Response("unauthroized", {status:401})

    const session = liveblocks.prepareSession(user.id, {
        userInfo: {
            name: user.fullName ?? "Anonymous",
            avatar: user.imageUrl
        }
    })
    session.allow(room, session.FULL_ACCESS)
    const {body, status} = await session.authorize()

    return new Response(body, {status})
}