import { useState } from 'react'
import { BarChart3, Kanban, Share2, Globe } from 'lucide-react'

const IMG_MILESTONE = '/asset/flovig-milestone-project.png'
const IMG_BOARD = '/asset/flovig-task-project.png'
const IMG_OVERVIEW = '/asset/flovig-overview-project.png'

const SYNC_ITEMS = [
  {
    id: 'milestones',
    title: 'Roadmaps, sprints & workload planning',
    desc: 'Break projects into clear milestones, plan sprints, and get a better view of your team\'s workload — all in one place.',
    icon: BarChart3,
    url: 'app.flovig.com/projects/management-flovig/milestones',
    chip: '3 milestone · 1 berjalan',
    image: IMG_MILESTONE,
    alt: 'Flovig Milestones & Delivery Tree Architecture',
  },
  {
    id: 'tasks',
    title: 'Clear tasks. Work that keeps moving.',
    desc: 'Move tasks across boards or lists and keep priorities, assignees, and deadlines visible in one place.',
    icon: Kanban,
    url: 'app.flovig.com/projects/management-flovig/tasks',
    chip: 'To Do → In Progress → Done',
    image: IMG_BOARD,
    alt: 'Flovig Kanban Task Management',
  },
  {
    id: 'client-portal',
    title: 'Keep clients in the loop. Wrap up with ease.',
    desc: 'Share project updates through a client portal without exposing your internal workspace.',
    icon: Share2,
    url: 'portal.flovig.com/website-revamp',
    chip: 'Portal aman untuk klien',
    image: IMG_OVERVIEW,
    alt: 'Flovig Client Portal & Project Overview',
  },
]

export function WorkflowStorySection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const currentItem = SYNC_ITEMS[activeIdx]

  return (
    <section id="sync" className="relative py-20 sm:py-28 md:py-32 bg-white overflow-hidden">
      {/* Section Header: Contained within max-w-7xl */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.1] text-slate-950">
            We Bring <span className="text-[#00A3FF]">Everything</span><br />
            Back To <span className="text-[#00A3FF]">Sync.</span>
          </h2>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-500 leading-relaxed max-w-xl">
            Flovig connects your team's work in one place, making it easier to stay organized, keep everyone aligned, and move projects forward. That's how we work.
          </p>
        </div>
      </div>

      {/* 2-Column Content: Left cards contained, Right screenshot bleeds to right edge and appears cut off */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Cards Column */}
            <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5 shrink-0 z-10">
              {SYNC_ITEMS.map((item, idx) => {
                const Icon = item.icon
                const isActive = activeIdx === idx

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                    className={`relative p-5 sm:p-6 rounded-2xl transition-all duration-200 cursor-pointer text-left select-none ${
                      isActive
                        ? 'border-2 border-[#00A3FF] bg-white shadow-[0_8px_30px_rgba(0,163,255,0.08)] ring-4 ring-[#00A3FF]/10'
                        : 'border border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveIdx(idx)
                      }
                    }}
                    aria-pressed={isActive}
                  >
                    {/* Icon badge */}
                    <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#00A3FF] mb-3.5">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Right Preview Column: Stretches and bleeds to the right edge of viewport ("seakan terpotong") */}
            <div className="lg:col-span-7 lg:sticky lg:top-24 w-full">
              <div className="relative w-full lg:w-[130%] xl:w-[142%] 2xl:w-[155%] rounded-2xl lg:rounded-l-3xl lg:rounded-r-none border border-slate-200/90 lg:border-r-0 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden">
                {/* Minimalist Browser Header Bar */}
                <div className="h-11 sm:h-12 bg-slate-50/90 border-b border-slate-200/80 px-4 sm:px-6 flex items-center gap-3">
                  {/* Window Dots */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  </div>

                  {/* Monospace URL Pill */}
                  <div className="mx-auto flex-1 max-w-sm sm:max-w-md bg-white border border-slate-200/80 rounded-md px-3 py-1 text-center font-mono text-[11px] sm:text-xs text-slate-600 truncate shadow-2xs">
                    {currentItem.url}
                  </div>

                  {/* Secure icon */}
                  <div className="w-8 flex justify-end">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>

                {/* Viewport Content */}
                <div className="relative aspect-[16/10] sm:aspect-[16/10] bg-slate-100 overflow-hidden group">
                  {/* Floating Status Chip on Top-Left */}
                  <div className="absolute top-4 left-4 z-20 pointer-events-none">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/90 text-white text-xs font-semibold shadow-lg backdrop-blur-xs">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span>{currentItem.chip}</span>
                    </div>
                  </div>

                  {/* Crossfading Preview Images (Large, object-left-top so left hierarchy is crisp, right bleeds off) */}
                  {SYNC_ITEMS.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                        activeIdx === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover object-left-top"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkflowStorySection
