import { Container } from './Container'
import { FlovigLogo } from '../ui/FlovigLogo'
import { MapPin, Mail, Phone } from 'lucide-react'

/* =========================================================================
   Flovig — Footer (clean, putih)
   Isi CONTACT & SOCIALS di bawah. Item dengan value kosong ('') tidak ditampilkan.
   ========================================================================= */

const NAV_COLUMNS = [
  {
    title: 'Produk',
    links: [
      { label: 'Fitur', href: '#features' },
      { label: 'Cara Kerja', href: '#cara-kerja' },
      { label: 'Beban Kerja', href: '#workload' },
      { label: 'Portal Klien', href: '#client-portal' },
      { label: 'Harga', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Solusi Tim',
    links: [
      { label: 'Agency & Creative', href: '#use-cases' },
      { label: 'Software & Product', href: '#use-cases' },
      { label: 'Operations', href: '#use-cases' },
      { label: 'Professional Services', href: '#use-cases' },
    ],
  },
]

const CONTACT = {
  address: 'Enablerspace.id, Kebayoran Lama, Jakarta Selatan',
  mapsUrl: 'https://maps.app.goo.gl/NMFYRh6x2uAfrxmM9',
  email: '', // contoh: 'hello@flovig.com'
  phone: '', // contoh: '+62 812-0000-0000'
}

const SOCIALS = [
  { name: 'Instagram', href: '#', icon: 'instagram' },
  { name: 'LinkedIn', href: '#', icon: 'linkedin' },
  { name: 'X', href: '#', icon: 'x' },
  { name: 'Facebook', href: '#', icon: 'facebook' },
]

const LEGAL = [
  { label: 'Kebijakan Privasi', href: '#' },
  { label: 'Syarat & Ketentuan', href: '#' },
]

/* ---------- social icons (stroke, currentColor) ---------- */
function SocialIcon({ name }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: 'h-[18px] w-[18px]',
    'aria-hidden': true,
  }
  switch (name) {
    case 'instagram':
      return (
        <svg {...common}>
          <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.5 6.5h.01" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg {...common}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    case 'x':
      return (
        <svg {...common}>
          <path d="M4 4h4.5L20 20h-4.5z" />
          <path d="M20 4l-6.8 7.6M4 20l6.8-7.6" />
        </svg>
      )
    case 'facebook':
      return (
        <svg {...common}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      )
    default:
      return null
  }
}

const linkCls = 'text-[15px] text-[#344054] hover:text-[#315CF5] transition-colors'

export function Footer() {
  const contactItems = [
    CONTACT.address && { icon: MapPin, text: CONTACT.address, href: CONTACT.mapsUrl, external: true },
    CONTACT.email && { icon: Mail, text: CONTACT.email, href: `mailto:${CONTACT.email}` },
    CONTACT.phone && { icon: Phone, text: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/[^+\d]/g, '')}` },
  ].filter(Boolean)

  return (
    <footer className="bg-white border-t border-[#EAECF0] text-[#101828]">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-10 gap-y-12 pt-16 pb-14">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <FlovigLogo size="md" dark={false} />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[#667085]">
              Workspace manajemen proyek dan pekerjaan terpadu untuk tim modern. Satukan perencanaan, pelacakan task,
              beban kerja, dan komunikasi klien tanpa kehilangan konteks.
            </p>
          </div>

          {/* 2 kolom submenu */}
          {NAV_COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="text-lg font-semibold text-[#101828]">{col.title}</h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={linkCls}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Kontak + sosial media */}
          <div className="sm:col-span-2 lg:col-span-4">
            <h4 className="text-lg font-semibold text-[#101828]">Hubungi Kami</h4>
            <ul className="mt-5 space-y-3">
              {contactItems.map(({ icon: Icon, text, href, external }) => (
                <li key={text}>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`group inline-flex items-start gap-2.5 ${linkCls}`}
                  >
                    <Icon className="mt-[3px] h-4 w-4 shrink-0 text-[#98A2B3] group-hover:text-[#315CF5] transition-colors" />
                    <span>{text}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EAECF0] text-[#344054] transition-colors hover:border-[#315CF5] hover:text-[#315CF5]"
                >
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col-reverse gap-4 border-t border-[#EAECF0] py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#667085]">
            © {new Date().getFullYear()} Flovig Work Technologies. Seluruh hak cipta dilindungi.
          </p>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Legal">
            {LEGAL.map((l) => (
              <a key={l.label} href={l.href} className="text-sm text-[#344054] hover:text-[#315CF5] transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  )
}