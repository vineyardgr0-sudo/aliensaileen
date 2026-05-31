'use client'

import { createClient } from '@/lib/supabase'

export default function AuthButton() {
  const supabase = createClient()

  async function handleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/auth/callback',
      },
    })
  }

  return (
    <button
      onClick={handleLogin}
      className="font-mono text-[9px] tracking-wider uppercase text-mint border border-mint/30 rounded-full px-2.5 py-1.5 hover:border-mint transition-colors"
    >
      Sign in
    </button>
  )
}
