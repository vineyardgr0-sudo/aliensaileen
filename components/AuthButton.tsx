"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }
    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  async function handleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/auth/callback",
      },
    })
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.reload()
  }

  if (loading) {
    return (
      <div className="w-16 h-8.5 rounded-full skeleton" />
    )
  }

  if (user) {
    return (
      <div className="flex items-center gap-2.5">
        <span className="font-mono text-[10px] text-t300 hidden md:inline-block max-w-[110px] truncate">
          {user.email}
        </span>
        <button
          onClick={handleLogout}
          className="font-mono text-[11px] tracking-wider uppercase border border-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.22)] text-t200 hover:text-t100 rounded-full px-4 py-2 hover:bg-white/[0.04] transition-all font-bold min-h-[38px] flex items-center justify-center"
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleLogin}
      className="font-mono text-[11px] tracking-wider uppercase bg-mint text-s0 rounded-full px-4.5 py-2 hover:bg-mint/90 hover:shadow-[0_0_12px_rgba(0,229,180,0.35)] active:scale-[0.98] transition-all font-bold min-h-[38px] flex items-center justify-center"
    >
      Sign in
    </button>
  )
}
