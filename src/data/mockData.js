export const teamMembers = [
  { id: 'sarah', name: 'Sarah Amanda', role: 'Lead UI/UX Designer', avatar: 'SA', color: 'bg-emerald-500', hours: 34, capacity: 40, status: 'Optimal' },
  { id: 'budi', name: 'Budi Pratama', role: 'Senior Frontend Dev', avatar: 'BP', color: 'bg-blue-500', hours: 38, capacity: 40, status: 'Optimal' },
  { id: 'rian', name: 'Rian Kurniawan', role: 'Backend Engineer', avatar: 'RK', color: 'bg-amber-500', hours: 41, capacity: 40, status: 'Kapasitas Penuh' },
  { id: 'jessica', name: 'Jessica Tan', role: 'QA & Compliance Lead', avatar: 'JT', color: 'bg-purple-500', hours: 26, capacity: 35, status: 'Tersedia' },
  { id: 'dewa', name: 'Dewa Bagus', role: 'Technical Project Manager', avatar: 'DB', color: 'bg-rose-500', hours: 32, capacity: 40, status: 'Optimal' }
]

export const initialTasks = [
  {
    id: 'TSK-101',
    title: 'Finalisasi Sistem Desain & Token Warna V2',
    category: 'Design System',
    priority: 'Urgent',
    status: 'review',
    assignee: teamMembers[0],
    dueDate: 'Besok, 17:00',
    comments: 12,
    subtasks: '4/4',
    progress: 100,
    tags: ['Figma', 'Tokens']
  },
  {
    id: 'TSK-102',
    title: 'Integrasi Payment Gateway & Webhook Midtrans',
    category: 'Backend & API',
    priority: 'High',
    status: 'in_progress',
    assignee: teamMembers[2],
    dueDate: '12 Okt',
    comments: 8,
    subtasks: '5/7',
    progress: 72,
    tags: ['API', 'Security']
  },
  {
    id: 'TSK-103',
    title: 'Slicing Halaman Checkout & Validasi Formulir',
    category: 'Frontend Web',
    priority: 'Medium',
    status: 'in_progress',
    assignee: teamMembers[1],
    dueDate: '14 Okt',
    comments: 4,
    subtasks: '2/5',
    progress: 40,
    tags: ['React', 'Tailwind']
  },
  {
    id: 'TSK-104',
    title: 'Automated E2E Testing Alur Keranjang Belanja',
    category: 'Quality Assurance',
    priority: 'Medium',
    status: 'backlog',
    assignee: teamMembers[3],
    dueDate: '16 Okt',
    comments: 2,
    subtasks: '0/3',
    progress: 0,
    tags: ['Cypress', 'E2E']
  },
  {
    id: 'TSK-105',
    title: 'Audit Aksesibilitas WCAG 2.1 AA & Keyboard Nav',
    category: 'Frontend Web',
    priority: 'High',
    status: 'backlog',
    assignee: teamMembers[1],
    dueDate: '18 Okt',
    comments: 5,
    subtasks: '1/6',
    progress: 15,
    tags: ['A11y', 'UX']
  },
  {
    id: 'TSK-106',
    title: 'Setup Environment Staging & Docker Container',
    category: 'DevOps / Infra',
    priority: 'Low',
    status: 'done',
    assignee: teamMembers[2],
    dueDate: '08 Okt',
    comments: 6,
    subtasks: '3/3',
    progress: 100,
    tags: ['Docker', 'AWS']
  },
  {
    id: 'TSK-107',
    title: 'Approval Deliverable Wireframe dengan Klien',
    category: 'Client Portal',
    priority: 'High',
    status: 'done',
    assignee: teamMembers[4],
    dueDate: '07 Okt',
    comments: 15,
    subtasks: '2/2',
    progress: 100,
    tags: ['Client Sign-off']
  }
]

export const auditLogs = [
  { id: 1, user: 'Sarah Amanda', action: 'menyerahkan deliverable', target: 'Design System V2 untuk review klien', time: '12 menit lalu', type: 'deliverable' },
  { id: 2, user: 'Klien (PT Nusantara Digital)', action: 'menyetujui milestone', target: 'Sprint 3: High-Fidelity Prototype', time: '1 jam lalu', type: 'approval' },
  { id: 3, user: 'Rian Kurniawan', action: 'memperbarui status task', target: 'TSK-102 ke In Progress', time: '3 jam lalu', type: 'task' },
  { id: 4, user: 'Dewa Bagus', action: 'menjadwalkan sprint sync', target: 'Google Meet: Sprint Review 4', time: '5 jam lalu', type: 'meeting' },
  { id: 5, user: 'Budi Pratama', action: 'menyelesaikan checklist', target: 'Responsive Layout Breakpoints', time: 'Kemarin', type: 'task' }
]

export const faqList = [
  {
    question: 'Apa perbedaan mendasar Flovig dibanding tools manajemen tugas biasa?',
    answer: 'Flovig dirancang khusus sebagai unified work operating system yang menyatukan project management, papan task (board & list), pemantauan beban kerja tim (workload), serta Portal Klien khusus dalam satu alur. Anda tidak perlu lagi berlangganan 4 tool terpisah untuk mengelola tim internal dan komunikasi klien.'
  },
  {
    question: 'Bagaimana cara kerja Portal Klien? Apakah klien dapat melihat catatan internal?',
    answer: 'Portal Klien di Flovig memiliki boundary permission yang sangat ketat. Klien hanya dapat melihat milestone yang ditentukan, deliverable yang membutuhkan sign-off approval, dan timeline progres publik. Catatan internal tim, estimasi biaya mentah, log teknis, serta chat diskusi internal terlindungi 100% dan tidak pernah dapat diakses klien.'
  },
  {
    question: 'Apakah Flovig mendukung integrasi Google Meet dan kalender?',
    answer: 'Ya. Flovig terintegrasi dengan Google Meet dan kalender proyek. Anda dapat membuat tautan rapat langsung dari dalam kartu task atau milestone, sehingga konteks agenda rapat, catatan notulensi, dan tindak lanjut tetap tersimpan di task yang relevan.'
  },
  {
    question: 'Bagaimana Flovig membantu mencegah overload tim (Workload Management)?',
    answer: 'Flovig memiliki heatmap kapasitas tim real-time yang menghitung estimasi jam kerja dari semua proyek aktif. Jika salah satu anggota tim melebihi batas jam kerja per minggu, indikator visual akan memberi peringatan dan memungkinkan Project Manager menyeimbangkan pembagian tugas (rebalance) hanya dengan beberapa klik.'
  },
  {
    question: 'Apakah ada batasan jumlah proyek, tugas, atau klien di Flovig?',
    answer: 'Di paket Professional dan Enterprise, Anda mendapatkan jumlah proyek, tugas, serta akses guest untuk klien tanpa batas. Hal ini memastikan agensi dan tim software dapat berkolaborasi dengan banyak klien tanpa khawatir terkena biaya tambahan tak terduga.'
  },
  {
    question: 'Apakah fitur HRIS atau AI termasuk dalam versi V1 Flovig saat ini?',
    answer: 'Tidak. Flovig V1 secara sengaja berfokus murni pada keunggulan Project & Work Management: perencanaan sprint, pelacakan task, alokasi kapasitas tim, kolaborasi kontekstual, dan portal klien. Kami tidak memasukkan fitur HRIS (absensi/payroll) maupun AI generatif pada V1 agar performa dan reliabilitas manajemen pekerjaan tim tetap maksimal, cepat, dan presisi.'
  }
]
