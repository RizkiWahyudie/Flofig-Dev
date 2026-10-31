import { useLayoutEffect, useRef, useState } from 'react'
import { ChevronRight, Play, Pause } from 'lucide-react'
import { GradientBadge } from '../components/ui/GradientBadge'
import { gsap } from '../lib/gsap'

// Logos for social proof
function PartnerLogos() {
  return (
    <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-45 grayscale hover:grayscale-0 transition-all duration-300">
      {/* Novartis */}
      <div className="flex items-center gap-1.5 text-slate-800 font-bold tracking-tight text-sm sm:text-base">
        <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.2 0 2.35-.21 3.42-.6-4.57-1.12-7.92-5.18-7.92-10 0-3.64 1.9-6.83 4.74-8.63C11.45 2.27 11.72 2 12 2z" />
        </svg>
        <span>NOVARTIS</span>
      </div>

      {/* Continental */}
      <div className="flex items-center gap-1.5 text-slate-800 font-extrabold tracking-wider text-sm sm:text-base font-serif italic">
        <span>Continental<span className="not-italic text-xs font-mono font-normal">®</span></span>
      </div>

      {/* Paramount */}
      <div className="flex items-center gap-1.5 text-slate-800 font-serif font-bold text-sm sm:text-base">
        <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L6 18h12L12 2zm0 4.5l3.5 9.5h-7L12 6.5z" />
          <circle cx="12" cy="3" r="1" />
          <circle cx="8" cy="6" r="0.8" />
          <circle cx="16" cy="6" r="0.8" />
          <circle cx="5" cy="11" r="0.8" />
          <circle cx="19" cy="11" r="0.8" />
        </svg>
        <span className="tracking-wide">Paramount</span>
      </div>

      {/* WSP */}
      <div className="flex items-center gap-1.5 text-slate-900 font-black tracking-widest text-sm sm:text-base">
        <span className="text-red-500 font-black">\\\</span>
        <span>WSP</span>
      </div>

      {/* Hewlett Packard Enterprise */}
      <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs sm:text-sm">
        <div className="w-4 h-3.5 border-2 border-emerald-500 rounded-xs" />
        <div className="leading-tight text-left">
          <span className="block font-bold text-[11px] sm:text-xs tracking-tight">Hewlett Packard</span>
          <span className="block text-[9px] text-slate-500 tracking-wider uppercase">Enterprise</span>
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)

  const scrollTo = (selector) => {
    const el = document.querySelector(selector)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('.hero-badge-el', { y: 16, autoAlpha: 0, duration: 0.5, delay: 0.1 })
          .from('.hero-headline-el', { y: 24, autoAlpha: 0, duration: 0.8 }, '-=0.2')
          .from('.hero-sub-el', { y: 16, autoAlpha: 0, duration: 0.6 }, '-=0.4')
          .from('.hero-cta-el', { y: 16, autoAlpha: 0, duration: 0.5 }, '-=0.4')
          .from('.hero-logos-el', { autoAlpha: 0, duration: 0.8 }, '-=0.2')
          .from('.hero-media-wrap', { y: 24, autoAlpha: 0, duration: 0.9 }, '-=0.4')
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleTogglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {})
      setIsPaused(false)
    } else {
      videoRef.current.pause()
      setIsPaused(true)
    }
  }

  return (
    <section ref={heroRef} className="relative pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-24 overflow-hidden bg-white text-center">
      {/* Background Gradient SVG Asset */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center z-0">
        <img
          src="/asset/bg-gradient-hero.svg"
          alt=""
          className="w-full min-w-[1200px] h-auto object-cover object-top select-none pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Top Container: Centered Heading, Subheading, CTAs & Logos */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Animated Gradient Badge (Restored with moving color beam) */}
        <div className="hero-badge-el flex justify-center">
          <GradientBadge onClick={() => scrollTo('#features')}>
            The Best of Agile Product Management
          </GradientBadge>
        </div>

        {/* Main Headline */}
        <h1 className="hero-headline-el mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-slate-950">
          Good Work Starts<br />
          With Better <span className="text-[#00A3FF]">Workflow.</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-sub-el mt-5 max-w-2xl mx-auto text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
          Manage projects, coordinate your team, track sales, and streamline business operations — all in one platform. With Flovig, everything you need to get work done lives in one place.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta-el mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href={`${typeof window !== 'undefined' ? window.location.origin : ''}/daftar`}
            className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#0B1527] hover:bg-black text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group"
          >
            <span>Get Started - It's Free!</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>

          <button
            type="button"
            onClick={() => scrollTo('#alur-kerja')}
            className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs sm:text-sm font-medium shadow-xs hover:border-slate-400 transition-all duration-200 cursor-pointer"
          >
            See How It Works
          </button>
        </div>

        {/* Social Proof Logos */}
        <div className="hero-logos-el">
          <PartnerLogos />
        </div>
      </div>

      {/* Video Container: Contained like other sections, preserving original 16:9 frame & resolution */}
      <div id="features" className="hero-media-wrap relative z-10 mt-12 sm:mt-16 max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-24 sm:scroll-mt-28">
        <div className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 bg-white border border-slate-200/90 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <div
            className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 aspect-video group cursor-pointer"
            onClick={handleTogglePlay}
          >
            <video
              ref={videoRef}
              src="/asset/flovig-hero-full.mp4"
              poster="/asset/flovig-hero-full-poster.webp"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover block"
            />

            {/* Subtle Minimal Pause/Play overlay pill */}
            <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleTogglePlay()
                }}
                className="px-3.5 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 shadow-lg hover:bg-slate-950 transition-colors"
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
                <span>{isPaused ? 'Play Video' : 'Pause'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
