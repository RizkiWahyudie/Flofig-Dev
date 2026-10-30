import { ArrowRight } from 'lucide-react'

export function FinalCTASection() {
  const scrollTo = (selector) => {
    const el = document.querySelector(selector)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="cta" className="py-12 sm:py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner with bg-footer.svg Background Asset (Matches UI Image 3) */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-14 absolute inset-0 z-0 bg-gradient-to-b from-[#0066FF] via-[#0099FF] to-[#00D4FF] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Background Texture from bg-footer.svg */}
          <img src="/bg-footer.svg" alt="" className="absolute inset-0 z-[1] w-full h-full object-cover pointer-events-none opacity-70" />

          {/* Left Headline */}
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
              We Make Work Easier.
            </h2>
          </div>

          {/* Right Action Buttons */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 shrink-0">
            <button
              type="button"
              onClick={() => scrollTo('#pricing')}
              className="px-6 sm:px-7 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-900 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo('#playground')}
              className="px-6 sm:px-7 py-3 rounded-full bg-white/30 hover:bg-white/40 text-white text-xs sm:text-sm font-medium backdrop-blur-sm transition-all duration-200 cursor-pointer"
            >
              Start Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCTASection
