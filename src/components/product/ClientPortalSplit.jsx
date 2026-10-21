import { useState } from 'react'
import { 
  Globe2, 
  Lock, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Clock, 
  Download,
  ThumbsUp
} from 'lucide-react'

export function ClientPortalSplit() {
  const [activePortalView, setActivePortalView] = useState('client') // 'client' | 'internal'
  const [isApproved, setIsApproved] = useState(false)

  return (
    <div className="bg-white rounded-2xl border border-[#E5E8F0] shadow-flovig overflow-hidden">
      {/* Switcher Bar with clear visual distinction */}
      <div className="p-4 bg-[#F8FAFC] border-b border-[#E5E8F0] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#64748B]">Simulasi Perspektif:</span>
          <div className="flex items-center p-1 bg-white rounded-xl border border-[#E5E8F0]">
            <button
              onClick={() => setActivePortalView('client')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activePortalView === 'client'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-[#475467] hover:text-[#101828]'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>Portal Klien (Publik Bersih)</span>
            </button>
            <button
              onClick={() => setActivePortalView('internal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activePortalView === 'internal'
                  ? 'bg-[#111A2E] text-white shadow-xs'
                  : 'text-[#475467] hover:text-[#101828]'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Workspace Internal Tim (Rahasia)</span>
            </button>
          </div>
        </div>

        <div className="text-xs">
          {activePortalView === 'client' ? (
            <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Catatan & Biaya Internal Tersembunyi Otomatis
            </span>
          ) : (
            <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              Semua Catatan Teknis & Biaya Terbuka Penuh
            </span>
          )}
        </div>
      </div>

      {/* VIEW: CLIENT PORTAL */}
      {activePortalView === 'client' && (
        <div className="p-5 sm:p-7 space-y-6 bg-gradient-to-b from-[#F9FCFB] to-white">
          {/* Client Welcome Banner */}
          <div className="p-4 rounded-xl bg-white border border-emerald-100 shadow-2xs flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold mb-1">
                <Globe2 className="w-4 h-4 text-emerald-600" />
                <span>Portal Klien: PT Nusantara Digital</span>
              </div>
              <h4 className="text-base font-bold text-[#101828]">
                Proyek: Redesign Platform E-Commerce V2
              </h4>
              <p className="text-xs text-[#64748B] mt-0.5">
                Progres Keseluruhan: 78% • Estimasi Peluncuran: 28 Oktober
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs font-bold text-[#101828]">Sprint 3 dari 4</div>
                <div className="text-[10px] text-emerald-600 font-semibold">Tepat Waktu</div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center font-bold text-xs text-[#101828]">
                78%
              </div>
            </div>
          </div>

          {/* Pending Deliverables for Client Approval */}
          <div className="space-y-3">
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#64748B] flex items-center justify-between">
              <span>Deliverable Memerlukan Persetujuan (Sign-off)</span>
              <span className="text-xs text-emerald-700 font-semibold">1 Menunggu Tindakan</span>
            </h5>

            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h6 className="font-bold text-xs text-[#101828]">Sprint 3: High-Fidelity UI Prototype & Specs</h6>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                      Butuh Approval
                    </span>
                  </div>
                  <p className="text-xs text-[#475467] mt-1">
                    Silakan tinjau prototipe Figma dan checklist alur checkout sebelum kami memulai fase coding frontend.
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-[#64748B]">
                    <span className="flex items-center gap-1 font-medium text-emerald-700">
                      <Download className="w-3 h-3" /> Unduh Dokumen Ringkasan (.PDF)
                    </span>
                    <span>•</span>
                    <span>Diserahkan oleh Sarah Amanda</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                {isApproved ? (
                  <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Disetujui oleh Klien</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsApproved(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>Setujui Deliverable</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Clean Public Milestones */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#64748B] mb-3">
              Tahapan & Milestone Publik
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-[#E5E8F0]">
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Tahap 1: Discovery</span>
                </div>
                <div className="text-[#101828] font-bold">Wireframe & Arsitektur</div>
                <div className="text-[10px] text-[#94A3B8] mt-1">Selesai 02 Okt 2026</div>
              </div>

              <div className="p-3 rounded-xl bg-white border-2 border-emerald-500 shadow-xs">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Tahap 2: UI Design</span>
                </div>
                <div className="text-[#101828] font-bold">High Fidelity Prototype</div>
                <div className="text-[10px] text-emerald-700 font-medium mt-1">Review Sedang Berlangsung</div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E8F0] opacity-80">
                <div className="flex items-center gap-1.5 text-[#94A3B8] font-semibold mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Tahap 3: Development</span>
                </div>
                <div className="text-[#64748B] font-bold">Integrasi & Testing</div>
                <div className="text-[10px] text-[#94A3B8] mt-1">Mulai 15 Okt 2026</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: INTERNAL WORKSPACE */}
      {activePortalView === 'internal' && (
        <div className="p-5 sm:p-7 space-y-5 bg-[#FAFBFD]">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-700" />
              <span className="font-bold">Hanya Karyawan Internal yang Memiliki Akses</span>
            </div>
            <span className="font-semibold text-[11px] bg-amber-200/60 px-2 py-0.5 rounded">
              Klien Dilarang Mengakses
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Internal Budget & Profit Margin */}
            <div className="p-4 rounded-xl bg-white border border-[#E5E8F0] shadow-2xs space-y-2">
              <h5 className="font-bold text-[#101828] flex items-center justify-between">
                <span>Margin Biaya & Kontrak Internal</span>
                <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded">Rahasia</span>
              </h5>
              <div className="text-sm font-bold text-[#101828]">Nilai Kontrak: Rp 120.000.000</div>
              <div className="text-xs text-[#64748B]">Estimasi Beban Jam Tim: Rp 48.000.000 (Target Margin 60%)</div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-purple-600 h-full w-[40%] rounded-full"></div>
              </div>
              <p className="text-[10px] text-[#94A3B8]">Data ini otomatis di-filter dan tidak terlihat pada Portal Klien.</p>
            </div>

            {/* Internal Scratchpad / Technical Notes */}
            <div className="p-4 rounded-xl bg-white border border-[#E5E8F0] shadow-2xs space-y-2">
              <h5 className="font-bold text-[#101828] flex items-center justify-between">
                <span>Catatan Teknis & Dapur Tim</span>
                <span className="text-[10px] font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded">Internal</span>
              </h5>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[#344054] text-[11px] leading-relaxed">
                "API Midtrans sandbox sempat timeout kemarin. Rian sudah buat fallback mock token agar demo ke klien tidak terganggu."
              </div>
              <p className="text-[10px] text-[#94A3B8]">Diskusi internal tetap aman dan fokus tanpa khawatir dinilai klien.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
