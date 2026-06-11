"use client"
import { ReservationTimer } from "@/components/ReservationTimer"
import SeatGrid from "@/components/SeatGrid"
import { useConfirmReservation } from "@/hooks/useConfirmSeats"
import { useReserveSeats } from "@/hooks/useReserveSeats"
import { useSeats } from "@/hooks/useSeats"
import { useSeatSocket } from "@/hooks/useSeatSocket"
import { useParams } from "next/navigation"
import { useState } from "react"
const userId = "befd8037-ce85-486e-bae0-817320e0cae5"
const EventPage = () => {
    const params = useParams()
    useSeatSocket(params.eventId as string)
    const eventId = params.eventId as string
    const reserveSeatsMutation = useReserveSeats()
    const confirmMutation = useConfirmReservation()
    const [reservationId, setReservationId] = useState<string | null>(null)
    const [expiresAt, setExpiresAt] = useState<Date | null>(null)
    const [selectedSeats, setSelectedSeats] = useState<string[]>([])
    const [bookingConfirmed,
        setBookingConfirmed] =
        useState(false);
    const { data: seats, isLoading } = useSeats(eventId)
    const toggleSeat = (seatId: string) => {
        console.log(seatId)
        setSelectedSeats(prev => prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId])
    }
    const handleReserve = async () => {
        const { reservationId, expiresAt } = await reserveSeatsMutation.mutateAsync({
            eventId,
            userId,
            seatIds: selectedSeats
        })
        setBookingConfirmed(false)
        setSelectedSeats([])
        setReservationId(reservationId)
        setExpiresAt(expiresAt)

    }
    const handleConfirm = async () => {
        if (!reservationId) {
            return
        }
        await confirmMutation.mutateAsync({ reservationId, eventId })

        setBookingConfirmed(true)
        setSelectedSeats([]);

        setReservationId(null);

        setExpiresAt(null);
    }
    if (!seats && typeof seats === "undefined" && !isLoading) {
        return <div>No seats found for this event.</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold">
                    Event Booking
                </h1>

                <p className="text-gray-500 mt-2">
                    Event ID: {eventId}
                </p>
            </div>
            <div className="flex gap-6 mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded" />
                    Available
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded" />
                    Held
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded" />
                    Booked
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded" />
                    Selected
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                <div className="lg:col-span-3">
                    <h2 className="text-xl font-semibold mb-4">
                        Select Seats
                    </h2>

                    <SeatGrid
                        seats={seats}
                        selectedSeats={selectedSeats}
                        onSeatClick={toggleSeat}
                    />
                </div>
                            <div className="border rounded-xl p-6 h-fit shadow-sm">

                <div className="mt-6 text-black">
                    {selectedSeats.length > 0 &&
                        !reservationId && (
                            <button
                                onClick={handleReserve}
                                className="
      w-full
      mt-6
      bg-blue-600
      text-white
      py-3
      rounded-lg
    "
                            >
                                Reserve Seats
                            </button>
                        )}
                    {reservationId &&
                        !bookingConfirmed && (
                            <button
                                onClick={handleConfirm}
                                className="
      w-full
      mt-4
      bg-green-600
      text-white
      py-3
      rounded-lg
    "
                            >
                                Confirm Booking
                            </button>
                        )}
                </div>

                {expiresAt && !bookingConfirmed && (
                    <div className="mt-6">
                        <ReservationTimer
                            expiresAt={expiresAt}
                        />
                    </div>
                )}
                {bookingConfirmed && (
                    <div
                        className="
      mt-4
      p-4
      rounded-lg
      bg-green-100
      text-green-700
    "
                    >
                        Booking Confirmed
                    </div>
                )}
            </div>
            </div>

        </div>
    )
}

export default EventPage