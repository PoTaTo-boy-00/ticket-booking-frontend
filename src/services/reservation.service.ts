
import { api } from "../libs/api"

export const reserveSeats=async({eventId,userId,seatIds}:{
    eventId:string,
    userId:string,
    seatIds:string[]
})=>{
    try {
        
        const response=await api.post("/api/reservations",{
            eventId,
            userId,
            seatIds
        })
        
        return response.data
    } catch (error) {
    console.log(error)
    }
}

export const confirmReservation=async( reservationId:string, eventId:string )=>{
    try {
        
        const response=await api.post(`/api/reservations/${reservationId}/confirm`,{eventId})
        return response.data
    } catch (error) {
        throw new Error("Failed to confirm reservation")
    }

}