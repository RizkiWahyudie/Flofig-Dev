import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap } from '../lib/gsap'

/* =========================================================================
   Flovig — Section "Transformasi Alur Kerja" (light)
   - Semua class diberi prefix `fx-` agar tidak bentrok dengan Tailwind
     (mis. `.grid`, `.ring`, `.hidden`).
   - Tidak butuh library animasi; semua CSS keyframes.
   - Font: Plus Jakarta Sans + JetBrains Mono (lihat catatan di bawah file).
   ========================================================================= */

/* ---------- Icons (inline SVG, stroke = currentColor) ---------- */
const Svg = ({ children, sw = 2, fill = 'none', ...p }) => (
  <svg viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...p}>
    {children}
  </svg>
)
const I = {
  board: <Svg><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 7v8M12 7v4M16 7v10" /></Svg>,
  flag: <Svg><path d="M4 22V3" /><path d="M4 4h13l-2.5 4.5L17 13H4" /></Svg>,
  bug: <Svg><rect x="7" y="6" width="10" height="14" rx="5" /><path d="M8 2l1.8 2M16 2l-1.8 2M12 20v-8M3 13h4M17 13h4M4 7l3 2M20 7l-3 2M4 19l3-2M20 19l-3-2" /></Svg>,
  chat: <Svg><path d="M21 11.5a8.4 8.4 0 0 1-12.6 7.3L3 21l2-5.2A8.4 8.4 0 1 1 21 11.5z" /></Svg>,
  users: <Svg><circle cx="9" cy="7" r="4" /><path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1M16 3.2a4 4 0 0 1 0 7.6M22 21v-1a6 6 0 0 0-4-5.6" /></Svg>,
  chart: <Svg><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 6-7" /></Svg>,
  file: <Svg><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6" /></Svg>,
  doc: <Svg><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></Svg>,
  calendar: <Svg><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></Svg>,
  video: <Svg><rect x="2" y="6" width="14" height="12" rx="2" /><path d="M16 10l6-4v12l-6-4" /></Svg>,
  sheet: <Svg><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18" /></Svg>,
  mail: <Svg><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Svg>,
  folder: <Svg><path d="M3 6a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></Svg>,
  notes: <Svg><path d="M4 4h16v16H4zM8 9h8M8 13h8M8 17h4" /></Svg>,
  check: <Svg sw={4}><path d="M5 12l5 5L20 7" /></Svg>,
  bolt: <Svg sw={2}><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></Svg>,
}

/* ---------- Data ---------- */
const BOARD_COLS = [
  { label: 'TO DO', color: 'var(--fx-amber)', filled: 2 },
  { label: 'PROGRESS', color: 'var(--fx-blue)', filled: 1 },
  { label: 'DONE', color: 'var(--fx-green-l)', filled: 2 },
]
const SPRINT_TASKS = [
  { text: 'Finalisasi wireframe', tag: 'UI' },
  { text: 'Integrasi halaman checkout', tag: 'DEV' },
  { text: 'QA & review client', tag: 'QA' },
]
const NODES = [
  { cls: 'n1', label: 'Chat', icon: I.chat },
  { cls: 'n2', label: 'Files', icon: I.file },
  { cls: 'n3', label: 'Kalender', icon: I.calendar },
  { cls: 'n4', label: 'Google Meet', icon: I.video },
]
const PATHS = [
  { d: 'M52 36 C 100 36, 100 83, 118 83' },
  { d: 'M52 130 C 100 130, 100 83, 118 83', rev: true },
  { d: 'M248 36 C 200 36, 200 83, 182 83', rev: true },
  { d: 'M248 130 C 200 130, 200 83, 182 83' },
]
const WORKLOAD = [
  { cls: 'w1', init: 'RA', name: 'Raka', bg: '#14b8a6' },
  { cls: 'w2', init: 'NS', name: 'Nisa', bg: '#6366f1' },
  { cls: 'w3', init: 'MK', name: 'Mika', bg: '#f59e0b', tag: { type: 'over', text: 'Overload' } },
  { cls: 'w4', init: 'AL', name: 'Alya', bg: '#ec4899', tag: { type: 'ok', text: '+2 task dialihkan' } },
]
const FRAGMENTS = [
  { cls: 'f1', icon: I.sheet, title: 'Spreadsheet progres', sub: 'Terakhir diupdate 9 hari lalu', warn: true },
  { cls: 'f2', icon: I.chat, title: 'Chat grup', sub: '238 pesan belum dibaca' },
  { cls: 'f3', icon: I.mail, title: 'Email klien', sub: '“Sudah sampai mana progresnya?”', warn: true },
  { cls: 'f4', icon: I.folder, title: 'Folder file', sub: 'final_v3_REVISI_fix.pdf' },
  { cls: 'f5', icon: I.notes, title: 'Catatan meeting', sub: 'Di laptop siapa ya?' },
  { cls: 'f6', icon: I.chart, title: 'Report manual', sub: 'Disusun ulang tiap Jumat', warn: true },
]
const BROKEN = [
  'M180 80 Q 330 160 430 60', 'M560 60 Q 700 140 830 100', 'M200 340 Q 320 260 440 380',
  'M580 380 Q 700 300 820 330', 'M150 120 L 170 300', 'M860 140 L 850 300',
]

/* ---------- Card shell ---------- */
function Card({ icon, title, desc, index, visible, children }) {
  return (
    <article
      className={`fx-card fx-reveal ${visible ? 'is-in' : ''}`}
      style={{ transitionDelay: `${(index % 3) * 90}ms` }}
    >
      <div className="fx-card-head">
        <span className="fx-ico">{icon}</span>
        <h3>{title}</h3>
      </div>
      <p>{desc}</p>
      <div className="fx-viz">{children}</div>
    </article>
  )
}

/* ---------- Visuals ---------- */
const BoardViz = () => (
  <div className="fx-board">
    {BOARD_COLS.map((c) => (
      <div className="fx-col" key={c.label}>
        <div className="fx-col-h"><b style={{ background: c.color }} />{c.label}</div>
        <div className="fx-slot fx-slot--empty" />
        {Array.from({ length: c.filled }).map((_, i) => (
          <div className="fx-slot" key={i}><div className="fx-sk" /><div className="fx-sk" /></div>
        ))}
      </div>
    ))}
    <div className="fx-mover">
      <div className="fx-sk" />
      <div className="fx-mover-row"><div className="fx-sk" /><span className="fx-av" /></div>
    </div>
    <span className="fx-done-tick">{I.check}</span>
  </div>
)

const SprintViz = () => (
  <div className="fx-mini fx-sprint">
    <div className="fx-sprint-top"><strong>Sprint 14</strong><span className="fx-chip">AKTIF</span></div>
    <div className="fx-bar"><i /></div>
    <div className="fx-bar-meta"><span>Website Revamp</span><span>Milestone: Launch</span></div>
    <div className="fx-tasks">
      {SPRINT_TASKS.map((t) => (
        <div className="fx-task" key={t.text}>
          <span className="fx-cb">{I.check}</span>
          {t.text}
          <span className="fx-flag">{t.tag}</span>
        </div>
      ))}
    </div>
  </div>
)

const TicketViz = () => (
  <div className="fx-tstack">
    <div className="fx-mini fx-ticket fx-ticket--b2"><div className="fx-t-id">BUG-139</div><div className="fx-t-title">&nbsp;</div></div>
    <div className="fx-mini fx-ticket fx-ticket--b1"><div className="fx-t-id">BUG-140</div><div className="fx-t-title">&nbsp;</div></div>
    <div className="fx-mini fx-ticket fx-ticket--front">
      <span className="fx-ring" />
      <div className="fx-t-id">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 22V3h14l-3 5 3 5H6v9z" /></svg>
        BUG-142 · Prioritas tinggi
      </div>
      <div className="fx-t-title">Checkout gagal di Safari</div>
      <div className="fx-t-foot">
        <span className="fx-assignee"><span className="fx-av" style={{ background: '#8b5cf6' }}>DS</span>Dimas</span>
        <span className="fx-status">
          <span className="fx-pill p1">Open</span>
          <span className="fx-pill p2">In Progress</span>
          <span className="fx-pill p3">Resolved</span>
        </span>
      </div>
    </div>
  </div>
)

const HubViz = () => (
  <div className="fx-hub-wrap">
    <svg className="fx-lines" viewBox="0 0 300 180" preserveAspectRatio="none">
      <defs>
        <linearGradient id="fx-flowGrad" x1="0" x2="1">
          <stop offset="0" stopColor="#2563eb" /><stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      {PATHS.map((p) => (
        <g key={p.d}>
          <path className="fx-base" d={p.d} />
          <path className={`fx-flow ${p.rev ? 'fx-flow--rev' : ''}`} d={p.d} />
        </g>
      ))}
    </svg>
    {NODES.map((n) => (
      <span key={n.cls} className={`fx-node ${n.cls}`} data-label={n.label}>{n.icon}</span>
    ))}
    <div className="fx-hub">
      <svg viewBox="0 0 32 32">
        <defs>
          <linearGradient id="fx-hubGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2563eb" /><stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <path d="M7 6h18a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H14l-5 5v-5H7a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z" fill="url(#fx-hubGrad)" />
        <circle cx="11" cy="13" r="1.8" fill="#fff" /><circle cx="16" cy="13" r="1.8" fill="#fff" /><circle cx="21" cy="13" r="1.8" fill="#fff" />
      </svg>
    </div>
    <span className="fx-status-pill"><i />SEMUA TERHUBUNG</span>
  </div>
)

const WorkloadViz = () => (
  <div className="fx-mini fx-wl">
    <div className="fx-wl-h"><span>WORKLOAD MINGGU INI</span><span>4 ANGGOTA</span></div>
    {WORKLOAD.map((w) => (
      <div className={`fx-wl-row ${w.cls}`} key={w.cls}>
        <span className="fx-av" style={{ background: w.bg }}>{w.init}</span>
        <span>{w.name}</span>
        <div className="fx-track"><i /></div>
        {w.tag && <span className={`fx-tag fx-tag--${w.tag.type}`}>{w.tag.text}</span>}
      </div>
    ))}
  </div>
)

const ReportViz = () => (
  <div className="fx-rep">
    <div className="fx-mini fx-chart">
      <div className="fx-chart-h"><strong>Task selesai</strong><em>▲ minggu ini</em></div>
      <svg viewBox="0 0 260 84" preserveAspectRatio="none">
        <defs>
          <linearGradient id="fx-lineGrad" x1="0" x2="1">
            <stop offset="0" stopColor="#2563eb" /><stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="fx-areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(37,99,235,.18)" /><stop offset="1" stopColor="rgba(6,182,212,0)" />
          </linearGradient>
        </defs>
        <path className="fx-gridl" d="M0 20H260M0 42H260M0 64H260" />
        <path className="fx-area" d="M4 68 L46 58 L88 62 L130 40 L172 46 L214 24 L256 12 L256 84 L4 84Z" />
        <path className="fx-line" d="M4 68 L46 58 L88 62 L130 40 L172 46 L214 24 L256 12" />
        <circle className="fx-dot" cx="256" cy="12" r="3.5" />
      </svg>
    </div>
    <div className="fx-gen">
      <span className="fx-gi">{I.doc}<span className="fx-chk">{I.check}</span></span>
      <div className="fx-txt"><b>Report mingguan disusun…</b><div className="fx-gbar"><i /></div></div>
    </div>
  </div>
)

const CARDS = [
  { icon: I.board, title: 'Project Board', desc: 'Pantau status setiap pekerjaan dalam board atau list. Progres terlihat tanpa perlu bertanya.', Viz: BoardViz },
  { icon: I.flag, title: 'Sprint & Milestone', desc: 'Rencanakan sprint, pecah jadi task, dan lihat target tim bergerak hari demi hari.', Viz: SprintViz },
  { icon: I.bug, title: 'Tickets & Bug', desc: 'Setiap issue tercatat, di-assign, dan dipantau sampai benar-benar selesai.', Viz: TicketViz },
  { icon: I.chat, title: 'Kolaborasi Terhubung', desc: 'Chat, kalender, file, dan Google Meet tetap menempel pada project yang dibahas.', Viz: HubViz },
  { icon: I.users, title: 'Beban Kerja Tim', desc: 'Lihat siapa yang kelebihan beban dan alihkan task sebelum deadline terlewat.', Viz: WorkloadViz },
  { icon: I.chart, title: 'Analytics & Report', desc: 'Progres lintas project dirangkum otomatis menjadi report yang siap dibagikan.', Viz: ReportViz },
]

/* ---------- Section ---------- */
export function ProblemSolutionSection() {
  const [tab, setTab] = useState('with')
  const [headIn, setHeadIn] = useState(() => typeof window !== 'undefined' && !('IntersectionObserver' in window))
  const [gridIn, setGridIn] = useState(() => typeof window !== 'undefined' && !('IntersectionObserver' in window))
  const headRef = useRef(null)
  const gridRef = useRef(null)
  const ctaBtnRef = useRef(null)
  const ctaShineRef = useRef(null)
  const ctaArrowRef = useRef(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return
        if (e.target === headRef.current) setHeadIn(true)
        if (e.target === gridRef.current) setGridIn(true)
        io.unobserve(e.target)
      }),
      { threshold: 0.15 }
    )
    if (headRef.current) io.observe(headRef.current)
    if (gridRef.current) io.observe(gridRef.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!ctaBtnRef.current) return
    const ctx = gsap.context(() => {
      if (ctaShineRef.current) {
        gsap.fromTo(
          ctaShineRef.current,
          { xPercent: -150 },
          { xPercent: 350, duration: 1.4, ease: 'power2.inOut', repeat: -1, repeatDelay: 1.8 }
        )
      }
      if (ctaArrowRef.current) {
        gsap.to(ctaArrowRef.current, {
          x: 5,
          duration: 0.65,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        })
      }
      gsap.to(ctaBtnRef.current, {
        scale: 1.03,
        boxShadow: '0 8px 24px rgba(37,99,235,0.45)',
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }, ctaBtnRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="fx" id="alur-kerja">
      <style>{CSS}</style>
      <div className="fx-inner">
        <header ref={headRef} className={`fx-head ${headIn ? 'is-in' : ''}`}>
          {/* <span className="fx-badge"><i />SOLUSI UNTUK TIM SOLID</span> */}
          <h2>
            Ketika pekerjaan tersebar,<br />
            <span className="fx-hl">
              visibilitas ikut hilang.
              <svg viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="fx-ulGrad" x1="0" x2="1">
                    <stop offset="0" stopColor="#2563eb" /><stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <path d="M3 8 C 80 2, 200 2, 297 7" />
              </svg>
            </span>
          </h2>
          {/* <p>Flovig membantu tim menyatukan pekerjaan, komunikasi, dan progres dalam satu alur yang lebih jelas tanpa kehilangan konteks.</p> */}

          <div className="fx-toggle" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'without'}
              className={tab === 'without' ? 'on on-without' : ''}
              onClick={() => setTab('without')}
            >
              Tanpa Flovig (Pekerjaan Tersebar)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'with'}
              className={tab === 'with' ? 'on on-with' : ''}
              onClick={() => setTab('with')}
            >
              Dengan Flovig (Satu Alur Terpadu)
            </button>
          </div>
        </header>

        <div ref={gridRef}>
          {tab === 'with' ? (
            <div className="fx-panel" key="with">
              <div className="fx-grid">
                {CARDS.map(({ Viz, ...c }, i) => (
                  <Card key={c.title} {...c} index={i} visible={gridIn}><Viz /></Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="fx-panel" key="without">
              <div className="fx-chaos">
                <svg className="fx-broken" viewBox="0 0 1000 440" preserveAspectRatio="none">
                  {BROKEN.map((d) => <path key={d} className="fx-bl" d={d} />)}
                </svg>
                {FRAGMENTS.map((f) => (
                  <div className={`fx-frag ${f.cls}`} key={f.cls}>
                    <span className="fx-fi">{f.icon}</span>
                    <div>{f.title}<small>{f.sub}</small></div>
                    {f.warn && <span className="fx-warn">!</span>}
                  </div>
                ))}
                <div className="fx-lost">
                  <div className="fx-q">?</div>
                  <b>Konteks tercecer di banyak tempat</b>
                  <span>Tim sibuk mencari, bukan mengerjakan.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={`fx-cta fx-reveal ${gridIn ? 'is-in' : ''}`} style={{ transitionDelay: '200ms' }}>
          <div>
            <b>Satukan semua kebutuhan tim tanpa fragmentasi alat</b>
            <span className="fx-cta-sub">Project, task, komunikasi, dan report dalam satu workspace.</span>
          </div>
          <a ref={ctaBtnRef} href="#cara-kerja" className="fx-cta-btn">
            <span ref={ctaShineRef} className="fx-cta-shine" />
            <span style={{ color: '#ffffff' }}>Pelajari Alur Kerja</span>
            <span ref={ctaArrowRef} className="fx-cta-arrow" style={{ display: 'inline-flex', alignItems: 'center', color: '#ffffff' }}>
              <ArrowRight size={16} strokeWidth={2.5} />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default ProblemSolutionSection

/* =========================================================================
   STYLES — scoped to .fx, prefix fx- everywhere
   ========================================================================= */
const CSS = `
.fx{
  --fx-bg:#ffffff; --fx-soft:#f6f8fb;
  --fx-line:rgba(15,23,42,.08); --fx-line-2:rgba(15,23,42,.12);
  --fx-text:#0f172a; --fx-dim:#475569; --fx-mute:#94a3b8;
  --fx-navy:#1e293b; --fx-blue:#2563eb; --fx-cyan:#06b6d4; --fx-teal-l:#2dd4bf;
  --fx-green:#16a34a; --fx-green-l:#22c55e; --fx-amber:#f59e0b; --fx-red:#ef4444;
  --fx-shadow:0 1px 2px rgba(15,23,42,.04),0 8px 24px rgba(15,23,42,.07);
  --fx-shadow-lg:0 2px 4px rgba(15,23,42,.04),0 18px 40px rgba(15,23,42,.12);
  --fx-ease:cubic-bezier(.22,1,.36,1);
  --fx-mono:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;
  position:relative;padding:96px 16px 80px;overflow:hidden;color:var(--fx-text);
  font-family:'Plus Jakarta Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;
  background:linear-gradient(180deg,#fff 0%,#f7f9fc 100%);
}
.fx *,.fx *::before,.fx *::after{box-sizing:border-box}
.fx svg{display:inline-block}
.fx::before{content:"";position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(620px 360px at 25% 40%,rgba(37,99,235,.07),transparent 70%),
             radial-gradient(520px 320px at 78% 60%,rgba(6,182,212,.07),transparent 70%)}
.fx-inner{position:relative;max-width:1080px;margin:0 auto}

/* header */
.fx-head{text-align:center;max-width:720px;margin:0 auto 48px}
.fx-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:999px;
  background:#fff;font-size:12px;font-weight:700;letter-spacing:.04em;color:var(--fx-navy)}
.fx-badge i{width:6px;height:6px;border-radius:50%;background:var(--fx-cyan);box-shadow:0 0 0 3px rgba(6,182,212,.18);animation:fx-pulse 2s infinite}
.fx-head h2{font-size:clamp(32px,5vw,50px);line-height:1.12;font-weight:800;letter-spacing:-.035em;margin:22px 0 18px;color:var(--fx-text)}
.fx-hl{position:relative;display:inline-block;padding-bottom:6px;color:transparent;
  background:linear-gradient(90deg,var(--fx-blue),var(--fx-cyan));-webkit-background-clip:text;background-clip:text}
.fx-hl svg{position:absolute;left:0;bottom:-4px;width:100%;height:12px;overflow:visible;display:block}
.fx-hl path{fill:none;stroke:url(#fx-ulGrad);stroke-width:3;stroke-linecap:round;stroke-dasharray:420;stroke-dashoffset:420;transition:stroke-dashoffset 1.2s .3s var(--fx-ease)}
.fx-head.is-in .fx-hl path{stroke-dashoffset:0}
.fx-head p{color:var(--fx-dim);font-size:16px;line-height:1.65;margin:0}

/* toggle */
.fx-toggle{display:inline-flex;gap:8px;padding:0;margin-top:28px;border:none;border-radius:9999px;background:transparent;flex-wrap:wrap;justify-content:center;box-shadow:none}
.fx-toggle button{font:inherit;font-size:13.5px;font-weight:700;color:var(--fx-dim);background:var(--fx-bg);border:0;padding:10px 24px;border-radius:9999px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .25s var(--fx-ease);box-shadow:0 1px 3px rgba(15,23,42,.06)}
.fx-toggle button:not(.on):hover{color:var(--fx-text);background:rgba(241,245,249,.9);transform:translateY(-1px)}
.fx-toggle button.on.on-with{background:linear-gradient(90deg,#315CF5 0%,#06b6d4 50%,#7EF0D0 100%);color:#fff;box-shadow:0 6px 20px rgba(49,92,245,.35);text-shadow:0 1px 2px rgba(15,23,42,.15)}
.fx-toggle button.on.on-without{background:linear-gradient(90deg,#ef4444 0%,#f97316 50%,#f59e0b 100%);color:#fff;box-shadow:0 6px 20px rgba(239,68,68,.38);text-shadow:0 1px 2px rgba(15,23,42,.15)}

.fx-panel{animation:fx-panelIn .5s var(--fx-ease)}
@keyframes fx-panelIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}

/* grid */
.fx-grid{display:grid;grid-template-columns:repeat(3,1fr);border:none;border-radius:0;background:var(--fx-line-2);gap:1px;box-shadow:none;position:relative}
.fx-card{background:#fff;border:none;border-radius:0;padding:26px 24px 0;display:flex;flex-direction:column;min-height:360px;position:relative;z-index:2;overflow:hidden;transition:background .3s var(--fx-ease)}
.fx-card::after{content:"";position:absolute;inset:auto 0 0 0;height:55%;background:linear-gradient(180deg,transparent,rgba(241,245,249,.7));pointer-events:none;z-index:0}
.fx-card>*{position:relative;z-index:1}
.fx-card:hover{background:#fcfdff;z-index:3}
.fx-card-head{display:flex;align-items:center;gap:10px}
.fx-ico{width:30px;height:30px;border-radius:8px;display:grid;place-items:center;flex:none;
  background:linear-gradient(135deg,rgba(37,99,235,.1),rgba(6,182,212,.1));border:1px solid rgba(37,99,235,.18);color:var(--fx-blue)}
.fx-ico svg{width:16px;height:16px}
.fx-card h3{font-family:var(--fx-mono);font-size:13px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--fx-text);margin:0}
.fx-card>p{color:var(--fx-dim);font-size:14px;line-height:1.6;margin:12px 0 0}
.fx-viz{flex:1;display:flex;align-items:center;justify-content:center;padding:22px 0 26px;min-height:200px}

/* atoms */
.fx-mini{background:#fff;border:1px solid var(--fx-line-2);border-radius:12px;box-shadow:var(--fx-shadow)}
.fx-sk{height:5px;border-radius:3px;background:rgba(15,23,42,.1)}
.fx-av{width:20px;height:20px;border-radius:50%;display:grid;place-items:center;font-size:8px;font-weight:800;color:#fff;flex:none}

/* 1 board */
.fx-board{position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%;max-width:300px}
.fx-col{background:var(--fx-soft);border:1px solid var(--fx-line);border-radius:10px;padding:8px;min-height:140px}
.fx-col-h{display:flex;align-items:center;gap:5px;font-family:var(--fx-mono);font-size:9px;color:var(--fx-dim);height:14px}
.fx-col-h b{width:6px;height:6px;border-radius:50%}
.fx-slot{height:30px;border-radius:7px;margin-top:6px;background:#fff;border:1px solid var(--fx-line);padding:7px 6px}
.fx-slot .fx-sk{width:70%}.fx-slot .fx-sk+.fx-sk{width:40%;margin-top:5px;opacity:.6}
.fx-slot--empty{border:1px dashed rgba(15,23,42,.14);background:none}
.fx-mover{position:absolute;top:30px;left:8px;width:calc((100% - 16px)/3 - 16px);height:38px;border-radius:7px;padding:7px 6px;
  background:#fff;border:1.5px solid var(--fx-amber);box-shadow:var(--fx-shadow-lg);animation:fx-boardMove 7s var(--fx-ease) infinite}
.fx-mover>.fx-sk{width:78%;background:rgba(15,23,42,.35)}
.fx-mover-row{display:flex;align-items:center;justify-content:space-between;margin-top:6px}
.fx-mover-row .fx-sk{width:40%;background:rgba(15,23,42,.14)}
.fx-mover .fx-av{width:12px;height:12px;background:var(--fx-teal-l)}
@keyframes fx-boardMove{
  0%,8%{left:8px;transform:none;border-color:var(--fx-amber);opacity:1}
  16%{transform:translateY(-6px) rotate(-4deg) scale(1.05)}
  26%,42%{left:calc((100% - 16px)/3 + 16px);transform:none;border-color:var(--fx-blue)}
  50%{transform:translateY(-6px) rotate(3deg) scale(1.05)}
  60%,86%{left:calc((100% - 16px)/3*2 + 24px);transform:none;border-color:var(--fx-green-l);opacity:1}
  93%{opacity:0;left:calc((100% - 16px)/3*2 + 24px)}
  94%{opacity:0;left:8px}
  100%{opacity:1;left:8px}
}
.fx-done-tick{position:absolute;right:14px;top:36px;width:16px;height:16px;border-radius:50%;background:var(--fx-green-l);display:grid;place-items:center;color:#fff;opacity:0;box-shadow:0 0 0 3px rgba(34,197,94,.2);animation:fx-tickPop 7s var(--fx-ease) infinite}
.fx-done-tick svg{width:10px;height:10px}
@keyframes fx-tickPop{0%,62%{opacity:0;transform:scale(.4)}68%,86%{opacity:1;transform:scale(1)}92%,100%{opacity:0}}

/* 2 sprint */
.fx-sprint{width:100%;max-width:280px;padding:16px}
.fx-sprint-top{display:flex;justify-content:space-between;align-items:center}
.fx-sprint-top strong{font-size:13px}
.fx-chip{font-family:var(--fx-mono);font-size:9px;font-weight:600;padding:3px 7px;border-radius:999px;background:rgba(37,99,235,.08);color:var(--fx-blue);border:1px solid rgba(37,99,235,.2)}
.fx-bar{height:6px;border-radius:3px;background:#e2e8f0;margin:12px 0 4px;overflow:hidden}
.fx-bar i{display:block;height:100%;border-radius:3px;background:linear-gradient(90deg,var(--fx-blue),var(--fx-cyan));animation:fx-sprintFill 6s var(--fx-ease) infinite}
@keyframes fx-sprintFill{0%{width:18%}20%{width:38%}45%{width:58%}70%,92%{width:84%}100%{width:18%}}
.fx-bar-meta{display:flex;justify-content:space-between;font-family:var(--fx-mono);font-size:9px;color:var(--fx-mute)}
.fx-tasks{margin-top:12px;display:grid;gap:7px}
.fx-task{display:flex;align-items:center;gap:9px;padding:7px 9px;border-radius:8px;background:var(--fx-soft);border:1px solid var(--fx-line);font-size:11px;color:var(--fx-dim);font-weight:500}
.fx-cb{width:14px;height:14px;border-radius:4px;border:1.5px solid #cbd5e1;background:#fff;display:grid;place-items:center;flex:none;color:#fff}
.fx-cb svg{width:9px;height:9px;opacity:0}
.fx-task:nth-child(1) .fx-cb{animation:fx-cb1 6s infinite}.fx-task:nth-child(1) .fx-cb svg{animation:fx-cbs1 6s infinite}
.fx-task:nth-child(2) .fx-cb{animation:fx-cb2 6s infinite}.fx-task:nth-child(2) .fx-cb svg{animation:fx-cbs2 6s infinite}
.fx-task:nth-child(3) .fx-cb{animation:fx-cb3 6s infinite}.fx-task:nth-child(3) .fx-cb svg{animation:fx-cbs3 6s infinite}
@keyframes fx-cb1{0%,14%{background:#fff;border-color:#cbd5e1}20%,94%{background:var(--fx-green-l);border-color:var(--fx-green-l)}100%{background:#fff}}
@keyframes fx-cbs1{0%,14%{opacity:0}20%,94%{opacity:1}100%{opacity:0}}
@keyframes fx-cb2{0%,39%{background:#fff;border-color:#cbd5e1}45%,94%{background:var(--fx-green-l);border-color:var(--fx-green-l)}100%{background:#fff}}
@keyframes fx-cbs2{0%,39%{opacity:0}45%,94%{opacity:1}100%{opacity:0}}
@keyframes fx-cb3{0%,64%{background:#fff;border-color:#cbd5e1}70%,94%{background:var(--fx-green-l);border-color:var(--fx-green-l)}100%{background:#fff}}
@keyframes fx-cbs3{0%,64%{opacity:0}70%,94%{opacity:1}100%{opacity:0}}
.fx-flag{margin-left:auto;font-family:var(--fx-mono);font-size:8px;color:var(--fx-mute)}

/* 3 tickets */
.fx-tstack{position:relative;width:100%;max-width:270px;height:150px}
.fx-ticket{position:absolute;left:0;right:0;padding:12px 14px}
.fx-ticket--b2{top:0;transform:scale(.86);opacity:.45;box-shadow:none}
.fx-ticket--b1{top:14px;transform:scale(.93);opacity:.75;box-shadow:none}
.fx-ticket--front{top:34px;box-shadow:var(--fx-shadow-lg);animation:fx-floaty 5s ease-in-out infinite}
.fx-t-id{font-family:var(--fx-mono);font-size:10px;color:var(--fx-mute);display:flex;align-items:center;gap:6px}
.fx-t-id svg{width:11px;height:11px;color:var(--fx-red)}
.fx-t-title{font-size:13px;font-weight:700;margin:6px 0 10px;color:var(--fx-text)}
.fx-t-foot{display:flex;align-items:center;justify-content:space-between}
.fx-assignee{display:flex;align-items:center;gap:6px;font-size:10px;color:var(--fx-dim);font-weight:600}
.fx-status{position:relative;width:96px;height:20px}
.fx-pill{position:absolute;inset:0;border-radius:999px;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;gap:5px;opacity:0;animation:fx-pillCycle 9s infinite}
.fx-pill::before{content:"";width:5px;height:5px;border-radius:50%;background:currentColor}
.fx-pill.p1{color:#dc2626;background:#fef2f2;border:1px solid #fecaca}
.fx-pill.p2{color:#b45309;background:#fffbeb;border:1px solid #fde68a;animation-delay:3s}
.fx-pill.p3{color:#15803d;background:#f0fdf4;border:1px solid #bbf7d0;animation-delay:6s}
@keyframes fx-pillCycle{0%{opacity:0;transform:translateY(6px)}5%,30%{opacity:1;transform:none}35%,100%{opacity:0;transform:translateY(-6px)}}
.fx-ring{position:absolute;inset:-1px;border-radius:12px;border:1.5px solid var(--fx-green-l);opacity:0;pointer-events:none;animation:fx-ringFlash 9s infinite}
@keyframes fx-ringFlash{0%,68%{opacity:0}72%{opacity:1;box-shadow:0 0 0 4px rgba(34,197,94,.15)}96%,100%{opacity:0}}
@keyframes fx-floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}

/* 4 hub */
.fx-hub-wrap{position:relative;width:100%;max-width:300px;aspect-ratio:300/180}
.fx-lines{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.fx-base{stroke:rgba(15,23,42,.1);stroke-width:1.5;fill:none}
.fx-flow{stroke:url(#fx-flowGrad);stroke-width:2;fill:none;stroke-dasharray:5 11;animation:fx-dash 1.6s linear infinite}
.fx-flow--rev{animation-direction:reverse}
@keyframes fx-dash{to{stroke-dashoffset:-32}}
.fx-node{position:absolute;width:38px;height:38px;margin:-19px 0 0 -19px;border-radius:50%;background:#fff;border:1px solid var(--fx-line-2);display:grid;place-items:center;color:var(--fx-navy);box-shadow:var(--fx-shadow)}
.fx-node svg{width:16px;height:16px}
.fx-node::after{content:attr(data-label);position:absolute;top:44px;white-space:nowrap;font-family:var(--fx-mono);font-size:8.5px;color:var(--fx-dim)}
.fx-node.n1{left:11%;top:20%;animation:fx-nodeGlow 4s infinite}
.fx-node.n2{left:11%;top:72%;animation:fx-nodeGlow 4s 1s infinite}
.fx-node.n3{left:89%;top:20%;animation:fx-nodeGlow 4s 2s infinite}
.fx-node.n4{left:89%;top:72%;animation:fx-nodeGlow 4s 3s infinite}
@keyframes fx-nodeGlow{0%,80%,100%{border-color:var(--fx-line-2);color:var(--fx-navy);box-shadow:var(--fx-shadow)}10%,30%{border-color:var(--fx-cyan);color:var(--fx-blue);box-shadow:0 0 0 4px rgba(6,182,212,.14),var(--fx-shadow)}}
.fx-hub{position:absolute;left:50%;top:46%;width:64px;height:64px;margin:-32px 0 0 -32px;border-radius:16px;display:grid;place-items:center;
  background:#fff;border:1px solid rgba(37,99,235,.3);box-shadow:0 0 0 6px rgba(37,99,235,.06),0 14px 32px rgba(37,99,235,.2)}
.fx-hub::before,.fx-hub::after{content:"";position:absolute;inset:-8px;border-radius:20px;border:1px solid rgba(6,182,212,.45);animation:fx-hubRing 3s ease-out infinite}
.fx-hub::after{animation-delay:1.5s}
@keyframes fx-hubRing{0%{opacity:.9;transform:scale(.9)}100%{opacity:0;transform:scale(1.35)}}
.fx-hub svg{width:30px;height:30px}
.fx-status-pill{position:absolute;left:50%;bottom:-6px;transform:translateX(-50%);display:flex;align-items:center;gap:7px;padding:6px 12px;border-radius:999px;
  background:#fff;border:1px solid var(--fx-line-2);box-shadow:var(--fx-shadow);font-family:var(--fx-mono);font-size:10px;font-weight:600;letter-spacing:.06em;white-space:nowrap;color:var(--fx-navy)}
.fx-status-pill i{width:6px;height:6px;border-radius:50%;background:var(--fx-green-l);box-shadow:0 0 0 3px rgba(34,197,94,.2);animation:fx-pulse 1.6s infinite}

/* 5 workload */
.fx-wl{width:100%;max-width:280px;padding:14px 14px 10px}
.fx-wl-h{display:flex;justify-content:space-between;font-family:var(--fx-mono);font-size:9px;color:var(--fx-mute);margin-bottom:10px}
.fx-wl-row{display:grid;grid-template-columns:20px 44px 1fr;align-items:center;gap:8px;padding:6px 0;position:relative}
.fx-wl-row>span:nth-child(2){font-size:10.5px;color:var(--fx-dim);font-weight:500}
.fx-track{height:7px;border-radius:4px;background:#e2e8f0;overflow:hidden}
.fx-track i{display:block;height:100%;border-radius:4px;background:linear-gradient(90deg,var(--fx-blue),var(--fx-cyan))}
.fx-wl-row.w1 i{animation:fx-w1 8s var(--fx-ease) infinite}
.fx-wl-row.w2 i{animation:fx-w2 8s var(--fx-ease) infinite}
.fx-wl-row.w3 i{animation:fx-w3 8s var(--fx-ease) infinite}
.fx-wl-row.w4 i{animation:fx-w4 8s var(--fx-ease) infinite}
@keyframes fx-w1{0%,100%{width:58%}50%{width:62%}}
@keyframes fx-w2{0%,100%{width:44%}50%{width:48%}}
@keyframes fx-w3{0%{width:66%}22%,48%{width:100%;background:linear-gradient(90deg,var(--fx-amber),var(--fx-red))}62%,100%{width:64%;background:linear-gradient(90deg,var(--fx-blue),var(--fx-cyan))}}
@keyframes fx-w4{0%,48%{width:26%}62%,100%{width:60%}}
.fx-tag{position:absolute;right:0;top:-6px;font-size:8.5px;font-weight:700;padding:2px 6px;border-radius:5px;opacity:0}
.fx-tag--over{color:#dc2626;background:#fef2f2;border:1px solid #fecaca;animation:fx-tagOver 8s infinite}
.fx-tag--ok{color:#15803d;background:#f0fdf4;border:1px solid #bbf7d0;animation:fx-tagOk 8s infinite}
@keyframes fx-tagOver{0%,20%{opacity:0;transform:translateY(3px)}25%,48%{opacity:1;transform:none}54%,100%{opacity:0}}
@keyframes fx-tagOk{0%,56%{opacity:0;transform:translateY(3px)}62%,92%{opacity:1;transform:none}98%,100%{opacity:0}}

/* 6 report */
.fx-rep{position:relative;width:100%;max-width:290px}
.fx-chart{padding:14px 14px 8px}
.fx-chart-h{display:flex;justify-content:space-between;align-items:baseline}
.fx-chart-h strong{font-size:12px}
.fx-chart-h em{font-style:normal;font-family:var(--fx-mono);font-size:10px;color:var(--fx-green)}
.fx-chart svg{width:100%;height:84px;margin-top:8px;display:block}
.fx-gridl{stroke:rgba(15,23,42,.06)}
.fx-line{fill:none;stroke:url(#fx-lineGrad);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:320;stroke-dashoffset:320;animation:fx-draw 7s var(--fx-ease) infinite}
.fx-area{fill:url(#fx-areaGrad);opacity:0;animation:fx-areaIn 7s infinite}
.fx-dot{fill:#fff;stroke:var(--fx-cyan);stroke-width:2.5;opacity:0;animation:fx-dotIn 7s infinite}
@keyframes fx-draw{0%{stroke-dashoffset:320}35%,90%{stroke-dashoffset:0}100%{stroke-dashoffset:0;opacity:0}}
@keyframes fx-areaIn{0%,25%{opacity:0}40%,90%{opacity:1}100%{opacity:0}}
@keyframes fx-dotIn{0%,34%{opacity:0}38%,90%{opacity:1}100%{opacity:0}}
.fx-gen{margin:-8px 10px 0;position:relative;display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;background:#fff;border:1px solid var(--fx-line-2);box-shadow:var(--fx-shadow-lg)}
.fx-gi{width:26px;height:26px;border-radius:7px;display:grid;place-items:center;background:rgba(37,99,235,.1);color:var(--fx-blue);flex:none;position:relative}
.fx-gi svg{width:14px;height:14px}
.fx-chk{position:absolute;inset:0;border-radius:7px;background:var(--fx-green-l);color:#fff;display:grid;place-items:center;opacity:0;animation:fx-genDone 7s infinite}
.fx-txt{flex:1;min-width:0}
.fx-txt b{font-size:11px;display:block}
.fx-gbar{height:4px;border-radius:2px;background:#e2e8f0;margin-top:6px;overflow:hidden}
.fx-gbar i{display:block;height:100%;background:var(--fx-green-l);animation:fx-genBar 7s var(--fx-ease) infinite}
@keyframes fx-genBar{0%,30%{width:0}75%,92%{width:100%}100%{width:0}}
@keyframes fx-genDone{0%,74%{opacity:0;transform:scale(.6)}78%,92%{opacity:1;transform:none}100%{opacity:0}}

/* without panel */
.fx-chaos{position:relative;height:440px;border:none;border-radius:0;overflow:hidden;background:
  repeating-linear-gradient(0deg,transparent 0 39px,rgba(15,23,42,.035) 39px 40px),
  repeating-linear-gradient(90deg,transparent 0 39px,rgba(15,23,42,.035) 39px 40px),transparent}
.fx-broken{position:absolute;inset:0;width:100%;height:100%}
.fx-bl{stroke:rgba(239,68,68,.45);stroke-width:1.3;stroke-dasharray:4 8;fill:none;animation:fx-flicker 3s infinite}
@keyframes fx-flicker{0%,100%{opacity:.85}50%{opacity:.25}}
.fx-frag{position:absolute;display:flex;align-items:center;gap:9px;padding:10px 13px;border-radius:0;background:#fff;border:1px solid var(--fx-line-2);font-size:12px;font-weight:700;color:var(--fx-navy);box-shadow:var(--fx-shadow-lg);z-index:2}
.fx-fi{width:24px;height:24px;border-radius:0;display:grid;place-items:center;background:#f1f5f9;color:var(--fx-dim);flex:none}
.fx-fi svg{width:13px;height:13px}
.fx-frag small{display:block;font-size:9.5px;font-weight:500;color:var(--fx-mute);margin-top:2px}
.fx-warn{position:absolute;top:-7px;right:-7px;width:16px;height:16px;border-radius:50%;background:var(--fx-red);color:#fff;font-size:10px;font-weight:800;display:grid;place-items:center;box-shadow:0 0 0 3px #fff;animation:fx-pulse 2s infinite}
.fx-frag.f1{left:6%;top:12%;animation:fx-drift1 9s ease-in-out infinite}
.fx-frag.f2{left:40%;top:6%;animation:fx-drift2 11s ease-in-out infinite}
.fx-frag.f3{right:6%;top:16%;animation:fx-drift3 10s ease-in-out infinite}
.fx-frag.f4{left:9%;bottom:14%;animation:fx-drift2 12s ease-in-out infinite}
.fx-frag.f5{left:42%;bottom:8%;animation:fx-drift1 10s ease-in-out infinite}
.fx-frag.f6{right:8%;bottom:18%;animation:fx-drift3 9s ease-in-out infinite}
@keyframes fx-drift1{0%,100%{transform:translate(0,0) rotate(-2deg)}50%{transform:translate(10px,-8px) rotate(1deg)}}
@keyframes fx-drift2{0%,100%{transform:translate(0,0) rotate(1.5deg)}50%{transform:translate(-12px,6px) rotate(-1deg)}}
@keyframes fx-drift3{0%,100%{transform:translate(0,0) rotate(2deg)}50%{transform:translate(-6px,-10px) rotate(-2deg)}}
.fx-lost{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);text-align:center;padding:18px 22px;border-radius:0;background:rgba(255,255,255,.95);border:1px solid #fecaca;box-shadow:var(--fx-shadow-lg);backdrop-filter:blur(6px);z-index:3}
.fx-q{width:36px;height:36px;margin:0 auto 10px;border-radius:50%;display:grid;place-items:center;background:#fef2f2;color:var(--fx-red);font-weight:800;font-size:18px;animation:fx-wobble 2.4s ease-in-out infinite}
@keyframes fx-wobble{0%,100%{transform:rotate(0)}25%{transform:rotate(-10deg)}75%{transform:rotate(10deg)}}
.fx-lost b{display:block;font-size:14px}
.fx-lost span{font-size:12px;color:var(--fx-dim)}

/* bottom CTA */
.fx-cta{margin:40px auto 0;max-width:820px;display:flex;align-items:center;gap:16px;padding:22px 28px;border-radius:14px;border:none;
  background:linear-gradient(90deg,#eff5ff,#ecfeff);box-shadow:var(--fx-shadow)}
.fx-cta b{font-size:14.5px;display:block;color:var(--fx-text)}
.fx-cta .fx-cta-sub{font-size:12.5px;color:var(--fx-dim)}
.fx-cta-btn{position:relative;margin-left:auto;flex:none;font-size:13px;font-weight:700;color:#fff!important;text-decoration:none;padding:12px 24px;border-radius:9999px;
  background:linear-gradient(90deg,#2563eb 0%,#315CF5 50%,#06b6d4 100%);box-shadow:0 6px 18px rgba(37,99,235,.28);display:inline-flex;align-items:center;gap:8px;overflow:hidden;cursor:pointer;transition:transform .2s var(--fx-ease),box-shadow .2s}
.fx-cta-btn span{color:#fff!important}
.fx-cta-btn:hover{box-shadow:0 10px 28px rgba(37,99,235,.45)}
.fx-cta-shine{position:absolute;top:0;left:0;width:50%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent);transform:skewX(-20deg);pointer-events:none}
.fx-cta-arrow{display:inline-flex;align-items:center;color:#fff!important}

@keyframes fx-pulse{0%,100%{opacity:1}50%{opacity:.45}}

/* reveal */
.fx-reveal{opacity:0;transform:translateY(18px);transition:opacity .7s var(--fx-ease),transform .7s var(--fx-ease)}
.fx-reveal.is-in{opacity:1;transform:none}

/* responsive */
@media (max-width:960px){.fx-grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:640px){
  .fx{padding:72px 16px 56px}
  .fx-grid{grid-template-columns:1fr}
  .fx-card{min-height:0}
  .fx-chaos{height:520px}
  .fx-frag.f1{left:4%;top:4%}.fx-frag.f2{left:auto;right:4%;top:20%}.fx-frag.f3{left:4%;right:auto;top:36%}
  .fx-frag.f4{left:auto;right:4%;bottom:30%}.fx-frag.f5{left:4%;bottom:14%}.fx-frag.f6{right:4%;bottom:2%}
  .fx-cta{flex-wrap:wrap}.fx-cta-btn{margin-left:0;width:100%;justify-content:center}
}
@media (prefers-reduced-motion:reduce){
  .fx *,.fx *::before,.fx *::after{animation-duration:0s!important;animation-iteration-count:1!important;transition:none!important}
  .fx-line,.fx-hl path{stroke-dashoffset:0}.fx-area,.fx-dot{opacity:1}
  .fx-pill.p2,.fx-pill.p3{display:none}.fx-pill.p1{opacity:1}
  .fx-reveal{opacity:1;transform:none}
}
`