import { useState, useEffect } from 'react'
import { Container } from './Container'
import { Button } from '../ui/Button'
import { FlovigLogo } from '../ui/FlovigLogo'
import { 
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight
} from 'lucide-react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 7)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Fitur', href: '#features' },
    { label: 'Cara Kerja', href: '#cara-kerja' },
    { label: 'Preview', href: '#playground' },
    { label: 'Solusi', href: '#use-cases' },
    { label: 'Harga', href: '#pricing' },
    { label: 'FAQ', href: '#faq' }
  ]

  const handleNavClick = (href) => {
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement bar — hidden once the page is scrolled */}
      <div
        className={`overflow-hidden bg-[#F7F8FA] transition-all duration-100 ease-out ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
        }`}
        aria-hidden={scrolled}
      >
        <a
          href="#features"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('#features')
          }}
          tabIndex={scrolled ? -1 : 0}
          className="flex h-10 items-center justify-center gap-2 px-4 text-[13px] text-[#344054] hover:text-[#101828] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#315CF5]"
        >
          <span className="truncate">
            <span className="font-bold text-sm text-[#101828]">BARU: Portal Klien — </span>
            <span className="hidden text-sm sm:inline"> Bagikan progres proyek langsung ke klien Anda</span>
          </span>
          <ChevronRight className="w-4 h-4 shrink-0 text-[#475467]" />
        </a>
      </div>

      {/* Main navbar */}
      <div className={`transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl'
          : 'bg-white'
      }`}>
        <Container>
          <div className="flex h-16 items-center justify-between">
            {/* Logo + Desktop Nav Items */}
            <div className="flex items-center gap-6 xl:gap-8">
              <a
                href="#"
                className="flex items-center group"
              >
                <FlovigLogo size="md" />
              </a>

              <nav className="hidden lg:flex items-center gap-0.5">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className="px-3 py-2 text-sm font-medium text-[#475467] hover:text-[#101828] rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Desktop Right CTAs */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => handleNavClick('#pricing')}
                className="h-10 px-4 rounded-xl bg-[#F2F4F7] text-sm font-semibold text-[#101828] hover:bg-[#E4E7EC] transition-colors cursor-pointer"
              >
                Masuk
              </button>
              <button
                onClick={() => handleNavClick('#cta')}
                className="h-10 px-4 rounded-xl bg-[#1D2939] text-sm font-semibold text-white hover:bg-[#101828] transition-colors cursor-pointer"
              >
                Mulai Sekarang
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#344054] hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#315CF5]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mb-3 p-4 bg-white rounded-2xl border border-[#E5E8F0] shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
              <nav className="flex flex-col gap-1 pb-4 border-b border-[#E5E8F0]">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className="px-4 py-2.5 text-sm font-medium text-[#344054] hover:text-[#315CF5] hover:bg-[#F0F4FF] rounded-xl flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#98A2B3]" />
                  </a>
                ))}
              </nav>
              <div className="pt-4 flex flex-col gap-2.5">
                <button
                  onClick={() => handleNavClick('#pricing')}
                  className="w-full py-2.5 text-center text-sm font-semibold text-[#344054] hover:bg-slate-50 rounded-xl"
                >
                  Masuk ke Workspace
                </button>
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => handleNavClick('#cta')}
                  icon={ArrowRight}
                >
                  Mulai Sekarang Gratis
                </Button>
              </div>
            </div>
          )}
        </Container>
      </div>
    </header>
  )
}