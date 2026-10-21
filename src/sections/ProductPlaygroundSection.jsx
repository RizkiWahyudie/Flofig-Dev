import { useState } from 'react'
import { Container } from '../components/layout/Container'
import { ProductWindow } from '../components/product/ProductWindow'
import { 
  LayoutDashboard, 
  Kanban, 
  Layers, 
  GitFork, 
  Calendar, 
  MessageSquare,
  Maximize2,
  Sparkles,
  Info
} from 'lucide-react'

const CSS = `
.pp-main-heading {
  font-size: clamp(26px, 3.2vw, 42px);
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.035em;
  color: #0F172A;
  margin: 0;
}
.pp-hl {
  position: relative;
  display: inline-block;
  padding-bottom: 4px;
  color: transparent;
  background: linear-gradient(90deg, #2563eb, #06b6d4);
  -webkit-background-clip: text;
  background-clip: text;
}
.pp-hl svg {
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 12px;
  overflow: visible;
  display: block;
}
.pp-hl path {
  fill: none;
  stroke: url(#pp-ulGrad);
  stroke-width: 3.2;
  stroke-linecap: round;
}
`

export function ProductPlaygroundSection() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const modules = [
    {
      id: 'dashboard',
      icon: LayoutDashboard,
      label: 'Agile Dashboard',
      title: 'Dashboard Analitik & Velocity Throughput',
      desc: 'Pantau sprint aktif, distribusi tugas harian, throughput kecepatan tim, serta matriks kualitas SLA dalam satu pandangan utuh.',
      image: '/asset/flovig-dashboard.png',
      stats: [
        { label: 'Proyek Portofolio', val: '1 Aktif' },
        { label: 'Sprint Berjalan', val: '5 Siklus' },
        { label: 'Throughput', val: 'Daily Tracking' },
        { label: 'SLA Quality', val: '100% On Track' }
      ],
      hotspots: [
        { top: '35%', left: '30%', text: 'Task Velocity Chart real-time selama 14 hari' },
        { top: '36%', left: '80%', text: 'Distribusi Status Tugas Donut Breakdown' },
        { top: '60%', left: '30%', text: 'Kartu Active Sprints dengan indikator deadline' }
      ]
    },
    {
      id: 'tasks',
      icon: Kanban,
      label: 'Papan Kanban',
      title: 'Papan Task & Manajemen Status Kolom',
      desc: 'Kolom visual To Do, In Progress, Review, Testing, dan Done. Dilengkapi filter multi-kriteria: Assignee, Due Date, Label, Priority, dan Milestone.',
      image: '/asset/flovig-task-project.png',
      stats: [
        { label: 'Kolom Fleksibel', val: '5 Kategori' },
        { label: 'Filter Cepat', val: '6 Parameter' },
        { label: 'Checklist Task', val: 'Subtask Terikat' },
        { label: 'Indikator Due Date', val: 'Overdue Alert' }
      ],
      hotspots: [
        { top: '12%', left: '60%', text: 'Multi-filter bar: Assignee, Due Date, Priority' },
        { top: '25%', left: '25%', text: 'Kartu Task dengan label Frontend, Backend, Urgent' },
        { top: '25%', left: '78%', text: 'Kolom Done & Testing dengan log penyelesaian' }
      ]
    },
    {
      id: 'overview',
      icon: Layers,
      label: 'Overview Proyek',
      title: 'Pusat Informasi & Roadmap Proyek',
      desc: 'Ringkasan menyeluruh kontrak klien, timeline 259 hari kerja tersisa, distribusi status pekerjaan, shortcut modul, dan daftar 11 kontributor tim.',
      image: '/asset/flovig-overview-project.png',
      stats: [
        { label: 'Total Tugas', val: '52 Tasks' },
        { label: 'Sprint Members', val: '11 Anggota' },
        { label: 'Siklus Kerja', val: '9 Sprints' },
        { label: 'Klien Terhubung', val: 'PT Abadi Nan Jaya' }
      ],
      hotspots: [
        { top: '15%', left: '35%', text: 'Header status proyek & tombol Create Meeting' },
        { top: '32%', left: '50%', text: 'Direct module shortcuts untuk navigasi cepat' },
        { top: '62%', left: '80%', text: 'Daftar kontributor tim beserta jumlah beban task' }
      ]
    },
    {
      id: 'milestones',
      icon: GitFork,
      label: 'Arsitektur Milestone',
      title: 'Diagram Hirarki & Delivery Tree',
      desc: 'Visualisasi pohon silsilah proyek: Root Project → Milestones → Sprints → Task terlampir. Memastikan keterkaitan arsitektural tidak pernah terputus.',
      image: '/asset/flovig-milestone-project.png',
      stats: [
        { label: 'Hirarki Pohon', val: 'Multi-Level Tree' },
        { label: 'At Risk Tracker', val: 'Deteksi Blocker' },
        { label: 'Milestone Scope', val: '100% Charted' },
        { label: 'Target Rilis', val: 'Fase Q3 & Q4' }
      ],
      hotspots: [
        { top: '44%', left: '55%', text: 'Root Node Proyek terhubung ke setiap fase rilis' },
        { top: '65%', left: '35%', text: 'Rincian tugas teknis & status checklist persetujuan' }
      ]
    },
    {
      id: 'calendar',
      icon: Calendar,
      label: 'Kalender & Jadwal',
      title: 'Kalender Proyek & Integrasi Google Calendar',
      desc: 'Sinkronisasi tenggat waktu task, sprint planning event, dan agenda meeting tim dengan dukungan integrasi dua arah Google Calendar.',
      image: '/asset/flovig-calendar-project.png',
      stats: [
        { label: 'Tampilan Waktu', val: 'Bulan / Minggu / Hari' },
        { label: 'Google Calendar', val: 'Sinkronisasi 1-Klik' },
        { label: 'Event Kategori', val: 'Warna Berbeda' },
        { label: 'Agenda Cepat', val: 'Tombol New Event' }
      ],
      hotspots: [
        { top: '12%', left: '78%', text: 'Tautan Google Calendar Connect langsung' },
        { top: '35%', left: '50%', text: 'Blok event task berwarna dengan tanggal tenggat' }
      ]
    },
    {
      id: 'chat',
      icon: MessageSquare,
      label: 'Chat & Diskusi',
      title: 'Chatting Proyek & Kolaborasi Kontekstual',
      desc: 'Ruang obrolan terpusat untuk diskusi proyek dan direct chat anggota. Dilengkapi panel ringkasan proyek di sisi kanan agar percakapan tidak keluar jalur.',
      image: '/asset/flovig-chat.png',
      stats: [
        { label: 'Kategori Chat', val: 'Project & Direct' },
        { label: 'Side Panel', val: 'Ringkasan Proyek' },
        { label: 'Reaksi Pesan', val: 'Emoji & Pinned' },
        { label: 'Format Teks', val: 'Markdown & Mention' }
      ],
      hotspots: [
        { top: '30%', left: '15%', text: 'Daftar saluran chat proyek & pesan privat tim' },
        { top: '40%', left: '88%', text: 'Info ringkasan proyek tersemat di sisi kanan' },
        { top: '92%', left: '50%', text: 'Text editor dengan dukungan formatting & mention' }
      ]
    }
  ]

  const currentModule = modules.find((m) => m.id === activeTab) || modules[0]

  return (
    <section id="playground" className="py-24 bg-[#F8FAFC]">
      <style>{CSS}</style>
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="pp-main-heading">
            Lihat Flovig beraksi.{' '}<br/>
            <span className="pp-hl">
              Eksplorasi UI asli.
              <svg viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="pp-ulGrad" x1="0" x2="1">
                    <stop offset="0" stopColor="#2563eb" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <path d="M3 8 C 80 2, 200 2, 297 7" />
              </svg>
            </span>
          </h2>
        </div>

        {/* 6 Tabs Pill Switcher */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {modules.map((mod) => {
            const Icon = mod.icon
            const isActive = activeTab === mod.id
            return (
              <button
                key={mod.id}
                onClick={() => setActiveTab(mod.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#315CF5] text-white shadow-md shadow-[#315CF5]/25 scale-102'
                    : 'bg-white text-[#475467] hover:text-[#101828] hover:border-slate-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#315CF5]'}`} />
                <span>{mod.label}</span>
              </button>
            )
          })}
        </div>

        {/* Active Module Showcase Card */}
        <div className="bg-white rounded-3xl shadow-flovig-lg p-6 sm:p-8 overflow-hidden">
          {/* Module Description & Stats Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pb-6 border-b border-[#E5E8F0] mb-6">
            <div className="lg:col-span-7 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#315CF5] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#315CF5]" />
                <span>Modul {currentModule.label}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#101828]">
                {currentModule.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                {currentModule.desc}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
              {currentModule.stats.map((st, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-[#F8FAFC]">
                  <span className="text-[10px] text-[#94A3B8] font-medium block">{st.label}</span>
                  <span className="text-xs font-bold text-[#101828] mt-0.5 block truncate">{st.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Window with Real App Screenshot */}
          <ProductWindow
            title={`Flovig — ${currentModule.title}`}
            headerAction={
              <button
                onClick={() => setLightboxOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/5 hover:bg-black/10 text-xs font-semibold text-[#475467] transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Perbesar Gambar</span>
              </button>
            }
          >
            <div className="relative group bg-slate-100 overflow-hidden min-h-[400px]">
              <img
                src={currentModule.image}
                alt={currentModule.title}
                className="w-full h-auto object-cover object-top rounded-b-xl transition-transform duration-300 group-hover:scale-[1.01]"
                loading="lazy"
              />

              {/* Hotspot overlays */}
              {currentModule.hotspots.map((spot, idx) => (
                <div
                  key={idx}
                  className="absolute hidden md:flex items-center group/spot cursor-pointer"
                  style={{ top: spot.top, left: spot.left }}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-6 h-6 rounded-full bg-[#315CF5] animate-ping opacity-60"></span>
                    <span className="relative w-4 h-4 rounded-full bg-[#315CF5] text-white flex items-center justify-center text-[9px] font-bold shadow-md shadow-[#315CF5]">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Tooltip on hover */}
                  <div className="ml-2.5 px-3 py-1.5 rounded-lg bg-[#111A2E]/95 text-white text-[11px] font-medium shadow-xl opacity-0 group-hover/spot:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 z-30">
                    {spot.text}
                  </div>
                </div>
              ))}

              {/* Bottom helper pill */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-20 flex items-center justify-between sm:justify-end gap-3 p-2 rounded-xl bg-white/90 backdrop-blur-md border border-[#E5E8F0] shadow-lg text-[11px] text-[#475467]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Info className="w-3.5 h-3.5 text-[#315CF5]" />
                  Tangkapan layar asli dari Flovig Production V1
                </span>
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="font-bold text-[#315CF5] hover:underline cursor-pointer"
                >
                  Lihat Resolusi Penuh
                </button>
              </div>
            </div>
          </ProductWindow>
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <div
              className="relative max-w-6xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-2 animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-3 border-b border-slate-200">
                <span className="font-bold text-sm text-[#101828]">{currentModule.title}</span>
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-xs font-semibold rounded-lg text-slate-700 cursor-pointer"
                >
                  Tutup [ESC]
                </button>
              </div>
              <div className="max-h-[80vh] overflow-auto p-2">
                <img
                  src={currentModule.image}
                  alt={currentModule.title}
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
