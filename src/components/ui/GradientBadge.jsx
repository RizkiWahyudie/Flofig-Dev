import { useId, useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { MousePointerClick } from 'lucide-react'

// Warna sama dengan ripple di video. Awal dan akhir sama supaya gradien bisa berulang mulus.
const COLORS = ['#315CF5', '#7EF0D0', '#7C3AED', '#315CF5']
const PERIOD = 260 // lebar satu siklus gradien (px)
const SW = 1.5 // tebal border (px)

/**
 * Badge pil dengan border gradien yang bergerak, ala ClickUp.
 * Default : border abu-abu, satu ruas berwarna (30% keliling) berjalan mengelilingi pil.
 * Hover   : seluruh border berwarna, warnanya mengalir, ruas makin cepat, glow halus.
 * Fokus keyboard memicu state yang sama. Reduced-motion: border penuh warna, diam.
 *
 * Border digambar sebagai <path> SVG yang diukur dari ukuran tombol (tidak bergantung
 * pada trik CSS conic-gradient/aspect-ratio), lalu dianimasikan dengan GSAP.
 */
export function GradientBadge({ children, onClick, className = '' }) {
  const rootRef = useRef(null)
  const svgRef = useRef(null)
  const baseRef = useRef(null)
  const beamRef = useRef(null)
  const glowRef = useRef(null)
  const gradRef = useRef(null)
  const arrowRef = useRef(null)
  const uid = useId().replace(/:/g, '')
  const gid = `gb-grad-${uid}`
  const fid = `gb-blur-${uid}`

  useLayoutEffect(() => {
    const root = rootRef.current
    const svg = svgRef.current
    const paths = [baseRef.current, beamRef.current, glowRef.current]
    const beam = beamRef.current
    const glow = glowRef.current
    const grad = gradRef.current
    const arrow = arrowRef.current

    const init = () => {
      const w = root.offsetWidth
      const h = root.offsetHeight
      if (!w || !h) return () => {}

      // path pil (rounded rect penuh) di dalam kotak w x h
      const r = (h - SW) / 2
      const x0 = SW / 2, y0 = SW / 2, x1 = w - SW / 2, y1 = h - SW / 2
      const d = `M${x0 + r},${y0} H${x1 - r} A${r},${r} 0 0 1 ${x1 - r},${y1} H${x0 + r} A${r},${r} 0 0 1 ${x0 + r},${y0} Z`
      svg.setAttribute('width', w)
      svg.setAttribute('height', h)
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`)
      paths.forEach((p) => p.setAttribute('d', d))

      const L = beam.getTotalLength()
      const seg = L * 0.3
      const full = `${L} 0`
      const partial = `${seg} ${L - seg}`
      gsap.set(glow, { strokeDasharray: full, opacity: 0 })

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(beam, { strokeDasharray: full })
        return () => {}
      }

      gsap.set(beam, { strokeDasharray: partial, strokeDashoffset: 0 })
      // ruas berjalan mengelilingi pil
      const run = gsap.to(beam, { strokeDashoffset: -L, duration: 3.6, repeat: -1, ease: 'none' })
      // warna mengalir (gradien bergeser tepat satu siklus => loop mulus)
      const flow = gsap.fromTo(grad, { attr: { x1: 0, x2: PERIOD } }, { attr: { x1: PERIOD, x2: PERIOD * 2 }, duration: 2.4, repeat: -1, ease: 'none' })

      const on = () => {
        gsap.to(run, { timeScale: 2.2, duration: 0.5, overwrite: 'auto' })
        gsap.to(beam, { strokeDasharray: full, duration: 0.5, ease: 'power2.out' })
        gsap.to(glow, { opacity: 0.55, duration: 0.4 })
        gsap.to(arrow, { x: 3, duration: 0.3, ease: 'power2.out' })
      }
      const off = () => {
        gsap.to(run, { timeScale: 1, duration: 0.6, overwrite: 'auto' })
        gsap.to(beam, { strokeDasharray: partial, duration: 0.5, ease: 'power2.inOut' })
        gsap.to(glow, { opacity: 0, duration: 0.45 })
        gsap.to(arrow, { x: 0, duration: 0.3, ease: 'power2.out' })
      }
      const events = [['mouseenter', on], ['mouseleave', off], ['focus', on], ['blur', off]]
      events.forEach(([e, fn]) => root.addEventListener(e, fn))

      return () => {
        events.forEach(([e, fn]) => root.removeEventListener(e, fn))
        run.kill()
        flow.kill()
        gsap.killTweensOf([beam, glow, arrow])
      }
    }

    let cleanup = init()
    // ukur ulang bila lebar berubah (mis. font selesai dimuat / resize)
    let first = true
    const ro = new ResizeObserver(() => {
      if (first) { first = false; return }
      cleanup()
      cleanup = init()
    })
    ro.observe(root)

    return () => {
      ro.disconnect()
      cleanup()
    }
  }, [])

  return (
    <button
      ref={rootRef}
      type="button"
      onClick={onClick}
      className={`group relative inline-flex cursor-pointer rounded-full focus:outline-none ${className}`}
    >
      {/* border: dasar abu-abu + ruas gradien + glow (di belakang isi) */}
      <svg
        ref={svgRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0"
        style={{ overflow: 'visible' }}
        width="0"
        height="0"
      >
        <defs>
          <linearGradient ref={gradRef} id={gid} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={PERIOD} y2="0" spreadMethod="repeat">
            {COLORS.map((c, i) => (
              <stop key={i} offset={i / (COLORS.length - 1)} stopColor={c} />
            ))}
          </linearGradient>
          <filter id={fid} x="-30%" y="-150%" width="160%" height="400%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        <path ref={baseRef} fill="none" stroke="#DDE2EC" strokeWidth={SW} />
        <path ref={glowRef} fill="none" stroke={`url(#${gid})`} strokeWidth="5" filter={`url(#${fid})`} opacity="0" />
        <path ref={beamRef} fill="none" stroke={`url(#${gid})`} strokeWidth={SW} strokeLinecap="round" />
      </svg>

      {/* isi badge, margin = tebal border supaya border terlihat di sekelilingnya */}
      <span
        className="relative inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#101828]"
        style={{ margin: SW }}
      >
        {children}
        <span ref={arrowRef} className="inline-flex">
          <MousePointerClick
            className="h-5 w-5"
            style={{
              stroke: `url(#${gid})`,
            }}
          />
        </span>
      </span>
    </button>
  )
}
