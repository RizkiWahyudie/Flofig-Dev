import { Container } from '../components/layout/Container'
import { Badge } from '../components/ui/Badge'
import { CollaborationModal } from '../components/product/CollaborationModal'
import { MessageSquare, Video, Paperclip } from 'lucide-react'

export function CollaborationSection() {
  return (
    <section id="collaboration" className="py-24 bg-white border-b border-[#E5E8F0]">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="purple" size="md" dot={true} className="mb-4">
            KOLABORASI DALAM KONTEKS
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101828] tracking-tight">
            Percakapan tetap dekat dengan{' '}
            <span className="text-[#315CF5]">pekerjaan.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B]">
            Jangan biarkan konteks hilang di grup chat terpisah. Diskusi, tautan Google Meet, file lampiran, dan checklist tersimpan rapi di dalam kartu task yang sedang dikerjakan.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-xs font-semibold text-[#475467]">
          <span className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#315CF5]" />
            Komentar &amp; Mention Tim Terfokus
          </span>
          <span className="flex items-center gap-2">
            <Video className="w-4 h-4 text-rose-500" />
            Integrasi Langsung Google Meet
          </span>
          <span className="flex items-center gap-2">
            <Paperclip className="w-4 h-4 text-emerald-600" />
            File Figma, JSON, PDF Terikat ke Task
          </span>
        </div>

        {/* The interactive collaboration modal component */}
        <div className="max-w-5xl mx-auto">
          <CollaborationModal />
        </div>
      </Container>
    </section>
  )
}
