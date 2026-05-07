export type Project = {
  id: number;
  title: string;
  description: {
    en: string;
    id: string;
  };
  tech: string[];
  emoji: string;
  gradient: string;
  accentColor: string;
  borderColor: string;
  github: string;
  demoLabel?: {
    en: string;
    id: string;
  };
  demo: string;
  featured: boolean;
  image?: string;
};

export const projects: Project[] = [
  {
    id: 4,
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
    github: "https://github.com/Synoids/employee-self-service",
    demo: "#",
    demoLabel: {
      en: "Demo Coming Soon",
      id: "Demo Segera Hadir",
    },
    featured: true,
  },
  {
    id: 0,
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
    github: "https://github.com/Synoids/hubeks-himsi",
    demo: "https://hubeks-himsi.vercel.app/demo",
    demoLabel: {
      en: "Demo Mode",
      id: "Mode Demo",
    },
    featured: true,
    image: "/hubeks-screenshot.png",
  },
  {
    id: 1,
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
    github: "https://github.com/Synoids/finance-tracker",
    demo: "https://fintrack-id.vercel.app/",
    demoLabel: {
      en: "Launch App",
      id: "Buka Aplikasi",
    },
    featured: true,
    image: "/financeflow-screenshot.png",
  },
  {
    id: 2,
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
    github: "https://github.com/Synoids/Avion-AC",
    demo: "https://avion-ac.vercel.app/",
    demoLabel: {
      en: "Visit Site",
      id: "Kunjungi Situs",
    },
    featured: true,
    image: "/avion-screenshot.png",
  },
  {
    id: 3,
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
    github: "https://github.com/Synoids/hutatus-coffe",
    demo: "https://hutatus-coffe.vercel.app/",
    demoLabel: {
      en: "Visit Shop",
      id: "Kunjungi Toko",
    },
    featured: true,
    image: "/hutatus-screenshot.png",
  },
];
