export async function trackEvent(payload: any) {
  await fetch("http://localhost:8000/analytics/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
}