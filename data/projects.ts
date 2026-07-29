export type LocalizedString = {
  en: string;
  id: string;
};

export type Metric = {
  label: LocalizedString;
  value: string;
};

export type GalleryItem = {
  image: string;
  title?: LocalizedString;
  description?: LocalizedString;
};

export type ArchitectureNode = {
  title: LocalizedString;
  description?: LocalizedString;
  icon?: string;
};

export type TimelinePhase = {
  title: LocalizedString;
  description?: LocalizedString;
};

export type TechItem = {
  name: string;
  highlight?: boolean;
};

export type TechCategory = {
  category: LocalizedString;
  items: TechItem[];
};

export type ProjectLinks = {
  github?: string;
  demo?: string;
  demoLabel?: LocalizedString;
  readme?: string;
  article?: string;
  documentation?: string;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  description: LocalizedString;
  summary?: LocalizedString;
  tech: string[];
  emoji: string;
  gradient: string;
  accentColor: string;
  borderColor: string;
  featured: boolean;
  image?: string;
  
  links?: ProjectLinks;
  
  // Advanced Case Study Fields
  heroImage?: string;
  projectType?: LocalizedString;
  organization?: LocalizedString;
  status?: LocalizedString;
  myRole?: LocalizedString;
  complexity?: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: LocalizedString;
  year?: string;
  responsive?: boolean;
  openSource?: boolean;
  highlightTech?: string[];
  
  metrics?: Metric[];
  
  // Story
  whyThisMatters?: LocalizedString;
  problem?: LocalizedString;
  existingWorkflow?: { step: LocalizedString; description?: LocalizedString }[];
  constraints?: { en: string[]; id: string[] };
  stakeholders?: { en: string[]; id: string[] };
  successCriteria?: { en: string[]; id: string[] };
  goals?: { en: string[]; id: string[] };
  motivation?: LocalizedString;
  challenges?: LocalizedString;
  solutions?: LocalizedString;
  implementation?: LocalizedString;
  beforeVsAfter?: { before: LocalizedString; after: LocalizedString }[];
  businessImpact?: LocalizedString;
  technicalAchievement?: LocalizedString;
  outcome?: LocalizedString;
  lessonsLearned?: LocalizedString;
  whatIdDoDifferently?: LocalizedString;
  developerNotes?: LocalizedString;
  futureImprovements?: { en: string[]; id: string[] };
  
  // Technical Details
  features?: { en: string[]; id: string[] };
  techStack?: TechCategory[];
  architecture?: ArchitectureNode[];
  engineeringDecisions?: Array<{ decision: string, alternatives: string, reason: LocalizedString }>;
  tradeOffs?: LocalizedString;
  developmentTimeline?: TimelinePhase[];
  gallery?: GalleryItem[];
};

export const projects: Project[] = [
  {
    id: 7,
    slug: "pln-pulse-check",
    title: "PLN Pulse Check UPDL - Complaint Management System",
    description: {
      en: "A robust complaint management system built to automate tracking and streamline communication without disrupting existing workflows.",
      id: "Sistem manajemen pengaduan tangguh untuk mengotomatiskan pelacakan komunikasi tanpa mengganggu alur kerja yang ada.",
    },
    summary: {
      en: "A robust complaint management system built to automate tracking and streamline communication without disrupting existing workflows.",
      id: "Sistem manajemen pengaduan tangguh untuk mengotomatiskan pelacakan komunikasi tanpa mengganggu alur kerja yang ada."
    },
    tech: ["Next.js", "Capacitor", "FCM", "Google Apps Script", "Tailwind CSS"],
    emoji: "🔔",
    gradient: "from-blue-600/30 to-blue-900/50",
    accentColor: "text-blue-400",
    borderColor: "border-blue-500/20",
    links: {
      github: "https://github.com/Synoids/notif-pulsecheck",
      demo: "https://notif-pulsecheck.vercel.app/",
      demoLabel: {
        en: "Live Demo",
        id: "Demo Langsung",
      }
    },
    featured: true,
    image: "/icon-pulse-check.png",
    heroImage: "/icon-pulse-check.png",
    projectType: { en: "Internship Project", id: "Proyek Magang" },
    organization: { en: "PT PLN (Persero) UPDL Palembang", id: "PT PLN (Persero) UPDL Palembang" },
    status: { en: "Completed", id: "Selesai" },
    myRole: { en: "Full Stack Developer", id: "Pengembang Full Stack" },
    complexity: "Intermediate",
    duration: { en: "1 Month", id: "1 Bulan" },
    year: "2026",
    responsive: true,
    highlightTech: ["Next.js", "FCM", "Capacitor", "Google Apps Script"],
    
    whyThisMatters: {
      en: "A mobile-first Progressive Web App (PWA) complaint management system. Features include role-based access control (Superadmin/Staff) with PIN security, a Google Sheets backend via Google Apps Script, real-time rich notifications, and automated SLA tracking. Operational smoothness at PLN UPDL Palembang heavily relies on the response speed to broken facilities or service complaints. Delays in handling training facilities don't just disrupt the education of hundreds of PLN employees, but also decrease the efficiency of staff who have to repeatedly verify reports.",
      id: "Sistem manajemen pengaduan Progressive Web App (PWA) yang dioptimalkan untuk perangkat seluler. Memiliki fitur kontrol akses berbasis peran dengan keamanan PIN, backend Google Sheets melalui Google Apps Script, notifikasi instan, dan pelacakan SLA otomatis. Kelancaran operasional di PT PLN (Persero) UPDL Palembang sangat bergantung pada kecepatan respons terhadap fasilitas yang rusak. Keterlambatan penanganan fasilitas pelatihan tidak hanya menghambat proses pendidikan ratusan pegawai PLN, tetapi juga menurunkan efisiensi kerja staf."
    },
    problem: { 
      en: "The existing reporting system was highly passive. Users reported issues through a digital form, but facility admins had no way of knowing a report existed in real-time. This created a long time gap between when an issue was reported and when repairs began, purely due to the admins' lack of awareness.", 
      id: "Sistem pelaporan masalah yang berjalan sangat pasif. Pengguna melaporkan masalah melalui form digital, namun admin fasilitas tidak memiliki cara untuk mengetahui adanya laporan secara seketika (real-time). Akibatnya, muncul jeda waktu yang panjang antara kapan masalah dilaporkan dan kapan perbaikan dimulai, murni karena ketidaktahuan admin." 
    },
    existingWorkflow: [
      { step: { en: "QR Code Scan", id: "Scan QR Code" }, description: { en: "Users find a broken facility and scan the attached QR code.", id: "Pengguna menemukan fasilitas rusak dan memindai QR code." } },
      { step: { en: "Google Form", id: "Google Form" }, description: { en: "Fills out a standard Google Form.", id: "Mengisi Google Form standar." } },
      { step: { en: "Google Sheets", id: "Google Sheets" }, description: { en: "Data is appended to a spreadsheet.", id: "Data masuk ke spreadsheet." } },
      { step: { en: "Silent Gap", id: "Jeda Bisu" }, description: { en: "The process stops. No alerts are triggered.", id: "Proses berhenti. Tidak ada notifikasi." } },
      { step: { en: "Manual Checking", id: "Pengecekan Manual" }, description: { en: "Admins proactively check the sheet hours later.", id: "Admin mengecek spreadsheet beberapa jam kemudian secara proaktif." } }
    ],
    constraints: {
      en: [
        "Zero Budget for New Infrastructure: No budget allocated for renting VPS or using paid databases.",
        "Learning Curve & Habits: The client was highly accustomed to the Google Workspace ecosystem. Changing platforms would cause resistance.",
        "Admin Accessibility: Facility admins are highly mobile field workers who are rarely in front of a computer."
      ],
      id: [
        "Zero Budget untuk Infrastruktur Baru: Tidak ada anggaran untuk menyewa VPS atau database berbayar.",
        "Kurva Pembelajaran & Kebiasaan: Klien sudah sangat terbiasa menggunakan ekosistem Google Workspace. Mengganti platform akan menimbulkan resistensi.",
        "Aksesibilitas Admin: Admin fasilitas adalah pekerja lapangan dengan mobilitas tinggi yang jarang berada di depan komputer."
      ]
    },
    stakeholders: {
      en: [
        "Trainees & Non-Facility Staff: As the issue reporters (End-users).",
        "Facility Admins & Technicians: System users who receive notifications and perform field repairs.",
        "Building PIC & UPDL Management: Require recapitulation reports of repair data."
      ],
      id: [
        "Peserta Diklat & Staf Non-Fasilitas: Sebagai pelapor masalah (End-users).",
        "Admin Fasilitas & Teknisi: Pengguna sistem yang menerima notifikasi dan melakukan perbaikan lapangan.",
        "PIC Gedung & Manajemen UPDL: Membutuhkan laporan rekapitulasi data perbaikan."
      ]
    },
    successCriteria: {
      en: [
        "Admins receive automatic push notifications directly on their mobile devices when a complaint is submitted.",
        "Admins no longer need to manually monitor the Google Spreadsheet.",
        "The workflow from the user's side remains completely unchanged (still scanning QR and using Google Form).",
        "The management dashboard can be used smoothly and responsively via smartphone."
      ],
      id: [
        "Admin menerima notifikasi secara otomatis langsung di perangkat seluler mereka saat keluhan dibuat.",
        "Admin tidak perlu lagi melakukan pemantauan Google Spreadsheet secara manual.",
        "Workflow dari sisi peserta tidak berubah sama sekali (tetap memindai QR code dan menggunakan Google Form).",
        "Sistem manajemen (dashboard) dapat digunakan dengan nyaman, mulus, dan responsif melalui smartphone."
      ]
    },
    beforeVsAfter: [
      {
        before: { en: "Complaint Detection: Required manual checking of spreadsheets via a computer periodically.", id: "Pendeteksian Keluhan: Harus melakukan pengecekan manual spreadsheet melalui komputer secara berkala." },
        after: { en: "Complaint Detection: Instant push notifications (FCM) directly to the admin's Android smartphone.", id: "Pendeteksian Keluhan: Notifikasi push (FCM) instan langsung ke ponsel pintar (Android) admin." }
      },
      {
        before: { en: "Status Tracking: Admins had to manually color cells or change text columns in the spreadsheet to mark 'Done'.", id: "Pelacakan Status: Admin harus mewarnai sel atau mengubah kolom teks spreadsheet secara manual untuk menandai 'Selesai'." },
        after: { en: "Status Tracking: Centralized status management via mobile app (Pending, In Progress, Resolved) with just a button press.", id: "Pelacakan Status: Manajemen status terpusat melalui aplikasi mobile (Pending, In Progress, Resolved) hanya dengan menekan tombol." }
      }
    ],
    architecture: [
      { title: { en: "Google Form", id: "Google Form" }, description: { en: "User submits complaints", id: "Pengguna mengirim keluhan" }, icon: "FileText" },
      { title: { en: "Apps Script", id: "Apps Script" }, description: { en: "Triggers on submit & fires webhook", id: "Terpicu on-submit & mengirim webhook" }, icon: "Database" },
      { title: { en: "Next.js API", id: "Next.js API" }, description: { en: "Validates & formats payload", id: "Memvalidasi & memformat data" }, icon: "Server" },
      { title: { en: "FCM", id: "Firebase (FCM)" }, description: { en: "Routes push notifications", id: "Meneruskan push notification" }, icon: "Globe" },
      { title: { en: "Android App", id: "Aplikasi Android" }, description: { en: "Admin receives alert on phone", id: "Admin menerima notifikasi di HP" }, icon: "Smartphone" }
    ],
    engineeringDecisions: [
      {
        decision: "Keeping Google Form",
        alternatives: "Building Custom Form (Next.js/React)",
        reason: { en: "We lose full control over the UI, but users were already accustomed to the QR code and existing form. Changing the user-facing form violated the habit constraint. Injecting the system behind the scenes is much more transparent.", id: "Kehilangan kontrol penuh atas UI form. Alasan: Peserta sudah terbiasa dengan QR code dan UI Google Form yang ada. Mengubah form di sisi pengguna berarti melanggar constraint kebiasaan. Menyuntikkan sistem ke belakang layar jauh lebih transparan." }
      },
      {
        decision: "Google Apps Script Backend",
        alternatives: "Node.js Server polling API",
        reason: { en: "Adheres to the zero-budget constraint and integrates natively with Google Sheets without requiring complex OAuth flows for the client.", id: "Tidak membutuhkan biaya server (zero budget) dan berintegrasi secara native dengan Google Sheets (tanpa perlu otorisasi OAuth yang rumit bagi klien)." }
      },
      {
        decision: "Next.js API (Middleware)",
        alternatives: "Direct from GAS to Notification Service",
        reason: { en: "Normalizes CORS formatting, protects FCM credentials, and provides a strong foundation if the system ever needs to scale into a full SaaS.", id: "Next.js menormalkan format CORS, menjaga kerahasiaan kredensial FCM, dan memberikan fondasi kuat jika sistem ini butuh dikembangkan menjadi SaaS ke depannya." }
      },
      {
        decision: "Firebase Cloud Messaging (FCM)",
        alternatives: "OneSignal / Telegram API",
        reason: { en: "FCM is free without significant limits, highly battle-tested for the Android ecosystem, and gives full control over push notification behavior compared to a 3rd-party chat bot.", id: "FCM gratis tanpa batasan signifikan, sangat teruji untuk ekosistem Android, dan memberikan kontrol penuh atas behavior push notification dibandingkan chat bot pihak ketiga." }
      },
      {
        decision: "PWA + Android via Capacitor",
        alternatives: "Native Android (Kotlin/Java) / React Native",
        reason: { en: "Allows using the exact same web codebase (React/Tailwind) to compile a lightweight Android app, saving massive development time while still getting native app advantages (FCM & App Icon).", id: "Memungkinkan penggunaan codebase web (React/Tailwind) yang sama untuk di-compile menjadi aplikasi Android yang ringan, menghemat waktu development secara masif sambil tetap mendapatkan keunggulan aplikasi native (FCM & App Icon)." }
      }
    ],
    tradeOffs: {
      en: "While Google Apps Script provided zero operational costs and excellent integration with Google Workspace, it comes with execution limits, daily quotas, and strict concurrency constraints. These trade-offs were accepted because the volume of facility reports is relatively low and predictable, making it a highly effective compromise.",
      id: "Meskipun Google Apps Script memberikan biaya operasional nol dan integrasi yang sangat baik dengan Google Workspace, teknologi ini memiliki execution limit, kuota harian, dan batasan konkurensi yang ketat. Konsekuensi ini diterima karena volume laporan keluhan relatif kecil dan dapat diprediksi, menjadikannya kompromi yang sangat efektif."
    },
    implementation: {
      en: "This project injects a modern stack into a legacy ecosystem. I designed Google Apps Script to read form triggers on-submit, utilizing LockService to ensure safe data queuing, and sending it to a Next.js API. On the admin side, I used Next.js and Tailwind CSS to design a mobile-first dashboard wrapped into an Android app using Capacitor. This allows admins to install the app, login with a secure PIN, and instantly receive push notifications via Firebase Cloud Messaging.",
      id: "Proyek ini pada dasarnya menyuntikkan modern stack ke dalam ekosistem lama. Saya merancang Google Apps Script untuk membaca trigger form on-submit, menggunakan LockService untuk memastikan antrean data aman, dan mengirimkannya ke API Next.js. Di sisi admin, saya menggunakan Next.js dan Tailwind CSS untuk merancang antarmuka dashboard mobile-first yang kemudian dibungkus menjadi aplikasi Android menggunakan Capacitor. Ini memungkinkan admin menginstal aplikasi, login menggunakan PIN pengaman, dan langsung menerima push notification berkat integrasi Firebase Cloud Messaging."
    },
    challenges: {
      en: "The biggest challenges were engineering constraints rather than just coding. When multiple forms are submitted simultaneously, Google Apps Script risks race conditions. I utilized LockService.getScriptLock() to create a reliable queuing mechanism. Additionally, debugging the webhook payload sent from Google's closed network to Vercel (Next.js) was difficult due to GAS's limited built-in logging. Finally, bridging Firebase push notifications with the web service worker inside the Capacitor wrapper required very specific AndroidManifest configurations and client-side token synchronization.",
      id: "Tantangan terbesar adalah batasan lingkungan. Saat banyak form diisi bersamaan, Google Apps Script memiliki risiko race condition. Saya menggunakan LockService.getScriptLock() untuk membuat mekanisme antrean (queue) yang andal. Selain itu, melacak payload webhook yang gagal dikirim dari jaringan tertutup Google menuju Vercel (Next.js) cukup menyulitkan karena keterbatasan sistem logging bawaan GAS. Terakhir, menjembatani push notification Firebase dengan service worker web di dalam wrapper Capacitor memerlukan konfigurasi khusus pada AndroidManifest dan sinkronisasi token di sisi klien."
    },
    businessImpact: {
      en: "The presence of the Android app allowed admins to receive notifications instantly. Staff can respond to facility incidents faster, directly improving the operational service quality of training at PLN UPDL Palembang. Ultimately, the biggest operational gain came from eliminating the need for repetitive manual monitoring of spreadsheets.",
      id: "Keberadaan aplikasi Android (Pulse Check) memungkinkan admin menerima notifikasi seketika. Staf dapat merespons insiden kerusakan lebih cepat, yang secara langsung meningkatkan kualitas layanan operasional diklat di PLN UPDL Palembang. Pada akhirnya, perbaikan operasional terbesar berasal dari menghilangkan kebutuhan pengecekan spreadsheet secara manual yang berulang-ulang setiap hari."
    },
    technicalAchievement: {
      en: "Successfully implemented a reliable event-driven notification architecture using zero infrastructure cost, while delivering a polished mobile-first administration experience that bridges legacy spreadsheets with modern native capabilities.",
      id: "Berhasil mengimplementasikan arsitektur notifikasi event-driven yang andal dengan zero infrastructure cost, sekaligus menghadirkan pengalaman administrasi mobile-first yang menghubungkan spreadsheet lama dengan kapabilitas native modern."
    },
    lessonsLearned: {
      en: "This project shifted my mindset as a Software Engineer. Initially, I thought building everything from scratch with the most modern tech stack was always the best path. Working within PLN's environment taught me that the best engineering solution is the one that respects existing workflows, minimizes user friction, and fits business constraints. Choosing not to replace their Google Form to preserve the reporters' comfort was the most crucial UX decision of this project.",
      id: "Proyek ini mengubah cara pandang saya sebagai seorang Software Engineer. Awalnya saya berpikir bahwa membangun sistem baru dari nol dengan tumpukan teknologi paling modern adalah jalan terbaik. Setelah bekerja di lingkungan PLN, saya belajar bahwa solusi engineering terbaik sering kali adalah solusi yang menghormati workflow yang sudah berjalan, meminimalkan perubahan bagi pengguna, dan mengurangi friksi organisasi. Tidak mengubah alur kerja (Google Form) demi menjaga kenyamanan pengguna adalah keputusan UX paling krusial di proyek ini."
    },
    whatIdDoDifferently: {
      en: "If I were to build this today, I would consider a domain-driven folder structure for scalability and implement better observability. I would use stronger authentication than a static PIN, add offline synchronization, and introduce proper logging. Additionally, I would plan a gradual migration to PostgreSQL for when the data volume inevitably hits Google Sheets' limits.",
      id: "Jika saya mengerjakan proyek ini hari ini, saya akan mempertimbangkan domain-driven folder structure, observability yang lebih baik, authentication yang lebih kuat daripada PIN statis, offline synchronization, serta sistem logging yang rapi. Saya juga akan merencanakan migrasi bertahap ke PostgreSQL ketika volume data sudah memang membutuhkan dan melebihi limit Google Sheets."
    },
    gallery: [
      { image: "/icon-pulse-check.png", title: { en: "Mobile-First Dashboard", id: "Dashboard Mobile-First" }, description: { en: "The main PWA interface providing immediate access to pending complaints.", id: "Antarmuka utama PWA yang memberikan akses instan ke keluhan yang tertunda." } },
      { image: "/icon-pulse-check.png", title: { en: "Real-time Push Notification", id: "Push Notification Real-time" }, description: { en: "FCM delivering instant payload to the Android device lockscreen.", id: "FCM mengirimkan payload instan ke layar kunci perangkat Android." } },
      { image: "/icon-pulse-check.png", title: { en: "Status Management", id: "Manajemen Status" }, description: { en: "One-tap state transitions from 'Pending' to 'Resolved'.", id: "Transisi state satu sentuhan dari 'Pending' ke 'Resolved'." } },
      { image: "/icon-pulse-check.png", title: { en: "Zero-Cost Architecture", id: "Arsitektur Tanpa Biaya" }, description: { en: "Under the hood, Google Sheets powers the entire database operations reliably.", id: "Di balik layar, Google Sheets menangani seluruh operasi database dengan andal." } }
    ]
  },
  {
    id: 6,
    slug: "digital-signage",
    title: "Digital Signage - PLN UPDL Palembang",
    description: {
      en: "A serverless digital signage system powered by Next.js and Google Workspace. It transforms Google Sheets data into a real-time, premium glassmorphism TV display for classroom schedules with zero learning curve for admins.",
      id: "Sistem papan informasi digital tanpa server yang didukung oleh Next.js dan Google Workspace. Mengubah data Google Sheets menjadi tampilan TV berdesain glassmorphism premium secara real-time dengan kurva pembelajaran nol bagi admin.",
    },
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Google Apps Script"],
    emoji: "📺",
    gradient: "from-sky-600/30 to-blue-900/50",
    accentColor: "text-sky-400",
    borderColor: "border-sky-500/20",
    links: {
      github: "https://github.com/Synoids/digital-signage-pln-updl",
      demo: "https://digital-signage-pln-updl.vercel.app/demo",
    },
    featured: true,
    image: "/digital-signage.png",
  },
  {
    id: 5,
    slug: "modular-pdf-generator",
    title: "Modular PDF Generator",
    description: {
      en: "A Python-based workspace for generating modular and reusable PDFs. Specifically designed for AI-assisted workflows, it separates content (JSON/Markdown) from layout to ensure stability and maintainability.",
      id: "Workspace pembuat PDF modular berbasis Python. Dirancang khusus untuk alur kerja berbantuan AI, memisahkan konten (JSON/Markdown) dari tata letak untuk menjamin stabilitas dan kemudahan pemeliharaan.",
    },
    tech: ["Python", "ReportLab", "JSON", "Markdown"],
    emoji: "📄",
    gradient: "from-slate-600/30 to-slate-900/50",
    accentColor: "text-slate-400",
    borderColor: "border-slate-500/20",
    links: {
      github: "https://github.com/Synoids/modular-pdf-generator",
      readme: "https://github.com/Synoids/modular-pdf-generator#readme",
    },
    featured: true,
  },
  {
    id: 4,
    slug: "ess-portal",
    title: "Employee Self-Service (ESS) Portal",
    description: {
      en: "A modern, mobile-first human resource management portal featuring Role-Based Access Control, GPS geolocation attendance, leave management, automated payslip generation, and real-time notifications.",
      id: "Portal manajemen sumber daya manusia modern yang mengutamakan mobile, menampilkan Role-Based Access Control, absensi geolokasi GPS, manajemen cuti, pembuatan slip gaji otomatis, dan notifikasi real-time.",
    },
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS", "Supabase"],
    emoji: "👥",
    gradient: "from-indigo-600/30 to-indigo-900/50",
    accentColor: "text-indigo-400",
    borderColor: "border-indigo-500/20",
    links: {
      github: "https://github.com/Synoids/employee-self-service",
      demo: "#",
      demoLabel: {
        en: "Demo Coming Soon",
        id: "Demo Segera Hadir",
      },
    },
    featured: true,
  },
  {
    id: 0,
    slug: "hubeks-himsi",
    title: "HUBEKS HIMSI",
    description: {
      en: "A specialized organizational management system for HIMSI's External Relations division. Digitalizes member data, media partnerships, and MoU storage, replacing manual processes with a streamlined digital workflow.",
      id: "Sistem manajemen organisasi khusus untuk divisi Hubungan Eksternal HIMSI. Mendigitalisasi data anggota, kemitraan media, dan penyimpanan MoU, menggantikan proses manual dengan alur kerja digital yang efisien.",
    },
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Supabase"],
    emoji: "🏛️",
    gradient: "from-slate-700/30 to-blue-900/50",
    accentColor: "text-amber-400",
    borderColor: "border-slate-500/20",
    links: {
      github: "https://github.com/Synoids/hubeks-himsi",
      demo: "https://hubeks-himsi.vercel.app/demo",
      demoLabel: {
        en: "Demo Mode",
        id: "Mode Demo",
      },
    },
    featured: true,
    image: "/hubeks-screenshot.png",
  },
  {
    id: 1,
    slug: "financeflow-ai",
    title: "FinanceFlow AI",
    description: {
      en: "A professional-grade financial management system powered by Google Gemini AI. It transforms raw transaction data into actionable financial intelligence through proactive analysis, goal-based budgeting, and automated professional reporting.",
      id: "Sistem manajemen keuangan tingkat profesional yang didukung oleh Google Gemini AI. Mengubah data transaksi mentah menjadi kecerdasan finansial yang dapat ditindaklanjuti melalui analisis proaktif, penganggaran berbasis tujuan, dan pelaporan profesional otomatis.",
    },
    tech: ["Next.js 16", "React 19", "Tailwind CSS 4", "Supabase", "Gemini AI"],
    emoji: "🚀",
    gradient: "from-emerald-600/30 to-emerald-900/50",
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    links: {
      github: "https://github.com/Synoids/finance-tracker",
      demo: "https://fintrack-id.vercel.app/",
      demoLabel: {
        en: "Launch App",
        id: "Buka Aplikasi",
      },
    },
    featured: true,
    image: "/financeflow-screenshot.png",
  },
  {
    id: 2,
    slug: "avion-ac",
    title: "Avion AC - Company Profile",
    description: {
      en: "Company profile website for Avion AC, a professional air conditioning service provider in Palembang. Features service listings, gallery, contact information, and social media integration for residential and commercial clients.",
      id: "Website profil perusahaan untuk Avion AC, penyedia layanan AC profesional di Palembang. Menampilkan daftar layanan, galeri, informasi kontak, dan integrasi media sosial untuk klien perumahan dan komersial.",
    },
    tech: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    emoji: "❄️",
    gradient: "from-blue-600/30 to-blue-900/50",
    accentColor: "text-blue-400",
    borderColor: "border-blue-500/20",
    links: {
      github: "https://github.com/Synoids/Avion-AC",
      demo: "https://avion-ac.vercel.app/",
      demoLabel: {
        en: "Visit Site",
        id: "Kunjungi Situs",
      },
    },
    featured: true,
    image: "/avion-screenshot.png",
  },
  {
    id: 3,
    slug: "hutatus-coffee",
    title: "Hutatus Coffee",
    description: {
      en: "An artisanal coffee marketplace built with Next.js 14 and Supabase. Features an advanced cart system with composite unique keys, a secure 6-digit PIN admin dashboard, and automated WhatsApp order confirmation with QRIS integration.",
      id: "Marketplace kopi artisanal yang dibangun dengan Next.js 14 dan Supabase. Menampilkan sistem keranjang canggih dengan kunci unik komposit, dashboard admin PIN 6-digit yang aman, dan konfirmasi pesanan WhatsApp otomatis dengan integrasi QRIS.",
    },
    tech: ["Next.js 14", "Tailwind CSS", "Supabase", "Context API"],
    emoji: "☕",
    gradient: "from-amber-800/30 to-orange-950/50",
    accentColor: "text-amber-500",
    borderColor: "border-amber-500/20",
    links: {
      github: "https://github.com/Synoids/hutatus-coffe",
      demo: "https://hutatus-coffe.vercel.app/",
      demoLabel: {
        en: "Visit Shop",
        id: "Kunjungi Toko",
      },
    },
    featured: true,
    image: "/hutatus-screenshot.png",
  }
];
