'use client';

import { useUser } from '@/hooks/auth/useUserCreds';
import { useRouter } from 'next/navigation';
import LoginButton from '../Auth/LoginButton';

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useUser();

  return (
    <nav className="sticky top-0 z-50 border-b border-violet-100 bg-[#F8F5FF]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-15 max-w-[1100px] items-center justify-between px-16">
        <button
          onClick={() => router.push('/')}
          className="bg-transparent cursor-pointer p-0 font-serif text-4xl font-normal tracking-[-0.02em] text-violet-600"
        >
          Ticket Booking App
        </button>

        <div className="flex items-center gap-3">
          {session ? (
            <button
              onClick={() => router.push('/user')}
              className="rounded-lg bg-violet-600 px-5 py-[9px] text-sm font-medium text-white transition-colors duration-200 hover:bg-violet-700"
            >
              Dashboard
            </button>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;