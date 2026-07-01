import { getCurrentUser } from "@/services/auth.service"
import { useQuery } from "@tanstack/react-query"

interface User {
    id: string
    email: string
    name: string
    // role: string
    createdAt: string
    updatedAt: string
}

export const useUser=()=>{
    const query=useQuery<User|null>({
        queryKey:["me"],
        queryFn:getCurrentUser,
        retry: false,
        staleTime: 1000 * 60 * 5, 
    })
    return query
}