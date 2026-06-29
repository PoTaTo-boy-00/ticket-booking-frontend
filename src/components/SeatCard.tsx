type Props = {
  seatNumber: number;
  status: string;
  selected?: boolean;
  onClick?:()=>void 
};

export default function SeatCard({
  seatNumber,
  status,
  selected,
  onClick
}: Props) {
  const color =
    selected
      ? "bg-blue-500"
      : status === "AVAILABLE"
      ? "bg-green-500"
      : status === "HELD"
      ? "bg-yellow-500"
      : "bg-red-500";
// console.log(
//   seatNumber,
//   status
// );
  return (
    <button
    disabled={status!=="AVAILABLE"}
    onClick={onClick}
      className={`w-12 h-12 rounded text-white ${color}`}
    >
      {seatNumber}
    </button>
  );
}