import { Container } from '../components/layout/Container'
import { Badge } from '../components/ui/Badge'
import { ControlAuditPanel } from '../components/product/ControlAuditPanel'
import { Key, History, Lock } from 'lucide-react'

export function ControlSection() {
  return (
    <section id="control" className="py-24 bg-[#0B0F19] text-white border-b border-white/10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#315CF5]/10 rounded-full blur-3xl pointer-events-none"></div>

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="dark" size="md" dot={true} className="mb-4 bg-white/10 text-[#7EF0D0] border-white/15">
            KONTROL &amp; AKUNTABILITAS
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Kontrol penuh dengan{' '}
            <span className="text-[#7EF0D0]">audit trail dan role permission.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#94A3B8]">
            Kelola batasan akses bertingkat untuk anggota tim dan klien luar. Pantau setiap aktivitas penting melalui log audit otomatis yang transparan.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-xs font-semibold text-white/70">
          <span className="flex items-center gap-2">
            <Key className="w-4 h-4 text-[#7EF0D0]" />
            Hierarki Hak Akses 4 Tingkat
          </span>
          <span className="flex items-center gap-2">
            <History className="w-4 h-4 text-[#7EF0D0]" />
            Audit Trail Aktivitas Real-time
          </span>
          <span className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#7EF0D0]" />
            Multi-Tenant Isolation
          </span>
        </div>

        {/* Dark Control and Audit Panel */}
        <div className="max-w-5xl mx-auto">
          <ControlAuditPanel />
        </div>
      </Container>
    </section>
  )
}
