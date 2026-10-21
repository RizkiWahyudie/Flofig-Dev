# FLOVIG — Landing Page Redesign Brief for Antigravity
## Vite + React + JavaScript + Tailwind CSS + GSAP

## Mission

Completely redesign and implement the Flovig marketing landing page. Treat the current design as a failed first draft. Do not patch it or preserve its layout. Rebuild the visual hierarchy, page narrative, product mockups, responsive behavior, and motion system from scratch.

Build a real, runnable frontend—not just a design proposal. Inspect the existing repository first, preserve useful configuration, then implement the full page and verify it builds.

## Required deliverables

- Working Vite + React + JavaScript application.
- Tailwind CSS configured and used consistently.
- GSAP + ScrollTrigger implemented for meaningful page storytelling.
- Responsive desktop, tablet, and mobile experiences.
- Reusable components and maintainable project structure.
- Product UI mockups built in HTML/CSS/React, not generic stock images.
- Functional navigation, mobile menu, tabs, accordions, board/list switcher, CTA interactions.
- Reduced-motion support and performance-conscious animation.
- README with setup/run instructions and brief explanation of the motion architecture.
- Do not stop after producing a plan. Implement the actual application.

## Product and V1 scope

Flovig is a **Project & Work Management workspace** that helps teams plan, execute, collaborate, and monitor work in one place.

V1 capabilities: dashboard, projects, tasks, board/list views, sprints, recurring tasks, milestones, tickets/bug tracking, customer requests, team workload, analytics, reports, timesheets, budgets, files, knowledge base, project chat, calendar, notifications, client portal, companies/workspace members, roles and permissions, invoices, payment history, activity logs, global search, and Google Meet integration.

### Explicitly excluded from V1
Do not represent these as available features:
- HRIS, attendance, face recognition, shifts, leave, overtime, reimbursement, payroll.
- AI assistant, AI agent, Company Brain, AI-generated insights, AI automation.

If roadmap content is included, separate it clearly from available features. Do not place HRIS or AI in the hero, product showcase, pricing benefits, or product mockups.

## Diagnosis of the current design

The current draft feels like a generic template:
- Too many repeated centered headings and small card grids.
- Pale lavender backgrounds repeat across too many sections.
- The hero product UI is too small and lacks visual dominance.
- Sections explain features in isolated cards instead of showing a connected workflow.
- Most sections have similar visual weight; there are no signature moments.
- The composition is too symmetrical and predictable.
- Animations feel like decoration rather than product storytelling.

Do not just increase font sizes or add gradients. Rethink the whole composition and narrative.

## Art direction

### Benchmark
Use ClickUp's landing page as a benchmark for quality, visual storytelling, headline scale, layered product windows, interactive showcases, scroll-based transitions, and purposeful animation. Do **not** copy ClickUp's exact layout, branding, colors, wording, illustrations, UI patterns, or product positioning. Flovig must have an original identity.

### Brand
Confident, modern, product-led, focused, approachable, premium without feeling overly corporate.

### Suggested design tokens
- Ink: `#101828`
- Navy: `#111A2E`
- Primary blue: `#315CF5`
- Deep blue: `#2045D8`
- Mint: `#7EF0D0`
- Canvas: `#F7F8FC`
- White: `#FFFFFF`
- Muted text: `#667085`
- Border: `#E5E8F0`
- Soft blue: `#EAF0FF`

Use neutral surfaces for most of the page, cobalt blue for primary actions, and mint selectively for success/progress states. Do not use pale lavender as the background of almost every section.

Use Plus Jakarta Sans or Manrope for headings and Inter for body/UI text. Use responsive heading sizes via `clamp()`. Product UI must be readable—not microscopic. Use consistent 12–20px corner radii, restrained shadows, subtle borders, and selective depth. Not every element should be inside a card.

## New page architecture

Create distinct section compositions. Do not make every section a centered title plus four/six cards.

### 1. Navbar
Compact premium navbar with Flovig wordmark, Product, Solutions, Resources, Pricing, Login, and primary CTA “Mulai Sekarang”. Add a restrained translucent/blurred state on scroll if useful. Mobile navigation must work and be accessible.

### 2. Hero — one strong composition
Copy:
- Eyebrow: `PROJECT & WORK MANAGEMENT`
- H1: `Semua pekerjaan tim. Satu workspace.`
- Body: `Rencanakan project, kelola task, pantau workload, dan satukan kolaborasi tim tanpa kehilangan konteks.`
- Primary CTA: `Mulai Sekarang`
- Secondary CTA: `Jelajahi Produk`

Do not place a tiny screenshot beside a large empty text column. Create an immersive, oversized Flovig product composition that occupies much of the hero: realistic sidebar, project overview, task board/list, progress, activity, and workload. Place only 2–3 floating status cards with intentional overlap. Use subtle grid/line details or a soft radial glow, but keep the product UI dominant.

Hero timeline: navbar settles in → text enters with restrained stagger → product window reveals through clip/scale/translate → floating status cards enter. The hero must look compelling even as a static screenshot.

### 3. Product pillar strip
A concise strip for Projects, Tasks & Sprints, Workload, Collaboration, and Analytics. No invented customer logos, customer counts, ratings, or “trusted by thousands” claims.

### 4. Problem → solution: scattered work becomes one flow
Use a full-width dark section to create contrast. Show disconnected fragments (task, message, file, client request, report) on one side, then animate them aligning into a coherent Flovig workspace. This is a signature storytelling moment, not another card grid.

Headline: `Ketika pekerjaan tersebar, visibilitas ikut hilang.`
Body: `Flovig membantu tim menyatukan pekerjaan, komunikasi, dan progres dalam satu alur yang lebih jelas.`

### 5. Product story: Plan → Execute → Deliver
A wide horizontal narrative with three detailed interface states:
- Plan: project overview, milestones, sprint planning.
- Execute: tasks moving across columns, owners, priorities, due dates.
- Deliver: progress, reports, client updates.

Use large product panels and scroll-linked transitions. A pinned ScrollTrigger sequence is allowed on desktop only if it feels smooth and does not hijack scrolling. On mobile, use normal document flow.

### 6. Task management deep dive
Show a large, believable board with Backlog, In Progress, Review, Done; task titles, owners, priorities, due dates, labels. Add a functional Board/List switcher. Animate one task moving between columns only as a controlled demo or user-triggered action.

Headline: `Dari backlog sampai selesai, semua tetap terlihat.`

### 7. Workload + analytics
Use an asymmetric layout: copy on one side, a large workload heatmap and report interface on the other. Show capacity by team member, project progress, and report filters. Functional tabs should switch between Workload, Progress, and Reports. Animate charts/indicators on reveal, but do not claim AI-generated predictions or recommendations.

Headline: `Lihat beban kerja sebelum menjadi hambatan.`

### 8. Collaboration in context
Create a layered composition where a task detail, project chat, file attachment, comment thread, calendar event/Google Meet link, and notification clearly relate to the same work item. Animate one contextual comment or notification on reveal or interaction; avoid endlessly looping fake activity.

Headline: `Percakapan tetap dekat dengan pekerjaan.`

### 9. Client portal and visibility
Split-screen composition: internal workspace vs simplified client-facing project view. Show milestones, approved deliverables, client requests, and updates. Make the boundary between internal-only and client-visible information obvious.

Headline: `Berikan klien visibilitas tanpa membuka seluruh workspace.`

### 10. Control and accountability
Use a restrained dark section or dark inset panel for roles/permissions, workspace separation, activity logs, client access, and invoice/payment history where relevant. Do not invent compliance certifications, “military-grade” security, end-to-end encryption, or uptime claims.

### 11. Interactive product playground
Create functional tabs for Overview, Projects, Tasks, Workload, Reports, Collaboration, and Client Portal. Each tab must change a real React/HTML product mockup—not just the active label. Use smooth transitions, keyboard navigation, visible focus states, and consistent sample data.

### 12. Use cases
Cover Digital Agencies, Software/Product Teams, Operations Teams, and Professional Services. Avoid four identical cards. Use an asymmetric editorial layout, horizontal selector, or one shared product visual with changing copy.

### 13. Pricing
Plan names may be Starter, Professional, and Enterprise. Do not invent prices, plan limits, trial durations, guarantees, or unconfirmed features. If pricing data is unavailable, use editable placeholders or “Hubungi tim kami” for Enterprise. No HRIS/AI benefits.

### 14. FAQ
Accessible accordion with keyboard support. Questions can cover what Flovig is, supported teams, client visibility, tasks/sprints/tickets, workload/reports, roles, and onboarding. If asked about HRIS/AI, say they are not part of V1.

### 15. Final CTA
Use a memorable dark navy closing section with restrained blue/mint glow and strong typography.

Headline: `Siap membuat pekerjaan tim lebih terarah?`
Body: `Satukan project, task, kolaborasi, workload, dan reporting dalam satu workspace.`
Buttons: `Mulai Sekarang` and `Jelajahi Produk`.

Use one distinctive product UI/workflow detail, not a generic decorative blob.

### 16. Footer
Include product links, solutions, resources, and company/contact links only if real destinations are supplied. Mark privacy/terms destinations as configurable placeholders. Do not invent addresses or social profiles.

## GSAP motion system

Use **GSAP + ScrollTrigger** as the primary engine for complex page-level animation. Use CSS for simple hover/focus/micro-interactions. Avoid adding multiple animation libraries without a clear reason.

Required motion moments:
1. Coordinated hero timeline.
2. Scattered UI fragments aligning into a workspace.
3. Plan → Execute → Deliver storytelling transitions.
4. Controlled task movement between board columns.
5. Analytics bars/progress indicators revealing into state.
6. Contextual collaboration comment/notification.
7. Product preview tab transitions.
8. Selected section transitions using clip-path/masks/transforms where meaningful.
9. Subtle CTA/footer reveal.

Implementation rules:
- Use GSAP timelines for coordinated sequences.
- Use ScrollTrigger only when scroll position meaningfully controls the story.
- Use `gsap.matchMedia()` for desktop/mobile-specific behavior.
- In React, use `gsap.context()` and `context.revert()` in cleanup; prevent duplicate ScrollTriggers under React Strict Mode.
- Avoid overlong pin sequences, excessive scroll hijacking, and identical reveal animations in every section.
- Prefer transform/opacity over repeatedly animating layout properties.
- Avoid scroll handlers that cause React renders on every frame.
- Keep key content visible if JS/animation is unavailable.
- Respect `prefers-reduced-motion`; simplified mode should disable pin/scrub and nonessential movement.
- Keep all CTAs/navigation usable while animations run.

Motion style:
- Premium, restrained, intentional.
- Micro-interactions: roughly 150–300ms.
- Main entrances: roughly 500–900ms.
- Small stagger offsets that help scanning.
- Avoid gratuitous bounce, random floating, constant motion, or “everything animates”.

### Optional GSAP plugins
Only use when there is a real use case:
- Flip: board/list or layout transitions.
- MotionPathPlugin: workflow path or a small marker following a route.
- Draggable: only for an actual interactive prototype.
- TextPlugin: optional for a short status/text change, not a typewriter effect everywhere.
- Physics2DPlugin: optional; verify license/package availability before depending on it.
- Do not assume every GSAP plugin has the same access/license terms. The core app must run without optional plugins.

## Three.js / React Three Fiber / Framer Motion

### Three.js / React Three Fiber
Optional, not a default requirement. Add 3D only if it adds meaning, such as a subtle layered workflow map behind the hero. Do not add a giant spinning sphere, AI brain, neural network, robot, or decorative WebGL scene with no product meaning.

If used:
- Lazy-load it.
- Provide a static CSS fallback.
- Simplify/disable on small screens and reduced-motion mode.
- Avoid heavy post-processing/textures.
- Ensure the canvas does not block text selection or clicks.

### Framer Motion
Do not install it by default if GSAP already handles the required motion. Use it only if a specific React layout/gesture interaction is materially easier with it. Never let GSAP and Framer Motion both control the same element.

### Recommended V1 choice
- GSAP + ScrollTrigger: complex choreography and scroll storytelling.
- CSS: hover, focus, shine, basic transitions.
- React state: tabs, accordions, preview switching, mobile menu.
- Three.js/R3F: optional after performance and core UI are polished.
- Framer Motion: optional; omit unless a specific interaction justifies it.

The page must remain premium without Three.js or Framer Motion.

## Tech stack and structure

Required: Vite, React, JavaScript, Tailwind CSS, GSAP, ScrollTrigger.

Optional: React Three Fiber/Three.js, Lucide React, small chart library only if needed.

Suggested structure:
```text
src/
  app/App.tsx
  components/layout/{Navbar,Footer,Container}.tsx
  components/ui/{Button,Badge,Tabs,Accordion}.tsx
  components/product/{ProductWindow,DashboardMockup,TaskBoardMockup,WorkloadMockup,AnalyticsMockup,CollaborationMockup,ClientPortalMockup}.tsx
  sections/{HeroSection,ProductPillarsSection,ProblemSolutionSection,WorkflowStorySection,TaskManagementSection,WorkloadAnalyticsSection,CollaborationSection,ClientPortalSection,ControlSection,ProductPlaygroundSection,UseCasesSection,PricingSection,FAQSection,FinalCTASection}.tsx
  hooks/useReducedMotion.ts
  lib/gsap.ts
  styles/globals.css
  main.tsx
```

Keep components focused. Avoid one giant page component and avoid meaningless over-componentization.

## Responsive requirements

Do not simply stack the desktop page and call it responsive.
- Desktop: large product UI, asymmetric compositions, selected pinned storytelling.
- Tablet: reduce overlap and simplify pinning; preserve readable UI.
- Mobile: single-column flow, no horizontal overflow, fewer floating layers, touch-friendly controls, simplified mockups, disable harmful pin/scrub sequences.

Test widths: 1440px, 1024px, 768px, 390px, and 320px.

## Accessibility and performance

- Semantic landmarks and correct heading order.
- Keyboard-operable navigation, tabs, and accordion.
- Visible focus states and sufficient contrast.
- Do not convey status through color alone.
- Honor `prefers-reduced-motion`.
- Avoid flashing and rapid repeated effects.
- Lazy-load optional 3D and noncritical assets.
- Prefer HTML/CSS/SVG product mockups to large stock images.
- Keep layout stable as fonts/UI load.
- Clean up GSAP contexts, ScrollTriggers, observers, and event listeners.
- Avoid excessive `will-change`.
- Check console errors, overflow, and layout shifts.

## Content and trust rules

- Primary marketing copy in Indonesian.
- Direct, specific writing; avoid vague hype.
- No fake customer logos, testimonials, metrics, ratings, or company names.
- No invented prices, feature limits, guarantees, security certifications, or uptime claims.
- No AI or HRIS claims as available V1 features.
- Use realistic illustrative sample data consistently across all product mockups.
- Keep project names, team members, task statuses, and numbers consistent across sections.

## Functional requirements

- Navbar links scroll to correct sections.
- Mobile menu opens/closes.
- CTAs have configurable destinations or scroll targets.
- Product preview tabs change the actual mockup.
- Board/List switcher changes layout.
- Workload/analytics tabs change visible content.
- FAQ accordion works with keyboard.
- Pricing buttons have configurable links or clearly labeled placeholders.
- Reduced-motion mode simplifies animations.
- No dead controls, broken links, console errors, or React key warnings.
- All animated content ends in a readable and usable state.

## Implementation workflow

1. Inspect the repository, current Vite setup, dependencies, scripts, and lockfile.
2. Preserve useful configuration but discard the failed page layout.
3. Establish tokens, typography, spacing, buttons, tabs, and product-window primitives.
4. Build the hero and product UI first; make it look excellent before animation.
5. Implement all sections with distinct compositions and consistent demo data.
6. Add GSAP timeline and scroll storytelling, then micro-interactions.
7. Add responsive/reduced-motion behavior and cleanup.
8. Run the app and build/type checks; fix errors and warnings.
9. Inspect all target viewport widths and test every interaction.
10. Remove unused dependencies/assets and write run instructions in README.

## Definition of done

- [ ] Complete redesign with a distinct Flovig identity.
- [ ] Hero has a large, readable, convincing product UI.
- [ ] Not every section is a repeated card grid.
- [ ] Story flows from scattered work → connected workflow → visibility → collaboration → client confidence → CTA.
- [ ] GSAP + ScrollTrigger create meaningful interactions.
- [ ] Mobile animation strategy is simplified and usable.
- [ ] Reduced-motion users get a good experience.
- [ ] Three.js is justified and optimized or intentionally omitted.
- [ ] Framer Motion is justified or intentionally omitted.
- [ ] Product tabs and controls actually work.
- [ ] No fake claims, prices, testimonials, or logos.
- [ ] HRIS and AI are not presented as V1.
- [ ] Project builds and runs without errors.
- [ ] Page looks premium even when animations are not playing.

## Final instruction

Prioritize art direction, composition, and product storytelling before adding more effects. The goal is not “a normal SaaS landing page with GSAP.” Build a memorable product-led experience where Flovig's actual workspace is the visual centerpiece and motion explains how planning, execution, collaboration, and reporting connect.

**Inspect the repository and implement the complete redesign. Do not return only a plan.**
