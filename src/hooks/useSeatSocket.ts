'use client'
import { socket } from "@/libs/socket"
import { SeatInterface, Seats } from "@/types/seat.types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react"

export const useSeatSocket = (eventId: string) => {
    const queryClient=useQueryClient()
useEffect(() => {
    console.log("mounted");

    console.log(
        "already connected?",
        socket.connected
    );

    console.log(
        "socket id:",
        socket.id
    );

    socket.on(
    "seat:update",
    ({ seatId, status }) => {

        queryClient.setQueryData(
            ["seats", eventId],
            (oldData: Seats) => {

                if (!oldData) {
                    return oldData;
                }

                return oldData.map(
                    (seat: SeatInterface) =>
                        seat.id === seatId
                            ? {
                                ...seat,
                                status
                            }
                            : seat
                );
            }
        );
    }
);

    return () => {
        socket.off("seat:update");
    };
}, []);
};