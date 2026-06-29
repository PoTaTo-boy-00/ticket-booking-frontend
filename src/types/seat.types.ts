export interface SeatInterface{
    id:string;
    rowLabel:string;
    seatNumber:number;
    status:'AVAILABLE' | 'BOOKED' | 'HELD';
}

export type Seats= SeatInterface[];
