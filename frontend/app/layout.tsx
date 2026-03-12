import '../styles/globals.css'
import Navbar from '../components/Navbar'
import FloatingChat from '../components/FloatingChat'
import Footer from '../components/Footer'
import SessionTracker from '../components/SessionTracker'
import NeuralNetwork from '../components/NeuralBackground'

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className="bg-[#070B14] text-white antialiased min-h-screen flex flex-col">

        {/* GLOBAL AI BACKGROUND */}

        <Navbar />

        <SessionTracker />


        <main className="flex-1 relative z-10">
                          <NeuralNetwork />

          {children}
        </main>

        <FloatingChat />

        <Footer />

      </body>
    </html>
  )
}