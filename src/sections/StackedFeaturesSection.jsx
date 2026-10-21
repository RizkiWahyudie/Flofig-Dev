import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { TaskBoardInteractive } from '../components/product/TaskBoardInteractive'
import { WorkloadHeatmap } from '../components/product/WorkloadHeatmap'
import { CollaborationModal } from '../components/product/CollaborationModal'
import { ClientPortalSplit } from '../components/product/ClientPortalSplit'
import { ControlAuditPanel } from '../components/product/ControlAuditPanel'
import { 
  Kanban, 
  Users, 
  MessageSquare, 
  ShieldCheck, 
  Lock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

/* =========================================================================
   Flovig — Stacked Features Showcase (Light Theme)
   Desktop (≥1024px): Pinned stage, 3D stacked cards that slide to the right
   on scroll, revealing the next feature in the deck.
   Mobile (<1024px): Responsive stacked cards.
   ========================================================================= */

const FEATURES = [
  {
    id: 'features',
    num: '01',
    navLabel: 'Task Board',
    badge: 'MANAJEMEN TUGAS MENDALAM',
    title: 'Dari backlog sampai selesai, semua tetap terlihat.',
    desc: 'Ganti antara Kanban visual yang dinamis atau Detailed List view dengan filter kategori & prioritas.',
    icon: <Kanban className="w-4 h-4" />,
    url: 'app.flovig.com/projects/management-flovig/tasks',
    Component: TaskBoardInteractive,
  },
  {
    id: 'workload',
    num: '02',
    navLabel: 'Tim Workload',
    badge: 'KAPASITAS & ANALITIK TIM',
    title: 'Lihat beban kerja sebelum menjadi hambatan proyek.',
    desc: 'Deteksi dini overcapacity dan seimbangkan alokasi tugas tim secara instan tanpa spreadsheet terpisah.',
    icon: <Users className="w-4 h-4" />,
    url: 'app.flovig.com/workload/analytics',
    Component: WorkloadHeatmap,
  },
  {
    id: 'collaboration',
    num: '03',
    navLabel: 'Chatting',
    badge: 'KOLABORASI DALAM KONTEKS',
    title: 'Percakapan tetap dekat dengan pekerjaan.',
    desc: 'Diskusi, mention anggota tim, tautan Google Meet, dan file lampiran menempel langsung pada kartu task.',
    icon: <MessageSquare className="w-4 h-4" />,
    url: 'app.flovig.com/task/FL-108/discussion',
    Component: CollaborationModal,
  },
  {
    id: 'client-portal',
    num: '04',
    navLabel: 'Portal Klien',
    badge: 'PORTAL KLIEN KHUSUS',
    title: 'Berikan klien visibilitas tanpa membuka seluruh workspace.',
    desc: 'Pemisahan data internal & publik otomatis, sign-off deliverable, dan proteksi margin tim.',
    icon: <ShieldCheck className="w-4 h-4" />,
    url: 'portal.flovig.com/website-revamp',
    Component: ClientPortalSplit,
  },
  {
    id: 'control',
    num: '05',
    navLabel: 'Kontrol & Audit',
    badge: 'KONTROL & AKUNTABILITAS',
    title: 'Kontrol penuh dengan audit trail dan role permission.',
    desc: 'Kelola batasan hak akses 4 tingkat dan pantau setiap aktivitas penting melalui log audit otomatis.',
    icon: <Lock className="w-4 h-4" />,
    url: 'app.flovig.com/settings/audit-logs',
    Component: ControlAuditPanel,
  },
]

export function StackedFeaturesSection() {
  const rootRef = useRef(null)
  const pinRef = useRef(null)
  const cardRefs = useRef([])
  const stRef = useRef(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const cards = cardRefs.current.filter(Boolean)
        const total = cards.length

        // Initialize stacked positions
        cards.forEach((card, i) => {
          if (i === 0) {
            gsap.set(card, {
              xPercent: 0,
              yPercent: 0,
              scale: 1,
              opacity: 1,
              zIndex: 30,
              rotateZ: 0,
              pointerEvents: 'auto',
            })
          } else {
            const offset = Math.min(i, 3)
            gsap.set(card, {
              xPercent: offset * 4.5,
              yPercent: offset * 2.5,
              scale: 1 - offset * 0.045,
              opacity: Math.max(0.2, 0.7 - offset * 0.18),
              zIndex: 30 - i,
              rotateZ: offset * 0.8,
              pointerEvents: 'none',
            })
          }
        })

        // Timeline for progressive sliding to the right
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: () => '+=' + window.innerHeight * 2.8,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate(self) {
              const p = self.progress
              const stepIndex = Math.min(total - 1, Math.floor(p * total * 0.99))
              if (stepIndex !== activeRef.current) {
                activeRef.current = stepIndex
                setActive(stepIndex)
              }
            },
          },
        })

        // Progressive card sliding transitions (each card slides to the right)
        for (let i = 0; i < total - 1; i++) {
          const label = `slide_${i}`
          tl.addLabel(label)

          // Current card slides out to the right
          tl.to(cards[i], {
            xPercent: 125,
            opacity: 0,
            scale: 0.92,
            rotateZ: 5,
            duration: 1,
            ease: 'power2.inOut',
            pointerEvents: 'none',
          }, label)

          // Next card moves to front center
          tl.to(cards[i + 1], {
            xPercent: 0,
            yPercent: 0,
            scale: 1,
            opacity: 1,
            zIndex: 30,
            rotateZ: 0,
            duration: 1,
            ease: 'power2.out',
            pointerEvents: 'auto',
          }, label)

          // Remaining cards in the stack step forward
          for (let j = i + 2; j < total; j++) {
            const offset = Math.min(j - (i + 1), 3)
            tl.to(cards[j], {
              xPercent: offset * 4.5,
              yPercent: offset * 2.5,
              scale: 1 - offset * 0.045,
              opacity: Math.max(0.2, 0.7 - offset * 0.18),
              zIndex: 30 - (j - (i + 1)),
              rotateZ: offset * 0.8,
              duration: 1,
              ease: 'power2.out',
            }, label)
          }

          // Brief pause/hold on the active card
          tl.to({}, { duration: 0.4 })
        }

        stRef.current = tl.scrollTrigger

        return () => {
          stRef.current = null
          activeRef.current = 0
          setActive(0)
        }
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  const goToCard = (index) => {
    setActive(index)
    activeRef.current = index
    const st = stRef.current
    if (!st) return
    const total = FEATURES.length
    const targetProgress = index / (total - 1)
    const targetY = st.start + (st.end - st.start) * targetProgress
    window.scrollTo({ top: targetY + 2, behavior: 'smooth' })
  }

  const prevCard = () => {
    if (active > 0) goToCard(active - 1)
  }

  const nextCard = () => {
    if (active < FEATURES.length - 1) goToCard(active + 1)
  }

  return (
    <section 
      ref={rootRef} 
      id="features" 
      className="sfc-section relative bg-white text-[#0F172A] selection:bg-[#315CF5] selection:text-white overflow-hidden"
    >
      <style>{CSS}</style>

      {/* Pinned Desktop Experience with generous top gap for fixed navbar */}
      <div ref={pinRef} className="sfc-pin relative flex flex-col items-center justify-between min-h-screen pt-24 sm:pt-28 pb-8 px-4 sm:px-6 lg:px-8 w-full max-w-[1480px] mx-auto">
        {/* Soft background ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-gradient-to-b from-[#315CF5]/6 to-[#06b6d4]/4 rounded-full blur-[110px] pointer-events-none" />

        {/* Section Header */}
        <div className="sfc-head relative z-20 text-center max-w-4xl mx-auto mb-3">
          {/* Main Colored Varied Heading */}
          <h2 className="sfc-main-heading">
            Satu platform untuk seluruh{' '}
            <span className="sfc-hl">
              kebutuhan tim Anda.
              <svg viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="sfc-ulGrad" x1="0" x2="1">
                    <stop offset="0" stopColor="#2563eb" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <path d="M3 8 C 80 2, 200 2, 297 7" />
              </svg>
            </span>
          </h2>

          {/* Simple Minimalist Tab Navigation (Matches Reference Image) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-5">
            {FEATURES.map((feat, i) => {
              const isActive = active === i
              return (
                <button
                  key={feat.id}
                  type="button"
                  onClick={() => goToCard(i)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#EBF1F7] text-[#0F172A] shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <span className={isActive ? 'text-[#0F172A]' : 'text-[#94A3B8]'}>
                    {feat.icon}
                  </span>
                  <span>{feat.navLabel}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 3D Stacked Cards Showcase Container - Widened mentok to max-w-[1360px] */}
        <div className="sfc-deck-container relative z-10 w-full max-w-[1360px] my-auto py-2 flex items-center justify-center">
          {/* Deck Floating Arrow Controls */}
          <button
            type="button"
            onClick={prevCard}
            disabled={active === 0}
            aria-label="Fitur sebelumnya"
            className="sfc-arrow-btn absolute -left-3 lg:-left-12 z-40 p-2.5 rounded-full bg-transparent text-[#0F172A] border border-transparent hover:bg-slate-50 hover:scale-105 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={nextCard}
            disabled={active === FEATURES.length - 1}
            aria-label="Fitur berikutnya"
            className="sfc-arrow-btn absolute -right-3 lg:-right-12 z-40 p-2.5 rounded-full bg-transparent text-[#0F172A] border border-transparent hover:bg-slate-50 hover:scale-105 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Stack - Taller and Widescreen Spacious */}
          <div className="sfc-deck relative w-full h-[580px] sm:h-[620px] lg:h-[660px]">
            {FEATURES.map((feat, i) => {
              const Comp = feat.Component
              return (
                <div
                  key={feat.id}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="sfc-card absolute inset-0 rounded-2xl sm:rounded-3xl border border-[#E2E8F0] bg-white text-[#101828] overflow-hidden flex flex-col"
                >
                  {/* Card Browser Chrome Bar */}
                  <div className="h-11 px-4 flex items-center justify-between border-b border-[#E2E8F0] bg-[#F8FAFC] shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      </div>
                      <span className="text-[11px] font-mono px-3 py-0.5 rounded-md border border-[#E2E8F0] bg-white text-[#64748B] ml-2">
                        {feat.url}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1.5 bg-blue-50 text-[#315CF5] border border-blue-200/50">
                        {feat.icon}
                        <span>{feat.badge}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Info Banner */}
                  <div className="px-5 py-3 border-b border-[#EBF0F7] bg-[#FAFCFF] shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold text-[#101828]">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-[#64748B] mt-0.5 line-clamp-1">
                        {feat.desc}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold shrink-0 px-2 py-1 rounded bg-slate-100 text-slate-700">
                      {feat.num} / 05
                    </span>
                  </div>

                  {/* Card Body with Live Interactive Component */}
                  <div className="sfc-card-body flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/40">
                    <Comp />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile Experience (<1024px) - Clean Focused Tab & Card Showcase */}
      <div className="sfc-mobile-list px-4 py-12 sm:py-16 lg:hidden bg-[#FAFBFD]">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h2 className="sfc-main-heading">
            Satu platform untuk seluruh{' '}
            <span className="sfc-hl">
              kebutuhan tim Anda.
              <svg viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="sfc-ulGrad-m" x1="0" x2="1">
                    <stop offset="0" stopColor="#2563eb" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <path d="M3 8 C 80 2, 200 2, 297 7" />
              </svg>
            </span>
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-[#64748B]">
            Task board, kapasitas beban kerja, diskusi tim, portal klien, dan audit kontrol—semua terintegrasi dalam satu layar.
          </p>
        </div>

        {/* Mobile Horizontal Pill Tabs */}
        <div className="sfc-mobile-tabs flex items-center gap-2 overflow-x-auto pb-3 mb-5 px-0.5">
          {FEATURES.map((feat, i) => {
            const isActive = active === i
            return (
              <button
                key={feat.id}
                type="button"
                onClick={() => setActive(i)}
                className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#0F172A] text-white shadow-sm'
                    : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-slate-50'
                }`}
              >
                <span className={isActive ? 'text-cyan-400' : 'text-[#94A3B8]'}>
                  {feat.icon}
                </span>
                <span>{feat.navLabel}</span>
              </button>
            )
          })}
        </div>

        {/* Single Active Card Display */}
        {(() => {
          const feat = FEATURES[active] || FEATURES[0]
          const Comp = feat.Component
          return (
            <div key={feat.id} className="sfc-mobile-card rounded-2xl border border-[#E2E8F0] bg-white text-[#101828] overflow-hidden shadow-lg shadow-slate-200/60">
              {/* Card Browser Bar */}
              <div className="h-10 px-3.5 flex items-center justify-between border-b border-[#E2E8F0] bg-[#F8FAFC]">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#E2E8F0] bg-white text-[#64748B] truncate max-w-[140px] sm:max-w-[200px]">
                    {feat.url}
                  </span>
                </div>
                <span className="text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 bg-blue-50 text-[#315CF5] border border-blue-200/50 shrink-0">
                  {feat.icon}
                  <span>{feat.badge}</span>
                </span>
              </div>

              {/* Card Info Header */}
              <div className="p-4 border-b border-[#EBF0F7] bg-[#FAFCFF]">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold text-[#315CF5] uppercase tracking-wider">
                    {feat.badge}
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {feat.num} / 05
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-[#101828]">
                  {feat.title}
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  {feat.desc}
                </p>
              </div>

              {/* Interactive Component Body */}
              <div className="sfc-mobile-body p-3 sm:p-4 overflow-x-auto bg-slate-50/40 min-h-[340px]">
                <Comp />
              </div>

              {/* Bottom Nav Controls (Prev / Next & Dots) */}
              <div className="p-3 bg-white border-t border-[#E2E8F0] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setActive((prev) => Math.max(0, prev - 1))}
                  disabled={active === 0}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Sebelumnya</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {FEATURES.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActive(i)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        active === i ? 'w-6 bg-[#315CF5]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Buka fitur ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActive((prev) => Math.min(FEATURES.length - 1, prev + 1))}
                  disabled={active === FEATURES.length - 1}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span className="hidden sm:inline">Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })()}
      </div>
    </section>
  )
}

export default StackedFeaturesSection

const CSS = `
.sfc-section {
  position: relative;
}
.sfc-main-heading {
  font-size: clamp(26px, 3.2vw, 42px);
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.035em;
  color: #0F172A;
  margin: 0;
}
.sfc-hl {
  position: relative;
  display: inline-block;
  padding-bottom: 4px;
  color: transparent;
  background: linear-gradient(90deg, #2563eb, #06b6d4);
  -webkit-background-clip: text;
  background-clip: text;
}
.sfc-hl svg {
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 12px;
  overflow: visible;
  display: block;
}
.sfc-hl path {
  fill: none;
  stroke: url(#sfc-ulGrad);
  stroke-width: 3.2;
  stroke-linecap: round;
}
.sfc-mobile-list .sfc-hl path {
  stroke: url(#sfc-ulGrad-m);
}

.sfc-deck {
  perspective: 1200px;
}
.sfc-card {
  will-change: transform, opacity;
  box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(15, 23, 42, 0.05);
}
.sfc-card-body::-webkit-scrollbar {
  width: 6px;
}
.sfc-card-body::-webkit-scrollbar-track {
  background: transparent;
}
.sfc-card-body::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.35);
  border-radius: 999px;
}

.sfc-mobile-tabs {
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}
.sfc-mobile-tabs::-webkit-scrollbar {
  display: none;
}

@keyframes sfcCardFade {
  from {
    opacity: 0.5;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.sfc-mobile-card {
  animation: sfcCardFade 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.sfc-mobile-body::-webkit-scrollbar {
  height: 5px;
}
.sfc-mobile-body::-webkit-scrollbar-track {
  background: transparent;
}
.sfc-mobile-body::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 999px;
}

@media (max-width: 1023px) {
  .sfc-pin {
    display: none !important;
  }
}
@media (min-width: 1024px) {
  .sfc-mobile-list {
    display: none !important;
  }
}
`
