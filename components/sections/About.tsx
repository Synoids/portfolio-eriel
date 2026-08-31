"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, MapPin } from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { translations } from "@/data/translations";
import { profile } from "@/data/profile";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { lang } = useLanguage();
  const t = translations[lang].about;

  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="block text-foreground/40 font-mono text-sm tracking-widest uppercase mb-2">
            {t.subtitle}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Engineering Mindset
          </h2>
        </motion.div>

        <div className="space-y-8">
          {/* Main bio - Narrative style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg dark:prose-invert prose-p:text-foreground/70 prose-p:leading-relaxed max-w-none"
          >
            {profile.bio[lang].map((paragraph, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-6 border-t border-foreground/10 flex flex-wrap gap-4 items-center"
          >
            {/* Location & Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-foreground/10 text-xs font-medium text-foreground/60 bg-foreground/5">
              <MapPin size={14} />
              {profile.location}
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-foreground/10 text-xs font-medium text-foreground/60 bg-foreground/5">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {profile.status[lang]}
            </div>

            {/* CTA */}
            <a
              href={profile.resume}
              className="ml-auto inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-foreground text-background font-medium text-sm hover:scale-[1.02] transition-transform"
            >
              <BookOpen size={16} />
              {lang === "en" ? "View Resume" : "Lihat CV"}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
