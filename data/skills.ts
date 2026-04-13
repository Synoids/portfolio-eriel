export type Skill = {
  name: string;
  level: number;
  emoji: string;
};

export type SkillCategory = {
  name: string;
  color: string;
  borderColor: string;
  bgColor: string;
  iconBg: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    color: "from-primary-500 to-primary-400",
    borderColor: "border-primary-500/20",
    bgColor: "bg-primary-500/8",
    iconBg: "bg-primary-500/15",
    skills: [
      { name: "HTML5", level: 90, emoji: "🌐" },
      { name: "CSS3", level: 85, emoji: "🎨" },
      { name: "JavaScript", level: 78, emoji: "⚡" },
      { name: "Next.js", level: 65, emoji: "▲" },
      { name: "React", level: 68, emoji: "⚛️" },
      { name: "Tailwind CSS", level: 80, emoji: "💨" },
    ],
  },
  {
    name: "Backend",
    color: "from-accent to-blue-400",
    borderColor: "border-accent/20",
    bgColor: "bg-accent/5",
    iconBg: "bg-accent/10",
    skills: [
      { name: "PHP", level: 75, emoji: "🐘" },
      { name: "MySQL", level: 72, emoji: "🗄️" },
      { name: "REST API", level: 60, emoji: "🔌" },
    ],
  },
  {
    name: "Tools & Others",
    color: "from-emerald-400 to-teal-400",
    borderColor: "border-emerald-500/20",
    bgColor: "bg-emerald-500/5",
    iconBg: "bg-emerald-500/10",
    skills: [
      { name: "Git", level: 80, emoji: "🌿" },
      { name: "GitHub", level: 82, emoji: "🐙" },
      { name: "VS Code", level: 90, emoji: "💻" },
      { name: "Figma", level: 55, emoji: "🎭" },
    ],
  },
];

export const techBadges: string[] = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "PHP",
  "MySQL",
  "Git",
  "GitHub",
  "Tailwind",
  "VS Code",
];
