import { useState } from 'react'
import {
  Lock,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Search,
} from 'lucide-react'

const MODULE_TABS = [
  {
    id: 'agile-dashboard',
    label: 'Agile Dashboard',
    url: 'flovig.com/dashboard · Workspace Overview',
    image: '/asset/flovig-dashboard.png',
    alt: 'Flovig Agile Dashboard',
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    url: 'flovig.com/dashboard/analytics · Real-time Metrics',
    image: '/asset/flovig-task-project.png',
    alt: 'Flovig Task Dashboard',
  },
  {
    id: 'project-overview',
    label: 'Project Overview',
    url: 'flovig.com/projects/management-flovig · Project Overview',
    image: '/asset/flovig-overview-project.png',
    alt: 'Flovig Project Overview',
  },
  {
    id: 'milestone',
    label: 'Milestone',
    url: 'flovig.com/projects/management-flovig/milestones · Tree Architecture',
    image: '/asset/flovig-milestone-project.png',
    alt: 'Flovig Milestone Tree Architecture',
  },
  {
    id: 'calendar',
    label: 'Calender',
    url: 'flovig.com/calendar · Sprint Schedule & Google Meet',
    image: '/asset/flovig-calendar-project.png',
    alt: 'Flovig Sprint Calendar',
  },
  {
    id: 'chat-discuss',
    label: 'Chat & Discuss',
    url: 'flovig.com/chat/general · Contextual Team Discussions',
    image: '/asset/flovig-chat.png',
    alt: 'Flovig Team Chat & Discussions',
  },
]

export function ProductPlaygroundSection() {
  const [activeTab, setActiveTab] = useState('agile-dashboard')
  const currentTab = MODULE_TABS.find((m) => m.id === activeTab) || MODULE_TABS[0]

  return (
    <section id="playground" className="relative py-20 sm:py-28 md:py-32 bg-white text-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading & Subheading (Matches UI Image 3) */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.12] text-slate-950">
            Less Back And Forth.<br />
            More Getting Things Done.
          </h2>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
            Projects, people, and processes in one connected workspace. Less switching between tools, less room for things to get lost.
          </p>

          {/* 6 Pill Tabs (Matches UI Image 3) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {MODULE_TABS.map((tab) => {
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#0099FF] text-white shadow-md shadow-sky-500/25 ring-2 ring-sky-400/20'
                      : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Browser Mockup Showcase with Opacity Transition */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.08)] overflow-hidden">
          {/* Top Browser Chrome Bar */}
          <div className="h-11 sm:h-12 bg-slate-50/90 border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4">
            {/* Left Nav Controls */}
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <div className="hidden sm:flex items-center gap-1 ml-2">
                <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>

            {/* Center Monospace URL Pill with Lock Icon */}
            <div className="flex items-center justify-center gap-1.5 flex-1 max-w-md mx-auto bg-white border border-slate-200/80 rounded-md px-3 py-1 font-mono text-[11px] sm:text-xs text-slate-600 truncate shadow-2xs">
              <Lock className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{currentTab.url}</span>
            </div>

            {/* Right Tools Icons */}
            <div className="flex items-center gap-2 text-slate-400">
              <RotateCw className="w-3.5 h-3.5" />
              <Search className="w-3.5 h-3.5 hidden sm:inline-block" />
            </div>
          </div>

          {/* Browser Viewport with Crossfade Images */}
          <div className="relative aspect-[16/10] sm:aspect-[16/10] bg-slate-100 overflow-hidden">
            {MODULE_TABS.map((tab) => (
              <div
                key={tab.id}
                className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  activeTab === tab.id ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={tab.image}
                  alt={tab.alt}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductPlaygroundSection
