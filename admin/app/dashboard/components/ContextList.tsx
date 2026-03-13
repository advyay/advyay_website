"use client"

import { useEffect, useState } from "react"
import axios from "axios"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export default function ContextList({ refreshKey }: any) {

  const [documents, setDocuments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null)

  const fetchDocuments = async () => {

    try {

      setLoading(true)

      const res = await axios.get(
        `${API}/context`,
        { withCredentials: true }
      )

      setDocuments(res.data)

    } catch (err) {

      console.error("Failed to fetch documents", err)

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {
    fetchDocuments()
  }, [refreshKey])


  // VIEW DOCUMENT
  const viewDocument = async (id: string) => {

    try {

      const res = await axios.get(
        `${API}/context/${id}`,
        { withCredentials: true }
      )

      setSelectedDoc(res.data)

    } catch (err) {

      console.error("Failed to load document", err)

    }

  }


  // DELETE DOCUMENT
  const deleteDocument = async (id: string) => {

    if (!confirm("Delete this document?")) return

    try {

      await axios.delete(
        `${API}/context/${id}`,
        { withCredentials: true }
      )

      setDocuments(prev =>
        prev.filter(doc => doc.document_id !== id)
      )

      if (selectedDoc?.document_id === id) {
        setSelectedDoc(null)
      }

    } catch (err) {

      console.error("Delete failed", err)

    }

  }


  // DOWNLOAD DOCUMENT
  const downloadDocument = (id: string) => {

    window.open(
      `${API}/context/${id}/download`,
      "_blank"
    )

  }


  return (

    <div className="bg-gray-900 p-6 rounded-xl space-y-4">

      <h2 className="text-xl font-semibold">
        Uploaded Documents
      </h2>


      {loading && (
        <p className="text-gray-400 text-sm">
          Loading documents...
        </p>
      )}


      {!loading && documents.length === 0 && (
        <p className="text-gray-400 text-sm">
          No documents uploaded.
        </p>
      )}


      {documents.map((doc) => (

        <div
          key={doc.document_id}
          className="bg-gray-800 p-4 rounded-lg flex items-center justify-between"
        >

          {/* DOCUMENT INFO */}

          <div>

            <p className="text-sm font-medium">
              Document ID: {doc.document_id}
            </p>

            <p className="text-xs text-gray-400">
              Chunks: {doc.total_chunks}
            </p>

          </div>


          {/* ACTION BUTTONS */}

          <div className="flex gap-3">

            <button
              onClick={() => viewDocument(doc.document_id)}
              className="px-3 py-1 text-sm bg-blue-600 rounded hover:bg-blue-500"
            >
              View
            </button>

            <button
              onClick={() => downloadDocument(doc.document_id)}
              className="px-3 py-1 text-sm bg-green-600 rounded hover:bg-green-500"
            >
              Download
            </button>

            <button
              onClick={() => deleteDocument(doc.document_id)}
              className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-500"
            >
              Delete
            </button>

          </div>

        </div>

      ))}


      {/* RIGHT SIDE DRAWER */}

      {selectedDoc && (

        <div className="fixed right-0 top-0 h-full w-[520px] bg-[#070B14] border-l border-white/10 p-8 overflow-y-auto z-50">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-xl font-semibold">
              Document Chunks
            </h2>

            <button
              onClick={() => setSelectedDoc(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>

          </div>


          <div className="space-y-6">

            {selectedDoc.chunks.map((chunk: any) => (

              <div
                key={chunk._id}
                className="bg-[#111827] border border-white/10 p-4 rounded-lg"
              >

                <p className="text-xs text-blue-400 mb-2">
                  Chunk {chunk.chunk_index}
                </p>

                <p className="text-sm text-gray-200 whitespace-pre-wrap">
                  {chunk.content}
                </p>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>

  )

}