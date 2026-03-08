'use client'

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { trackEvent, getVisitorId, getSessionId } from "../lib/analytics"

export default function SessionTracker() {

  const pathname = usePathname()

  const visitorId = getVisitorId()
  const sessionId = getSessionId()

  const lastPageRef = useRef<string>("")

  useEffect(() => {

    if (lastPageRef.current === pathname) return
    lastPageRef.current = pathname

    trackEvent({
      type: "page_view",
      page: pathname,
      visitor_id: visitorId,
      session_id: sessionId,
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
        visitor_id: visitorId,
        session_id: sessionId,
        metadata: { label }
      })
    }

    window.addEventListener("click", handleClick)

    return () => window.removeEventListener("click", handleClick)

  }, [])

  return null
}