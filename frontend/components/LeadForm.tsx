'use client'

import { useState } from 'react'

export default function LeadForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        sessionId: localStorage.getItem('sessionId')
      })
    })

    alert('Enquiry submitted!')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        placeholder="Name"
        required
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-3 bg-gray-900 rounded"
      />
      <input
        placeholder="Email"
        required
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full p-3 bg-gray-900 rounded"
      />
      <input
        placeholder="Company"
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        className="w-full p-3 bg-gray-900 rounded"
      />
      <textarea
        placeholder="Message"
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full p-3 bg-gray-900 rounded"
      />
      <button className="bg-blue-600 px-6 py-3 rounded">
        Submit
      </button>
    </form>
  )
}