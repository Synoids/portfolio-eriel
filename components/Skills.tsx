"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillCategories, techBadges } from "@/data/skills";

function SkillBar({ name, level, emoji, color, delay }: {
  name: string;
  level: number;
  emoji: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay, duration: 0.5 }}
      className="group space-y-2"
    >
      <div className="flex justify-between items-end text-sm">
        <span className="flex items-center gap-2 text-white font-medium group-hover:text-primary-300 transition-colors">
          <span className="text-base leading-none">{emoji}</span>
          {name}
        </span>
        <span className="text-white/40 text-xs font-mono">{level}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 1.2, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r shadow-[0_0_12px_rgba(0,0,0,0.2)] ${color}`}
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
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: catIndex * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`glass rounded-3xl p-7 border relative group overflow-hidden ${category.borderColor} ${category.bgColor} hover:shadow-2xl transition-all duration-500`}
            >
              {/* Decorative background glow */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700`} />
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
                    className={`text-xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
                  >
                    {category.name}
                  </h3>
                  <p className="text-white/50 text-xs font-mono uppercase tracking-wider">{category.skills.length} technical skills</p>
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
          {techBadges.map((tech, i) => (
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
          ))}
        </motion.div>
      </div>
    </section>
  );
}
