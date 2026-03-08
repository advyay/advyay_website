'use client'

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { trackEvent, getVisitorId, getSessionId } from "../lib/analytics"

export default function SessionTracker() {

  const pathname = usePathname()

  const visitorRef = useRef<string | null>(null)
  const sessionRef = useRef<string | null>(null)
  const lastPageRef = useRef<string>("")

  useEffect(() => {

    const visitorId = getVisitorId()
    const sessionId = getSessionId()

    if (!visitorId || !sessionId) return

    visitorRef.current = visitorId
    sessionRef.current = sessionId

  }, [])

  useEffect(() => {

    if (!visitorRef.current || !sessionRef.current) return

    if (lastPageRef.current === pathname) return

    lastPageRef.current = pathname

    trackEvent({
      type: "page_view",
      page: pathname,
      visitor_id: visitorRef.current,
      session_id: sessionRef.current,
      metadata: {}
    })

  }, [pathname])

  useEffect(() => {

    const handleClick = (e: MouseEvent) => {

      const target = e.target as HTMLElement

      const trackable = target.closest("[data-track]")

      if (!trackable) return

      const label = trackable.getAttribute("data-track")

      trackEvent({
        type: "click",
        page: pathname,
        visitor_id: visitorRef.current,
        session_id: sessionRef.current,
        metadata: { label }
      })
    }

    window.addEventListener("click", handleClick)

    return () => window.removeEventListener("click", handleClick)

  }, [pathname])

  return null
}