import { useState } from 'react'
import { ChevronRight, MinusCircle, PlusCircle } from 'lucide-react'

// Filled check-circle icon (feature list, as in the design)
const CheckCircleIcon = ({ isDark }) => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" aria-hidden="true">
    <circle cx="10" cy="10" r="10" className={isDark ? 'fill-white' : 'fill-slate-400'} />
    <path
      d="M6 10.2l2.6 2.6L14 7.5"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={isDark ? 'stroke-[#0A3A75]' : 'stroke-white'}
    />
  </svg>
)

// Blue badge check used in the comparison table
const TableCheck = ({ active }) => (
  <span
    className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
      active ? 'bg-[#0A7CFF]/20' : 'bg-slate-300/20'
    }`}
  >
    <svg className="w-5 h-5" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" className={active ? 'fill-[#0A7CFF]' : 'fill-slate-300/60'} />
      <path
        d="M6 10.2l2.6 2.6L14 7.5"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
)

// ---------------------------------------------------------------------------
// Single source of truth: cards (top) and comparison table (bottom) both read
// from PLANS_DATA, so names, prices and the highlighted plan always match.
// Prices are DUMMY values. `null` price = "Custom".
// ---------------------------------------------------------------------------
const PLANS_DATA = [
  {
    id: 'free',
    name: 'Free Plan',
    minUsers: 1,
    maxUsers: 8,
    price: { monthly: 0, yearly: 0 },
    desc: 'For small teams getting organized',
    items: [
      'Up to 8 users',
      '1 workspace',
      'Unlimited projects, tasks, boards & lists',
      '2 GB storage · max 50 MB per file',
      'All Flovig features',
    ],
  },
  {
    id: 'starter',
    name: 'Starter Plan',
    minUsers: 9,
    maxUsers: 19,
    price: { monthly: 299, yearly: 1794 }, // yearly = 12 × 299 × 50%
    desc: 'For growing teams that need more space',
    items: [
      '9–19 users',
      '3 workspaces',
      'Unlimited projects, tasks, boards & lists',
      '25 GB storage · max 100 MB per file',
      'Business Hours support',
      'All Flovig features',
    ],
  },
  {
    id: 'team',
    name: 'Team Plan',
    minUsers: 20,
    maxUsers: 49,
    price: { monthly: 279, yearly: 1674 },
    desc: 'For multiple teams within an organization',
    items: [
      '20–49 users',
      '5 workspaces',
      'Unlimited projects, tasks, boards & lists',
      '75 GB storage · max 250 MB per file',
      'Priority Support',
    ],
  },
  {
    id: 'business',
    name: 'Business Plan',
    minUsers: 50,
    maxUsers: 99,
    price: { monthly: 249, yearly: 1494 },
    desc: 'For companies with multiple divisions and parallel projects',
    items: [
      '50–99 users',
      '10 workspaces',
      'Unlimited projects, tasks, boards & lists',
      '250 GB storage · max 500 MB per file',
      'Priority Support + SLA',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    minUsers: 100,
    maxUsers: 199,
    price: { monthly: 219, yearly: 1314 },
    desc: 'For large organizations needing unlimited workspaces',
    items: [
      '100–199 users',
      'Unlimited workspaces',
      'Unlimited projects, tasks, boards & lists',
      '1 TB storage · max 1 GB per file',
      'Dedicated Support',
      'All Flovig features',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    minUsers: 200,
    maxUsers: Infinity,
    price: { monthly: null, yearly: null },
    desc: 'For corporations with custom capacity and support needs',
    items: [
      '200+ users',
      'Unlimited workspaces',
      'Unlimited projects, tasks, boards & lists',
      'Custom storage & file size limit',
      'Dedicated Support + SLA',
    ],
  },
]

// Comparison rows: one value per plan id (string = label, boolean = check)
const COMPARISON_ROWS = [
  {
    feature: 'Analytics & Reporting',
    values: { free: 'Basic Access', starter: 'Standard Access', team: 'Standard Access', business: 'Advanced', pro: 'Advanced', enterprise: 'Custom' },
  },
  {
    feature: 'API Integration',
    values: { free: false, starter: true, team: true, business: true, pro: true, enterprise: true },
  },
  {
    feature: 'Onboarding & Training',
    values: { free: 'Self-serve', starter: 'Basic Access', team: 'Standard Access', business: 'Standard Access', pro: 'Advanced', enterprise: 'Dedicated' },
  },
  {
    feature: 'Customization Options',
    values: { free: false, starter: true, team: true, business: true, pro: true, enterprise: true },
  },
  {
    feature: 'Task Management',
    values: { free: 'Basic Access', starter: 'Basic Access', team: 'Standard Access', business: 'Standard Access', pro: 'Advanced', enterprise: 'Advanced' },
  },
  {
    feature: 'Real-Time Inventory Tracking',
    values: { free: false, starter: false, team: true, business: true, pro: true, enterprise: true },
  },
  {
    feature: 'Collaboration Tools',
    values: { free: 'Basic Access', starter: 'Basic Access', team: 'Standard Access', business: 'Standard Access', pro: 'Advanced', enterprise: 'Advanced' },
  },
  {
    feature: 'Document Management',
    values: { free: false, starter: false, team: false, business: true, pro: true, enterprise: true },
  },
]

const MAX_USERS = 999
const TABLE_COLS = 'grid grid-cols-[1.4fr_repeat(6,minmax(0,1fr))] gap-x-3'

const formatPrice = (value) => (value === null ? 'Custom' : `IDR ${value.toLocaleString('id-ID')}`)
const periodLabel = (cycle) => (cycle === 'yearly' ? 'per year' : 'per month')

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState('monthly') // 'monthly' | 'yearly'
  const [teamUsers, setTeamUsers] = useState(15) // 15 people -> Starter recommended

  // Recommended plan follows the number of people; used by BOTH cards and table
  const recommendedPlanId =
    PLANS_DATA.find((p) => teamUsers >= p.minUsers && teamUsers <= p.maxUsers)?.id ?? 'enterprise'

  const clampUsers = (n) => Math.max(1, Math.min(MAX_USERS, n))

  const handleUserInput = (val) => {
    const num = parseInt(val, 10)
    setTeamUsers(Number.isNaN(num) ? 1 : clampUsers(num))
  }

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl sm:text-6xl lg:text-[80px] font-bold tracking-[-0.04em] text-slate-950 leading-none">
            Pay Less, Get More.
          </h2>
          <p className="mt-6 sm:mt-7 text-base text-slate-500 leading-relaxed max-w-md mx-auto">
            From essential workflows to more advanced business operations, choose a Flovig plan that fits the way you work.
          </p>

          {/* Controls: team size (top) → billing toggle → promo caption */}
          <div className="mt-12 flex flex-col items-center gap-3">
            {/* Team size pill */}
            <div className="inline-flex items-center gap-3 rounded-full border border-[#7CC0FF] bg-white pl-5 pr-4 py-2">
              <div className="flex items-center gap-2 text-[#0A7CFF]">
                <img src="/member.svg" alt="" className="w-6 h-6 shrink-0 object-contain" />
                <span className="text-xl font-medium">Team</span>
              </div>

              <button
                type="button"
                onClick={() => setTeamUsers((prev) => clampUsers(prev + 1))}
                disabled={teamUsers >= MAX_USERS}
                aria-label="Add one person"
                className="text-slate-700 hover:text-[#0A7CFF] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <PlusCircle className="w-5 h-5" strokeWidth={1.75} />
              </button>

              <input
                type="number"
                min={1}
                max={MAX_USERS}
                value={teamUsers}
                onChange={(e) => handleUserInput(e.target.value)}
                aria-label="Number of people on your team"
                className="w-11 h-8 rounded-md bg-slate-100 text-center text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0A7CFF]/30 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />

              <button
                type="button"
                onClick={() => setTeamUsers((prev) => clampUsers(prev - 1))}
                disabled={teamUsers <= 1}
                aria-label="Remove one person"
                className="text-slate-700 hover:text-[#0A7CFF] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <MinusCircle className="w-5 h-5" strokeWidth={1.75} />
              </button>
            </div>

            {/* Billing switcher */}
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white">
              {['monthly', 'yearly'].map((cycle) => (
                <button
                  key={cycle}
                  type="button"
                  onClick={() => setBillingCycle(cycle)}
                  className={`px-6 py-3 rounded-full text-sm capitalize transition-colors duration-200 cursor-pointer ${
                    billingCycle === cycle
                      ? 'bg-[#0A7CFF] text-white'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {cycle}
                </button>
              ))}
            </div>

            {/* Promo caption */}
            <span className="text-xs font-medium text-slate-900">
              Get <span className="text-[#0A7CFF]">50%</span> off on yearly plan 🤩
            </span>
          </div>
        </div>

        {/* Pricing cards: recommended plan = dark, slightly taller card */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-x-6 lg:gap-y-10 items-stretch text-left">
          {PLANS_DATA.map((plan) => {
            const isDark = plan.id === recommendedPlanId
            const price = plan.price[billingCycle]

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-8 sm:p-10 flex flex-col transition-all duration-300 ${
                  isDark ? 'bg-[#0A3A75] text-white' : 'bg-slate-50 text-slate-900 lg:my-4'
                }`}
              >
                <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-600'}`}>
                  {plan.name}
                </span>

                <div className="mt-2 flex items-baseline gap-2.5">
                  <span className="text-[40px] leading-none font-bold tracking-tight">{formatPrice(price)}</span>
                  <span className={`text-base ${isDark ? 'text-white' : 'text-slate-500'}`}>
                    {periodLabel(billingCycle)}
                  </span>
                </div>

                <p className={`mt-4 text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {plan.desc}
                </p>

                <div className={`my-6 border-t border-dashed ${isDark ? 'border-white/25' : 'border-slate-300'}`} />

                <ul className="space-y-4">
                  {plan.items.map((text) => (
                    <li key={text} className="flex items-center gap-2.5 text-sm">
                      <CheckCircleIcon isDark={isDark} />
                      <span className={isDark ? 'text-white' : 'text-slate-500'}>{text}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  <a
                    href="#cta"
                    className={`w-full py-3 px-4 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition-colors duration-200 ${
                      isDark
                        ? 'bg-[#0A7CFF] hover:bg-[#006BE6] text-white'
                        : 'bg-white hover:bg-blue-50 text-[#0A7CFF] border border-[#0A7CFF]'
                    }`}
                  >
                    Starts 14 days free trial
                    <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Package comparison — same 6 plans, same prices, same highlight as the cards */}
        <div className="mt-28 sm:mt-32">
          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight">Package Comparison</h3>
            <p className="mt-4 text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
              Same access, only the user numbers that’s different. Not sure which plan is right for you? Contact our sales to find the right fit for your team.
            </p>
          </div>

          <div className="mt-14 overflow-x-auto">
            <div className="min-w-[1040px]">
              {/* Header */}
              <div className={`${TABLE_COLS} items-center mb-8`}>
                <div className="text-lg font-semibold text-slate-900 leading-snug">
                  Features Included
                  <br />
                  in the plans
                </div>
                {PLANS_DATA.map((plan) => {
                  const isDark = plan.id === recommendedPlanId
                  return (
                    <div
                      key={plan.id}
                      className={`rounded-xl py-5 px-2 text-center transition-colors duration-300 ${
                        isDark ? 'bg-[#0A3A75]' : 'bg-[#EEF3FD]'
                      }`}
                    >
                      <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{plan.name}</div>
                      <div className={`mt-0.5 text-base font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {formatPrice(plan.price[billingCycle])}
                      </div>
                      <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {periodLabel(billingCycle)}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Rows */}
              {COMPARISON_ROWS.map((row, i) => (
                <div
                  key={row.feature}
                  className={`${TABLE_COLS} items-center min-h-[78px] rounded-lg ${i % 2 === 1 ? 'bg-slate-50' : ''}`}
                >
                  <div className="pl-7 text-sm text-slate-600">{row.feature}</div>
                  {PLANS_DATA.map((plan) => {
                    const value = row.values[plan.id]
                    return (
                      <div key={plan.id} className="flex justify-center text-center text-sm text-slate-500">
                        {typeof value === 'boolean' ? <TableCheck active={value} /> : value}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingSection