'use client';

import LogOutButton from '@/components/Auth/LogOutButton';
import { Lock } from 'lucide-react';
import { useSession } from 'next-auth/react';

const UserInfo = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F8F5FF] px-6">
        <div className="text-center max-w-xs">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#EDE9FE]">
            <Lock className="h-5 w-5 text-[#7C3AED]" />
          </div>
          <h2
            className="text-2xl text-[#1A0A2E]"
            style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: '-0.02em' }}
          >
            Not signed in
          </h2>
          <p className="mt-2 text-sm text-[#9B8DB0] leading-relaxed">
            Sign in to view your profile and manage your bookings.
          </p>
        </div>
      </div>
    );
  }

  const initials = session.user?.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? '?';

  return (
    <div className="min-h-[70vh] bg-[#F8F5FF]">

      {/* ── COVER ─────────────────────────────────────── */}
      <div className="relative h-48 bg-[#1A0A2E] overflow-hidden">
        {/* subtle texture via repeating gradient */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #7C3AED 0%, transparent 50%), radial-gradient(circle at 80% 20%, #A78BFA 0%, transparent 45%)',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#EDE9FE]/20" />
      </div>

      {/* ── CONTENT ───────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 md:px-10">

        {/* Avatar row — overlaps the cover */}
        <div className="flex items-end justify-between -mt-12 mb-8">
          <div className="relative">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name ?? 'User'}
                className="h-24 w-24 rounded-full border-4 border-[#F8F5FF] object-cover shadow-lg"
              />
            ) : (
              <div
                className="h-24 w-24 rounded-full border-4 border-[#F8F5FF] shadow-lg flex items-center justify-center bg-[#7C3AED]"
                style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.75rem', color: '#fff' }}
              >
                {initials}
              </div>
            )}
            {/* online dot
            <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-[#7C3AED] border-2 border-[#F8F5FF]" /> */}
          </div>

          <div className="pb-1">
            <LogOutButton />
          </div>
        </div>

        {/* Name + email */}
        <div className="mb-10">
          <h1
            className="text-3xl text-[#1A0A2E] leading-tight"
            style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: '-0.025em' }}
          >
            {session.user?.name}
          </h1>
          <p className="mt-1 text-sm text-[#726a7e]">{session.user?.email}</p>
        </div>

        {/* ── INFO SECTIONS ─────────────────────────── */}
        <div className="flex flex-col gap-px border-y border-[#EDE9FE]">
          {[
            { label: 'Full name', value: session.user?.name },
            { label: 'Email address', value: session.user?.email },
            {
              label: 'Account status',
              value: (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#7C3AED]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
                  Active
                </span>
              ),
            },
            {
              label: 'Sign-in method',
              value: (
                <span className="inline-flex items-center gap-2 text-sm text-[#1A0A2E]">
                  <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </span>
              ),
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between py-4 group"
            >
              <span className="text-xs font-medium tracking-[0.08em] uppercase text-[#726a7e]">
                {label}
              </span>
              <span className="text-sm text-[#1A0A2E] font-medium">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom breathing room */}
        <div className="h-16" />
      </div>
    </div>
  );
};

export default UserInfo;