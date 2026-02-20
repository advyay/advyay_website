'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'SOLUTIONS', href: '/solutions' },
    { name: 'PLATFORM', href: '/platform' },
    { name: 'AI AGENTS', href: '/ai-agents' },
    { name: 'TECHNOLOGY', href: '/technology' },
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-wide">
            ADVYAY
          </span>
          <span className="text-[10px] border border-blue-500 text-blue-400 px-2 py-[2px] rounded-full uppercase tracking-widest bg-blue-500/10">
            Beta
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm tracking-wide">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative ${
                pathname === link.href
                  ? 'text-blue-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.name}
              {pathname === link.href && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-500" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0B1220] border-t border-white/10 px-6 py-6 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`${
                pathname === link.href
                  ? 'text-blue-400'
                  : 'text-gray-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}