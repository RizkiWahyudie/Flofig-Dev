import { useState } from 'react'
import { 
  LayoutDashboard, 
  Kanban, 
  Users, 
  Globe2, 
  FileText, 
  Settings,
  Plus, 
  CheckCircle2,
  MessageSquare,
  ChevronRight,
  TrendingUp
} from 'lucide-react'

export function FlovigAppMockup() {
  const [activeTab, setActiveTab] = useState('board')
  const [completedDemoTask, setCompletedDemoTask] = useState(false)

  return (
    <div className="relative w-full text-left font-['Inter',sans-serif] text-xs">
      {/* Top Floating Badge 1 - Sprint Progress */}
      <div className="absolute -top-6 -right-2 sm:-right-4 z-20 hidden sm:flex items-center gap-3 p-3.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-flovig-floating border border-[#E5E8F0] hover:-translate-y-1 transition-transform">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 font-bold">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-[#101828]">Sprint 4 On Track</span>
            <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-700 text-[9px] font-bold rounded-full">
              84% Selesai
            </span>
          </div>
          <div className="w-32 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-700" style={{ width: completedDemoTask ? '92%' : '84%' }}></div>
          </div>
        </div>
      </div>

      {/* Floating Badge 2 - Workload Capacity */}
      <div className="absolute -bottom-6 -left-2 sm:-left-6 z-20 hidden md:flex items-center gap-3.5 p-3.5 bg-[#111A2E]/95 text-white backdrop-blur-md rounded-2xl shadow-flovig-floating border border-white/10 hover:-translate-y-1 transition-transform">
        <div className="w-10 h-10 rounded-xl bg-[#315CF5]/20 border border-[#315CF5]/40 flex items-center justify-center text-[#7EF0D0]">
          <Users className="w-5 h-5 text-[#7EF0D0]" />
        </div>
        <div>
          <div className="text-[11px] font-semibold text-white flex items-center gap-2">
            Beban Kerja Tim Optimal
            <span className="w-2 h-2 rounded-full bg-[#7EF0D0] animate-pulse"></span>
          </div>
          <p className="text-[10px] text-white/60 mt-0.5">5 Anggota Aktif • 0 Overload</p>
          <div className="flex items-center gap-1 mt-1.5">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-[9px] font-bold flex items-center justify-center text-white">SA</span>
            <span className="w-5 h-5 rounded-full bg-blue-500 text-[9px] font-bold flex items-center justify-center text-white">BP</span>
            <span className="w-5 h-5 rounded-full bg-amber-500 text-[9px] font-bold flex items-center justify-center text-white">RK</span>
            <span className="w-5 h-5 rounded-full bg-purple-500 text-[9px] font-bold flex items-center justify-center text-white">JT</span>
            <span className="text-[9px] text-[#7EF0D0] font-medium ml-1">+1 PM</span>
          </div>
        </div>
      </div>

      {/* Floating Badge 3 - Weekly Velocity */}
      <div className="absolute bottom-8 -right-3 sm:-right-8 z-20 hidden lg:flex items-center gap-2.5 px-3 py-2 bg-white/95 backdrop-blur-md rounded-xl shadow-flovig border border-[#E5E8F0]">
        <div className="w-2 h-2 rounded-full bg-[#315CF5]"></div>
        <span className="text-[11px] font-semibold text-[#101828]">+14 Task Diselesaikan Minggu Ini</span>
      </div>

      {/* Main Mockup Body */}
      <div className="bg-white rounded-xl overflow-hidden border border-[#E5E8F0] shadow-sm flex flex-col md:flex-row min-h-[500px]">
        {/* Left Sidebar */}
        <div className="w-full md:w-52 bg-[#F8FAFC] border-r border-[#E5E8F0] p-3 flex flex-col justify-between shrink-0">
          <div>
            {/* Workspace Header */}
            <div className="flex items-center gap-2 px-2 py-2 mb-3 rounded-lg bg-white border border-[#E5E8F0]">
              <div className="w-6 h-6 rounded-md bg-[#315CF5] text-white font-bold flex items-center justify-center text-xs">
                F
              </div>
              <div className="truncate">
                <div className="font-bold text-[11px] text-[#101828]">Flovig Space</div>
                <div className="text-[9px] text-[#64748B]">Digital Studio V1</div>
              </div>
            </div>

            {/* Nav Menu */}
            <div className="space-y-0.5">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTab === 'overview' ? 'bg-[#EAF0FF] text-[#2045D8]' : 'text-[#475467] hover:bg-slate-200/50'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Overview Proyek</span>
              </button>

              <button 
                onClick={() => setActiveTab('board')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTab === 'board' ? 'bg-[#EAF0FF] text-[#2045D8]' : 'text-[#475467] hover:bg-slate-200/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Kanban className="w-3.5 h-3.5" />
                  <span>Papan Task (Board)</span>
                </div>
                <span className="px-1.5 py-0.2 bg-[#315CF5] text-white text-[9px] rounded-full font-bold">4</span>
              </button>

              <button 
                onClick={() => setActiveTab('workload')}
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTab === 'workload' ? 'bg-[#EAF0FF] text-[#2045D8]' : 'text-[#475467] hover:bg-slate-200/50'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Beban Kerja Tim</span>
              </button>

              <button 
                onClick={() => setActiveTab('portal')}
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTab === 'portal' ? 'bg-[#EAF0FF] text-[#2045D8]' : 'text-[#475467] hover:bg-slate-200/50'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Portal Klien</span>
              </button>

              <button 
                onClick={() => setActiveTab('docs')}
                className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg font-medium text-[#475467] hover:bg-slate-200/50"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Faktur & Dokumen</span>
              </button>
            </div>

            {/* Projects List */}
            <div className="mt-5 pt-3 border-t border-[#E5E8F0]">
              <div className="px-2 mb-1.5 text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider flex items-center justify-between">
                <span>Proyek Aktif</span>
                <Plus className="w-3 h-3 text-[#64748B] hover:text-[#101828] cursor-pointer" />
              </div>
              <div className="space-y-1">
                <div className="px-2.5 py-1 rounded-md bg-white border border-[#E5E8F0] text-[11px] font-semibold text-[#101828] flex items-center gap-2 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#315CF5]"></span>
                  <span className="truncate">E-Commerce Platform</span>
                </div>
                <div className="px-2.5 py-1 rounded-md text-[11px] text-[#64748B] hover:bg-slate-200/40 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="truncate">Mobile Banking App</span>
                </div>
              </div>
            </div>
          </div>

          {/* User profile bottom */}
          <div className="pt-3 border-t border-[#E5E8F0] flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#111A2E] text-white flex items-center justify-center font-bold text-[9px]">
                DB
              </div>
              <div className="truncate">
                <div className="font-semibold text-[10px] text-[#101828]">Dewa Bagus</div>
                <div className="text-[8px] text-[#64748B]">Project Manager</div>
              </div>
            </div>
            <Settings className="w-3.5 h-3.5 text-[#94A3B8] hover:text-[#101828] cursor-pointer" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-[#FAFBFD] overflow-hidden">
          {/* Top Project Bar */}
          <div className="p-3 bg-white border-b border-[#E5E8F0] flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] text-[#64748B]">
                <span>Proyek</span>
                <ChevronRight className="w-3 h-3" />
                <span className="font-medium text-[#101828]">Redesign E-Commerce Platform</span>
              </div>
              <h3 className="font-bold text-sm text-[#101828] flex items-center gap-2 mt-0.5">
                Sprint 4: Checkout & Payment Flow
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Aktif
                </span>
              </h3>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center -space-x-1.5">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-[9px] flex items-center justify-center border-2 border-white">SA</span>
                <span className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-[9px] flex items-center justify-center border-2 border-white">BP</span>
                <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold text-[9px] flex items-center justify-center border-2 border-white">RK</span>
                <span className="w-6 h-6 rounded-full bg-[#111A2E] text-white font-bold text-[8px] flex items-center justify-center border-2 border-white">+2</span>
              </div>

              <button
                onClick={() => setCompletedDemoTask(!completedDemoTask)}
                className="px-2.5 py-1.5 rounded-lg bg-[#315CF5]/10 text-[#315CF5] hover:bg-[#315CF5]/20 font-semibold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
                title="Klik untuk simulasi task move"
              >
                <span>{completedDemoTask ? 'Reset Simulasi' : '⚡ Selesaikan 1 Task'}</span>
              </button>
            </div>
          </div>

          {/* Kanban Columns */}
          <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 overflow-x-auto">
            {/* Column 1: Backlog */}
            <div className="bg-[#F1F4F9] rounded-xl p-2.5 flex flex-col gap-2">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5 font-bold text-[11px] text-[#344054]">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  <span>Backlog</span>
                </div>
                <span className="text-[10px] font-medium text-[#64748B] bg-white px-1.5 py-0.5 rounded-md">2</span>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-[#E5E8F0] shadow-2xs hover:border-[#315CF5]/40 transition-all cursor-pointer">
                <div className="flex items-center justify-between text-[9px] text-[#64748B] mb-1.5">
                  <span className="font-semibold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">QA & Test</span>
                  <span className="text-amber-600 font-medium">16 Okt</span>
                </div>
                <h4 className="font-semibold text-[11px] text-[#101828] leading-snug">
                  Automated E2E Testing Alur Keranjang Belanja
                </h4>
                <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-slate-400" />
                    0/3
                  </span>
                  <div className="w-5 h-5 rounded-full bg-purple-500 text-white font-bold text-[8px] flex items-center justify-center">
                    JT
                  </div>
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-[#E5E8F0] shadow-2xs hover:border-[#315CF5]/40 transition-all cursor-pointer">
                <div className="flex items-center justify-between text-[9px] text-[#64748B] mb-1.5">
                  <span className="font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">Frontend</span>
                  <span className="text-slate-500">18 Okt</span>
                </div>
                <h4 className="font-semibold text-[11px] text-[#101828] leading-snug">
                  Audit Aksesibilitas WCAG 2.1 AA
                </h4>
                <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-slate-400" />
                    1/6
                  </span>
                  <div className="w-5 h-5 rounded-full bg-blue-500 text-white font-bold text-[8px] flex items-center justify-center">
                    BP
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: In Progress */}
            <div className="bg-[#F1F4F9] rounded-xl p-2.5 flex flex-col gap-2">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5 font-bold text-[11px] text-[#344054]">
                  <span className="w-2 h-2 rounded-full bg-[#315CF5]"></span>
                  <span>In Progress</span>
                </div>
                <span className="text-[10px] font-medium text-[#64748B] bg-white px-1.5 py-0.5 rounded-md">
                  {completedDemoTask ? '1' : '2'}
                </span>
              </div>

              {!completedDemoTask && (
                <div className="bg-white p-2.5 rounded-lg border border-[#315CF5]/40 shadow-xs ring-2 ring-[#315CF5]/10 transition-all">
                  <div className="flex items-center justify-between text-[9px] text-[#64748B] mb-1.5">
                    <span className="font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">Prioritas Tinggi</span>
                    <span className="text-blue-600 font-semibold">12 Okt</span>
                  </div>
                  <h4 className="font-semibold text-[11px] text-[#101828] leading-snug">
                    Integrasi Payment Gateway Midtrans & Webhook
                  </h4>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#315CF5] h-full w-[72%] rounded-full"></div>
                    </div>
                    <span className="text-[9px] font-semibold text-[#315CF5]">72%</span>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-[#64748B]">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3 text-slate-400" />
                      8
                    </span>
                    <div className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[8px] flex items-center justify-center">
                      RK
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white p-2.5 rounded-lg border border-[#E5E8F0] shadow-2xs hover:border-[#315CF5]/40 transition-all cursor-pointer">
                <div className="flex items-center justify-between text-[9px] text-[#64748B] mb-1.5">
                  <span className="font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">Frontend</span>
                  <span className="text-slate-500">14 Okt</span>
                </div>
                <h4 className="font-semibold text-[11px] text-[#101828] leading-snug">
                  Slicing Checkout Page & Dynamic State
                </h4>
                <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-slate-400" />
                    2/5
                  </span>
                  <div className="w-5 h-5 rounded-full bg-blue-500 text-white font-bold text-[8px] flex items-center justify-center">
                    BP
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Review Klien */}
            <div className="bg-[#F1F4F9] rounded-xl p-2.5 flex flex-col gap-2">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5 font-bold text-[11px] text-[#344054]">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>Review Klien</span>
                </div>
                <span className="text-[10px] font-medium text-[#64748B] bg-white px-1.5 py-0.5 rounded-md">
                  {completedDemoTask ? '2' : '1'}
                </span>
              </div>

              {completedDemoTask && (
                <div className="bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-300 shadow-sm animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex items-center justify-between text-[9px] mb-1">
                    <span className="font-semibold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">Dipindahkan ke Review!</span>
                    <span className="text-emerald-700 font-bold">12 Okt</span>
                  </div>
                  <h4 className="font-semibold text-[11px] text-emerald-950 leading-snug">
                    Integrasi Payment Gateway Midtrans & Webhook
                  </h4>
                  <p className="text-[9px] text-emerald-700 mt-1">Siap diverifikasi tim klien</p>
                </div>
              )}

              <div className="bg-white p-2.5 rounded-lg border border-[#E5E8F0] shadow-2xs hover:border-[#315CF5]/40 transition-all cursor-pointer">
                <div className="flex items-center justify-between text-[9px] text-[#64748B] mb-1.5">
                  <span className="font-semibold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">Design System</span>
                  <span className="text-amber-600 font-semibold">Besok, 17:00</span>
                </div>
                <h4 className="font-semibold text-[11px] text-[#101828] leading-snug">
                  Finalisasi Sistem Desain & Token Warna V2
                </h4>
                <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-[#64748B]">
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <Globe2 className="w-3 h-3" />
                    Klien Reviewing
                  </span>
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white font-bold text-[8px] flex items-center justify-center">
                    SA
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Selesai */}
            <div className="bg-[#F1F4F9] rounded-xl p-2.5 flex flex-col gap-2">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5 font-bold text-[11px] text-[#344054]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Selesai</span>
                </div>
                <span className="text-[10px] font-medium text-[#64748B] bg-white px-1.5 py-0.5 rounded-md">2</span>
              </div>

              <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200/80 shadow-2xs opacity-90">
                <div className="flex items-center justify-between text-[9px] text-[#64748B] mb-1.5">
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Approved</span>
                  <span className="text-slate-400">07 Okt</span>
                </div>
                <h4 className="font-semibold text-[11px] text-[#101828] line-through text-slate-500 leading-snug">
                  Approval Deliverable Wireframe E-Commerce
                </h4>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Klien Sign-off Selesai
                </div>
              </div>

              <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200/80 shadow-2xs opacity-90">
                <div className="flex items-center justify-between text-[9px] text-[#64748B] mb-1.5">
                  <span className="font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">DevOps</span>
                  <span className="text-slate-400">08 Okt</span>
                </div>
                <h4 className="font-semibold text-[11px] text-[#101828] line-through text-slate-500 leading-snug">
                  Setup Staging Environment & Docker
                </h4>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Deployed to AWS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
