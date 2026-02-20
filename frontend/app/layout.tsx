import '../styles/globals.css'
import Navbar from '../components/Navbar'
import FloatingChat from '../components/FloatingChat'
import Footer from '../components/Footer'
import SessionTracker from '../components/SessionTracker'

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className="bg-[#070B14] text-white antialiased min-h-screen flex flex-col">

        <Navbar />

        {/* Session Tracking */}
        <SessionTracker />

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        <FloatingChat />

        <Footer />

      </body>
    </html>
  )
}