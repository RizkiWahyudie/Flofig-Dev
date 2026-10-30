import { FlovigLogo } from '../ui/FlovigLogo'
import { Phone, Mail, MapPin } from 'lucide-react'

const PRODUCT_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Products', href: '#alur-kerja' },
  { label: 'Preview', href: '#sync' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'QnA', href: '#faq' },
]

const SOLUTION_LINKS = [
  { label: 'Agency & Creative', href: '#use-cases' },
  { label: 'Software & Product', href: '#use-cases' },
  { label: 'Operations', href: '#use-cases' },
  { label: 'Professional Services', href: '#use-cases' },
]

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7v-3h3V9.5C10 6.46 11.82 5 14.5 5c1.28 0 2.4.1 2.4.1v2.6h-1.35c-1.48 0-1.95.92-1.95 1.87V12h3.2l-.5 3h-2.7v6.8c4.56-.93 8-4.96 8-9.8z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9m1.39 9.74v-8.37H5.07v8.37h2.78z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
]

export function Footer() {
  const handleNavClick = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-12 sm:pt-20 sm:pb-16 text-slate-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Column 1: Brand & Bio & Socials (Matches UI Image 3) */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-6">
            <a href="#" className="flex items-center group">
              <FlovigLogo size="md" />
            </a>

            <p className="mt-4 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
              Unified project and work management workspace for modern teams. Unite planning, task tracking, workload, and client communication without losing context.
            </p>

            {/* Social Icons Row */}
            <div className="mt-6 flex items-center gap-4 text-slate-600">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#0099FF] hover:text-white flex items-center justify-center transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Product Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-slate-900 tracking-tight mb-4">
              Product
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px]">
              {PRODUCT_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    className="text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Solution Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-slate-900 tracking-tight mb-4">
              Solution
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px]">
              {SOLUTION_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    className="text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details (Matches UI Image 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-slate-900 tracking-tight mb-4">
              Contact
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-[13px]">
              <li className="flex items-center gap-2.5 text-slate-600">
                <Phone className="w-4 h-4 text-slate-800 shrink-0" />
                <span>(406) 555-0120</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-600">
                <Mail className="w-4 h-4 text-slate-800 shrink-0" />
                <a
                  href="mailto:Hey@flovig.com"
                  className="hover:text-slate-900 transition-colors"
                >
                  Hey@flovig.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-600">
                <MapPin className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/NMFYRh6x2uAfrxmM9"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-900 transition-colors underline decoration-slate-300 underline-offset-2 leading-relaxed"
                >
                  Enablerspace.id, Kebayoran Lama, Jakarta Selatan
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
