'use client'
import VoiceAgentCard from "./VoiceAgentCard";

  {/* VOICE AGENT DEMOS */}

  export default function VoiceAgentsDemoCards() {
    return (
      <section className="relative py-32 bg-[#0B1220] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-20 space-y-12">
          <div className="grid md:grid-cols-2 gap-10">

                    <VoiceAgentCard
                        title="Real Estate Sales Agent"
                        subtitle="Luxury investment lead qualification"
                        conversation={[
                            {
                                speaker: 'agent',
                                text: "Hi Arjun, this is Anvay from Crescent Realty. You had recently enquired about premium waterfront investments — is now a good time to talk?",
                                audio: "/audio/realestate/agent-1.mp3"
                            },
                            {
                                speaker: 'lead',
                                text: "Yes, I have a few minutes.",
                                audio: "/audio/realestate/lead-1.mp3"
                            },
                            {
                                speaker: 'agent',
                                text: "Perfect. Based on your budget range and preference for Dubai Marina, I’ve shortlisted three properties currently projecting 8 to 10 percent annual yield. Are you looking more for rental income or capital appreciation?",
                                audio: "/audio/realestate/agent-2.mp3"
                            },
                            {
                                speaker: 'lead',
                                text: "Mostly rental yield, but long-term growth is important too.",
                                audio: "/audio/realestate/lead-2.mp3"
                            },
                            {
                                speaker: 'agent',
                                text: "Understood. In that case, one of the options in Marina Gate would align well — strong tenant demand and limited upcoming supply. Would you like me to schedule a virtual walkthrough this week?",
                                audio: "/audio/realestate/agent-3.mp3"
                            }
                        ]} />

                    <VoiceAgentCard
                        title="Healthcare Appointment Agent"
                        subtitle="Automated patient coordination"
                        conversation={[
                            {
                                speaker: 'agent',
                                text: "Hi Priya, this is the CityCare scheduling assistant. I’m calling to confirm your diagnostic appointment scheduled for tomorrow at 9 AM. Is that still convenient for you?",
                                audio: "/audio/healthcare/agent-1.mp3"
                            },
                            {
                                speaker: 'lead',
                                text: "Actually, I might need to reschedule.",
                                audio: "/audio/healthcare/lead-1.mp3"
                            },
                            {
                                speaker: 'agent',
                                text: "No problem at all. I’m seeing availability on Thursday at 11:30 AM or Friday at 4 PM. Which would you prefer?",
                                audio: "/audio/healthcare/agent-2.mp3"
                            },
                            {
                                speaker: 'lead',
                                text: "Thursday at 11:30 works.",
                                audio: "/audio/healthcare/lead-2.mp3"
                            },
                            {
                                speaker: 'agent',
                                text: "You’re all set for Thursday at 11:30 AM. I’ll send you a confirmation and a reminder 24 hours before. Is there anything else I can help you with today?",
                                audio: "/audio/healthcare/agent-3.mp3"
                            }
                        ]} />

                    <VoiceAgentCard
                        title="Retail Banking Loan Agent"
                        subtitle="Automated financial pre-qualification"
                        conversation={[
                            {
                                speaker: 'agent',
                                text: "Good afternoon, this is Anvay from Moneycap Financial Services regarding your personal loan enquiry. I just need a minute to walk you through your eligibility — is that okay?",
                                audio: "/audio/banking/agent-1.mp3"
                            },
                            {
                                speaker: 'lead',
                                text: "Yes, please go ahead.",
                                audio: "/audio/banking/lead-1.mp3"
                            },
                            {
                                speaker: 'agent',
                                text: "Based on your income profile and credit range, you’re pre-approved for up to eighteen lakhs. The interest would start around 10.25 percent depending on tenure. Are you considering this for consolidation or a new purchase?",
                                audio: "/audio/banking/agent-2.mp3"
                            },
                            {
                                speaker: 'lead',
                                text: "It’s for home renovation.",
                                audio: "/audio/banking/lead-2.mp3"
                            },
                            {
                                speaker: 'agent',
                                text: "That makes sense. In that case, a 36-month tenure might optimize your EMI without increasing total interest significantly. Would you like me to connect you with a relationship manager to finalize details?",
                                audio: "/audio/banking/agent-3.mp3"
                            }
                        ]} />
                    <VoiceAgentCard
                        title="B2B SaaS Qualification Agent"
                        subtitle="Inbound demo automation"
                        conversation={[
                            {
                                speaker: 'agent',
                                text: "Hi Michael, this is Maya from Advyay. I noticed you downloaded our AI automation whitepaper earlier today. Are you currently evaluating workflow automation initiatives?",
                                audio: "/audio/saas/agent-1.mp3"
                            },
                            {
                                speaker: 'lead',
                                text: "Yes, we’re looking at improving sales response times.",
                                audio: "/audio/saas/lead-1.mp3"
                            },
                            {
                                speaker: 'agent',
                                text: "Understood. Are you operating on Salesforce or HubSpot today?",
                                audio: "/audio/saas/agent-2.mp3"
                            },
                            {
                                speaker: 'lead',
                                text: "Salesforce.",
                                audio: "/audio/saas/lead-2.mp3"
                            },
                            {
                                speaker: 'agent',
                                text: "Great — we integrate natively with Salesforce and can deploy autonomous qualification agents within two to three weeks. Would you like to schedule a technical walkthrough with your RevOps team?",
                                audio: "/audio/saas/agent-3.mp3"
                            }
                        ]} />


          </div>
        </div>
      </section>
    )};