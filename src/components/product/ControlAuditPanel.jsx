import { useState } from 'react'
import { auditLogs } from '../../data/mockData'
import { 
  ShieldCheck, 
  KeyRound, 
  History,
  CheckCircle2
} from 'lucide-react'

export function ControlAuditPanel() {
  const [activeTab, setActiveTab] = useState('audit') // 'audit' | 'roles'

  const roles = [
    { role: 'Workspace Owner', access: 'Akses penuh ke seluruh organisasi, billing, dan manajemen member', badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
    { role: 'Project Manager', access: 'Membuat proyek, mengatur sprint, rebalance beban kerja, approval deliverable', badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    { role: 'Team Member', access: 'Memperbarui task, mengirim komentar, upload file, melihat sprint board', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    { role: 'Client Portal Viewer', access: 'Hanya melihat milestone publik, deliverable untuk approval, dan dokumen final', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30' }
  ]

  return (
    <div className="bg-[#111A2E] text-white rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
      {/* Control Navigation Header */}
      <div className="p-4 bg-[#0B0F19]/80 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-white/5 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('audit')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'audit'
                  ? 'bg-[#315CF5] text-white shadow-xs'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Audit Trail Real-time</span>
            </button>
            <button
              onClick={() => setActiveTab('roles')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'roles'
                  ? 'bg-[#315CF5] text-white shadow-xs'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Hierarki Hak Akses (Roles)</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-white/60">
          <ShieldCheck className="w-4 h-4 text-[#7EF0D0]" />
          <span>Keamanan Data & Pelacakan Audit Otomatis</span>
        </div>
      </div>

      {/* AUDIT LOG TAB */}
      {activeTab === 'audit' && (
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-white/50 pb-2 border-b border-white/5">
            <span>Aktivitas Terbaru di Seluruh Workspace</span>
            <span className="font-mono text-[#7EF0D0]">Sinkronisasi Aktif • 0.2s latency</span>
          </div>

          <div className="space-y-2.5">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#7EF0D0] shrink-0"></div>
                  <div>
                    <span className="font-bold text-white">{log.user}</span>
                    <span className="text-white/60 mx-1.5">{log.action}</span>
                    <span className="text-[#93C5FD] font-semibold">{log.target}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-white/40 font-mono text-[11px] pl-5 sm:pl-0">
                  <span>{log.time}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ROLES TAB */}
      {activeTab === 'roles' && (
        <div className="p-5 sm:p-6 space-y-3">
          <p className="text-xs text-white/70 mb-4">
            Pastikan setiap anggota tim dan klien hanya memiliki visibilitas yang sesuai dengan tanggung jawabnya.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {roles.map((r) => (
              <div
                key={r.role}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#315CF5]/50 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-bold text-sm text-white">{r.role}</h5>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${r.badge}`}>
                    Tingkat Akses
                  </span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">{r.access}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
