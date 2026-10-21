import { useState } from 'react'
import { 
  Send, 
  Video, 
  Paperclip,
  Calendar,
  CheckCircle2,
  ExternalLink
} from 'lucide-react'

export function CollaborationModal() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Sarah Amanda',
      role: 'Lead Designer',
      avatar: 'SA',
      avatarBg: 'bg-emerald-500',
      time: '14:20 WIB',
      text: 'File token Figma V2 sudah di-export. Semua token warna sudah disesuaikan dengan WCAG 2.1 AA.',
      attachment: { name: 'design-tokens-v2.json', size: '42 KB' }
    },
    {
      id: 2,
      author: 'Budi Pratama',
      role: 'Frontend Dev',
      avatar: 'BP',
      avatarBg: 'bg-blue-500',
      time: '14:35 WIB',
      text: '@Sarah Terima kasih! Sudah saya sync ke Tailwind theme config. Sekarang sedang slicing komponen button dan modal.',
      attachment: null
    }
  ])
  const [inputText, setInputText] = useState('')

  const handleSendComment = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const newComment = {
      id: Date.now(),
      author: 'Dewa Bagus (Anda)',
      role: 'Project Manager',
      avatar: 'DB',
      avatarBg: 'bg-rose-500',
      time: 'Baru saja',
      text: inputText,
      attachment: null
    }

    setComments([...comments, newComment])
    setInputText('')
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E5E8F0] shadow-flovig-lg overflow-hidden">
      {/* Task Drawer Header */}
      <div className="p-4 sm:p-5 bg-[#FAFBFD] border-b border-[#E5E8F0] flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
            <span className="font-mono font-bold text-[#315CF5]">TSK-101</span>
            <span>•</span>
            <span className="bg-[#EAF0FF] text-[#2045D8] px-2 py-0.5 rounded font-semibold text-[10px]">
              Sprint 4
            </span>
            <span>•</span>
            <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium text-[10px]">
              Prioritas Tinggi
            </span>
          </div>
          <h3 className="font-bold text-base text-[#101828]">
            Finalisasi Sistem Desain & Token Warna V2
          </h3>
        </div>

        {/* Google Meet Sync Action */}
        <div className="flex items-center gap-2">
          <a
            href="#meet"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-[#2045D8] border border-blue-200 text-xs font-semibold hover:bg-blue-100 transition-colors shadow-2xs"
          >
            <Video className="w-4 h-4 text-[#315CF5]" />
            <span>Google Meet Sync (15:00)</span>
          </a>
        </div>
      </div>

      {/* Task Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#E5E8F0]">
        {/* Left 2 Cols: Comments & Context Thread */}
        <div className="lg:col-span-2 p-4 sm:p-6 flex flex-col justify-between min-h-[380px] bg-white">
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] flex items-center justify-between">
              <span>Diskusi Kontekstual ({comments.length})</span>
              <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Tersinkronisasi Realtime
              </span>
            </div>

            {/* Comment Thread */}
            <div className="space-y-3.5">
              {comments.map((c) => (
                <div key={c.id} className="flex items-start gap-3 text-xs">
                  <div className={`w-7 h-7 rounded-full ${c.avatarBg} text-white font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5`}>
                    {c.avatar}
                  </div>
                  <div className="flex-1 bg-[#F8FAFC] p-3 rounded-xl border border-[#E5E8F0]">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-bold text-[#101828] flex items-center gap-1.5">
                        <span>{c.author}</span>
                        <span className="text-[10px] text-[#64748B] font-normal">({c.role})</span>
                      </div>
                      <span className="text-[10px] text-[#94A3B8]">{c.time}</span>
                    </div>
                    <p className="text-[#344054] leading-relaxed">{c.text}</p>

                    {c.attachment && (
                      <div className="mt-2 inline-flex items-center gap-2 p-2 rounded-lg bg-white border border-[#E5E8F0] text-[11px] font-medium text-[#101828]">
                        <Paperclip className="w-3.5 h-3.5 text-[#315CF5]" />
                        <span>{c.attachment.name}</span>
                        <span className="text-[#94A3B8]">({c.attachment.size})</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Input Form */}
          <form onSubmit={handleSendComment} className="mt-4 pt-3 border-t border-[#E5E8F0] flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Tulis balasan atau gunakan @mention tim..."
                className="w-full pl-3 pr-10 py-2.5 bg-[#F8FAFC] border border-[#E5E8F0] rounded-xl text-xs text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#315CF5]/50 focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setInputText((prev) => prev + ' @Sarah ')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[#315CF5] hover:underline"
              >
                @Mention
              </button>
            </div>
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-[#315CF5] hover:bg-[#2045D8] text-white shadow-xs transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right 1 Col: Meta & Attachments */}
        <div className="p-4 sm:p-5 bg-[#FAFBFD] space-y-4 text-xs">
          <div>
            <h5 className="font-bold text-[#101828] mb-2">Checklist Milestone</h5>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#344054]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="line-through text-[#94A3B8]">Audit rasio kontras warna</span>
              </div>
              <div className="flex items-center gap-2 text-[#344054]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="line-through text-[#94A3B8]">Eksport token format JSON</span>
              </div>
              <div className="flex items-center gap-2 text-[#344054]">
                <div className="w-4 h-4 rounded border-2 border-[#CBD5E1] shrink-0"></div>
                <span className="font-medium text-[#101828]">Verifikasi oleh Tim Klien</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E5E8F0]">
            <h5 className="font-bold text-[#101828] mb-2">Lampiran File Terhubung</h5>
            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-white border border-[#E5E8F0] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-purple-100 text-purple-700 font-bold text-[10px] flex items-center justify-center">
                    FIG
                  </div>
                  <div>
                    <div className="font-semibold text-[#101828] text-[11px]">Design-System-2.0.fig</div>
                    <div className="text-[9px] text-[#94A3B8]">Figma File • 14 MB</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#94A3B8] hover:text-[#315CF5] cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E5E8F0]">
            <h5 className="font-bold text-[#101828] mb-1.5">Koneksi Kalender</h5>
            <div className="p-2.5 rounded-lg bg-[#EAF0FF]/60 border border-[#315CF5]/20 text-[11px] text-[#2045D8]">
              <div className="font-semibold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Review Desain Mingguan
              </div>
              <div className="text-[10px] text-[#64748B] mt-0.5">Hari ini, 15:00 - 15:45 WIB</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
