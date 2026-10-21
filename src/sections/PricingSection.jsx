import { useState } from 'react'
import { Container } from '../components/layout/Container'
import { Check, ArrowRight, Users, Minus, Plus } from 'lucide-react'

/* =========================================================================
   Flovig — Pricing (cards + comparison table)
   Sumber data: tabel "FLOVIG PRICE".
   - Paket ditentukan oleh JUMLAH PENGGUNA (makin besar tim, makin murah/pengguna).
   - Tahunan = diskon 30%.
   - Baris "AI" dari tabel harga sengaja TIDAK ditampilkan (PRD V1: AI bukan
     capability Release V1).
   - iOS & Android ditampilkan "Segera" (PRD: Mobile App = roadmap).
     Ubah MOBILE_APP_AVAILABLE ke true saat aplikasi mobile rilis.
   - Jika harga nanti diambil dari backend ($pricingTiers), cukup ganti PLANS.
   ========================================================================= */

const MOBILE_APP_AVAILABLE = false
const YEARLY_DISCOUNT = 30
const DEFAULT_USERS = 25
const CTA_HREF = '#cta'

const PLANS = [
  {
    id: 'free', name: 'Free', min: 1, max: 8,
    desc: 'Untuk tim kecil yang baru mulai merapikan pekerjaan.',
    monthly: 0, yearly: 0,
    users: 'Hingga 8 pengguna', usersShort: '≤ 8',
    workspace: '1', storage: '2 GB', fileSize: '50 MB',
    support: 'Help Center', cta: 'Mulai Gratis',
  },
  {
    id: 'starter', name: 'Starter', min: 9, max: 19,
    desc: 'Untuk tim yang mulai bertumbuh dan butuh lebih banyak ruang.',
    monthly: 29900, yearly: 20900,
    users: '9–19 pengguna', usersShort: '9 – 19',
    workspace: '3', storage: '25 GB', fileSize: '100 MB',
    support: 'Business Hours', cta: 'Pilih Starter',
  },
  {
    id: 'team', name: 'Team', min: 20, max: 49,
    desc: 'Untuk beberapa tim yang bekerja dalam satu organisasi.',
    monthly: 27900, yearly: 19500,
    users: '20–49 pengguna', usersShort: '20 – 49',
    workspace: '5', storage: '75 GB', fileSize: '250 MB',
    support: 'Priority Support', cta: 'Pilih Team',
  },
  {
    id: 'business', name: 'Business', min: 50, max: 99,
    desc: 'Untuk perusahaan dengan banyak divisi dan project paralel.',
    monthly: 24900, yearly: 17400,
    users: '50–99 pengguna', usersShort: '50 – 99',
    workspace: '10', storage: '250 GB', fileSize: '500 MB',
    support: 'Priority + SLA', cta: 'Pilih Business',
  },
  {
    id: 'pro', name: 'Pro', min: 100, max: 199,
    desc: 'Untuk organisasi besar dengan workspace tanpa batas.',
    monthly: 21900, yearly: 15300,
    users: '100–199 pengguna', usersShort: '100 – 199',
    workspace: 'Unlimited', storage: '1 TB', fileSize: '1 GB',
    support: 'Dedicated Support', cta: 'Pilih Pro',
  },
  {
    id: 'enterprise', name: 'Enterprise', min: 200, max: null,
    desc: 'Untuk korporasi dengan kebutuhan kapasitas dan dukungan khusus.',
    monthly: null, yearly: null,
    users: '200+ pengguna', usersShort: '≥ 200',
    workspace: 'Unlimited', storage: 'Custom', fileSize: 'Custom',
    support: 'Dedicated Support + SLA', cta: 'Hubungi Sales',
  },
]

/* ---------- helpers ---------- */
const rp = (n) => 'Rp ' + n.toLocaleString('id-ID')
const isFree = (p) => p.monthly === 0
const isCustom = (p) => p.monthly == null
const priceOf = (p, cycle) => (cycle === 'yearly' ? p.yearly : p.monthly)
const planForUsers = (n) => PLANS.find((p) => n >= p.min && (p.max == null || n <= p.max)) || PLANS[0]
const unlimited = (v) => (v === 'Unlimited' ? 'Tanpa batas' : v)

const cardFeatures = (p) => [
  p.users,
  p.workspace === 'Unlimited' ? 'Workspace tanpa batas' : `${p.workspace} workspace`,
  'Project, task, board & list tanpa batas',
  p.storage === 'Custom' ? 'Storage & ukuran file custom' : `Storage ${p.storage} · file maks. ${p.fileSize}`,
  `Dukungan ${p.support}`,
]

/* =========================================================================
   Sub-components
   ========================================================================= */
/* Toggle bulanan / tahunan — desain dari versi Anda */
function BillingToggle({ cycle, onChange }) {
  const isMonthly = cycle === 'monthly'
  const isYearly = cycle === 'yearly'

  return (
    <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-white border border-[#E5E8F0] shadow-xs" role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={isMonthly}
        onClick={() => onChange('monthly')}
        className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
          isMonthly
            ? 'toggle-active-glow text-white font-bold'
            : 'text-[#475467] hover:text-[#101828]'
        }`}
      >
        Monthly
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={isYearly}
        onClick={() => onChange('yearly')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
          isYearly
            ? 'toggle-active-glow text-white font-bold'
            : 'text-[#475467] hover:text-[#101828]'
        }`}
      >
        <span>Annually</span>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
            isYearly
              ? 'bg-white text-[#0284c7] shadow-xs'
              : 'bg-emerald-100 text-emerald-800'
          }`}
        >
          Save {YEARLY_DISCOUNT}%
        </span>
      </button>
    </div>
  )
}

/* Stepper ukuran tim — sebaris dengan toggle, tinggi sama */
function TeamSizeStepper({ input, setInput, users }) {
  const set = (n) => setInput(String(Math.max(1, n)))
  const stepBtn =
    'w-8 h-8 rounded-lg flex items-center justify-center text-[#475467] hover:bg-[#F2F4F7] hover:text-[#101828] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'
  return (
    <div className="inline-flex items-center gap-1 p-1.5 pl-3.5 rounded-2xl bg-white shadow-xs">
      <label htmlFor="flovig-team-size" className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#475467] mr-1">
        <Users className="w-4 h-4 text-[#315CF5]" /> Tim saya
      </label>
      <button type="button" className={stepBtn} onClick={() => set(users - 1)} disabled={users <= 1} aria-label="Kurangi pengguna">
        <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
      </button>
      <input
        id="flovig-team-size"
        type="number"
        inputMode="numeric"
        min={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onBlur={() => setInput(String(users))}
        className="w-11 bg-transparent text-center text-sm font-bold text-[#101828] focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button type="button" className={stepBtn} onClick={() => set(users + 1)} aria-label="Tambah pengguna">
        <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
      </button>
    </div>
  )
}

function PriceBlock({ plan, cycle }) {
  if (isCustom(plan)) {
    return (
      <>
        <div className="text-[40px] leading-none font-extrabold tracking-tight text-[#101828]">Custom</div>
        <p className="mt-2 text-xs text-[#667085]">Disesuaikan jumlah pengguna &amp; kebutuhan</p>
      </>
    )
  }
  if (isFree(plan)) {
    return (
      <>
        <div className="text-[40px] leading-none font-extrabold tracking-tight text-[#101828]">Rp 0</div>
        <p className="mt-2 text-xs text-[#667085]">Gratis selamanya</p>
      </>
    )
  }
  const price = priceOf(plan, cycle)
  return (
    <div key={cycle} className="animate-[flovigPriceIn_.35s_ease]">
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className="text-[40px] leading-none font-extrabold tracking-tight text-[#101828]">{rp(price)}</span>
        <span className="text-sm font-medium text-[#667085]">/pengguna/bln</span>
      </div>
      {cycle === 'yearly' ? (
        <>
          <p className="mt-2 text-xs text-[#667085]">Ditagih tahunan ({rp(plan.yearly * 12)} per pengguna)</p>
          <p className="mt-0.5 text-xs text-[#98A2B3] line-through">{rp(plan.monthly)}/bln</p>
        </>
      ) : (
        <p className="mt-2 text-xs text-[#667085]">Ditagih bulanan</p>
      )}
    </div>
  )
}

function Estimate({ plan, cycle, users }) {
  if (isFree(plan) || isCustom(plan)) return null
  const per = priceOf(plan, cycle)
  return (
    <div className="mt-4 flex items-center justify-between gap-2 rounded-lg bg-[#F4F6FF] px-3 py-2 text-xs text-[#475467]">
      <span>Estimasi {users} pengguna</span>
      <span className="text-right">
        <b className="text-[#101828]">{rp(users * per)}</b>/bln
        {cycle === 'yearly' && <span className="block text-[11px] text-[#667085]">{rp(users * per * 12)}/tahun</span>}
      </span>
    </div>
  )
}

function PlanCard({ plan, cycle, match, users }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl bg-white p-7 transition-all duration-300 ${
        match
          ? 'border-2 border-[#101828] shadow-[0_24px_48px_-20px_rgba(16,24,40,0.35)] lg:-translate-y-1'
          : 'border border-[#EAECF0] shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_12px_rgba(16,24,40,0.05)] hover:shadow-[0_2px_4px_rgba(16,24,40,0.06),0_12px_24px_rgba(16,24,40,0.08)]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold text-[#101828]">{plan.name}</h3>
        {match && (
          <span className="shrink-0 rounded-full bg-[#101828] px-2.5 py-1 text-[11px] font-semibold text-white">
            Sesuai tim Anda
          </span>
        )}
      </div>
      <p className="mt-1.5 min-h-[40px] text-sm leading-relaxed text-[#667085]">{plan.desc}</p>

      <div className="mt-6 min-h-[96px]">
        <PriceBlock plan={plan} cycle={cycle} />
      </div>
      {match && <Estimate plan={plan} cycle={cycle} users={users} />}

      <p className="mt-5 text-sm font-semibold text-[#101828]">Termasuk:</p>
      <ul className="mt-3 flex-1 space-y-3">
        {cardFeatures(plan).map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-[#344054]">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#101828]" strokeWidth={2.2} />
            {f}
          </li>
        ))}
      </ul>
      <a href="#pricing-table" className="mt-4 text-sm text-[#667085] hover:text-[#101828] transition-colors">
        + Semua fitur Flovig
      </a>

      <a
        href={CTA_HREF}
        className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
          match
            ? 'bg-[#101828] text-white shadow-[0_8px_16px_-6px_rgba(16,24,40,0.45)] hover:bg-black'
            : 'bg-[#F2F4F7] text-[#101828] hover:bg-[#EAECF0]'
        }`}
      >
        {plan.cta}
      </a>
    </div>
  )
}

/* ---------- comparison table ---------- */
const TABLE_ROWS = [
  { group: 'Harga' },
  { label: 'Bulanan', hint: 'per pengguna / bulan', get: (p) => (isCustom(p) ? 'Custom' : isFree(p) ? 'Gratis' : rp(p.monthly)) },
  { label: `Tahunan (hemat ${YEARLY_DISCOUNT}%)`, hint: 'per pengguna / bulan', get: (p) => (isCustom(p) ? 'Custom' : isFree(p) ? 'Gratis' : rp(p.yearly)) },
  { label: 'Total tahunan', hint: 'per pengguna / tahun', get: (p) => (isCustom(p) ? 'Custom' : isFree(p) ? 'Gratis' : rp(p.yearly * 12)) },
  { group: 'Pengguna & workspace' },
  { label: 'Jumlah pengguna', get: (p) => p.usersShort },
  { label: 'Workspace (tim)', get: (p) => unlimited(p.workspace) },
  { group: 'Kapasitas' },
  { label: 'Project', get: () => 'Tanpa batas' },
  { label: 'Task', get: () => 'Tanpa batas' },
  { label: 'Board', get: () => 'Tanpa batas' },
  { label: 'List', get: () => 'Tanpa batas' },
  { label: 'Storage', get: (p) => p.storage },
  { label: 'Ukuran file maks.', get: (p) => p.fileSize },
  { group: 'Platform' },
  { label: 'Web app', get: () => true },
  { label: 'iOS & Android', get: () => (MOBILE_APP_AVAILABLE ? true : 'soon') },
  { group: 'Dukungan' },
  { label: 'Layanan support', get: (p) => p.support },
]

function Cell({ value }) {
  if (value === true) {
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-[5px] bg-[#101828] text-white">
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    )
  }
  if (value === 'soon') {
    return (
      <span className="inline-flex rounded-full border border-[#EAECF0] bg-[#F9FAFB] px-2 py-0.5 text-[11px] font-semibold text-[#667085]">
        Segera
      </span>
    )
  }
  return value
}

function ComparisonTable({ cycle, matchId }) {
  const colCls = (p) => (p.id === matchId ? 'bg-[#F4F5F7] text-[#101828] font-semibold' : 'text-[#475467]')

  return (
    <div id="pricing-table" className="mt-24 scroll-mt-24">
      <div className="max-w-2xl">
        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#101828]">Bandingkan semua paket</h3>
        <p className="mt-2 text-base text-[#667085]">
          Setiap paket mendapatkan fitur yang sama. Perbedaannya ada pada jumlah pengguna, workspace, kapasitas, dan dukungan.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-[#EAECF0] bg-white">
        <table className="w-full min-w-[960px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 w-[200px] bg-white px-5 pb-5 pt-10 text-left align-bottom text-xs font-semibold uppercase tracking-[0.08em] text-[#667085]">
                Fitur
              </th>
              {PLANS.map((p) => (
                <th key={p.id} className={`relative px-4 pb-5 pt-10 text-center align-bottom font-normal ${p.id === matchId ? 'bg-[#F4F5F7]' : ''}`}>
                  {p.id === matchId && (
                    <span className="absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#101828] px-2.5 py-0.5 text-[10px] font-semibold text-white">
                      Sesuai tim Anda
                    </span>
                  )}
                  <div className="text-sm font-semibold text-[#101828]">{p.name}</div>
                  <div className="mt-1.5 text-lg font-extrabold text-[#101828]">
                    {isCustom(p) ? 'Custom' : isFree(p) ? 'Rp 0' : rp(priceOf(p, cycle))}
                  </div>
                  <div className="mt-0.5 text-[11px] text-[#667085]">
                    {isCustom(p) ? 'Hubungi sales' : isFree(p) ? 'Gratis selamanya' : cycle === 'yearly' ? 'per pengguna/bln, tahunan' : 'per pengguna/bln'}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((row, i) =>
              row.group ? (
                <tr key={row.group}>
                  <td colSpan={PLANS.length + 1} className="border-t border-[#EAECF0] bg-[#F9FAFB] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#475467]">
                    {row.group}
                  </td>
                </tr>
              ) : (
                <tr key={row.label + i}>
                  <td className="sticky left-0 z-10 border-t border-[#EAECF0] bg-white px-5 py-3.5 font-semibold text-[#101828]">
                    {row.label}
                    {row.hint && <span className="block text-[11px] font-normal text-[#98A2B3]">{row.hint}</span>}
                  </td>
                  {PLANS.map((p) => (
                    <td key={p.id} className={`border-t border-[#EAECF0] px-4 py-3.5 text-center ${colCls(p)}`}>
                      <Cell value={row.get(p)} />
                    </td>
                  ))}
                </tr>
              )
            )}
            <tr>
              <td className="sticky left-0 z-10 border-t border-[#EAECF0] bg-white px-5 py-5" />
              {PLANS.map((p) => (
                <td key={p.id} className={`border-t border-[#EAECF0] px-3 py-5 text-center ${p.id === matchId ? 'bg-[#F4F5F7]' : ''}`}>
                  <a
                    href={CTA_HREF}
                    className={`inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors ${
                      p.id === matchId ? 'bg-[#101828] text-white hover:bg-black' : 'bg-[#F2F4F7] text-[#101828] hover:bg-[#EAECF0]'
                    }`}
                  >
                    {isCustom(p) ? 'Hubungi kami' : 'Pilih'} <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

/* =========================================================================
   Section
   ========================================================================= */
export function PricingSection() {
  const [cycle, setCycle] = useState('yearly')
  const [usersInput, setUsersInput] = useState(String(DEFAULT_USERS))

  const parsed = parseInt(usersInput, 10)
  const users = Number.isFinite(parsed) && parsed > 0 ? Math.min(parsed, 9999) : 1
  const plan = planForUsers(users)

  return (
    <section id="pricing" className="py-24 bg-[#FAFBFD]">
      <style>{`
        @keyframes flovigPriceIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}

        .price-main-heading {
          font-size: clamp(26px, 3.2vw, 42px);
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -0.035em;
          color: #0F172A;
          margin: 0;
        }
        .price-hl {
          position: relative;
          display: inline-block;
          padding-bottom: 4px;
          color: transparent;
          background: linear-gradient(90deg, #2563eb, #06b6d4);
          -webkit-background-clip: text;
          background-clip: text;
        }
        .price-hl svg {
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 100%;
          height: 12px;
          overflow: visible;
          display: block;
        }
        .price-hl path {
          fill: none;
          stroke: url(#price-ulGrad);
          stroke-width: 3.2;
          stroke-linecap: round;
        }

        .toggle-active-glow {
          position: relative;
          background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 35%, #06b6d4 75%, #2563eb 100%);
          background-size: 250% 250%;
          animation: flovigGlowGrad 3s ease infinite, flovigGlowPulse 2.2s ease-in-out infinite alternate;
        }
        @keyframes flovigGlowGrad {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes flovigGlowPulse {
          0% {
            box-shadow: 0 0 10px rgba(6, 182, 212, 0.45), 0 2px 8px rgba(37, 99, 235, 0.35);
          }
          100% {
            box-shadow: 0 0 22px rgba(6, 182, 212, 0.8), 0 4px 16px rgba(37, 99, 235, 0.55);
          }
        }
      `}</style>
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="price-main-heading">
            Bayar per pengguna,{' '}<br className="hidden sm:inline" />
            <span className="price-hl">
              bukan per project.
              <svg viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="price-ulGrad" x1="0" x2="1">
                    <stop offset="0" stopColor="#2563eb" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <path d="M3 8 C 80 2, 200 2, 297 7" />
              </svg>
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B]">
            Semua fitur tersedia di setiap paket. Mulai gratis hingga 8 pengguna, lalu upgrade saat tim Anda bertambah.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3">
            <TeamSizeStepper input={usersInput} setInput={setUsersInput} users={users} />
            <BillingToggle cycle={cycle} onChange={setCycle} />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} cycle={cycle} match={p.id === plan.id} users={users} />
          ))}
        </div>

        <ComparisonTable cycle={cycle} matchId={plan.id} />

        <p className="mt-6 text-center text-xs text-[#98A2B3]">
          Harga dalam Rupiah. Paket ditentukan oleh jumlah pengguna di workspace Anda.
        </p>
      </Container>
    </section>
  )
}