'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import { API_URL } from '../lib/config'

export default function SessionTracker() {

  const pathname = usePathname()

  const startTimeRef = useRef<number>(Date.now())
  const maxScrollRef = useRef<number>(0)

  const visibilityStartRef = useRef<number>(Date.now())

  useEffect(() => {

    const visitorId = getVisitorId()
    const sessionId = getSessionId()

    startTimeRef.current = Date.now()
    maxScrollRef.current = 0

    const device = getDeviceInfo()

    const pageLoadData = {
      type: "page_view",
      page: pathname,
      visitor_id: visitorId,
      session_id: sessionId,
      referrer: document.referrer,
      utm: getUTMParams(),
      device,
      metadata: {}
    }

    sendEvent(pageLoadData)

    const handleScroll = () => {

      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight

      const scrollPercent =
        docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

      if (scrollPercent > maxScrollRef.current) {
        maxScrollRef.current = scrollPercent
      }

    }

    const handleVisibilityChange = () => {

      if (document.hidden) {

        const activeTime =
          (Date.now() - visibilityStartRef.current) / 1000

        sendEvent({
          type: "visibility_hidden",
          page: pathname,
          session_id: sessionId,
          active_time: activeTime
        })

      } else {

        visibilityStartRef.current = Date.now()

      }

    }

    const handleClick = (e: MouseEvent) => {

      const target = e.target as HTMLElement

      const text = target.innerText?.slice(0, 100)

      sendEvent({
        type: "click",
        page: pathname,
        session_id: sessionId,
        element: target.tagName,
        text
      })

    }

    const handleUnload = () => {

      const timeOnPage =
        (Date.now() - startTimeRef.current) / 1000

      sendEvent({
        type: "page_exit",
        page: pathname,
        session_id: sessionId,
        scrollDepth: Math.round(maxScrollRef.current),
        timeOnPage
      })

    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("click", handleClick)
    window.addEventListener("beforeunload", handleUnload)

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    )

    return () => {

      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("click", handleClick)
      window.removeEventListener("beforeunload", handleUnload)

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      )

    }

  }, [pathname])

  return null
}

async function sendEvent(payload: any) {

  try {

    await axios.post(
      `${API_URL}/analytics/events`,
      payload,
      { withCredentials: true }
    )

  } catch (err) {

    console.error("Analytics error", err)

  }

}

function getVisitorId() {

  let id = localStorage.getItem("visitor_id")

  if (!id) {

    id = crypto.randomUUID()

    localStorage.setItem("visitor_id", id)

  }

  return id

}

function getSessionId() {

  let id = sessionStorage.getItem("session_id")

  if (!id) {

    id = crypto.randomUUID()

    sessionStorage.setItem("session_id", id)

  }

  return id

}

function getDeviceInfo() {

  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screen: {
      width: window.screen.width,
      height: window.screen.height
    },
    timezone:
      Intl.DateTimeFormat().resolvedOptions().timeZone
  }

}

function getUTMParams() {

  const params = new URLSearchParams(window.location.search)

  return {
    source: params.get("utm_source"),
    medium: params.get("utm_medium"),
    campaign: params.get("utm_campaign"),
    term: params.get("utm_term"),
    content: params.get("utm_content")
  }

}