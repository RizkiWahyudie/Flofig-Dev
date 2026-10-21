import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

/* =========================================================================
   Flovig — Section "Alur Kerja Terpadu" (Plan → Execute → Deliver)
   Desktop (≥1024px): Pinned stage, smooth scroll scrubbing (no snapping yank)
   Left: Static heading + 3 vertical dashed line indicators on the left,
         and ONLY the active step copy shown at a time with full points & details.
   Right: Minimalist browser frame with seamless transitions between phases.
   Mobile: Stacked steps without pinning.
   ========================================================================= */

const IMG_MILESTONE = '/asset/flovig-milestone-project.png'
const IMG_BOARD = '/asset/flovig-task-project.png'

/* ---------- Icons (Minimalist Monochrome) ---------- */
const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="af-check-svg">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const Lock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="af-svg-lock">
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
)

/* ---------- Full Content Preserved ---------- */
const STEPS = [
  {
    num: '01',
    phase: 'Plan',
    phaseId: 'Rencanakan',
    title: 'Roadmap, sprint & pembagian kapasitas',
    desc: 'Pecah proyek besar menjadi milestone terukur, susun sprint, dan lihat seluruh struktur pekerjaan dalam satu diagram.',
    points: [
      'Milestone & sprint dalam satu hierarki',
      'Progres tiap milestone terhitung otomatis',
      'Pekerjaan yang terblokir langsung terlihat',
    ],
    url: 'app.flovig.com/projects/management-flovig/milestones',
    image: IMG_MILESTONE,
    alt: 'Diagram hierarki milestone, sprint, dan task di Flovig',
    focus: 'center top',
    chips: [
      { text: '3 milestone · 1 berjalan', pos: 'tl', light: false },
      { text: 'Progres otomatis', pos: 'br', light: true },
    ],
  },
  {
    num: '02',
    phase: 'Execute',
    phaseId: 'Eksekusi',
    title: 'Kanban teratur & status yang transparan',
    desc: 'Gerakkan task di board atau list view. Label, prioritas, assignee, dan deadline terlihat dalam satu layar.',
    points: [
      'Board & list view untuk setiap project',
      'Label, prioritas, dan checklist per task',
      'Deadline yang lewat ditandai otomatis',
    ],
    url: 'app.flovig.com/projects/management-flovig/tasks',
    image: IMG_BOARD,
    alt: 'Kanban board task di Flovig dengan kolom To Do, In Progress, Review, dan Done',
    focus: 'left top',
    chips: [
      { text: 'To Do → Review → Done', pos: 'tl', light: false },
      { text: 'Deadline terpantau', pos: 'br', light: true },
    ],
  },
  {
    num: '03',
    phase: 'Deliver',
    phaseId: 'Kirim & Evaluasi',
    title: 'Sign-off klien & pelaporan tuntas',
    desc: 'Bagikan progres ke klien lewat portal tanpa membuka workspace internal, lalu tutup proyek dengan timesheet, invoice, dan report.',
    points: [
      'Client portal dengan akses terkontrol',
      'Timesheet & budget per project',
      'Invoice dan report siap dikirim',
    ],
    url: 'portal.flovig.com/website-revamp',
    image: null,
    chips: [{ text: 'Portal aman untuk klien', pos: 'br', light: false }],
  },
]

/* ---------- Deliver Mockup (Client Portal - Clean Monochrome) ---------- */
function DeliverMock() {
  return (
    <div className="af-mock">
      <div className="af-mock-top">
        <div>
          <span className="af-mock-eyebrow">PORTAL KLIEN</span>
          <b>Website Revamp</b>
        </div>
        <span className="af-mock-access"><Lock />Akses terbatas</span>
      </div>
      <div className="af-mock-grid">
        <div className="af-mock-card af-mock-progress">
          <div className="af-ringwrap">
            <svg viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" className="af-ring-bg" />
              <circle cx="32" cy="32" r="26" className="af-ring-fg" />
            </svg>
            <span>100%</span>
          </div>
          <div>
            <small>Progres project</small>
            <b>Siap diserahkan</b>
          </div>
        </div>
        <div className="af-mock-card af-mock-deliv">
          <small>Deliverables</small>
          {[
            ['Desain UI final', 'Disetujui', 'ok'],
            ['Halaman checkout', 'Disetujui', 'ok'],
            ['Dokumentasi teknis', 'Review selesai', 'ok'],
          ].map(([name, st, tone]) => (
            <div className="af-mock-row" key={name}>
              <span>{name}</span>
              <em className={`af-st af-st--${tone}`}>{st}</em>
            </div>
          ))}
        </div>
        <div className="af-mock-card">
          <small>Invoice</small>
          <b>INV-2026-014</b>
          <em className="af-st af-st--ok">Terkirim</em>
        </div>
        <div className="af-mock-card">
          <small>Timesheet</small>
          <b>128 jam</b>
          <div className="af-mini-bar"><i /></div>
        </div>
        <div className="af-mock-card">
          <small>Report</small>
          <b>Laporan akhir</b>
          <em className="af-st af-st--info">PDF siap</em>
        </div>
      </div>
    </div>
  )
}

/* ---------- Visual Frame ---------- */
function Shot({ step, className = '', eager = false }) {
  return (
    <div className={`af-shot ${className}`}>
      <div className="af-shot-inner">
        {step.image ? (
          <img
            src={step.image}
            alt={step.alt}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            style={{ objectPosition: step.focus }}
          />
        ) : (
          <DeliverMock />
        )}
      </div>
      {step.chips?.map((c) => (
        <span key={c.text} className={`af-chip ${c.light ? 'af-chip--light' : ''} af-chip--${c.pos}`}>
          <i />{c.text}
        </span>
      ))}
    </div>
  )
}

/* =========================================================================
   MAIN COMPONENT
   ========================================================================= */
export function WorkflowStorySection() {
  const rootRef = useRef(null)
  const pinRef = useRef(null)
  const barRefs = useRef([])
  const stRef = useRef(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        // Initial vertical lines fill setup
        barRefs.current.forEach((el, i) => {
          if (!el) return
          el.style.transform = i === 0 ? 'scaleY(1)' : 'scaleY(0)'
        })

        const st = ScrollTrigger.create({
          trigger: pinRef.current,
          start: 'top top',
          end: () => '+=' + window.innerHeight * 1.8,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const p = self.progress

            // Smoothly fill the 3 vertical dashed lines on the left
            barRefs.current.forEach((el, i) => {
              if (!el) return
              // eslint-disable-next-line no-useless-assignment
              let v = 0
              if (i === 0) {
                v = 1 // Step 01 is 100% full at all times (stays full throughout all stages)
              } else if (i === 1) {
                v = p <= 0.22 ? 0 : p >= 0.58 ? 1 : (p - 0.22) / 0.36
              } else {
                v = p <= 0.58 ? 0 : p >= 0.92 ? 1 : (p - 0.58) / 0.34
              }
              el.style.transform = `scaleY(${Math.min(Math.max(v, 0), 1)})`
            })

            const next = p < 0.33 ? 0 : p < 0.68 ? 1 : 2
            if (next !== activeRef.current) {
              activeRef.current = next
              setActive(next)
            }
          },
        })

        stRef.current = st

        return () => {
          stRef.current = null
          activeRef.current = 0
          setActive(0)
        }
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  const goTo = (i) => {
    const st = stRef.current
    if (!st) {
      setActive(i)
      return
    }
    const targetP = [0, 0.48, 0.98][i]
    const targetY = st.start + (st.end - st.start) * targetP
    window.scrollTo({ top: targetY + 2, behavior: 'smooth' })
  }

  return (
    <section className="af" id="cara-kerja" ref={rootRef}>
      <style>{CSS}</style>

      {/* ===== Desktop: Pinned stage ===== */}
      <div className="af-pin" ref={pinRef}>
        <div className="af-inner af-stage">
          {/* Left Column */}
          <div className="af-left">
            {/* Static Heading with ProblemSolution gradient & curve */}
            <div className="af-head-static">
              <h2 className="af-main-heading">
                Dari planning sampai delivery,<br />
                <span className="af-hl">
                  semua satu alur kerja.
                  <svg viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="af-ulGrad" x1="0" x2="1">
                        <stop offset="0" stopColor="#2563eb" /><stop offset="1" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <path d="M3 8 C 80 2, 200 2, 297 7" />
                  </svg>
                </span>
              </h2>
            </div>

            {/* Content Row: 3 Vertical Dashed Lines on the left, Active Copy on the right */}
            <div className="af-content-row">
              {/* 3 Garis Putus Vertikal */}
              <div className="af-nav-lines" aria-label="Navigasi tahapan alur kerja">
                {STEPS.map((s, i) => {
                  const isActive = active === i
                  const isDone = active > i
                  return (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => goTo(i)}
                      className={`af-line-btn ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}
                      aria-label={`Buka Fase ${s.num}: ${s.phase}`}
                    >
                      <span className="af-line-track">
                        <span
                          className="af-line-fill"
                          ref={(el) => (barRefs.current[i] = el)}
                        />
                      </span>
                      <span className="af-line-num">{s.num}</span>
                    </button>
                  )
                })}
              </div>

              {/* Copy Area: Synchronized with active state */}
              <div className="af-copy">
                {STEPS.map((s, i) => {
                  const isStepActive = active === i
                  return (
                    <div
                      className={`af-copy-item ${isStepActive ? 'is-active' : ''}`}
                      key={s.num}
                      aria-hidden={!isStepActive}
                    >
                      <div className="af-phase-badge">
                        {/* <span className="af-phase-dot" /> */}
                        Fase {s.num} · {s.phase} ({s.phaseId})
                      </div>
                      <h3 className="af-step-title">{s.title}</h3>
                      <p className="af-step-desc">{s.desc}</p>
                      <ul className="af-step-points">
                        {s.points.map((pt) => (
                          <li key={pt} className="af-point-item">
                            <span className="af-point-icon">
                              <Check />
                            </span>
                            <span className="af-point-text">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Browser Showcase Frame synchronized with active */}
          <div className="af-right">
            <div className="af-browser">
              <div className="af-browser-bar">
                <span className="af-dots"><i /><i /><i /></span>
                <span className="af-url">{STEPS[active]?.url || STEPS[0].url}</span>
              </div>
              <div className="af-screen">
                {STEPS.map((s, i) => (
                  <Shot
                    key={s.num}
                    step={s}
                    eager={i === 0}
                    className={active === i ? 'is-active' : ''}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Mobile / Reduced-Motion Fallback ===== */}
      <div className="af-inner af-mobile-list">
        <div className="af-head-static">
          <h2 className="af-main-heading">
            Dari planning sampai delivery,<br />
            <span className="af-hl">
              semua satu alur kerja.
              <svg viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="af-ulGrad-m" x1="0" x2="1">
                    <stop offset="0" stopColor="#2563eb" /><stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <path d="M3 8 C 80 2, 200 2, 297 7" />
              </svg>
            </span>
          </h2>
        </div>
        <div className="af-mobile-items">
          {STEPS.map((s) => (
            <article className="af-mobile-item" key={s.num}>
              <div className="af-mobile-copy">
                <div className="af-phase-badge">
                  <span className="af-phase-dot" />
                  Fase {s.num} · {s.phase} ({s.phaseId})
                </div>
                <h3 className="af-step-title">{s.title}</h3>
                <p className="af-step-desc">{s.desc}</p>
                <ul className="af-step-points">
                  {s.points.map((pt) => (
                    <li key={pt} className="af-point-item">
                      <span className="af-point-icon"><Check /></span>
                      <span className="af-point-text">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="af-browser">
                <div className="af-browser-bar">
                  <span className="af-dots"><i /><i /><i /></span>
                  <span className="af-url">{s.url}</span>
                </div>
                <div className="af-screen">
                  <Shot step={s} className="is-static" eager={true} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export const WorkflowStepsSection = WorkflowStorySection
export default WorkflowStorySection

/* =========================================================================
   STYLES (Minimalist Monochrome Black & Grey)
   ========================================================================= */
const CSS = `
.af {
  --af-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  position: relative;
  background: #ffffff;
  color: #0f172a;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.af *, .af *::before, .af *::after {
  box-sizing: border-box;
}
.af-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;
}

/* Pinned stage */
.af-pin {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.af-stage {
  display: grid;
  grid-template-columns: minmax(380px, 470px) 1fr;
  gap: 52px;
  align-items: center;
  width: 100%;
}

/* Left Column */
.af-left {
  display: flex;
  flex-direction: column;
}
.af-head-static {
  margin-bottom: 32px;
}
.af-main-heading {
  font-size: clamp(26px, 2.9vw, 36px);
  line-height: 1.18;
  font-weight: 800;
  letter-spacing: -0.035em;
  color: #0f172a;
  margin: 0;
}
.af-hl {
  position: relative;
  display: inline-block;
  padding-bottom: 4px;
  color: transparent;
  background: linear-gradient(90deg, #2563eb, #06b6d4);
  -webkit-background-clip: text;
  background-clip: text;
}
.af-hl svg {
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 12px;
  overflow: visible;
  display: block;
}
.af-hl path {
  fill: none;
  stroke: url(#af-ulGrad);
  stroke-width: 3.2;
  stroke-linecap: round;
}
.af-mobile-list .af-hl path {
  stroke: url(#af-ulGrad-m);
}

/* Content row: 3 vertical lines + Copy area */
.af-content-row {
  display: flex;
  align-items: flex-start;
  gap: 28px;
}

/* 3 Garis Putus Vertikal (Vertical Dashed Lines Indicator) */
.af-nav-lines {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0;
  padding-top: 6px;
}
.af-line-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  outline: none;
  transition: opacity 0.25s ease;
}
.af-line-btn:hover {
  opacity: 0.8;
}
.af-line-track {
  width: 4px;
  height: 52px;
  border-radius: 999px;
  background: #e2e8f0;
  overflow: hidden;
  position: relative;
  transition: background-color 0.3s;
}
.af-line-btn.is-active .af-line-track {
  background: #cbd5e1;
}
.af-line-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: #0f172a;
  transform-origin: top;
  transform: scaleY(0);
}
.af-line-num {
  font-family: var(--af-mono);
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  transition: color 0.3s;
}
.af-line-btn.is-active .af-line-num {
  color: #0f172a;
}
.af-line-btn.is-done .af-line-num {
  color: #475569;
}

/* Copy Area: Controlled via React active state with smooth CSS fade/slide */
.af-copy {
  position: relative;
  flex: 1;
  min-height: 290px;
}
.af-copy-item {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  opacity: 0;
  visibility: hidden;
  transform: translateY(16px);
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              visibility 0.35s;
  pointer-events: none;
}
.af-copy-item.is-active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  pointer-events: auto;
}

.af-phase-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px;
  border-radius: 999px;
  background: #f1f5f9;
  font-size: 11px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 12px;
  align-self: flex-start;
}
.af-phase-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #0f172a;
}

.af-step-title {
  font-size: clamp(22px, 2.3vw, 28px);
  line-height: 1.25;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #0f172a;
  margin: 0 0 10px;
}
.af-step-desc {
  font-size: 14.5px;
  line-height: 1.6;
  color: #475569;
  margin: 0;
  max-width: 440px;
}

.af-step-points {
  list-style: none;
  margin: 20px 0 0;
  padding: 0;
  display: grid;
  gap: 11px;
}
.af-point-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}
.af-point-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  color: #0f172a;
}
.af-check-svg {
  width: 12px;
  height: 12px;
}

/* Right Column: Browser Frame */
.af-right {
  position: relative;
  width: 100%;
}
.af-browser {
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 48px -14px rgba(15, 23, 42, 0.08);
  overflow: hidden;
}
.af-browser-bar {
  height: 42px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 16px;
  background: #fafafa;
  border-bottom: 1px solid #f1f5f9;
}
.af-dots {
  display: flex;
  gap: 6px;
}
.af-dots i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #cbd5e1;
}
.af-url {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 11px;
  font-family: var(--af-mono);
  color: #64748b;
  display: flex;
  align-items: center;
  max-width: 360px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.af-screen {
  position: relative;
  aspect-ratio: 16 / 10.5;
  background: #f8fafc;
  overflow: hidden;
}

/* Shots: Controlled via React active state with smooth CSS fade/scale */
.af-shot {
  position: absolute;
  inset: 0;
  opacity: 0;
  visibility: hidden;
  transform: scale(0.97);
  transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
              visibility 0.45s;
  pointer-events: none;
  will-change: transform, opacity;
}
.af-shot.is-active {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
  pointer-events: auto;
}
.af-shot-inner {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
.af-shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Annotation Chips (Clean Monochrome) */
.af-chip {
  position: absolute;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #0f172a;
  color: #ffffff;
  font-size: 11.5px;
  font-weight: 600;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.16);
  letter-spacing: -0.01em;
}
.af-chip i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ffffff;
}
.af-chip--light {
  background: #ffffff;
  color: #0f172a;
  border: 1px solid #e2e8f0;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}
.af-chip--light i {
  background: #0f172a;
}
.af-chip--tl {
  top: 18px;
  left: 18px;
}
.af-chip--br {
  right: 18px;
  bottom: 18px;
}

/* Deliver Mock (Client Portal - Clean Monochrome) */
.af-mock {
  position: absolute;
  inset: 0;
  padding: 22px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.af-mock-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
}
.af-mock-top b {
  display: block;
  font-size: 17px;
  font-weight: 800;
  color: #0f172a;
}
.af-mock-eyebrow {
  font-family: var(--af-mono);
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.af-mock-access {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 600;
  color: #475569;
  padding: 5px 10px;
  border-radius: 6px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}
.af-svg-lock {
  width: 13px;
  height: 13px;
}
.af-mock-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr;
  gap: 10px;
  min-height: 0;
}
.af-mock-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
}
.af-mock-card small {
  font-size: 10.5px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.af-mock-card b {
  font-size: 14.5px;
  font-weight: 800;
  color: #0f172a;
}
.af-mock-progress {
  grid-column: span 1;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  justify-content: flex-start;
}
.af-mock-deliv {
  grid-column: span 2;
  gap: 6px;
}
.af-ringwrap {
  position: relative;
  width: 48px;
  height: 48px;
  flex: none;
}
.af-ringwrap svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}
.af-ring-bg {
  fill: none;
  stroke: #e2e8f0;
  stroke-width: 6;
}
.af-ring-fg {
  fill: none;
  stroke: #0f172a;
  stroke-width: 6;
  stroke-linecap: round;
  stroke-dasharray: 164;
  stroke-dashoffset: 0;
}
.af-ringwrap span {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 11.5px;
  font-weight: 800;
  color: #0f172a;
}
.af-mock-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #1e293b;
  padding: 5px 0;
  border-top: 1px solid #e2e8f0;
}
.af-mock-row:first-of-type {
  border-top: 0;
}
.af-st {
  font-style: normal;
  font-size: 10.5px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 999px;
  white-space: nowrap;
}
.af-st--ok {
  color: #0f172a;
  background: #e2e8f0;
}
.af-st--wait {
  color: #64748b;
  background: #f1f5f9;
}
.af-st--info {
  color: #0f172a;
  background: #e2e8f0;
}
.af-mini-bar {
  height: 6px;
  border-radius: 3px;
  background: #e2e8f0;
  overflow: hidden;
}
.af-mini-bar i {
  display: block;
  height: 100%;
  width: 78%;
  border-radius: 3px;
  background: #0f172a;
}

/* Mobile & Fallback */
.af-mobile-list {
  display: none;
  padding-top: 50px;
  padding-bottom: 70px;
}
.af-mobile-items {
  display: grid;
  gap: 36px;
  margin-top: 24px;
}
.af-mobile-item {
  display: grid;
  gap: 16px;
}
.af-mobile-copy {
  display: flex;
  flex-direction: column;
}
.af-mobile-item .af-screen {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: #f8fafc;
  overflow: hidden;
}
.af-mobile-item .af-shot,
.af-shot.is-static {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 1 !important;
  visibility: visible !important;
  transform: none !important;
  pointer-events: auto !important;
}
.af-mobile-item .af-shot-inner {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.af-mobile-item .af-shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

@media (max-width: 1023px), (prefers-reduced-motion: reduce) {
  .af-pin {
    display: none !important;
  }
  .af-mobile-list {
    display: block !important;
  }
}

@media (max-width: 640px) {
  .af-inner {
    padding: 0 16px;
  }
  .af-mobile-list {
    padding-top: 40px;
    padding-bottom: 60px;
  }
  .af-chip {
    padding: 4px 8px;
    font-size: 10px;
    gap: 5px;
  }
  .af-chip--tl {
    top: 10px;
    left: 10px;
  }
  .af-chip--br {
    right: 10px;
    bottom: 10px;
  }
  .af-mock {
    padding: 10px 12px;
    gap: 8px;
  }
  .af-mock-top b {
    font-size: 13.5px;
  }
  .af-mock-grid {
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }
  .af-mock-card {
    padding: 7px 9px;
    border-radius: 8px;
  }
  .af-mock-card b {
    font-size: 12px;
  }
  .af-mock-card small {
    font-size: 8.5px;
  }
  .af-ringwrap {
    width: 34px;
    height: 34px;
  }
  .af-ringwrap span {
    font-size: 9.5px;
  }
  .af-mock-row {
    font-size: 10px;
    padding: 3px 0;
  }
  .af-st {
    font-size: 9px;
    padding: 2px 6px;
  }
  .af-mock-deliv {
    grid-column: span 2;
  }
}
`