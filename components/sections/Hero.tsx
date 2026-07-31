"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { translations } from "@/data/translations";
import { profile } from "@/data/profile";

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex flex-col pt-24 pb-10"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex-1 flex flex-col justify-between">
        {/* Main Content */}
        <div className="space-y-8 max-w-4xl mt-2 md:mt-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-block border-b border-foreground/20 pb-1 text-[10px] sm:text-xs font-mono font-medium text-foreground/50 uppercase tracking-widest"
          >
            Engineering Portfolio // 2026
          </motion.div>

          <div className="space-y-4 sm:space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-normal leading-[1.05] tracking-tight text-foreground pr-4"
            >
              {profile.firstName} {profile.lastName}.
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground/60 tracking-tight"
            >
              {profile.tagline[lang]}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-foreground/70 dark:text-foreground/60 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl"
          >
            {profile.description[lang]}
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button
              onClick={() => handleScroll("projects")}
              className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg bg-foreground text-background font-medium text-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {t.viewProjects}
            </button>

            <button
              onClick={() => handleScroll("contact")}
              className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg border border-foreground/20 text-foreground hover:bg-foreground/5 font-medium text-sm transition-colors"
            >
              {t.contactMe}
            </button>
          </motion.div>
        </div>

        {/* METADATA GRID & SOCIALS */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 pt-6 sm:pt-8 border-t border-foreground/10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
        >
          {/* Location */}
          <div className="flex flex-col gap-3">
            <span className="text-foreground/40 font-mono text-xs tracking-widest uppercase">
              Location
            </span>
            <span className="text-foreground/80 text-sm font-medium">
              {profile.location}
            </span>
          </div>

          {/* Focus */}
          <div className="flex flex-col gap-3">
            <span className="text-foreground/40 font-mono text-xs tracking-widest uppercase">
              Current Focus
            </span>
            <span className="text-foreground/80 text-sm font-medium">
              Systems Integration
            </span>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-3">
            <span className="text-foreground/40 font-mono text-xs tracking-widest uppercase">
              Status
            </span>
            <span className="text-foreground/80 text-sm font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              {profile.status[lang]}
            </span>
          </div>

          {/* Socials - Editorial Style */}
          <div className="flex flex-col gap-3">
            <span className="text-foreground/40 font-mono text-xs tracking-widest uppercase">
              Connect
            </span>
            <div className="flex flex-wrap gap-2">
              <a href={profile.social.github.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 hover:border-foreground/30 text-sm font-medium text-foreground/80 hover:text-foreground transition-all w-max">
                GitHub <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a href={profile.social.linkedin.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 hover:border-foreground/30 text-sm font-medium text-foreground/80 hover:text-foreground transition-all w-max">
                LinkedIn <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SCROLL */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/30 hover:text-foreground/60 transition-colors cursor-pointer"
        onClick={() => handleScroll("about")}
      >
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
}
