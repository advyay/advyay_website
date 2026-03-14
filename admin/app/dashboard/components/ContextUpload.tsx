"use client"

import { useState } from "react"
import axios from "axios"

export default function ContextUpload({ onUploadSuccess }: any) {

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [fileName, setFileName] = useState("")

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"


  const uploadFile = async (file: File) => {

    const formData = new FormData()
    formData.append("file", file)

    try {

      setLoading(true)
      setMessage("Uploading...")

      const res = await axios.post(
        `${API}/context/upload`,
        formData,
        { withCredentials: true }
      )

      setMessage(`Uploaded successfully (${res.data.chunks_created} chunks)`)
      setFileName("")
      onUploadSuccess()

    } catch {

      setMessage("Upload failed")

    } finally {

      setLoading(false)

    }

  }


  const handleFileChange = (file: File | null) => {

    if (!file) return

    setFileName(file.name)
    uploadFile(file)

  }


  const handleDrop = (e: any) => {

    e.preventDefault()

    const file = e.dataTransfer.files?.[0]

    if (file) handleFileChange(file)

  }


  return (

    <div className="bg-[#111827] border border-white/10 rounded-xl p-6 space-y-4">

      <h2 className="text-lg md:text-xl font-semibold">
        Upload Knowledge File
      </h2>


      {/* DROP ZONE */}

      <label
        onDrop={handleDrop}
        onDragOver={(e)=>e.preventDefault()}
        className="
          flex flex-col items-center justify-center
          border-2 border-dashed border-gray-600
          rounded-lg
          p-6 md:p-10
          text-center
          cursor-pointer
          hover:border-blue-500
          transition
        "
      >

        <input
          type="file"
          accept=".txt"
          className="hidden"
          onChange={(e)=>handleFileChange(e.target.files?.[0] || null)}
        />


        <p className="text-sm md:text-base text-gray-300">
          {loading
            ? "Uploading..."
            : "Tap to upload or drag file here"}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          Supported format: .txt
        </p>

        {fileName && (
          <p className="text-xs text-blue-400 mt-3 break-all">
            {fileName}
          </p>
        )}

      </label>


      {/* STATUS MESSAGE */}

      {message && (

        <div className="
          text-sm
          px-4 py-2
          rounded
          bg-[#0B1220]
          border border-white/10
        ">

          {message}

        </div>

      )}

    </div>

  )

}