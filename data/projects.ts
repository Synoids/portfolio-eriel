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
  demo: string;
  featured: boolean;
  image?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "QRIS Cooperative System",
    description:
      "A cooperative management system with integrated QRIS payment gateway, enabling seamless digital transactions and member management for local cooperatives.",
    tech: ["PHP", "MySQL", "QRIS API", "Bootstrap"],
    emoji: "💳",
    gradient: "from-primary-600/30 to-primary-900/50",
    accentColor: "text-primary-400",
    borderColor: "border-primary-500/20",
    github: "https://github.com/Synoids",
    demo: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Laundry Service Info System",
    description:
      "Full-featured laundry management system with automated WhatsApp notifications for order updates, keeping customers informed throughout the laundry process.",
    tech: ["PHP", "MySQL", "WhatsApp API", "Tailwind"],
    emoji: "🧺",
    gradient: "from-accent/20 to-blue-900/40",
    accentColor: "text-accent",
    borderColor: "border-accent/20",
    github: "https://github.com/Synoids",
    demo: "#",
    featured: false,
  },
  {
    id: 3,
    title: "Dapur Wong Kito",
    description:
      "Traditional Palembang food ordering web app celebrating local cuisine. Features menu browsing, cart management, and order tracking for authentic Indonesian dishes.",
    tech: ["PHP", "MySQL", "JavaScript", "CSS3"],
    emoji: "🍛",
    gradient: "from-emerald-600/20 to-teal-900/40",
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    github: "https://github.com/Synoids",
    demo: "#",
    featured: false,
  },
];
