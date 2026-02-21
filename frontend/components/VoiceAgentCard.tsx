'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Message = {
  speaker: 'agent' | 'lead'
  text: string
  audio: string
}

type Props = {
  title: string
  subtitle: string
  conversation: Message[]
}

export default function VoiceAgentCard({
  title,
  subtitle,
  conversation
}: Props) {

  const [callState, setCallState] =
    useState<'idle' | 'ringing' | 'connected' | 'ended'>('idle')

  const [messages, setMessages] = useState<Message[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null)
  const [timer, setTimer] = useState(0)

  const audioRef = useRef<HTMLAudioElement>(null)
  const ringingRef = useRef<HTMLAudioElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  /* ---------------- TIMER ---------------- */

  useEffect(() => {
    if (callState !== 'connected') return

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev >= 60) {
          endCall()
          return prev
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [callState])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  /* ---------------- AUTO SCROLL ---------------- */

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }, [messages])

  /* ---------------- PLAY NEXT MESSAGE ---------------- */

  const playNext = async () => {
    if (currentIndex >= conversation.length) {
      endCall()
      return
    }

    const message = conversation[currentIndex]

    setMessages(prev => [...prev, message])
    setSpeakingIndex(currentIndex)

    try {
      if (audioRef.current) {
        audioRef.current.src = message.audio
        await audioRef.current.play()
      }
    } catch (err) {
      console.error('Audio play error:', err)
      setCurrentIndex(prev => prev + 1)
    }
  }

  const handleAudioEnd = () => {
    setSpeakingIndex(null)
    setCurrentIndex(prev => prev + 1)
  }

  useEffect(() => {
    if (callState === 'connected') {
      playNext()
    }
  }, [currentIndex, callState])

  /* ---------------- START CALL ---------------- */

  const startCall = async () => {
    setMessages([])
    setCurrentIndex(0)
    setTimer(0)
    setCallState('ringing')

    if (ringingRef.current) {
      ringingRef.current.currentTime = 0
      ringingRef.current.play()
    }

    setTimeout(() => {
      if (ringingRef.current) ringingRef.current.pause()
      setCallState('connected')
    }, 7500)
  }

  /* ---------------- END CALL ---------------- */

  const endCall = () => {
    setCallState('ended')
    setSpeakingIndex(null)

    if (audioRef.current) audioRef.current.pause()
    if (ringingRef.current) ringingRef.current.pause()
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="relative bg-gradient-to-br from-[#0B1220] to-[#111827]
                    border border-white/10 rounded-2xl p-8
                    shadow-[0_0_60px_rgba(88,101,242,0.15)]
                    backdrop-blur-xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>

        {callState === 'idle' && (
          <button
            onClick={startCall}
            className="bg-gradient-to-r from-blue-600 to-purple-600
                       px-5 py-2 rounded-lg text-sm font-medium"
          >
            Start Call
          </button>
        )}

        {callState === 'connected' && (
          <div className="text-sm text-green-400 font-medium">
            Call in progress – {formatTime(timer)}
          </div>
        )}

        {callState === 'ended' && (
          <div className="text-sm text-gray-400">
            Call Ended
          </div>
        )}
      </div>

      {/* Ringing */}
      {callState === 'ringing' && (
        <div className="text-blue-400 text-sm mb-4">
          📞 Ringing...
        </div>
      )}

      {/* Conversation */}
      <div
        ref={containerRef}
        className="space-y-4 h-72 overflow-y-auto pr-2"
      >
        {messages.map((msg, index) => {
          const isSpeaking = speakingIndex === index

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-xl text-sm max-w-[80%] transition-all duration-300
              ${msg.speaker === 'agent'
                  ? 'self-start bg-blue-600/20 border border-blue-500/30 text-blue-200'
                  : 'self-end ml-auto bg-purple-600/20 border border-purple-500/30 text-purple-200'
                }
              ${isSpeaking ? 'ring-2 ring-blue-400 scale-[1.02]' : ''}
              `}
            >
              {msg.text}

              {isSpeaking && (
                <div className="flex gap-1 mt-2 h-4 items-end">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-blue-400 animate-pulse"
                      style={{ height: `${Math.random() * 100}%` }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Audio Elements */}
      <audio ref={audioRef} onEnded={handleAudioEnd} />
      <audio ref={ringingRef} src="./audio/ringing.mp3" />
    </div>
  )
}