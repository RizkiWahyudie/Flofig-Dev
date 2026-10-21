import { useLayoutEffect, useRef } from 'react'
import { Container } from '../components/layout/Container'
import { GradientBadge } from '../components/ui/GradientBadge'
import { HeroVideoShowcase } from '../components/product/HeroVideoShowcase'
import { gsap } from '../lib/gsap'

export function HeroSection() {
  const heroRef = useRef(null)
  const ctaRef = useRef(null)
  const shineRef = useRef(null)
  const underlineRef = useRef(null)
  const sparkRef = useRef(null)

  const scrollTo = (selector) => {
    const el = document.querySelector(selector)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // useLayoutEffect: state awal animasi dipasang sebelum browser paint -> tidak ada kedip
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // ───────────── Intro (semua perangkat, kecuali reduced motion)
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const path = underlineRef.current
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        gsap.set(sparkRef.current, { autoAlpha: 0 })

        const drawUnderline = () => {
          const t = gsap.timeline()
          t.set(sparkRef.current, { autoAlpha: 1 })
            .to(path, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, 0)
            // titik cahaya berjalan mengikuti garis (MotionPath)
            .to(sparkRef.current, {
              motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
              duration: 1.1,
              ease: 'power2.inOut',
            }, 0)
            .to(sparkRef.current, { autoAlpha: 0, scale: 2.2, duration: 0.35 }, '-=0.1')
          return t
        }

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('.hero-badge', { y: 16, autoAlpha: 0, duration: 0.5, delay: 0.1 })
          .from('.hero-line-inner', { yPercent: 110, duration: 0.9, stagger: 0.12 }, '-=0.2')
          .add(drawUnderline(), '-=0.35')
          .from('.hero-subhead', { y: 16, autoAlpha: 0, duration: 0.6 }, '-=0.9')
          .from('.hero-cta > *', { y: 14, autoAlpha: 0, duration: 0.5, stagger: 0.08 }, '-=0.5')
          .from('.hero-window-reveal', { y: 60, autoAlpha: 0, duration: 1, ease: 'power2.out' }, '-=0.3')
          .from('.hero-chapter', { y: 12, autoAlpha: 0, duration: 0.4, stagger: 0.05 }, '-=0.5')

        // kilau tombol CTA berulang
        gsap.fromTo(
          shineRef.current,
          { xPercent: -150 },
          { xPercent: 350, duration: 1, ease: 'power2.inOut', repeat: -1, repeatDelay: 3.5, delay: 2.2 }
        )
      })

      // ───────────── Desktop: efek scroll (scrub) + parallax
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set('.hero-window-wrap', { transformPerspective: 1600, transformOrigin: '50% 0%' })
        // jendela produk "terbangun": miring -> rata, kecil -> penuh, mengikuti scroll
        gsap.fromTo(
          '.hero-window',
          { rotateX: 9, scale: 0.93, y: 30 },
          {
            rotateX: 0, scale: 1, y: 0, ease: 'none',
            scrollTrigger: { trigger: '.hero-window-wrap', start: 'top 92%', end: 'top 32%', scrub: 0.6 },
          }
        )
        gsap.to('.hero-glow-a', {
          yPercent: -30, ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })

      // ───────────── Mobile: cukup fade-in saat masuk layar
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.from('.hero-window', {
          y: 24, autoAlpha: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.hero-window-wrap', start: 'top 90%', once: true },
        })
      })

      // ───────────── Tombol magnetic + kilau saat hover (perangkat hover saja)
      mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const btn = ctaRef.current
        const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3' })
        const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3' })
        const move = (e) => {
          const r = btn.getBoundingClientRect()
          xTo((e.clientX - (r.left + r.width / 2)) * 0.25)
          yTo((e.clientY - (r.top + r.height / 2)) * 0.35)
        }
        const leave = () => { xTo(0); yTo(0) }
        btn.addEventListener('mousemove', move)
        btn.addEventListener('mouseleave', leave)
        return () => {
          btn.removeEventListener('mousemove', move)
          btn.removeEventListener('mouseleave', leave)
        }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white">
      {/* satu cahaya halus saja, seperti ClickUp: putih bersih */}
      <Container className="relative z-10">
        {/* Badge berisi kabar, border gradien bergerak (default 1 ruas, hover penuh) */}
        <GradientBadge className="hero-badge" onClick={() => scrollTo('#fitur')}>
          {/* <span className="rounded-full bg-[#EAF0FF] px-2 py-0.5 text-[11px] font-bold text-[#2045D8]">Baru</span> */}
          The Best for Agile Product Management
        </GradientBadge>

        {/* Headline rata kiri, dua baris, masking reveal */}
        <h1 className="mt-7 max-w-6xl text-[2.5rem] sm:text-6xl lg:text-[4.4rem] font-extrabold tracking-[-0.035em] leading-[1.04] text-[#101828]">
          <span className="block overflow-hidden pb-[0.12em]">
            <span className="hero-line-inner block">From planning to launch,</span>
          </span>
          <span className="block">
            <span className="relative inline-block">
              <span className="block overflow-hidden pb-[0.12em]">
                <span className="hero-line-inner block text-[#315CF5]">everything flows.</span>
              </span>
              {/* garis bawah SVG yang tergambar + titik cahaya, selebar teks */}
              <svg
                viewBox="0 0 400 16"
                fill="none"
                aria-hidden="true"
                className="absolute left-0 -bottom-1 w-full h-auto overflow-visible"
              >
                <defs>
                  <linearGradient id="hero-underline" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#315CF5" />
                    <stop offset="100%" stopColor="#7EF0D0" />
                  </linearGradient>
                </defs>
                <path
                  ref={underlineRef}
                  d="M3 11 C 70 2, 130 15, 200 7 S 330 12, 397 4"
                  stroke="url(#hero-underline)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
        </h1>

        <p className="hero-subhead mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-[#475467]">
          Agile sprints, milestones, and Gantt charts—all connected to chats and tickets, so your team never loses context.
        </p>

        {/* CTA gelap + catatan kecil di sampingnya, seperti ClickUp */}
        <div className="hero-cta mt-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
          <button
            ref={ctaRef}
            type="button"
            onClick={() => scrollTo('#pricing')}
            className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#111A2E] px-5 py-3 sm:px-7 sm:py-4 text-base font-bold text-white shadow-xl shadow-[#111A2E]/25 cursor-pointer will-change-transform"
          >
            <span
              ref={shineRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/35 to-transparent"
            />
            <span className="relative text-sm sm:text-lg">Start Now. It's FREE!</span>
          </button>

          <div className="text-xs leading-snug text-[#667085]">
            <div>One workspace.</div>
            <div>Multiple large-scale projects.</div>
          </div>
        </div>

        {/* Jendela video: reveal (intro) dan .hero-window (scroll) dipisah agar tidak bentrok */}
        <div className="hero-window-reveal mt-8 md:mt-8 max-w-6xl">
          <HeroVideoShowcase onDemoClick={() => scrollTo('#playground')} />
        </div>
      </Container>
    </section>
  )
}
