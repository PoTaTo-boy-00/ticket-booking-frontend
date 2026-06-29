"use client"
import { useEffect, useState } from "react"

interface ReservationTimerProps {
  expiresAt: Date
  onExpire?: () => void
}

export const ReservationTimer = ({ expiresAt, onExpire }: ReservationTimerProps) => {
  const total = 15 * 60 // 15 minutes in seconds
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const diff = Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000)
    return Math.max(0, diff)
  })

  useEffect(() => {
  const update = () => {
    const diff = Math.max(
      0,
      Math.floor(
        (new Date(expiresAt).getTime() - Date.now()) / 1000
      )
    );

    setSecondsLeft(diff);
  };

  update();

  const id = setInterval(update, 1000);

  return () => clearInterval(id);
}, [expiresAt]);
useEffect(() => {
  if (secondsLeft === 0) {
    onExpire?.();
  }
}, [secondsLeft, onExpire]);

  const mins = Math.floor(secondsLeft / 60)
  const secs = secondsLeft % 60
  const progress = secondsLeft / total // 1 → 0
  const urgent = secondsLeft <= 60

  // SVG ring
  const r = 28
  const circ = 2 * Math.PI * r
  const dash = circ * progress

  return (
    <div className="flex items-center gap-5">
      

      {/* Text */}
      <div>
        <p className={`text-2xl font-semibold tabular-nums ${urgent ? "text-red-500" : "text-[#1A0A2E]"}`}
          style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: "-0.02em" }}
        >
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </p>
        <p className="text-xs text-[#9B8DB0] mt-0.5">
          {urgent ? "Expiring soon!" : "minutes remaining"}
        </p>
      </div>
    </div>
  )
}