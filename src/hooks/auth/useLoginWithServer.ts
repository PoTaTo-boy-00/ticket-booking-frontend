import { loginWithGoogle } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useLoginWithServer=()=>{
    const query=useQueryClient();
    return useMutation({
        // mutationKey:["loginWithServer"],
        mutationFn:loginWithGoogle,

        onSettled:()=>{
            query.invalidateQueries({queryKey:["me"]})
        }
    })
    
}