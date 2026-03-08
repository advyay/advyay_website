'use client'

import { useState } from 'react'

import { API_URL } from "../lib/config"

export default function LeadForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    console.log("API URL:", API_URL)

    const response = await fetch(`${API_URL}/api/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        sessionId: localStorage.getItem('sessionId')
      })

      
    })

    console.log("Response from server:", response)

    console.log("Lead form submitted with data:", {
        ...form,
        sessionId: localStorage.getItem('sessionId')
      })

    alert('Enquiry submitted!')
    // setForm({
    //   name: '',
    //   email: '',
    //   company: '',
    //   message: ''
    // })
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
        placeholder="Phone"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
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