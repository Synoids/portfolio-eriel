import { IconType } from "react-icons";
import { 
  SiHtml5, SiJavascript, SiNextdotjs, SiReact, SiTailwindcss,
  SiPhp, SiLaravel, SiMysql, SiPostgresql, SiGit, SiGithub, 
  SiFigma, SiTypescript, SiPython
} from "react-icons/si";
import { TbApi, TbBrandCss3, TbBrandVscode } from "react-icons/tb";

export type Skill = {
  name: string;
  level: number;
  icon: IconType;
};

export type SkillCategory = {
  name: {
    en: string;
    id: string;
  };
  color: string;
  borderColor: string;
  bgColor: string;
  iconBg: string;
  gradientFrom: string;
  gradientTo: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: {
      en: "Frontend",
      id: "Frontend",
    },
    color: "from-primary-500 to-primary-400",
    borderColor: "border-primary-500/20",
    bgColor: "bg-primary-500/8",
    iconBg: "bg-primary-500/15",
    gradientFrom: "#6C63FF",
    gradientTo: "#8B85FF",
    skills: [
      { name: "HTML5", level: 90, icon: SiHtml5 },
      { name: "CSS3", level: 85, icon: TbBrandCss3 },
      { name: "JavaScript", level: 78, icon: SiJavascript },
      { name: "TypeScript", level: 82, icon: SiTypescript },
      { name: "Next.js", level: 65, icon: SiNextdotjs },
      { name: "React", level: 68, icon: SiReact },
      { name: "Tailwind CSS", level: 80, icon: SiTailwindcss },
    ],
  },
  {
    name: {
      en: "Backend",
      id: "Backend",
    },
    color: "from-accent to-blue-400",
    borderColor: "border-blue-500/20",
    bgColor: "bg-blue-500/5",
    iconBg: "bg-blue-500/10",
    gradientFrom: "#38BDF8",
    gradientTo: "#60A5FA",
    skills: [
      { name: "PHP", level: 75, icon: SiPhp },
      { name: "Laravel", level: 70, icon: SiLaravel },
      { name: "MySQL", level: 72, icon: SiMysql },
      { name: "PostgreSQL", level: 65, icon: SiPostgresql },
      { name: "Python", level: 65, icon: SiPython },
      { name: "REST API", level: 60, icon: TbApi },
    ],
  },
  {
    name: {
      en: "Tools & Others",
      id: "Tools & Lainnya",
    },
    color: "from-emerald-400 to-teal-400",
    borderColor: "border-emerald-500/20",
    bgColor: "bg-emerald-500/5",
    iconBg: "bg-emerald-500/10",
    gradientFrom: "#34D399",
    gradientTo: "#2DD4BF",
    skills: [
      { name: "Git", level: 80, icon: SiGit },
      { name: "GitHub", level: 82, icon: SiGithub },
      { name: "VS Code", level: 90, icon: TbBrandVscode },
      { name: "Figma", level: 55, icon: SiFigma },
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
  "Laravel",
  "MySQL",
  "PostgreSQL",
  "Python",
  "Git",
  "GitHub",
  "Tailwind",
  "VS Code",
];
