"use client"

import { createClient } from "@/lib/supabase"

export default function AuthButton() {
  const supabase = createClient()

  async function handleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://www.aliensaileenapp.xyz/auth/callback",
      },
    })
  }

  return (
    <button
      onClick={handleLogin}
      className="font-mono text-[9px] tracking-wider uppercase bg-mint text-s0 rounded-full px-3 py-1.5 hover:bg-mint/80 transition-colors font-bold"
    >
      Sign in
    </button>
  )
}
