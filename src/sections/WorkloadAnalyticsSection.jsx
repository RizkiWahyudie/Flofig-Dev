import { Container } from '../components/layout/Container'
import { Badge } from '../components/ui/Badge'
import { WorkloadHeatmap } from '../components/product/WorkloadHeatmap'
import { Users, HeartPulse } from 'lucide-react'

export function WorkloadAnalyticsSection() {
  return (
    <section id="workload" className="py-24 bg-[#FAFBFD] border-b border-[#E5E8F0]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            <Badge variant="mint" size="md" dot={true}>
              KAPASITAS &amp; ANALITIK TIM
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101828] tracking-tight leading-tight">
              Lihat beban kerja sebelum menjadi{' '}
              <span className="text-[#315CF5]">hambatan proyek.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              Cegah kelelahan (burnout) tim dan keterlambatan deadline. Flovig menghitung kapasitas jam kerja secara presisi dari seluruh proyek aktif.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#E5E8F0] shadow-2xs flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#101828]">Deteksi Dini Overcapacity</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Peringatan otomatis muncul ketika salah satu anggota tim dialokasikan lebih dari 40 jam per minggu.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E5E8F0] shadow-2xs flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100 text-[#2045D8] shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#101828]">Seimbangkan Alokasi Tugas (Rebalance)</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Pindahkan task secara cepat dari anggota tim yang sedang sibuk ke rekan yang masih memiliki ruang kapasitas.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#EAF0FF]/70 border border-[#315CF5]/20 text-xs text-[#2045D8]">
              💡 <strong>Coba interaksi di samping:</strong> Klik tombol <em>"Seimbangkan Alokasi Tugas"</em> pada panel mockup untuk melihat redistribusi beban kerja secara instan!
            </div>
          </div>

          {/* Right Column: Workload Heatmap Component */}
          <div className="lg:col-span-7">
            <WorkloadHeatmap />
          </div>
        </div>
      </Container>
    </section>
  )
}
