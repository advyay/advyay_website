"use client"

import { useState } from "react"
import axios from "axios"

export default function ContextUpload({ onUploadSuccess }: any) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  const handleFileChange = async (file: File | null) => {
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {
      setLoading(true)
      setMessage("Uploading...")

      const res = await axios.post(
        `${API}/context/upload`,
        formData,
        {
          withCredentials: true,
        }
      )

      setMessage(`Uploaded successfully (${res.data.chunks_created} chunks)`)
      onUploadSuccess()
    } catch (err) {
      setMessage("Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl space-y-4">
      <h2 className="text-xl font-semibold">Upload Knowledge File</h2>

      <label className="bg-gray-800 px-4 py-2 rounded cursor-pointer inline-block">
        {loading ? "Uploading..." : "Choose File"}
        <input
          type="file"
          accept=".txt"
          className="hidden"
          onChange={(e) =>
            handleFileChange(e.target.files?.[0] || null)
          }
        />
      </label>

      {message && (
        <p className="text-sm text-gray-400">{message}</p>
      )}
    </div>
  )
}