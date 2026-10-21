import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '../components/layout/Container'
import { ArrowRight, Play, Check } from 'lucide-react'

// Aman walau sudah diregister di ../lib/gsap (register dua kali tidak masalah)
gsap.registerPlugin(ScrollTrigger)

/* =========================================================================
   Flovig — Final CTA
   - Trust line memakai fakta dari tabel harga (bukan klaim PRD §0.3).
   - Tidak menampilkan mockup mobile (PRD: Mobile App = roadmap).
   CATATAN GSAP:
   - Semua animasi masuk memakai fromTo() dengan nilai akhir eksplisit.
     .from() membaca nilai akhir dari style saat itu; di React StrictMode
     (efek jalan 2x) nilai itu bisa tertangkap 0 → elemen tidak pernah muncul.
   - Jangan beri `transition-all` / transisi opacity pada elemen yang dianimasikan GSAP.
   ========================================================================= */

const SCREENSHOT = '/asset/flovig-task-project.png'
const LOGO_SRC = '/flovig_logo.webp'

const HEADLINE_TOP = ['Siap', 'membuat', 'pekerjaan', 'tim']
const HEADLINE_BOTTOM = ['lebih', 'terarah?']

const TRUST = ['Gratis hingga 8 pengguna', 'Semua fitur di setiap paket', 'Bayar per pengguna, bukan per project']

const scrollTo = (sel) => {
  const el = document.querySelector(sel)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function LogoMark() {
  if (LOGO_SRC) return <img src={LOGO_SRC} alt="Flovig" className="h-11 w-11 sm:h-12 sm:w-12 object-contain" />
  return (
    <svg viewBox="0 0 32 32" className="h-11 w-11 sm:h-12 sm:w-12" aria-label="Flovig">
      <defs>
        <linearGradient id="cta-logo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#315CF5" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <path d="M7 6h18a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H14l-5 5v-5H7a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z" fill="url(#cta-logo)" />
      <circle cx="11" cy="13" r="1.8" fill="#fff" />
      <circle cx="16" cy="13" r="1.8" fill="#fff" />
      <circle cx="21" cy="13" r="1.8" fill="#fff" />
    </svg>
  )
}

/* Kata headline dibungkus mask; spasi antar kata memakai margin, bukan karakter spasi
   (spasi biasa di akhir inline-block akan hilang → kata menempel). */
function Words({ words }) {
  return (
    <span className="block">
      {words.map((w, i) => (
        <span
          key={w}
          className={`inline-block overflow-hidden pb-[0.08em] align-bottom ${i < words.length - 1 ? 'mr-[0.25em]' : ''}`}
        >
          <span className="cta-word inline-block">{w}</span>
        </span>
      ))}
    </span>
  )
}

export function FinalCTASection() {
  const root = useRef(null)

  useEffect(() => {
    // matchMedia dengan scope = root.current untuk membersihkan semua tween + ScrollTrigger
    const mm = gsap.matchMedia(root.current)

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const show = { autoAlpha: 1, y: 0, yPercent: 0, scale: 1, rotate: 0 }

      // 1) Entrance (sekali)
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.cta-card', start: 'top 80%', once: true },
      })
      tl.fromTo('.cta-card', { autoAlpha: 0, y: 40, scale: 0.94 }, { ...show, duration: 0.9 })
        .fromTo('.cta-logo', { autoAlpha: 0, scale: 0.4, rotate: -12 }, { ...show, duration: 0.7, ease: 'back.out(2.2)' }, '-=0.45')
        .fromTo('.cta-word', { autoAlpha: 0, yPercent: 110 }, { ...show, duration: 0.7, stagger: 0.05 }, '-=0.35')
        .fromTo('.cta-sub', { autoAlpha: 0, y: 16 }, { ...show, duration: 0.6 }, '-=0.45')
        .fromTo('.cta-btn', { autoAlpha: 0, y: 16 }, { ...show, duration: 0.5, stagger: 0.08, clearProps: 'all' }, '-=0.4')
        .fromTo('.cta-trust li', { autoAlpha: 0, y: 10 }, { ...show, duration: 0.4, stagger: 0.06 }, '-=0.3')

      // 2) Screenshot naik dari bawah kartu (scrub)
      gsap.fromTo(
        '.cta-shot',
        { yPercent: 28, rotateX: 14 },
        {
          yPercent: 0,
          rotateX: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.cta-card', start: 'top 75%', end: 'bottom bottom', scrub: 0.8 },
        }
      )

      // 3) Kartu milestone (parallax) + progress bar
      gsap.fromTo(
        '.cta-float',
        { autoAlpha: 0, yPercent: 60 },
        {
          autoAlpha: 1,
          yPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.cta-card', start: 'top 60%', end: 'bottom bottom', scrub: 0.8 },
        }
      )
      gsap.fromTo(
        '.cta-float-bar',
        { width: '0%' },
        { width: '72%', duration: 1.4, ease: 'power2.out', scrollTrigger: { trigger: '.cta-card', start: 'top 50%', once: true } }
      )
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="cta" ref={root} className="bg-white py-16 sm:py-24">
      <style>{CSS}</style>
      <Container>
        <div className="cta-card relative isolate mx-auto max-w-[1260px] overflow-hidden rounded-[28px] sm:rounded-[36px] px-5 pt-14 sm:pt-16 text-center text-white">
          {/* gradient mesh */}
          <div className="cta-mesh absolute inset-0 -z-10" aria-hidden="true" />
          <div className="absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden="true" />

          {/* logo tile */}
          <div className="cta-logo mx-auto flex h-[76px] w-[76px] sm:h-[88px] sm:w-[88px] items-center justify-center rounded-[22px] sm:rounded-[24px] bg-white shadow-[0_18px_40px_-12px_rgba(10,20,60,0.45),inset_0_-3px_0_rgba(15,23,42,0.06)]">
            <LogoMark />
          </div>

          {/* headline */}
          <h2 className="mx-auto mt-8 max-w-4xl text-[36px] sm:text-5xl lg:text-[64px] font-extrabold leading-[1.05] tracking-[-0.04em]">
            <Words words={HEADLINE_TOP} />
            <Words words={HEADLINE_BOTTOM} />
          </h2>

          <p className="cta-sub mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-white/80">
            Satukan project, task, kolaborasi, workload, dan portal klien dalam satu workspace tanpa kehilangan konteks.
          </p>

          {/* buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollTo('#pricing')}
              className="cta-btn group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[15px] font-bold text-[#101828] shadow-[0_10px_24px_-8px_rgba(10,20,60,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-10px_rgba(10,20,60,0.5)] cursor-pointer"
            >
              Mulai Sekarang Gratis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo('#playground')}
              className="cta-btn inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20 cursor-pointer"
            >
              <Play className="h-4 w-4" />
              Jelajahi Demo Produk
            </button>
          </div>

          {/* trust */}
          <ul className="cta-trust mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-white/80">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20">
                  <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                </span>
                {t}
              </li>
            ))}
          </ul>

          {/* product screenshot */}
          <div className="relative mx-auto mt-12 sm:mt-14 max-w-[1040px] [perspective:1400px]">
            <div className="cta-shot origin-bottom rounded-t-2xl border border-white/40 border-b-0 bg-white/25 p-1.5 sm:p-2 pb-0 sm:pb-0 shadow-[0_-10px_60px_-10px_rgba(10,20,60,0.35)] backdrop-blur-sm">
              <div className="overflow-hidden rounded-t-xl bg-white">
                <div className="flex h-8 items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-3">
                  <i className="h-2.5 w-2.5 rounded-full bg-[#FCA5A5]" />
                  <i className="h-2.5 w-2.5 rounded-full bg-[#FCD34D]" />
                  <i className="h-2.5 w-2.5 rounded-full bg-[#86EFAC]" />
                  <span className="mx-auto hidden sm:block rounded-md border border-slate-200 bg-white px-3 py-0.5 font-mono text-[10px] text-slate-400">
                    app.flovig.com/projects/management-flovig/tasks
                  </span>
                </div>
                <div className="h-[220px] sm:h-[340px] lg:h-[420px] overflow-hidden">
                  <img
                    src={SCREENSHOT}
                    alt="Kanban board task di Flovig"
                    loading="lazy"
                    decoding="async"
                    onLoad={() => ScrollTrigger.refresh()}
                    className="h-full w-full object-cover object-left-top"
                  />
                </div>
              </div>
            </div>

            {/* floating milestone card */}
            <div className="cta-float absolute -right-2 lg:-right-10 bottom-10 hidden md:block w-[270px] rounded-2xl border border-slate-200/80 bg-white p-4 text-left text-[#101828] shadow-[0_24px_48px_-16px_rgba(10,20,60,0.45)]">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-[#EEF3FF] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#315CF5]">MS-01</span>
                <span className="text-xs font-bold text-[#315CF5]">72%</span>
              </div>
              <p className="mt-2 text-[13px] font-bold">Foundation &amp; Landing Page</p>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className="cta-float-bar h-full w-[72%] rounded-full bg-gradient-to-r from-[#315CF5] to-[#22D3EE]" />
              </div>
              <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1"><i className="h-1.5 w-1.5 rounded-full bg-emerald-500" />5 task selesai</span>
                <span className="flex items-center gap-1"><i className="h-1.5 w-1.5 rounded-full bg-[#315CF5]" />Sprint 1</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

const CSS = `
.cta-mesh{
  background:
    radial-gradient(75% 75% at 15% 10%, #22D3EE 0%, transparent 65%),
    radial-gradient(70% 70% at 85% 15%, #10B981 0%, #7EF0D0 40%, transparent 65%),
    radial-gradient(80% 80% at 50% 50%, #06B6D4 0%, transparent 60%),
    radial-gradient(75% 75% at 80% 90%, #3B82F6 0%, transparent 60%),
    radial-gradient(75% 75% at 15% 90%, #1D4ED8 0%, transparent 60%),
    linear-gradient(135deg, #1E40AF 0%, #2563EB 30%, #059669 70%, #10B981 100%);
  background-size: 130% 130%;
  animation: ctaMesh 14s ease-in-out infinite alternate;
}
@keyframes ctaMesh{
  0%{background-position:0% 0%}
  50%{background-position:50% 80%}
  100%{background-position:100% 40%}
}
@media (prefers-reduced-motion:reduce){ .cta-mesh{animation:none} }
`