import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-5xl font-bold">
          Real-Time Ticket Booking System
        </h1>

        <p className="text-lg text-gray-500">
          Production-style seat reservation system
          built with Next.js, Express, Prisma,
          PostgreSQL, Redis, BullMQ and Socket.IO.
        </p>

        <div className="grid grid-cols-2 gap-4 text-left">
          <div>✓ Real-time seat updates</div>
          <div>✓ Optimistic locking</div>
          <div>✓ Reservation expiration</div>
          <div>✓ BullMQ workers</div>
          <div>✓ Socket.IO</div>
          <div>✓ Dockerized services</div>
        </div>

        <Link
          href="/event/dec542cd-1afa-42b1-a143-f6fd8cfb4352"
          className="inline-block px-6 py-3 rounded-lg bg-black text-white"
        >
          View Event
        </Link>
      </div>
    </main>
  );
}