'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { name: 'HOME', href: '/' },
  { name: 'SOLUTIONS', href: '/solutions' },
  { name: 'PLATFORM', href: '/platform' },
  { name: 'AI AGENTS', href: '/ai-agents' },
  { name: 'TECHNOLOGY', href: '/technology' },
  { name: 'ABOUT', href: '/about' },
  { name: 'CONTACT', href: '/contact' }
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-start gap-3">
          <span className="text-xl font-bold tracking-wide">
            ADVYAY
          </span>
          <span className="text-[10px] border border-blue-500 text-blue-400 px-2 py-[2px] rounded-full uppercase tracking-widest bg-blue-500/10 mt-[2px]">
            Beta
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-10 text-sm uppercase tracking-wider">

          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href))

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative transition ${
                  isActive
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}

                {/* Active underline indicator */}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                )}
              </Link>
            )
          })}

        </div>
      </div>
    </nav>
  )
}