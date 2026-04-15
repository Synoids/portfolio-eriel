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
    title: "Finance Tracker",
    description:
      "A comprehensive personal finance management application that helps users track income, expenses, and savings goals with intuitive dashboards and detailed analytics.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    emoji: "💰",
    gradient: "from-green-600/30 to-green-900/50",
    accentColor: "text-green-400",
    borderColor: "border-green-500/20",
    github: "",
    demo: "https://finance-tracker-indol-five.vercel.app/",
    featured: true,
  },
];
