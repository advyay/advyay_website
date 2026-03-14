"use client"

import { useEffect, useState } from "react"
import axios from "axios"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"


/* ================================
   TYPES
================================ */

type DocumentItem = {
  document_id: string
  total_chunks: number
}

type Chunk = {
  _id: string
  chunk_index: number
  content: string
}

type SelectedDoc = {
  document_id: string
  chunks: Chunk[]
}

type ButtonColor = "blue" | "green" | "red"


/* ================================
   COMPONENT
================================ */

export default function ContextList({ refreshKey }: { refreshKey: number }) {

  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState<SelectedDoc | null>(null)

  const fetchDocuments = async () => {

    try {

      setLoading(true)

      const res = await axios.get<DocumentItem[]>(
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


  /* ================================
     VIEW DOCUMENT
  ================================ */

  const viewDocument = async (id: string) => {

    try {

      const res = await axios.get<SelectedDoc>(
        `${API}/context/${id}`,
        { withCredentials: true }
      )

      setSelectedDoc(res.data)

    } catch (err) {

      console.error("Failed to load document", err)

    }

  }


  /* ================================
     DELETE DOCUMENT
  ================================ */

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


  /* ================================
     DOWNLOAD DOCUMENT
  ================================ */

  const downloadDocument = (id: string) => {

    window.open(
      `${API}/context/${id}/download`,
      "_blank"
    )

  }


  return (

    <div className="bg-[#0B1220] border border-white/10 rounded-xl p-6 space-y-4">

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


      {/* =============================
         DESKTOP VIEW
      ============================= */}

      <div className="hidden md:block space-y-3">

        {documents.map((doc) => (

          <div
            key={doc.document_id}
            className="bg-[#111827] p-4 rounded-lg flex items-center justify-between"
          >

            <div>

              <p className="text-sm font-medium break-all">
                {doc.document_id}
              </p>

              <p className="text-xs text-gray-400">
                Chunks: {doc.total_chunks}
              </p>

            </div>

            <div className="flex gap-3">

              <ActionButton
                color="blue"
                onClick={() => viewDocument(doc.document_id)}
              >
                View
              </ActionButton>

              <ActionButton
                color="green"
                onClick={() => downloadDocument(doc.document_id)}
              >
                Download
              </ActionButton>

              <ActionButton
                color="red"
                onClick={() => deleteDocument(doc.document_id)}
              >
                Delete
              </ActionButton>

            </div>

          </div>

        ))}

      </div>


      {/* =============================
         MOBILE VIEW
      ============================= */}

      <div className="md:hidden space-y-3">

        {documents.map((doc) => (

          <div
            key={doc.document_id}
            className="bg-[#111827] p-4 rounded-lg space-y-3"
          >

            <div>

              <p className="text-xs text-gray-400">
                Document
              </p>

              <p className="text-sm break-all">
                {doc.document_id}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {doc.total_chunks} chunks
              </p>

            </div>

            <div className="flex gap-2 flex-wrap">

              <ActionButton
                color="blue"
                onClick={() => viewDocument(doc.document_id)}
              >
                View
              </ActionButton>

              <ActionButton
                color="green"
                onClick={() => downloadDocument(doc.document_id)}
              >
                Download
              </ActionButton>

              <ActionButton
                color="red"
                onClick={() => deleteDocument(doc.document_id)}
              >
                Delete
              </ActionButton>

            </div>

          </div>

        ))}

      </div>


      {/* =============================
         DOCUMENT DRAWER
      ============================= */}

      {selectedDoc && (

        <div className="fixed right-0 top-0 w-full md:w-[520px] h-full bg-[#070B14] border-l border-white/10 p-6 md:p-8 overflow-y-auto z-50">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-lg md:text-xl font-semibold">
              Document Chunks
            </h2>

            <button
              onClick={() => setSelectedDoc(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>

          </div>

          <div className="space-y-5">

            {selectedDoc.chunks.map((chunk) => (

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


/* ================================
   ACTION BUTTON
================================ */

function ActionButton({
  color,
  onClick,
  children
}: {
  color: ButtonColor
  onClick: () => void
  children: React.ReactNode
}) {

  const colors: Record<ButtonColor, string> = {
    blue: "bg-blue-600 hover:bg-blue-500",
    green: "bg-green-600 hover:bg-green-500",
    red: "bg-red-600 hover:bg-red-500"
  }

  return (

    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm rounded ${colors[color]}`}
    >
      {children}
    </button>

  )

}