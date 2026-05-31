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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-s1 border border-mint/30 rounded-xl px-5 py-3 font-mono text-[10px] tracking-wider text-mint shadow-lg">
      Sign in to access lessons
    </div>
  )
}
