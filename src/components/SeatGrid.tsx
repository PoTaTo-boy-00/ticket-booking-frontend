import { SeatInterface, Seats } from "@/types/seat.types";
import SeatCard from "./SeatCard";

// type Seat = {
//   id: string;
//   rowLabel: string;
//   seatNumber: number;
//   status: string;
// };

type Props = {
  seats: SeatInterface[];
  selectedSeats?:string[],
  onSeatClick:(seatId:string)=>void
};

export default function SeatGrid({
  seats,
  selectedSeats,
  onSeatClick
}: Props) {
  return (
    <div className="space-y-4">
      {Object.entries(
        seats.reduce((acc, seat) => {
          if (!acc[seat.rowLabel]) {
            acc[seat.rowLabel] = [];
          }

          acc[seat.rowLabel].push(seat);

          return acc;
        }, {} as Record<string, Seats>)
      ).map(([row, rowSeats]) => (
        <div
          key={row}
          className="flex gap-2 items-center"
        >
          <span className="w-6">
            {row}
          </span>

          {rowSeats.map((seat) => (
            <SeatCard
              key={seat.id}
              seatNumber={seat.seatNumber}
              status={seat.status}
              selected={selectedSeats?.includes(seat.id)}
              onClick={()=>onSeatClick(seat.id)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}