import { SeatInterface, Seats } from "@/types/seat.types";
import SeatCard from "./SeatCard";

type Props = {
  seats: SeatInterface[];
  selectedSeats?: string[];
  onSeatClick: (seatId: string) => void;
};

export default function SeatGrid({ seats, selectedSeats = [], onSeatClick }: Props) {
  // Group and sort rows
  const rowMap = seats.reduce((acc, seat) => {
    if (!acc[seat.rowLabel]) acc[seat.rowLabel] = [];
    acc[seat.rowLabel].push(seat);
    return acc;
  }, {} as Record<string, Seats>);

  const sortedRows = Object.entries(rowMap).sort(([a], [b]) => a.localeCompare(b));

  // Sort seats within each row by seatNumber
  sortedRows.forEach(([, rowSeats]) =>
    rowSeats.sort((a, b) => a.seatNumber - b.seatNumber)
  );

  const maxCols = Math.max(...sortedRows.map(([, s]) => s.length));
  // Aisle after the middle seat
  const aisleAfter = Math.floor(maxCols / 2) - 1;

  const available = seats.filter(s => s.status === "AVAILABLE").length;
  const held = seats.filter(s => s.status === "HELD").length;
  const booked = seats.filter(s => s.status === "BOOKED").length;

  return (
    <div className="w-full">

      {/* Seat count summary */}
      <div className="flex items-center gap-5 mb-8 px-1">
        <div className="flex items-center gap-1.5">
          <span className="text-lg font-semibold text-[#1A0A2E]"
            style={{ fontFamily: "'Instrument Serif', serif" }}>
            {available}
          </span>
          <span className="text-xs text-[#9B8DB0]">available</span>
        </div>
        <div className="h-3 w-px bg-[#EDE9FE]" />
        <div className="flex items-center gap-1.5">
          <span className="text-lg font-semibold text-[#F59E0B]"
            style={{ fontFamily: "'Instrument Serif', serif" }}>
            {held}
          </span>
          <span className="text-xs text-[#9B8DB0]">held</span>
        </div>
        <div className="h-3 w-px bg-[#EDE9FE]" />
        <div className="flex items-center gap-1.5">
          <span className="text-lg font-semibold text-[#9B8DB0]"
            style={{ fontFamily: "'Instrument Serif', serif" }}>
            {booked}
          </span>
          <span className="text-xs text-[#9B8DB0]">booked</span>
        </div>
        {selectedSeats.length > 0 && (
          <>
            <div className="h-3 w-px bg-[#EDE9FE]" />
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-semibold text-[#7C3AED]"
                style={{ fontFamily: "'Instrument Serif', serif" }}>
                {selectedSeats.length}
              </span>
              <span className="text-xs text-[#7C3AED]">selected</span>
            </div>
          </>
        )}
      </div>

     

      {/* Seat map */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-flex flex-col gap-2.5 min-w-max mx-auto">
          {sortedRows.map(([rowLabel, rowSeats]) => (
            <div key={rowLabel} className="flex items-center gap-2">

              {/* Left row label */}
              <span
                className="w-5 text-center text-xl text-[#9a93b5] select-none flex-shrink-0"
                style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
              >
                {rowLabel}
              </span>

              {/* Seats */}
              <div className="flex gap-1.5">
                {rowSeats.map((seat, idx) => (
                  <div key={seat.id} className="flex gap-1.5 items-center">
                    <SeatCard
                      seatNumber={seat.seatNumber}
                      status={seat.status}
                      selected={selectedSeats.includes(seat.id)}
                      onClick={() => onSeatClick(seat.id)}
                    />
                    {/* Centre aisle gap */}
                    {idx === aisleAfter && (
                      <div className="w-5 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              {/* Right row label */}
              <span
                className="w-5 text-center text-xl text-[#9a93b5] select-none flex-shrink-0"
                style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
              >
                {rowLabel}
              </span>
            </div>
          ))}

          {/* Column numbers */}
          <div className="flex items-center gap-2 mt-1 pl-7">
            <div className="flex gap-1.5">
              {sortedRows[0]?.[1].map((_, idx) => (
                <div key={idx} className="flex gap-1.5 items-center">
                  <span
                    className="w-8 text-center select-none"
                    style={{ fontSize: '9px', color: '#DDD6FE' }}
                  >
                    {idx + 1}
                  </span>
                  {idx === aisleAfter && <div className="w-5" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}