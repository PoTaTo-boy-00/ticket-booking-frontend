import { useMutation } from "@tanstack/react-query";
import { confirmReservation } from "@/services/reservation.service";

export const useConfirmReservation = () => {
  return useMutation({
    mutationFn: ({
      eventId,
      reservationId,
      email,
      name,
    }: {
      eventId: string;
      reservationId: string;
      email: string;
      name: string;
      
    }) =>
      confirmReservation(
        reservationId,
        eventId,
        email,
        name
      ),
  });
};