export type Project = {
  id: number;
  title: string;
  description: string;
  tech: string[];
  emoji: string;
  gradient: string;
  accentColor: string;
  borderColor: string;
  github: string;
  demoLabel?: string;
  demo: string;
  featured: boolean;
  image?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Finance Tracker",
    description:
      "A comprehensive personal finance management application that helps users track income, expenses, and savings goals with intuitive dashboards and detailed analytics.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    emoji: "💰",
    gradient: "from-green-600/30 to-green-900/50",
    accentColor: "text-green-400",
    borderColor: "border-green-500/20",
    github: "https://github.com/Synoids/finance-tracker",
    demo: "https://fintrack-id.vercel.app/",
    demoLabel: "View App",
    featured: true,
  },
  {
    id: 2,
    title: "Avion AC - Company Profile",
    description:
      "Company profile website for Avion AC, a professional air conditioning service provider in Palembang. Features service listings, gallery, contact information, and social media integration for residential and commercial clients.",
    tech: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    emoji: "❄️",
    gradient: "from-blue-600/30 to-blue-900/50",
    accentColor: "text-blue-400",
    borderColor: "border-blue-500/20",
    github: "https://github.com/Synoids/Avion-AC",
    demo: "https://avion-ac.vercel.app/",
    demoLabel: "Visit Site",
    featured: true,
  },
  {
    id: 3,
    title: "Hutatus Coffee",
    description:
      "An artisanal coffee marketplace built with Next.js 14 and Supabase. Features an advanced cart system with composite unique keys, a secure 6-digit PIN admin dashboard, and automated WhatsApp order confirmation with QRIS integration.",
    tech: ["Next.js 14", "Tailwind CSS", "Supabase", "Context API"],
    emoji: "☕",
    gradient: "from-amber-800/30 to-orange-950/50",
    accentColor: "text-amber-500",
    borderColor: "border-amber-500/20",
    github: "https://github.com/Synoids/hutatus-coffe",
    demo: "https://hutatus-coffe.vercel.app/",
    demoLabel: "Visit Shop",
    featured: true,
  },
];
