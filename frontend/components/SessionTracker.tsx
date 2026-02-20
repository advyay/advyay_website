'use client'

import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function SessionTracker() {

  useEffect(() => {
    let sessionId = localStorage.getItem('sessionId')

    if (!sessionId) {
      sessionId = uuidv4()
      localStorage.setItem('sessionId', sessionId)
    }

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'page_view',
        page: window.location.pathname,
        sessionId
      })
    })
  }, [])

  return null
}