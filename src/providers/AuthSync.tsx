'use client'
import { useLoginWithServer } from "@/hooks/auth/useLoginWithServer"
import { useSession } from "next-auth/react"
import { useEffect, useRef } from "react"

export const AuthSync=({children}:{children:React.ReactNode})=>{
    const {data:session,status}=useSession()
    const login=useLoginWithServer()

        const syncedToken=useRef<string|null>(null)

        useEffect(()=>{
            if(status==="unauthenticated"){
                return
            }
            if(!session?.idToken) return;
            if(syncedToken.current===session.idToken) return;
            login.mutate(session.idToken,{
                onSettled:()=>{
                    syncedToken.current=session.idToken

                }
            })
        },[session?.idToken,status])

return(
    <>
    {children}
    </>
)
}
