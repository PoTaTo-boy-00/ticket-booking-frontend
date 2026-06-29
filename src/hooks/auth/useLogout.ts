import { logout } from "@/services/auth.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signOut } from "next-auth/react"

export const useLogout=()=>{
    const query=useQueryClient()
    return useMutation({
        mutationFn:logout,
        onSettled:async()=>{
            query.removeQueries({queryKey:["me"]})

            await signOut({
                redirect:true,
                callbackUrl:"/"
            })
        }
        
    })
}