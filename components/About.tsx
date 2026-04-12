"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Code2, GraduationCap, Lightbulb, MapPin } from "lucide-react";

const stats = [
  { label: "Projects Built", value: "10+" },
  { label: "Technologies", value: "8+" },
  { label: "Years Learning", value: "2+" },
  { label: "Cups of Coffee", value: "∞" },
];

const highlights = [
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Information Systems student at UIN Raden Fatah Palembang, diving deep into software engineering and web development.",
  },
  {
    icon: Code2,
    title: "Development",
    description:
      "Passionate about building functional, clean web apps. Currently exploring modern frameworks like Next.js and React.",
  },
  {
    icon: Lightbulb,
    title: "Learning",
    description:
      "Always curious — learning about UI/UX principles, backend integration, and best practices in software engineering.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary-400 font-mono text-sm tracking-widest uppercase mb-3">
            Get to know me
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent rounded-full mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Main bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-white/60 text-lg leading-relaxed">
              <p>
                Hey! I&apos;m{" "}
                <span className="text-white font-semibold">Eriel Budiman</span>, a dedicated
                Information Systems student at{" "}
                <span className="text-primary-400 font-semibold">
                  UIN Raden Fatah Palembang
                </span>
                .
              </p>
              <p>
                I&apos;m passionate about web development and software engineering, with a
                focus on creating{" "}
                <span className="text-white/80">clean, efficient, and user-friendly</span>{" "}
                applications that solve real problems.
              </p>
              <p>
                Currently leveling up my skills in modern frameworks like{" "}
                <span className="text-accent font-semibold">Next.js</span> and exploring the
                full stack — from designing intuitive UIs to building robust backend systems.
              </p>
            </div>

            {/* Location & Status */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 glass rounded-xl border border-white/10 text-sm text-white/60">
                <MapPin size={14} className="text-primary-400" />
                Palembang, Indonesia
              </div>
              <div className="flex items-center gap-2 px-4 py-2 glass rounded-xl border border-green-500/20 text-sm text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Open to opportunities
              </div>
            </div>

            {/* CTA */}
            <motion.a
              href="/resume.pdf"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500/10 border border-primary-500/30 hover:bg-primary-500/20 text-primary-300 hover:text-primary-200 font-medium text-sm transition-all duration-300"
            >
              <BookOpen size={15} />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Right — Stats & Highlights */}
          <div className="space-y-6">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass border border-white/8 rounded-2xl p-5 text-center hover:border-primary-500/30 transition-all duration-300 group"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="text-3xl font-extrabold gradient-text group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-white/40 text-xs mt-1 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="flex gap-4 glass border rounded-2xl p-4 hover:border-primary-500/25 transition-all duration-300 group"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-500/15 border border-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/25 transition-all">
                    <item.icon size={18} className="text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
