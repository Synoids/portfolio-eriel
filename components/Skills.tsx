"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
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

function SkillBar({ name, level, emoji, color, delay }: {
  name: string;
  level: number;
  emoji: string;
  color: string;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="space-y-1.5"
    >
      <div className="flex justify-between items-center text-sm">
        <span className="flex items-center gap-2 text-white/80 font-medium">
          <span className="text-base leading-none">{emoji}</span>
          {name}
        </span>
        <span className="text-white/30 text-xs font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ delay: delay + 0.2, duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary-400 font-mono text-sm tracking-widest uppercase mb-3">
            What I work with
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent rounded-full mx-auto" />
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: catIndex * 0.15, duration: 0.6 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`glass rounded-3xl p-6 border ${category.borderColor} hover:shadow-lg transition-all duration-300`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-10 h-10 rounded-xl ${category.iconBg} border ${category.borderColor} flex items-center justify-center`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-gradient-to-br ${category.color}`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-bold text-transparent bg-gradient-to-r ${category.color} bg-clip-text`}
                  >
                    {category.name}
                  </h3>
                  <p className="text-white/30 text-xs">{category.skills.length} skills</p>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    color={category.color}
                    delay={catIndex * 0.1 + skillIndex * 0.08}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech badges row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "PHP", "MySQL", "Git", "GitHub", "Tailwind", "VS Code"].map(
            (tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 glass rounded-xl border border-white/8 text-sm text-white/60 hover:text-white/90 hover:border-primary-500/30 transition-all duration-300 cursor-default"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                {tech}
              </motion.span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
