import { useMutation } from "@tanstack/react-query";
import { confirmReservation } from "@/services/reservation.service";

export const useConfirmReservation = () => {
  return useMutation({
    mutationFn: ({
      eventId,
      reservationId,
    }: {
      eventId: string;
      reservationId: string;
    }) =>
      confirmReservation(
        reservationId,
        eventId
      ),
  });
};