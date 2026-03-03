"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function ContextList({ refreshKey }: any) {
  const [documents, setDocuments] = useState<any[]>([])

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/context",
        { withCredentials: true }
      )
      setDocuments(res.data)
    } catch (err) {
      console.error("Failed to fetch docs")
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [refreshKey])

  return (
    <div className="bg-gray-900 p-6 rounded-xl space-y-4">
      <h2 className="text-xl font-semibold">Uploaded Documents</h2>

      {documents.length === 0 && (
        <p className="text-gray-400 text-sm">No documents uploaded.</p>
      )}

      {documents.map((doc, index) => (
        <div
          key={index}
          className="bg-gray-800 p-3 rounded text-sm"
        >
          <p><strong>ID:</strong> {doc.document_id}</p>
          <p><strong>Chunks:</strong> {doc.total_chunks}</p>
        </div>
      ))}
    </div>
  )
}