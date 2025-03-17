'use client'
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";

export default function MyComponent() {
  const { data: session } = useSession()
  
  return (
    <div>
      {session?.user?.email}
      {session?.user?.name}
      <p>Welcome {session?.user.name}</p>
      {/* <p>Role: {session?.user?.role}</p> */}
      <Avatar>
        <AvatarImage src={session?.user.image} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}


// for server component only used auth 
// import { auth } from "@/auth/[...nextauth]/auth"

// export default async function ServerComponent() {
//   const session = await auth()
  
//   return (
//     <div>
//       {session?.user?.email}
//     </div>
//   )
// }