'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { name: 'Home', href: '/' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Platform', href: '/platform' },
  { name: 'AI Agents', href: '/ai-agents' },
  { name: 'Technology', href: '/technology' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
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
            ? 'bg-black/80 backdrop-blur-2xl border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative text-xl font-bold tracking-wide text-white">
              ADVYAY
              <span className="ml-2 text-[10px] border border-blue-500 text-blue-400 px-2 py-[2px] rounded-full uppercase tracking-widest bg-blue-500/10">
                Beta
              </span>

              {/* Subtle Glow */}
              <div className="absolute inset-0 blur-lg opacity-20 bg-blue-500 group-hover:opacity-40 transition" />
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex gap-10 text-sm uppercase tracking-wider">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-gray-300 hover:text-white transition"
              >
                {link.name}
                {pathname === link.href && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
              className="absolute w-6 h-[2px] bg-white"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="absolute w-6 h-[2px] bg-white"
            />
            <motion.span
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
              className="absolute w-6 h-[2px] bg-white"
            />
          </button>

        </div>
      </motion.nav>

      {/* BACKDROP OVERLAY */}
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

            {/* SIDE DRAWER */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 120 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm
                         bg-[#0B1220]/95 backdrop-blur-2xl
                         border-l border-white/10
                         z-50 p-10 flex flex-col gap-8"
            >
              <div className="mt-20 flex flex-col gap-8 text-xl">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`transition ${
                        pathname === link.href
                          ? 'text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}