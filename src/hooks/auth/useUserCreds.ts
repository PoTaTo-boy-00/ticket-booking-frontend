import { getCurrentUser } from "@/services/auth.service"
import { useQuery } from "@tanstack/react-query"



export const useUser=()=>{
    const query=useQuery({
        queryKey:["me"],
        queryFn:getCurrentUser,
        retry: false,
        staleTime: 1000 * 60 * 5, 
    })
    return query
}