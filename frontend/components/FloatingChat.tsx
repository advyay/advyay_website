'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Message = {
  role: 'user' | 'ai'
  content: string
}

export default function FloatingChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    setTimeout(() => {
      const aiMessage: Message = {
        role: 'ai',
        content:
          "I'm still being built. Enterprise intelligence coming soon."
      }
      setMessages(prev => [...prev, aiMessage])
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100] flex flex-col items-end">

      {/* Floating Button */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={() => setOpen(!open)}
          className="relative w-14 h-14 sm:w-16 sm:h-16
                     rounded-full flex items-center justify-center
                     bg-gradient-to-r from-blue-500 to-purple-600
                     shadow-[0_0_40px_rgba(139,92,246,0.6)]
                     overflow-hidden"
        >
          {/* Glow animation */}
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full
                       bg-gradient-to-r from-blue-500 to-purple-600
                       opacity-30 blur-xl"
          />

          <span className="absolute inset-0 rounded-full border border-white/20" />

          {/* Chat Icon */}
          <svg
            className="relative z-10"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          </svg>
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="
              mt-4
              w-[95vw] sm:w-96
              h-[75vh] sm:h-[520px]
              max-w-[420px]
              bg-gradient-to-b from-[#0B1220]/95 to-[#070B14]/95
              backdrop-blur-2xl
              border border-white/10
              shadow-[0_0_60px_rgba(59,130,246,0.25)]
              rounded-2xl
              flex flex-col
              overflow-hidden
            "
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5">
              <h3 className="font-semibold text-base">
                Anvay AI Assistant
              </h3>
              <p className="text-xs text-gray-400">
                Agentic Enterprise Intelligence
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl text-sm max-w-[80%] ${
                    m.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 self-end text-white'
                      : 'bg-gray-800 self-start text-gray-200'
                  }`}
                >
                  {m.content}
                </div>
              ))}

              {loading && (
                <div className="bg-gray-800 px-3 py-2 rounded-xl text-sm self-start animate-pulse">
                  AI is thinking...
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 sm:p-4 flex gap-2 border-t border-white/10 bg-white/5">
              <input
                className="flex-1 bg-[#0F172A] p-2 sm:p-3 rounded-lg text-sm outline-none border border-white/10 focus:border-purple-500 transition"
                placeholder="Ask about agentic systems..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />

              <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 rounded-lg text-sm font-medium hover:opacity-90 transition"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}