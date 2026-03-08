'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import { API_URL } from '../lib/config'

export default function SessionTracker() {
  const pathname = usePathname()
  const startTimeRef = useRef<number>(Date.now())
  const maxScrollRef = useRef<number>(0)

  console.log("API_URL in SessionTracker:", API_URL)

  useEffect(() => {
    let sessionId = localStorage.getItem('session_id')

    if (!sessionId) {
      sessionId = crypto.randomUUID()
      localStorage.setItem('session_id', sessionId)
    }

    startTimeRef.current = Date.now()
    maxScrollRef.current = 0

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

    window.addEventListener('scroll', handleScroll)

    const sendEvent = async () => {
      const timeOnPage =
        (Date.now() - startTimeRef.current) / 1000

      try {
        await axios.post(
          `${API_URL}/analytics/events`,
          {
            type: 'page_view',
            page: pathname,
            sessionId,
            scrollDepth: Math.round(maxScrollRef.current),
            timeOnPage,
            referrer: document.referrer,
            utm: getUTMParams(),
            metadata: {}
          },
          { withCredentials: true }
        )
      } catch (err) {
        console.error('Tracking failed', err)
      }
    }

    // Send event on page unload
    window.addEventListener('beforeunload', sendEvent)

    return () => {
      sendEvent()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', sendEvent)
    }

  }, [pathname])

  return null
}

function getUTMParams() {
  const params = new URLSearchParams(window.location.search)

  return {
    source: params.get('utm_source'),
    medium: params.get('utm_medium'),
    campaign: params.get('utm_campaign')
  }
}