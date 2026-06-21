import { NextResponse } from "next/server";

interface Payload {
  email?: string;
  name?: string;
  company?: string;
  message?: string;
  revenue?: string;
  consent?: boolean;
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(request: Request) {
  const ct = request.headers.get("content-type") || "";
  const data: Payload =
    ct.includes("application/json")
      ? await request.json().catch(() => ({}))
      : Object.fromEntries((await request.formData().catch(() => new FormData())) as FormData);

  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();
  const consent = Boolean(data.consent);

  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json({ ok: false, error: "message_too_short" }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json({ ok: false, error: "consent_required" }, { status: 400 });
  }

  // Best-effort: forward to backend if configured. Don't block the user.
  const backend = process.env.LEAD_API_URL;
  if (backend) {
    fetch(`${backend}/api/lead`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...data, source: "marketing_site" })
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
