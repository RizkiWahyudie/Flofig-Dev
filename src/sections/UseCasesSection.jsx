import { useState } from 'react'
import { Container } from '../components/layout/Container'
import {
  Check,
  ArrowRight,
  Globe,
  FolderOpen,
  Users,
  Receipt,
  Zap,
  Bug,
  Flag,
  BookOpen,
  Inbox,
  Repeat,
  BarChart3,
  Clock,
  Wallet,
} from 'lucide-react'

/* -------------------------------------------------------------------------
   Konten mengikuti PRD Landing Page V1 (Section 12 — Use Cases):
   hanya fitur Release V1. Tanpa AI/Copilot, tanpa HRIS, tanpa integrasi
   pihak ketiga yang belum ada, dan tanpa logo kompetitor.
   ------------------------------------------------------------------------- */
const cases = [
  {
    id: 'agency',
    tabLabel: 'Agency & Creative',
    titleTop: 'Kelola banyak klien',
    titleBottom: 'tanpa kehilangan jejak revisi',
    desc: 'Setiap klien punya project, task, file, dan tagihannya sendiri, dengan progres yang bisa mereka lihat lewat portal.',
    flow: ['Project', 'Task', 'Client', 'Files', 'Invoice'],
    keyPoints: [
      'Satu project untuk setiap klien',
      'File dan diskusi menempel pada project',
      'Invoice dan riwayat pembayaran per klien',
    ],
    situations: [
      { icon: Globe, tone: 'from-sky-100 to-blue-200 text-blue-700', text: 'Client Portal menampilkan progres tanpa membuka workspace internal' },
      { icon: FolderOpen, tone: 'from-emerald-100 to-teal-200 text-teal-700', text: 'Files menyimpan aset dan revisi di dekat task-nya' },
      { icon: Users, tone: 'from-amber-100 to-orange-200 text-orange-700', text: 'Workload menunjukkan siapa di tim kreatif yang sedang penuh' },
      { icon: Receipt, tone: 'from-indigo-100 to-indigo-200 text-indigo-700', text: 'Invoices & Payment History mencatat tagihan setiap klien' },
    ],
  },
  {
    id: 'software',
    tabLabel: 'Software & Product',
    titleTop: 'Jalankan sprint',
    titleBottom: 'tanpa bug yang tercecer',
    desc: 'Rencanakan sprint, kerjakan task di board, dan lacak bug sampai selesai dalam satu project.',
    flow: ['Sprint', 'Tasks', 'Tickets', 'Milestones', 'Reports'],
    keyPoints: [
      'Sprint dan milestone dalam satu hierarki',
      'Board & list view untuk setiap project',
      'Bug tracker dengan assignee dan prioritas',
    ],
    situations: [
      { icon: Zap, tone: 'from-cyan-100 to-sky-200 text-sky-700', text: 'Sprints mengelompokkan task per periode kerja' },
      { icon: Bug, tone: 'from-rose-100 to-pink-200 text-rose-700', text: 'Tickets mencatat bug dari dilaporkan sampai resolved' },
      { icon: Flag, tone: 'from-indigo-100 to-indigo-200 text-indigo-700', text: 'Milestones memantau target penting di setiap fase' },
      { icon: BookOpen, tone: 'from-emerald-100 to-teal-200 text-teal-700', text: 'Knowledge Base menyimpan dokumentasi teknis tim' },
    ],
  },
  {
    id: 'operations',
    tabLabel: 'Operations',
    titleTop: 'Tangani permintaan rutin',
    titleBottom: 'dengan beban kerja terukur',
    desc: 'Ubah permintaan masuk menjadi task, jadwalkan pekerjaan berulang, dan pantau kapasitas tim dari satu dashboard.',
    flow: ['Requests', 'Tasks', 'Workload', 'Analytics', 'Reports'],
    keyPoints: [
      'Customer request ditindaklanjuti sebagai task',
      'Recurring task untuk pekerjaan rutin',
      'Activity log untuk setiap perubahan',
    ],
    situations: [
      { icon: Inbox, tone: 'from-sky-100 to-blue-200 text-blue-700', text: 'Customer Requests mengumpulkan permintaan dalam satu tempat' },
      { icon: Repeat, tone: 'from-emerald-100 to-teal-200 text-teal-700', text: 'Recurring Tasks mengulang pekerjaan rutin sesuai jadwal' },
      { icon: Users, tone: 'from-amber-100 to-orange-200 text-orange-700', text: 'Workload menandai anggota tim yang kelebihan beban' },
      { icon: BarChart3, tone: 'from-indigo-100 to-indigo-200 text-indigo-700', text: 'Analytics & Reports merangkum kinerja operasional' },
    ],
  },
  {
    id: 'services',
    tabLabel: 'Professional Services',
    titleTop: 'Tagih klien',
    titleBottom: 'dengan catatan kerja yang jelas',
    desc: 'Catat jam kerja per project, bandingkan dengan budget, lalu kirim invoice dengan progres yang bisa dicek klien.',
    flow: ['Projects', 'Timesheet', 'Budget', 'Client Portal', 'Invoice'],
    keyPoints: [
      'Timesheet per project dan aktivitas',
      'Budget project dibandingkan kondisi aktual',
      'Akses klien diatur lewat roles & permissions',
    ],
    situations: [
      { icon: Clock, tone: 'from-emerald-100 to-teal-200 text-teal-700', text: 'Timesheet mencatat waktu kerja per aktivitas' },
      { icon: Wallet, tone: 'from-amber-100 to-orange-200 text-orange-700', text: 'Budget memantau anggaran project dan realisasinya' },
      { icon: Globe, tone: 'from-sky-100 to-blue-200 text-blue-700', text: 'Client Portal membagikan progres dengan akses terkontrol' },
      { icon: Receipt, tone: 'from-indigo-100 to-indigo-200 text-indigo-700', text: 'Invoices menagih klien dan mencatat pembayarannya' },
    ],
  },
]

export function UseCasesSection() {
  const [activeCase, setActiveCase] = useState(0)
  const current = cases[activeCase]

  return (
    <section id="use-cases" className="py-24 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1A1A1F]">
            Dibuat untuk cara kerja{' '}
            <span className="text-[#6B6F7A]">tim yang berbeda</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#6B6F7A]">
            Satu workspace, disusun sesuai alur kerja tim Anda.
          </p>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          className="mt-8 mb-6 flex items-center justify-center gap-2 flex-wrap"
        >
          {cases.map((c, idx) => {
            const isActive = activeCase === idx
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCase(idx)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'border border-[#315CF5] bg-[#315CF5]/[0.06] text-[#315CF5]'
                    : 'border border-dashed border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400'
                }`}
              >
                {c.tabLabel}
              </button>
            )
          })}
        </div>

        {/* Panel */}
        <div
          key={current.id}
          className="bg-[#F6F7F9] rounded-[28px] px-6 py-10 sm:px-12 sm:py-12 lg:px-14 lg:py-14 animate-[fadeIn_.3s_ease]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            {/* Left */}
            <div className="flex flex-col justify-between gap-12">
              <div>
                <h3 className="text-[32px] sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.03em]">
                  <span className="block text-[#1A1A1F]">{current.titleTop}</span>
                  <span className="block text-[#7A7E89]">{current.titleBottom}</span>
                </h3>
                <p className="mt-3 max-w-md text-base text-[#3F434D] leading-relaxed">
                  {current.desc}
                </p>
              </div>

              <div>
                {/* Alur kerja (menggantikan baris logo "Menggantikan") */}
                <div className="mb-5">
                  <span className="block text-xs font-medium uppercase tracking-[0.12em] text-[#6B6F7A] mb-2.5">
                    Alur kerja
                  </span>
                  <div className="flex items-center flex-wrap gap-y-2 gap-x-1.5">
                    {current.flow.map((step, i) => (
                      <span key={step} className="inline-flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[13px] font-medium text-[#3F434D]">
                          {step}
                        </span>
                        {i < current.flow.length - 1 && (
                          <ArrowRight className="w-3.5 h-3.5 text-[#A0A4AE]" strokeWidth={2} />
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {current.keyPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 text-[15px] text-[#4A4E58]"
                    >
                      <Check className="w-4 h-4 text-[#8A8E98] shrink-0" strokeWidth={2} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right */}
            <div className="w-full max-w-[400px] lg:ml-auto flex flex-col gap-3">
              {current.situations.map((item) => {
                const ItemIcon = item.icon
                return (
                  <div
                    key={item.text}
                    className="flex items-center gap-3.5 bg-white rounded-xl px-4 py-3.5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_2px_6px_rgba(16,24,40,0.04)] transition-shadow duration-200 hover:shadow-[0_2px_4px_rgba(16,24,40,0.06),0_6px_16px_rgba(16,24,40,0.06)]"
                  >
                    <div
                      className={`w-9 h-9 shrink-0 rounded-full bg-gradient-to-br ${item.tone} flex items-center justify-center`}
                    >
                      <ItemIcon className="w-[18px] h-[18px]" strokeWidth={1.8} />
                    </div>
                    <p className="text-[15px] leading-snug text-[#1F2128]">{item.text}</p>
                  </div>
                )
              })}

              <a
                href="#pricing"
                className="mt-2 self-start inline-flex items-center gap-1.5 bg-[#1A1A1F] hover:bg-black text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors group"
              >
                Mulai Sekarang
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}