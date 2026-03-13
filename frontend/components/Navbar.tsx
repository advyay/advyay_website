'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Navbar() {

  const pathname = usePathname()

  const [open, setOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Platform', href: '/platform' },
    { name: 'AI Agents', href: '/ai-agents' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
  }, [open])

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#070B14]/90 backdrop-blur-2xl border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/advyay-logo.png"
              alt="Advyay"
              width={100}
              height={40}
              priority
              className="object-contain"
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-10 text-sm">

            {/* NAV ITEMS */}
            {navItems.map((item) => {
              const active = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative pb-1 transition ${
                    active
                      ? 'text-white font-semibold'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}

                  {active && (
                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"/>
                  )}
                </Link>
              )
            })}

            {/* SOLUTIONS DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button className="text-gray-300 hover:text-white transition flex items-center gap-2">
                Solutions
                <span className="text-xs">▾</span>
              </button>

              <AnimatePresence>
                {solutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-10 left-0 w-72 bg-[#0B1220] border border-white/10 rounded-xl p-6 shadow-xl"
                  >
                    <div className="space-y-4 text-sm">
                      <Link
                        href="/voiceAgentsDemoCards"
                        className="block text-gray-300 hover:text-white"
                      >
                        Enterprise Voice Agents
                      </Link>

                      <Link
                        href="/solutions"
                        className="block text-gray-300 hover:text-white"
                      >
                        Custom Agentic AI Systems
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="ml-4 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-lg text-white font-medium hover:opacity-90 transition"
            >
              Schedule Consultation
            </Link>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-2xl"
          >
            ☰
          </button>

        </div>
      </motion.nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 120 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm
                         bg-[#0B1220] border-l border-white/10
                         z-50 p-10 flex flex-col gap-8"
            >
              <div className="mt-16 flex flex-col gap-6 text-lg">

                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`${
                      pathname === item.href
                        ? 'text-white font-semibold'
                        : 'text-gray-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

              </div>

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-lg text-center"
              >
                Schedule Consultation
              </Link>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}