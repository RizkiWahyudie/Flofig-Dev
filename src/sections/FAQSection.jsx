import { useState } from 'react'
import { Container } from '../components/layout/Container'
import { faqList } from '../data/mockData'
import { ChevronDown } from 'lucide-react'

const FAQ_CSS = `
.faq-main-heading {
  font-size: clamp(26px, 3.2vw, 42px);
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.035em;
  color: #0F172A;
  margin: 0;
}
.faq-hl {
  position: relative;
  display: inline-block;
  padding-bottom: 4px;
  color: transparent;
  background: linear-gradient(90deg, #2563eb, #06b6d4);
  -webkit-background-clip: text;
  background-clip: text;
}
.faq-hl svg {
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 12px;
  overflow: visible;
  display: block;
}
.faq-hl path {
  fill: none;
  stroke: url(#faq-ulGrad);
  stroke-width: 3.2;
  stroke-linecap: round;
}
`

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx)
  }

  return (
    <section id="faq" className="py-24 bg-white">
      <style>{FAQ_CSS}</style>
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="faq-main-heading">
            Pertanyaan yang sering diajukan{' '}<br className="hidden sm:inline" />
            <span className="faq-hl">
              tentang Flovig.
              <svg viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="faq-ulGrad" x1="0" x2="1">
                    <stop offset="0" stopColor="#2563eb" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <path d="M3 8 C 80 2, 200 2, 297 7" />
              </svg>
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B]">
            Jawaban langsung tanpa basa-basi mengenai kapabilitas, batasan akses klien, serta fokus produk Flovig.
          </p>
        </div>

        {/* Minimalist Line-Divided Accordion List (matches reference image) */}
        <div className="max-w-3xl mx-auto divide-y divide-[#E5E8F0] border-b border-[#E5E8F0]">
          {faqList.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div key={idx} className="py-5 sm:py-6">
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left flex items-center justify-between gap-6 font-bold text-base sm:text-lg text-[#101828] hover:text-[#2563eb] transition-colors cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#475467] group-hover:text-[#101828] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#101828]' : ''
                    }`}
                    strokeWidth={2}
                  />
                </button>

                {isOpen && (
                  <div className="pt-3 pb-1 text-sm sm:text-base text-[#475467] leading-relaxed animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Still have questions banner */}
        {/* <div className="mt-14 max-w-xl mx-auto p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5E8F0] text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#315CF5]/10 text-[#315CF5] flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h5 className="font-bold text-xs sm:text-sm text-[#101828]">Punya pertanyaan teknis lain?</h5>
              <p className="text-[11px] text-[#64748B]">Tim kami siap membantu kebutuhan workflow Anda.</p>
            </div>
          </div>
          <a
            href="#cta"
            className="px-4 py-2 rounded-xl bg-[#111A2E] hover:bg-[#1f2d4d] text-white text-xs font-semibold whitespace-nowrap transition-colors"
          >
            Hubungi Tim Kami
          </a>
        </div> */}
      </Container>
    </section>
  )
}
