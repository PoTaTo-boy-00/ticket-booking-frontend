import { reserveSeats } from "@/services/reservation.service"
import { useMutation } from "@tanstack/react-query"

export const useReserveSeats=()=>{
   return useMutation({
        mutationFn:reserveSeats
    })
}