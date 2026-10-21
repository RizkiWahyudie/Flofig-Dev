import { Container } from '../components/layout/Container'
import { Badge } from '../components/ui/Badge'
import { TaskBoardInteractive } from '../components/product/TaskBoardInteractive'
import { CheckCircle2 } from 'lucide-react'

export function TaskManagementSection() {
  return (
    <section id="features" className="py-24 bg-white border-b border-[#E5E8F0]">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="blue" size="md" dot={true} className="mb-4">
            MANAJEMEN TUGAS MENDALAM
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101828] tracking-tight">
            Dari backlog sampai selesai,{' '}
            <span className="text-[#315CF5]">semua tetap terlihat.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B]">
            Pilih cara kerja yang paling nyaman bagi tim Anda. Ganti antara Kanban Board visual yang dinamis atau Detailed List view dalam satu klik.
          </p>
        </div>

        {/* Feature Highlights bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-xs font-semibold text-[#475467]">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Switch Kanban Board &amp; Detailed List
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Filter Kategori &amp; Prioritas Real-time
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Subtask, Checklist &amp; Pelacakan Tenggat
          </span>
        </div>

        {/* The interactive task board component */}
        <div className="max-w-6xl mx-auto">
          <TaskBoardInteractive />
        </div>
      </Container>
    </section>
  )
}
