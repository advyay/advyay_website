import Hero from '../components/Hero'
import ProblemSection from '../components/ProblemSection'
import ServicesSection from '../components/ServicesSection'
import EnterpriseCredibilitySection from '../components/EnterpriseCredibilitySection'
import SolutionsArchitectureSection from '../components/SolutionsArchitectureSection'
import EnterpriseExecutionSection from '../components/EnterpriseExecutionSection'

export default function HomePage() {
  return (
    <main className="bg-[#070B14] text-white overflow-x-hidden">

      {/* HERO */}
      <Hero />

      {/* ARCHITECTURE OVERVIEW */}
      <div className="border-t border-white/5">
        <SolutionsArchitectureSection />
      </div>

      {/* IMPLEMENTATION FRAMEWORK */}
      <div className="border-t border-white/5">
        <EnterpriseExecutionSection />
      </div>

      {/* PROBLEM WE SOLVE */}
      {/* <div className="border-t border-white/5">
        <ProblemSection />
      </div> */}

      {/* SERVICES / OFFERINGS */}
      {/* <div className="border-t border-white/5">
        <ServicesSection />
      </div> */}

      {/* ENTERPRISE TRUST & CREDIBILITY */}
      <div className="border-t border-white/5">
        <EnterpriseCredibilitySection />
      </div>

    </main>
  )
}