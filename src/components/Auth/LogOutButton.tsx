'use client'
import { useLogout } from '@/hooks/auth/useLogout'

const LogOutButton = () => {
  const logout = useLogout()

  return (
    <button
      onClick={() => logout.mutate()}
      disabled={logout.isPending}
      className="inline-flex items-center gap-2 rounded-xl border border-[#EDE9FE] px-5 py-2.5 text-sm font-medium text-[#726a7e] transition hover:border-[#C4B5FD] hover:text-[#7C3AED] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {logout.isPending ? (
        <>
          <span className="h-3.5 w-3.5 rounded-full border-2 border-[#C4B5FD] border-t-transparent animate-spin" />
          Signing out…
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign out
        </>
      )}
    </button>
  )
}

export default LogOutButton