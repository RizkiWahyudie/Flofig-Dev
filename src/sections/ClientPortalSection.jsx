import { Container } from '../components/layout/Container'
import { Badge } from '../components/ui/Badge'
import { ClientPortalSplit } from '../components/product/ClientPortalSplit'
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react'

export function ClientPortalSection() {
  return (
    <section id="client-portal" className="py-24 bg-[#FAFBFD] border-b border-[#E5E8F0]">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="mint" size="md" dot={true} className="mb-4">
            PORTAL KLIEN KHUSUS
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101828] tracking-tight">
            Berikan klien visibilitas tanpa{' '}
            <span className="text-[#315CF5]">membuka seluruh workspace.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B]">
            Bagikan progres proyek dan deliverable kepada klien secara profesional tanpa membocorkan catatan internal tim, margin keuntungan, atau obrolan dapur teknis.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-xs font-semibold text-[#475467]">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Pemisahan Data Internal &amp; Publik Otomatis
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Alur Persetujuan (Sign-off) Deliverable Klien
          </span>
          <span className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-600" />
            Margin Biaya &amp; Catatan Rahasia Terproteksi 100%
          </span>
        </div>

        {/* The interactive client portal split component */}
        <div className="max-w-5xl mx-auto">
          <ClientPortalSplit />
        </div>
      </Container>
    </section>
  )
}
