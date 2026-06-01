'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function LoginToast() {
  const searchParams = useSearchParams()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (searchParams.get('message') === 'login_required') {
      setShow(true)
      setTimeout(() => setShow(false), 4000)
    }
  }, [searchParams])

  if (!show) return null

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-s1/90 backdrop-blur-md border border-mint/30 rounded-2xl px-6 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_12px_rgba(0,229,180,0.1)] flex items-center gap-3 max-w-[90vw] animate-scale-in">
      <div className="w-5 h-5 rounded-full bg-mint/15 border border-mint/30 flex items-center justify-center flex-shrink-0 text-mint text-xs">
        🔑
      </div>
      <span className="font-mono text-xs md:text-sm tracking-wide text-t100">
        To get access, you should sign in.
      </span>
    </div>
  )
}
