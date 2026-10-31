import { useState } from 'react'
import {
  Check,
  ArrowRight,
  Settings,
  FileText,
  Activity,
  Receipt,
  Zap,
  Bug,
  Flag,
  BookOpen,
  Inbox,
  Repeat,
  Users,
  BarChart3,
  Clock,
  Wallet,
} from 'lucide-react'

const SOLUTIONS = [
  {
    id: 'agency',
    tabLabel: 'Agency & Creative',
    heading: 'Manage clients without losing track',
    desc: "Juggling clients, feedback, deadlines, and multiple projects shouldn't slow your creativity down.",
    checklist: [
      'Dedicated project per client',
      'Attached files & discussions',
      'Per-client billing history',
    ],
    features: [
      {
        icon: Settings,
        text: 'Client Portal show progress securely',
      },
      {
        icon: FileText,
        text: 'Files store assets alongside tasks',
      },
      {
        icon: Activity,
        text: 'Workload monitor team capacity',
      },
      {
        icon: Receipt,
        text: 'Invoices & payment history to track client billing',
      },
    ],
  },
  {
    id: 'software',
    tabLabel: 'Software & Product',
    heading: 'Ship features faster with connected sprints',
    desc: 'Keep engineering and product teams aligned from backlog grooming all the way to release.',
    checklist: [
      'Sprints and milestones in one hierarchy',
      'Board & list view for every project',
      'Bug tracker with assignee and priority',
    ],
    features: [
      {
        icon: Zap,
        text: 'Sprints organize tasks per development cycle',
      },
      {
        icon: Bug,
        text: 'Tickets track bugs from report to resolved',
      },
      {
        icon: Flag,
        text: 'Milestones track critical targets per phase',
      },
      {
        icon: BookOpen,
        text: 'Knowledge Base holds team technical docs',
      },
    ],
  },
  {
    id: 'operations',
    tabLabel: 'Operations',
    heading: 'Handle incoming requests with balanced workloads',
    desc: 'Turn ad-hoc demands into structured tasks and balance team capacity across departments.',
    checklist: [
      'Customer requests handled as tasks',
      'Recurring tasks for routine operations',
      'Activity logs for every status change',
    ],
    features: [
      {
        icon: Inbox,
        text: 'Customer Requests gathers demands in one hub',
      },
      {
        icon: Repeat,
        text: 'Recurring Tasks repeats routine work on schedule',
      },
      {
        icon: Users,
        text: 'Workload highlights team overcapacity',
      },
      {
        icon: BarChart3,
        text: 'Analytics provides cross-department throughput',
      },
    ],
  },
  {
    id: 'services',
    tabLabel: 'Professional Services',
    heading: 'Deliver client outcomes on time and within budget',
    desc: 'Track billable hours, manage milestones, and send invoices with total transparency.',
    checklist: [
      'Timesheets linked directly to tasks',
      'Budget tracking per client engagement',
      'Clean sign-off and reporting workflow',
    ],
    features: [
      {
        icon: Clock,
        text: 'Timesheet records real-time team hours',
      },
      {
        icon: Wallet,
        text: 'Budgets track margin and cost limits',
      },
      {
        icon: FileText,
        text: 'Client Portal enables seamless deliverables review',
      },
      {
        icon: Receipt,
        text: 'Invoices generate instantly from timesheets',
      },
    ],
  },
]

export function UseCasesSection() {
  const [activeTab, setActiveTab] = useState('agency')
  const current = SOLUTIONS.find((s) => s.id === activeTab) || SOLUTIONS[0]

  return (
    <section id="use-cases" className="relative py-20 sm:py-28 md:py-32 bg-white text-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subheading (Matches UI Image 5) */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.12] text-slate-950">
            Made For The<br />
            Way Team Works.
          </h2>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
            Start with what you need. Find the right fit as you grow.
          </p>

          {/* 4 Pill Tabs (Matches UI Image 5) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
            {SOLUTIONS.map((item) => {
              const isActive = activeTab === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0099FF] to-[#00C2FF] text-white shadow-md shadow-sky-500/25'
                      : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {item.tabLabel}
                </button>
              )
            })}
          </div>
        </div>

        {/* 2-Column Solution Card (Matches UI Image 5) */}
        <div className="relative max-w-4xl mx-auto">
          {/* Subtle Ambient Light Glow behind the card */}
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative rounded-3xl border border-slate-200/90 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden p-6 sm:p-10 md:p-12 text-left">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
              {/* Left Column: Title, Subtitle, Checklist */}
              <div className="md:col-span-7 flex flex-col justify-center">
                <h3 className="text-xl sm:text-2xl md:text-[1.65rem] font-bold text-[#0099FF] leading-snug">
                  {current.heading}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {current.desc}
                </p>

                {/* Checklist */}
                <div className="mt-6 flex flex-col gap-3.5">
                  {current.checklist.map((pt) => (
                    <div key={pt} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-[#0099FF] flex items-center justify-center shrink-0 text-[#0099FF]">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-sm sm:text-[15px] font-medium text-slate-800">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Feature list and CTA button with FREE badge */}
              <div className="md:col-span-5 bg-slate-50/70 border border-slate-100 rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
                <div className="flex flex-col divide-y divide-slate-200/70">
                  {current.features.map((feat, i) => {
                    const FIcon = feat.icon
                    return (
                      <div key={i} className="py-3.5 first:pt-0 last:pb-4 flex items-center gap-3">
                        <FIcon className="w-4 h-4 text-slate-600 shrink-0" />
                        <span className="text-xs sm:text-[13px] text-slate-700 font-medium leading-snug">
                          {feat.text}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Action Button with FREE Badge (Matches UI Image 5) */}
                <div className="relative mt-3">
                  <a
                    href="#pricing"
                    className="w-full py-3 px-4 rounded-xl bg-[#09234B] hover:bg-[#071935] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-200 group"
                  >
                    <span>Use this Solution</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </a>

                  {/* FREE Badge from SVG */}
                  <div className="absolute -top-5 -right-4 pointer-events-none select-none">
                    <img
                      src="/asset/free.svg"
                      alt="Free"
                      className="w-11 h-11 sm:w-14 sm:h-14 object-contain drop-shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UseCasesSection
