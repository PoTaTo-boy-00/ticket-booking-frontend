import { api } from "./api"

export const getSeats=async(eventId:string)=>{
    const response= await api.get(`/api/events/${eventId}/seats`)
    if(response.status!==200){
        throw new Error("Failed to fetch seats")
    }
    return response.data.data
}