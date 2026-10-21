import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
 
// Plugin lain (Flip, Draggable, Physics2DPlugin, dll) didaftarkan nanti
// saat section yang memakainya dikerjakan. Semua plugin GSAP sudah gratis.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, MotionPathPlugin)
}
 
export { gsap, ScrollTrigger, TextPlugin, MotionPathPlugin }
export default gsap
