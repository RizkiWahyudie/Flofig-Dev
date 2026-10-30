import { useState } from 'react'
import { TaskBoardInteractive } from '../components/product/TaskBoardInteractive'
import { WorkloadHeatmap } from '../components/product/WorkloadHeatmap'
import { CollaborationModal } from '../components/product/CollaborationModal'
import { ClientPortalSplit } from '../components/product/ClientPortalSplit'
import { ControlAuditPanel } from '../components/product/ControlAuditPanel'
import {
  Users,
  Globe,
  CheckSquare,
  Clock,
  MessageSquare,
  Lock,
} from 'lucide-react'

const TABS = [
  {
    id: 'workload',
    label: 'Team Workload',
    icon: Users,
    url: 'app.flovig.com/workload/analytics',
    Component: WorkloadHeatmap,
  },
  {
    id: 'client-portal',
    label: 'Client Portal',
    icon: Globe,
    url: 'portal.flovig.com/website-revamp',
    Component: ClientPortalSplit,
  },
  {
    id: 'task-board',
    label: 'Task Board',
    icon: CheckSquare,
    url: 'app.flovig.com/projects/management-flovig/tasks',
    Component: TaskBoardInteractive,
  },
  {
    id: 'control-audit',
    label: 'Control & Audit',
    icon: Clock,
    url: 'app.flovig.com/settings/audit-logs',
    Component: ControlAuditPanel,
  },
  {
    id: 'chat',
    label: 'Chat',
    icon: MessageSquare,
    url: 'app.flovig.com/task/FL-108/discussion',
    Component: CollaborationModal,
  },
]

export function StackedFeaturesSection() {
  const [activeTab, setActiveTab] = useState('task-board')
  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[2]

  return (
    <section id="features" className="relative py-16 sm:py-24 md:py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 5 Icon Navigation (Matches UI Image 4) */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-16 mb-10 sm:mb-14">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="group flex flex-col items-center gap-2.5 focus:outline-none cursor-pointer transition-transform duration-200 hover:scale-105"
              >
                {/* Icon Container */}
                <div
                  className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? 'bg-[#0099FF] text-white shadow-lg shadow-sky-500/30 ring-4 ring-sky-400/15'
                      : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200/80 group-hover:text-slate-600'
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                </div>

                {/* Label */}
                <span
                  className={`text-xs sm:text-sm font-semibold transition-colors duration-200 text-center ${
                    isActive ? 'text-slate-900 font-bold' : 'text-slate-500 group-hover:text-slate-700'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Application Window Frame with Real Interactive Component & Opacity Transition */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.07)] overflow-hidden">
          {/* Top Browser Chrome Bar */}
          <div className="h-11 sm:h-12 bg-slate-50/90 border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4">
            {/* Window Dots */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>

            {/* Monospace URL Pill */}
            <div className="flex items-center justify-center gap-1.5 flex-1 max-w-sm sm:max-w-md bg-white border border-slate-200/80 rounded-md px-3 py-1 font-mono text-[11px] sm:text-xs text-slate-600 truncate shadow-2xs">
              <Lock className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{currentTab.url}</span>
            </div>

            {/* Right spacer */}
            <div className="w-12 text-right">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Live Demo</span>
            </div>
          </div>

          {/* Interactive Component Body (Smooth Opacity Transition) */}
          <div className="p-3 sm:p-5 md:p-6 bg-slate-50/30 min-h-[460px] sm:min-h-[540px]">
            {TABS.map((tab) => {
              const Comp = tab.Component
              const isCurrent = activeTab === tab.id

              return (
                <div
                  key={tab.id}
                  className={`transition-opacity duration-300 ease-in-out ${
                    isCurrent ? 'opacity-100 block' : 'opacity-0 hidden'
                  }`}
                >
                  <Comp />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StackedFeaturesSection
