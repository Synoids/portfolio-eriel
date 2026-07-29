export type SkillCategory = {
  id: string;
  name: {
    en: string;
    id: string;
  };
  description: {
    en: string;
    id: string;
  };
  technologies: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: {
      en: "Frontend & UI Engineering",
      id: "Frontend & UI Engineering",
    },
    description: {
      en: "I don't just build interfaces; I build experiences. Using React and Next.js, I architect scalable component systems and ensure high performance through server-side rendering and static generation. Tailwind CSS allows me to translate complex designs into pixel-perfect, responsive layouts rapidly without writing bloated CSS files.",
      id: "Saya tidak hanya membangun antarmuka; saya membangun pengalaman pengguna. Dengan React dan Next.js, saya merancang sistem komponen yang scalable dan memastikan performa tinggi melalui SSR dan SSG. Tailwind CSS memungkinkan saya menerjemahkan desain kompleks menjadi layout responsif yang presisi dengan cepat tanpa menulis file CSS yang membengkak.",
    },
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "backend",
    name: {
      en: "Backend & System Design",
      id: "Backend & System Design",
    },
    description: {
      en: "A robust frontend needs a solid foundation. I design secure REST APIs and manage databases using PostgreSQL and MySQL. Whether I'm building a custom backend with Node.js/PHP or leveraging BaaS solutions like Supabase to accelerate development, my focus is always on data integrity, security, and scalability.",
      id: "Frontend yang tangguh membutuhkan fondasi yang solid. Saya merancang REST API yang aman dan mengelola database menggunakan PostgreSQL dan MySQL. Baik membangun backend kustom dengan Node.js/PHP maupun memanfaatkan solusi BaaS seperti Supabase untuk mempercepat rilis, fokus saya selalu pada integritas data, keamanan, dan skalabilitas.",
    },
    technologies: ["Node.js", "PHP", "PostgreSQL", "MySQL", "Supabase", "REST API"],
  },
  {
    id: "automation",
    name: {
      en: "Automation & Integration",
      id: "Otomatisasi & Integrasi",
    },
    description: {
      en: "I love automating repetitive workflows to save hours of manual labor. I frequently use Google Apps Script to turn Google Sheets into powerful headless CMS or trigger-based backends, integrating them with Telegram Bots or WhatsApp APIs for real-time notifications and operations.",
      id: "Saya sangat suka mengotomatiskan alur kerja berulang untuk menghemat waktu kerja manual. Saya sering menggunakan Google Apps Script untuk mengubah Google Sheets menjadi CMS headless atau backend berbasis pemicu (trigger), dan mengintegrasikannya dengan Telegram Bot atau API WhatsApp untuk operasional dan notifikasi real-time.",
    },
    technologies: ["Google Apps Script", "Telegram API", "WhatsApp API", "Python"],
  },
  {
    id: "tooling",
    name: {
      en: "Tooling & Environment",
      id: "Tooling & Environment",
    },
    description: {
      en: "Efficiency in development comes from mastering the right tools. I rely heavily on Git for version control and collaborative workflows, and GitHub Actions for simple CI/CD pipelines. My editor of choice is VS Code, deeply customized for my specific tech stack.",
      id: "Efisiensi dalam pengembangan berasal dari penguasaan alat yang tepat. Saya sangat mengandalkan Git untuk version control dan alur kerja kolaboratif, serta GitHub Actions untuk pipeline CI/CD sederhana. Editor andalan saya adalah VS Code, yang disesuaikan secara mendalam untuk stack teknologi saya.",
    },
    technologies: ["Git", "GitHub", "VS Code", "Vercel", "Figma"],
  },
];
