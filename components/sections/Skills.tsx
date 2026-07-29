"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { translations } from "@/data/translations";
import { skillCategories } from "@/data/skills";

export default function Skills() {
  const { lang } = useLanguage();
  const t = translations[lang].skills;

  return (
    <section id="skills" className="section-padding relative">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:mb-24"
        >
          <p className="text-foreground/40 font-mono text-sm tracking-widest uppercase mb-2">
            {t.subtitle}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Technical Expertise
          </h2>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {skillCategories.map((category, index) => (
            <div
              key={category.id}
              className="flex flex-col md:flex-row gap-6 md:gap-16"
            >
              {/* Category Title - Left Column */}
              <div className="md:w-1/3 flex-shrink-0">
                <h3 className="text-xl md:text-2xl font-bold text-foreground sticky top-24">
                  {category.name[lang]}
                </h3>
              </div>

              {/* Narrative & Tools - Right Column */}
              <div className="md:w-2/3 space-y-6">
                <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
                  {category.description[lang]}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {category.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg border border-foreground/10 bg-foreground/5 text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/10 hover:border-foreground/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
