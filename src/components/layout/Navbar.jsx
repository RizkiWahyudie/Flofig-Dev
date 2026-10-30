import { useState, useEffect } from 'react'
import { FlovigLogo } from '../ui/FlovigLogo'
import { Menu, X, ChevronRight, ArrowRight } from 'lucide-react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Product', href: '#alur-kerja' },
    { label: 'Preview', href: '#sync' },
    { label: 'Solution', href: '#use-cases' },
    { label: 'Pricing', href: '#pricing' },
  ]

  const handleNavClick = (href) => {
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-4 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none flex justify-center">
      <div className="pointer-events-auto w-full max-w-5xl">
        {/* Floating Capsule Bar */}
        <div
          className={`w-full rounded-full bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'shadow-[0_12px_32px_rgba(0,0,0,0.1)] border-slate-300/80 bg-white/95' : ''
          }`}
        >
          {/* Logo */}
          <a
            href="#"
            className="flex items-center shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-full"
            aria-label="Flovig Home"
          >
            <FlovigLogo size="sm" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className="px-3 py-1.5 text-xs sm:text-[13px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 rounded-full transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNavClick('#pricing')}
              className="text-xs sm:text-[13px] font-medium text-slate-700 hover:text-slate-950 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('#pricing')}
              className="px-4 py-2 rounded-full bg-[#0B1527] hover:bg-black text-white text-xs sm:text-[13px] font-semibold transition-all duration-200 shadow-sm cursor-pointer hover:shadow-md"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1 pb-3 border-b border-slate-100">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50 rounded-xl flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </nav>
            <div className="pt-3 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleNavClick('#pricing')}
                className="w-full py-2.5 text-center text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-full"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('#pricing')}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#0B1527] hover:bg-black rounded-full flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
