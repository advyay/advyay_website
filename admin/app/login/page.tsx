"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"login" | "otp">("login")
  const [loading, setLoading] = useState(false)

  const API = "http://localhost:8000"

  const handleLogin = async () => {

    try {

      setLoading(true)

      await axios.post(
        `${API}/admin/login`,
        { email, password },
        { withCredentials: true }
      )

      setStep("otp")

    } catch (err) {

      alert("Invalid credentials")

    } finally {

      setLoading(false)

    }

  }

  const handleVerify = async () => {

    try {

      setLoading(true)

      await axios.post(
        `${API}/admin/verify-otp`,
        { otp },
        { withCredentials: true }
      )

      router.push("/dashboard")

    } catch (err) {

      alert("Invalid OTP")

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="bg-gray-900 p-8 rounded-xl w-96 space-y-4">

        <h1 className="text-2xl font-bold">
          Admin Login
        </h1>

        {step === "login" && (

          <>

            <input
              className="w-full p-2 rounded bg-gray-800"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="w-full p-2 rounded bg-gray-800"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 p-2 rounded"
            >
              {loading ? "Loading..." : "Login"}
            </button>

          </>

        )}

        {step === "otp" && (

          <>

            <input
              className="w-full p-2 rounded bg-gray-800"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={handleVerify}
              className="w-full bg-green-600 p-2 rounded"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

          </>

        )}

      </div>

    </div>

  )

}