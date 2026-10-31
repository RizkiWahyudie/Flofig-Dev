import { useState } from 'react'
import { Plus, X } from 'lucide-react'

const FAQS_DATA = [
  {
    question: 'How does Flovig help prevent team overload (Workload Management)?',
    answer:
      'Flovig tracks active tasks, story points, and sprint deadlines assigned to each member in real-time. The Workload overview visually highlights anyone approaching or exceeding capacity so managers can rebalance work with a single drag-and-drop before deadlines slip.',
  },
  {
    question: 'Are there any limits on projects, tasks, or clients in Flovig?',
    answer:
      'No. All Flovig plans—including the Free Plan—include unlimited projects, tasks, boards, and client records. Plans scale purely based on the number of active team seats and storage capacity.',
  },
  {
    question: 'What makes Flovig different from regular task management tools?',
    answer:
      'Flovig is designed as a unified work operating system combining project management, task boards, workload tracking, and a dedicated Client Portal in one workflow. You no longer need 4 separate tools to manage internal teams and client communication.',
  },
  {
    question: 'How does the Client Portal work? Can clients see internal notes?',
    answer:
      'The Client Portal provides a secure, white-labeled view of agreed deliverables, status milestones, and billing history. Internal notes, raw task threads, and team capacity data remain strictly private to your team.',
  },
  {
    question: 'Does Flovig support Google Meet and calendar integration?',
    answer:
      'Yes. Flovig features a 1-click Google Meet integration that automatically generates meeting links within task threads, plus two-way calendar sync so sprint dates and deadlines appear in your preferred calendar.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(3) // Item 4 open by default matching UI Image 2

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx)
  }

  return (
    <section id="faq" className="py-20 sm:py-28 md:py-32 bg-white text-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top FAQs Badge */}
        <div className="inline-flex items-center mb-6">
          <span className="px-3.5 py-1 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 bg-white shadow-2xs">
            FAQs
          </span>
        </div>

        {/* Section Heading (Matches UI Image 2) */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
          Got Questions?<br />
          We Already Answer.
        </h2>

        {/* Accordion List */}
        <div className="mt-10 sm:mt-14 space-y-3 sm:space-y-3.5 text-left">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-slate-300/90 bg-slate-50/70 shadow-sm'
                    : 'border-slate-200/80 bg-white hover:border-slate-300 shadow-2xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <span className="shrink-0 text-slate-500 hover:text-slate-800 transition-colors">
                    {isOpen ? (
                      <X className="w-5 h-5 stroke-[2]" />
                    ) : (
                      <Plus className="w-5 h-5 stroke-[2]" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed pt-0 border-t border-slate-200/50">
                    <p className="mt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
