import { useEffect, useState } from "react"

type Props={
    expiresAt:Date
}

export const ReservationTimer=({expiresAt}:Props)=>{
    const [timeLeft,setTimeLeft]=useState(0)
    useEffect(()=>{
       const interval= setInterval(()=>{
            const diff= new Date(expiresAt).getTime()-Date.now()
            setTimeLeft(
                Math.max(
            0,
            Math.floor(diff / 1000)
          )
            )
        },1000)
        return ()=>clearInterval(interval)
    },[expiresAt])
    const minutes=Math.floor(timeLeft/60)
    const seconds=timeLeft%60
    return (
        <div>
            Time left to complete reservation: {minutes}:{seconds<10?`0${seconds}`:seconds}
        </div>
    )
}