import { useState } from 'react'
import { teamMembers as initialMembers } from '../../data/mockData'
import {
  RefreshCw,
  Clock,
} from 'lucide-react'

export function WorkloadHeatmap() {
  const [activeSubTab, setActiveSubTab] = useState('workload') // 'workload' | 'progress' | 'reports'
  const [isRebalanced, setIsRebalanced] = useState(false)

  // When rebalanced, Rian's hours shift to Jessica
  const members = initialMembers.map((m) => {
    if (!isRebalanced) return m
    if (m.id === 'rian') {
      return { ...m, hours: 37, status: 'Optimal (Diseimbangkan)' }
    }
    if (m.id === 'jessica') {
      return { ...m, hours: 31, status: 'Optimal' }
    }
    return m
  })

  return (
    <div className="bg-white rounded-2xl border border-[#E5E8F0] shadow-flovig overflow-hidden">
      {/* Sub Tabs */}
      <div className="p-4 bg-[#F8FAFC] border-b border-[#E5E8F0] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-[#E5E8F0]">
          <button
            onClick={() => setActiveSubTab('workload')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'workload' ? 'bg-[#315CF5] text-white' : 'text-[#475467] hover:text-[#101828]'
            }`}
          >
            Heatmap Kapasitas Tim
          </button>
          <button
            onClick={() => setActiveSubTab('progress')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'progress' ? 'bg-[#315CF5] text-white' : 'text-[#475467] hover:text-[#101828]'
            }`}
          >
            Burn-down & Progres
          </button>
          <button
            onClick={() => setActiveSubTab('reports')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'reports' ? 'bg-[#315CF5] text-white' : 'text-[#475467] hover:text-[#101828]'
            }`}
          >
            Laporan Alokasi Jam
          </button>
        </div>

        {/* Live Rebalance Interactive Simulation Button */}
        {activeSubTab === 'workload' && (
          <button
            onClick={() => setIsRebalanced(!isRebalanced)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isRebalanced
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-[#111A2E] text-white hover:bg-[#1f2d4d] shadow-sm'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRebalanced ? 'text-emerald-700' : 'text-[#7EF0D0]'}`} />
            <span>{isRebalanced ? '✓ Beban Kerja Seimbang (Reset)' : '⚡ Seimbangkan Alokasi Tugas'}</span>
          </button>
        )}
      </div>

      {/* Content 1: WORKLOAD HEATMAP */}
      {activeSubTab === 'workload' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#F1F4F9]">
            <div>
              <h4 className="text-sm font-bold text-[#101828]">Distribusi Jam Kerja Minggu Ini</h4>
              <p className="text-xs text-[#64748B]">Berdasarkan 5 anggota tim pada 2 proyek aktif</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Optimal (0-90%)
              </span>
              <span className="flex items-center gap-1.5 text-amber-700">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Mendekati Batas (90-100%)
              </span>
              <span className="flex items-center gap-1.5 text-rose-700">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                Overcapacity (&gt;100%)
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {members.map((member) => {
              const ratio = Math.round((member.hours / member.capacity) * 100)
              const isOver = ratio > 100
              const isNear = ratio >= 90 && ratio <= 100

              let barColor = 'bg-emerald-500'
              let textColor = 'text-emerald-700 bg-emerald-50 border-emerald-200'
              if (isOver) {
                barColor = 'bg-rose-500'
                textColor = 'text-rose-700 bg-rose-50 border-rose-200'
              } else if (isNear) {
                barColor = 'bg-amber-500'
                textColor = 'text-amber-700 bg-amber-50 border-amber-200'
              }

              return (
                <div
                  key={member.id}
                  className="p-3.5 rounded-xl border border-[#E5E8F0] hover:border-[#315CF5]/30 bg-white transition-all shadow-2xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${member.color} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                        {member.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-[#101828] flex items-center gap-2">
                          <span>{member.name}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${textColor}`}>
                            {member.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#64748B]">{member.role}</div>
                      </div>
                    </div>

                    <div className="text-right sm:text-right">
                      <div className="text-xs font-bold text-[#101828]">
                        {member.hours} <span className="text-[#94A3B8] font-normal">/ {member.capacity} Jam</span>
                        <span className="ml-2 font-mono text-xs">({ratio}%)</span>
                      </div>
                      <div className="text-[10px] text-[#94A3B8]">
                        {isOver ? 'Peringatan: 2 Jam Lembur Terdeteksi' : 'Kapasitas mingguan teratur'}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-[#F1F4F9] h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                      style={{ width: `${Math.min(ratio, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Content 2: SPRINT PROGRESS & BURNDOWN */}
      {activeSubTab === 'progress' && (
        <div className="p-4 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E8F0]">
              <span className="text-xs text-[#64748B]">Total Estimasi Sprint</span>
              <div className="text-xl font-bold text-[#101828] mt-1">128 Jam</div>
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">84% Selesai tepat waktu</span>
            </div>
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E8F0]">
              <span className="text-xs text-[#64748B]">Velocity Rata-rata</span>
              <div className="text-xl font-bold text-[#315CF5] mt-1">34 Story Points</div>
              <span className="text-[10px] text-[#64748B] mt-1 block">+12% dibanding Sprint lalu</span>
            </div>
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E8F0]">
              <span className="text-xs text-[#64748B]">Blocker / Kendala</span>
              <div className="text-xl font-bold text-emerald-600 mt-1">0 Tertunda</div>
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">Semua dependensi aman</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[#E5E8F0] bg-white">
            <h5 className="font-bold text-xs text-[#101828] mb-3">Grafik Penyelesaian Task Harian (Sprint 4)</h5>
            <div className="h-32 flex items-end justify-between gap-3 pt-6 px-2">
              {[
                { day: 'Sen', completed: 60, target: 50 },
                { day: 'Sel', completed: 80, target: 70 },
                { day: 'Rab', completed: 95, target: 90 },
                { day: 'Kam', completed: 110, target: 100 },
                { day: 'Jum', completed: 125, target: 120 }
              ].map((bar) => (
                <div key={bar.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="w-full max-w-[36px] bg-[#315CF5] rounded-t-md transition-all hover:bg-[#2045D8]" style={{ height: `${(bar.completed / 130) * 100}%` }}></div>
                  <span className="text-[10px] font-semibold text-[#64748B]">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content 3: ALOKASI JAM & TIMESHEET */}
      {activeSubTab === 'reports' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="p-4 rounded-xl bg-[#FAFBFD] border border-[#E5E8F0] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#315CF5]/10 text-[#315CF5] flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-xs text-[#101828]">Total Jam Kerja Terlacak</h5>
                <p className="text-[11px] text-[#64748B]">Bulan Berjalan: 171 Jam dari 190 Jam Kuota</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
              Efisiensi 90%
            </span>
          </div>

          <div className="border border-[#E5E8F0] rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] text-[#64748B] font-semibold border-b border-[#E5E8F0]">
                <tr>
                  <th className="py-2.5 px-4">Modul Proyek</th>
                  <th className="py-2.5 px-4">Alokasi Jam</th>
                  <th className="py-2.5 px-4">Kontributor Utama</th>
                  <th className="py-2.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#101828]">Design System & UI Kit</td>
                  <td className="py-3 px-4 text-[#475467]">34 Jam</td>
                  <td className="py-3 px-4 text-[#475467]">Sarah Amanda</td>
                  <td className="py-3 px-4 text-emerald-700 font-semibold">100% Selesai</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#101828]">Payment Gateway & API</td>
                  <td className="py-3 px-4 text-[#475467]">41 Jam</td>
                  <td className="py-3 px-4 text-[#475467]">Rian Kurniawan</td>
                  <td className="py-3 px-4 text-[#315CF5] font-semibold">75% Berjalan</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#101828]">Frontend Checkout</td>
                  <td className="py-3 px-4 text-[#475467]">38 Jam</td>
                  <td className="py-3 px-4 text-[#475467]">Budi Pratama</td>
                  <td className="py-3 px-4 text-amber-700 font-semibold">50% Berjalan</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
