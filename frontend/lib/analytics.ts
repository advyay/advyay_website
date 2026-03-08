import axios from "axios"
import { API_URL } from "./config"

export function getVisitorId(): string | null {

  if (typeof window === "undefined") return null

  let id = localStorage.getItem("visitor_id")

  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem("visitor_id", id)
  }

  return id
}

export function getSessionId(): string | null {

  if (typeof window === "undefined") return null

  let id = sessionStorage.getItem("session_id")

  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem("session_id", id)
  }

  return id
}

export async function trackEvent(data: any) {

  if (!API_URL) return

  try {

    await axios.post(`${API_URL}/analytics/events`, data)

  } catch (err) {

    console.error("analytics failed", err)

  }

}