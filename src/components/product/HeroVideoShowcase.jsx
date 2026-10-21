import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import {
  LayoutDashboard,
  Kanban,
  MessageSquare,
  BarChart3,
  Bell,
  Ticket,
  CalendarCheck,
  GitFork,
  MousePointer2,
} from 'lucide-react'

const VIDEO_SRC = '/asset/flovig-hero-full.mp4'
const POSTER_SRC = '/asset/flovig-hero-full-poster.webp'

// Waktu (detik) tiap bagian di dalam video flovig-hero-full.mp4
const chapters = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, start: 0, end: 3.6, caption: 'Pantau performa tim secara real-time' },
  { id: 'board', label: 'Kanban & List', icon: Kanban, start: 3.6, end: 12.0, caption: 'Atur pekerjaan dengan drag & drop' },
  { id: 'discuss', label: 'Diskusi Task', icon: MessageSquare, start: 12.0, end: 18.8, caption: 'Mention, reaksi, dan keputusan dalam satu thread' },
  { id: 'gantt', label: 'Gantt & Timesheet', icon: BarChart3, start: 18.8, end: 22.7, caption: 'Lihat jadwal proyek dalam satu timeline' },
  { id: 'notif', label: 'Notifikasi', icon: Bell, start: 22.7, end: 26.7, caption: 'Hubungkan Discord atau Slack dalam hitungan detik' },
  { id: 'ticket', label: 'Tiket', icon: Ticket, start: 26.7, end: 32.1, caption: 'Isu mendesak langsung memicu alert ke Discord' },
  { id: 'meet', label: 'Kalender & Meet', icon: CalendarCheck, start: 32.1, end: 41.5, caption: 'Link Google Meet otomatis, info meeting masuk ke chat' },
  { id: 'milestone', label: 'Milestone', icon: GitFork, start: 41.5, end: 44.7, caption: 'Dari milestone, sprint, hingga task terpetakan jelas' },
]

export function HeroVideoShowcase({ onDemoClick }) {
  const prefersReducedMotion = useReducedMotion()
  const [saveData] = useState(
    () => typeof navigator !== 'undefined' && !!navigator.connection?.saveData
  )
  const staticMode = prefersReducedMotion || saveData // tampilkan poster saja

  const videoRef = useRef(null)
  const windowRef = useRef(null)
  const captionRef = useRef(null)
  const cursorRef = useRef(null)
  const barRefs = useRef([])

  // ---- Play / pause saat masuk / keluar layar + sinkron chip dengan waktu video
  useEffect(() => {
    if (staticMode) return
    const v = videoRef.current
    if (!v) return
    v.muted = true // React kadang tidak menerapkan atribut muted -> autoplay diblokir

    const play = () => v.play().catch(() => {})
    const st = ScrollTrigger.create({
      trigger: windowRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => (self.isActive ? play() : v.pause()),
    })

    const onVisibility = () => (document.hidden ? v.pause() : st.isActive && play())
    document.addEventListener('visibilitychange', onVisibility)

    // --- TAMBAHKAN INI (SAMA SEPERTI DI Komponen HeroProduct) ---
    const onTimeUpdate = () => {
      const t = v.currentTime

      // Cari chapter yang sedang aktif berdasarkan detik video
      let currentChapter = chapters.find((c) => t >= c.start && t < c.end)

      // Jika keluar dari chapter terakhir, anggap tetap di chapter terakhir
      if (!currentChapter) {
        currentChapter = chapters[chapters.length - 1]
      }

      // Update teks caption
      if (captionRef.current) {
        // Hapus animasi typerwriter agar pergantian mulus
        gsap.killTweensOf(captionRef.current)

        // Langsung ganti teks tanpa animasi
        captionRef.current.innerText = currentChapter.caption
      }

      // Update progress bar
      chapters.forEach((c, i) => {
        // Hitung persentase progress (0-1)
        let progress = 0
        if (t >= c.start && t < c.end) {
          progress = (t - c.start) / (c.end - c.start)
        }

        // Jika t di akhir video, pastikan bar penuh 100%
        if (t >= c.end) {
          progress = 1
        }

        // Set scale transform hanya jika bar belum penuh
        if (barRefs.current[i]) {
          if (progress < 1) {
            barRefs.current[i].style.transform = `scaleX(${progress})`
          } else {
            barRefs.current[i].style.transform = `scaleX(1)`
          }
        }
      })
    }

    v.addEventListener('timeupdate', onTimeUpdate)

    return () => {
      st.kill()
      document.removeEventListener('visibilitychange', onVisibility)
      v.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [staticMode])

  // ---- Cursor label yang mengikuti mouse di atas jendela video (hanya perangkat hover)
  useEffect(() => {
    if (staticMode) return
    const win = windowRef.current
    const cursor = cursorRef.current
    if (!win || !cursor) return
    const mm = gsap.matchMedia()
    mm.add('(hover: hover) and (pointer: fine)', () => {
      gsap.set(cursor, { autoAlpha: 0, scale: 0.7 })
      const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' })
      const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' })
      const move = (e) => {
        const r = win.getBoundingClientRect()
        xTo(e.clientX - r.left)
        yTo(e.clientY - r.top)
      }
      const enter = () => gsap.to(cursor, { autoAlpha: 1, scale: 1, duration: 0.25, ease: 'back.out(2)' })
      const leave = () => gsap.to(cursor, { autoAlpha: 0, scale: 0.7, duration: 0.2 })
      win.addEventListener('mousemove', move)
      win.addEventListener('mouseenter', enter)
      win.addEventListener('mouseleave', leave)
      return () => {
        win.removeEventListener('mousemove', move)
        win.removeEventListener('mouseenter', enter)
        win.removeEventListener('mouseleave', leave)
      }
    })
    return () => mm.revert()
  }, [staticMode])

  return (
    <div className="relative w-full text-left">
      <p id="hero-video-desc" className="sr-only">
        Demo produk Flovig: dashboard, papan Kanban dan List, diskusi task, Gantt chart,
        koneksi Discord, tiket, kalender dengan Google Meet, chat, dan milestone.
      </p>

      {/* Jendela produk. Wrapper .hero-window dianimasikan scroll oleh HeroSection */}
      <div className="hero-window-wrap relative">
        <div className="hero-window relative rounded-[28px] p-2 sm:p-2.5 bg-white/70 border border-[#E5E8F0] shadow-flovig-lg">
          <div
            ref={windowRef}
            onClick={onDemoClick}
            className="relative rounded-[20px] overflow-hidden bg-[#F7F8FC] aspect-video lg:cursor-none"
          >
            {staticMode ? (
              <img
                src={POSTER_SRC}
                alt="Tampilan dashboard Flovig"
                className="w-full h-full object-cover"
                width={1600}
                height={900}
              />
            ) : (
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src={VIDEO_SRC}
                poster={POSTER_SRC}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                disablePictureInPicture
                disableRemotePlayback
                tabIndex={-1}
                aria-hidden="true"
                aria-describedby="hero-video-desc"
              />
            )}
          </div>

          {/* Cursor label */}
          {!staticMode && (
            <div
              ref={cursorRef}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-30 hidden lg:flex items-center gap-2 -translate-x-1 -translate-y-1"
              style={{ willChange: 'transform' }}
            >
              <MousePointer2 className="w-5 h-5 text-[#111A2E] fill-white drop-shadow" />
              <span className="mt-5 -ml-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#315CF5] to-[#7C3AED] text-white text-[11px] font-bold shadow-lg whitespace-nowrap">
                Lihat demo interaktif
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
