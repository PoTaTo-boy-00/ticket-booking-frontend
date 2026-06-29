"use client"
import ProtectedRoute from "@/components/Auth/ProtectedRoute"
import { ReservationTimer } from "@/components/ReservationTimer"
import SeatGrid from "@/components/SeatGrid"
import { useUser } from "@/hooks/auth/useUserCreds"
import { useConfirmReservation } from "@/hooks/useConfirmSeats"
import { useReserveSeats } from "@/hooks/useReserveSeats"
import { useSeats } from "@/hooks/useSeats"
import { useSeatSocket } from "@/hooks/useSeatSocket"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"

const EventPage = () => {
  const params = useParams()
  useSeatSocket(params.eventId as string)
  const eventId = params.eventId as string
  const reserveSeatsMutation = useReserveSeats()
  const confirmMutation = useConfirmReservation()
  const [reservationId, setReservationId] = useState<string | null>(null)
  const [expiresAt, setExpiresAt] = useState<Date | null>(null)
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [timedOut, setTimedOut] = useState(false)
  const { data: seats, isLoading, refetch } = useSeats(eventId)
  const { data: session } = useUser()


  const handleTimerExpire = () => {
    setTimedOut(true)
    setReservationId(null)
    setExpiresAt(null)
    setSelectedSeats([])
    refetch()
    setTimeout(() => setTimedOut(false), 4000)
  }

  const toggleSeat = (seatId: string) => {
    if (reservationId) return 
    setSelectedSeats(prev =>
      prev.includes(seatId) ? prev.filter(id => id !== seatId) : [...prev, seatId]
    )
  }

  const handleReserve = async () => {
    const { reservationId, expiresAt } = await reserveSeatsMutation.mutateAsync({
      eventId,
      userId: session?.id,
      seatIds: selectedSeats,
    })
    setBookingConfirmed(false)
    setSelectedSeats([])
    setReservationId(reservationId)
    setExpiresAt(expiresAt)
  }

  const handleConfirm = async () => {
    if (!reservationId) return
    await confirmMutation.mutateAsync({ reservationId, eventId })
    setBookingConfirmed(true)
    setSelectedSeats([])
    setReservationId(null)
    setExpiresAt(null)
  }

  const handleCancelSelection = () => {
    setSelectedSeats([])
  }

  if (!seats && typeof seats === "undefined" && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F5FF]">
        <p className="text-[#9B8DB0] font-medium">No seats found for this event.</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F5FF]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#7C3AED] border-t-transparent animate-spin" />
          <p className="text-[#9B8DB0] text-sm tracking-wide">Loading seats…</p>
        </div>
      </div>
    )
  }

  const totalSeats = seats?.length ?? 0
  const availableSeats = seats?.filter((s: { status: string }) => s.status === "AVAILABLE").length ?? 0
//   console.log(availableSeats)
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#F8F5FF]">
        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* Page header */}
          <div className="mb-10">
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#A78BFA] mb-2">
              Live booking
            </p>
            <h1
              className="text-4xl text-[#1A0A2E] leading-tight"
              style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: "-0.025em" }}
            >
              Event Booking
            </h1>
            <p className="text-[#9B8DB0] text-sm mt-1">
              {availableSeats} of {totalSeats} seats available
            </p>
          </div>

          {/* Timed-out notice */}
          {timedOut && (
            <div className="mb-6 px-5 py-4 rounded-xl bg-[#EDE9FE] border border-[#C4B5FD] text-[#5B21B6] text-sm flex items-center gap-3">
              <span className="text-base">⏰</span>
              Your reservation expired. Those seats have been released — pick again.
            </div>
          )}

          {/* Confirmed notice */}
          {bookingConfirmed && (
            <div className="mb-6 px-5 py-4 rounded-xl bg-[#F0FDF4] border border-[#86EFAC] text-[#166534] text-sm flex items-center gap-3">
              <span className="text-base">✓</span>
              Booking confirmed! Your seats are locked in.
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">

            {/* ── SEAT MAP ── */}
            <div>
              

              <SeatGrid
                seats={seats}
                selectedSeats={selectedSeats}
                onSeatClick={toggleSeat}
              />

              {/* Seat state key — minimal, no labels, just swatches in a row */}
              <div className="flex items-center justify-center gap-6 mt-8 opacity-60">
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-sm bg-[rgb(63,218,20)]" />
                  <span className="text-xs text-[#9B8DB0]">Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-sm bg-[#2943ed]" />
                  <span className="text-xs text-[#9B8DB0]">Selected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-sm bg-[#FCD34D]" />
                  <span className="text-xs text-[#9B8DB0]">Held</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-sm bg-red-500" />
                  <span className="text-xs text-[#9B8DB0]">Booked</span>
                </div>
              </div>
            </div>

            {/* ── SIDEBAR ── */}
            <div className="flex flex-col gap-4 sticky top-24">

              {/* Timer — prominent, always visible when active */}
              {expiresAt && !bookingConfirmed && (
                <div className="rounded-2xl border border-[#EDE9FE] bg-white px-6 py-5 shadow-sm">
                  <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#A78BFA] mb-3">
                    Hold expires in
                  </p>
                  <ReservationTimer
                    expiresAt={expiresAt}
                    onExpire={handleTimerExpire}
                  />
                  <p className="text-xs text-[#C4B5FD] mt-3 leading-relaxed">
                    Complete your booking before the timer runs out or your seats will be released.
  </p>
                </div>
              )}

              {/* Selection summary card */}
              <div className="rounded-2xl border border-[#EDE9FE] bg-white px-6 py-5 shadow-sm">
                <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#A78BFA] mb-4">
                  Your selection
                </p>

                {selectedSeats.length === 0 && !reservationId && !bookingConfirmed ? (
                  <p className="text-sm text-[#C4B5FD] leading-relaxed">
                    Tap any available seat to select it.
                  </p>
                ) : reservationId && !bookingConfirmed ? (
                  <div>
                    <p className="text-sm text-[#6B5F7A] leading-relaxed mb-1">
                      Seats are held for you.
                    </p>
                    <p className="text-xs text-[#A78BFA]">Confirm to complete your booking.</p>
                  </div>
                ) : bookingConfirmed ? (
                  <p className="text-sm text-[#6B5F7A]">All done — check your email for confirmation.</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {selectedSeats.map(id => (
                      <div
                        key={id}
                        className="flex items-center justify-between text-sm text-[#1A0A2E] py-1 border-b border-[#F3F0FF] last:border-0"
                      >
                        <span className="font-medium">Seat {id.slice(-4).toUpperCase()}</span>
                        <button
                          onClick={() => setSelectedSeats(prev => prev.filter(s => s !== id))}
                          className="text-[#C4B5FD] hover:text-[#7C3AED] transition-colors text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <p className="text-xs text-[#A78BFA] mt-1">
                      {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''} selected
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-5 flex flex-col gap-2">
                  {selectedSeats.length > 0 && !reservationId && (
                    <>
                      <button
                        onClick={handleReserve}
                        disabled={reserveSeatsMutation.isPending}
                        className="w-full py-3 rounded-xl bg-[#7C3AED] text-white text-sm font-medium
                          hover:bg-[#6D28D9] active:scale-[0.98] transition-all
                          disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {reserveSeatsMutation.isPending ? "Holding…" : `Hold ${selectedSeats.length} seat${selectedSeats.length !== 1 ? 's' : ''}`}
                      </button>
                      <button
                        onClick={handleCancelSelection}
                        className="w-full py-2.5 rounded-xl border border-[#EDE9FE] text-[#9B8DB0]
                          text-sm hover:border-[#C4B5FD] hover:text-[#7C3AED] transition-all"
                      >
                        Clear
                      </button>
                    </>
                  )}
                  {reservationId && !bookingConfirmed && (
                    <button
                      onClick={handleConfirm}
                      disabled={confirmMutation.isPending}
                      className="w-full py-3 rounded-xl bg-[#059669] text-white text-sm font-medium
                        hover:bg-[#047857] active:scale-[0.98] transition-all
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {confirmMutation.isPending ? "Confirming…" : "Confirm booking"}
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default EventPage