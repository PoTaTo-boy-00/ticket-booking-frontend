import { getSeats } from "@/services/seat.service"
import { useQuery } from "@tanstack/react-query"

export const useSeats=(eventId:string)=>{
    return useQuery({
        queryKey:["seats",eventId],
        queryFn:async()=>getSeats(eventId)
    })
}