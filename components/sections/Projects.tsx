"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { translations } from "@/data/translations";

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const { lang } = useLanguage();
  
  // Featured project gets a larger, horizontal layout
  const isFeatured = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`group flex flex-col ${
        isFeatured ? "md:flex-row md:items-center gap-8 md:gap-12" : "gap-6"
      } border border-foreground/10 rounded-2xl p-4 md:p-6 hover:border-foreground/30 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)] transition-all duration-300 bg-foreground/[0.02]`}
    >
      {/* Cover Image */}
      <div 
        className={`relative ${
          isFeatured ? "w-full md:w-80 h-[240px] md:h-80" : "w-full h-48"
        } rounded-xl overflow-hidden border border-foreground/10 bg-background/50 flex-shrink-0`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-opacity duration-500 group-hover:opacity-90"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl bg-foreground/5">
            {project.emoji}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-1 ${isFeatured ? "py-4" : ""}`}>
        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-semibold text-foreground/50 tracking-wide uppercase">
          {project.projectType && (
            <span className="px-2.5 py-1 rounded-md border border-foreground/10 bg-foreground/5 text-foreground/80">
              {project.projectType[lang]}
            </span>
          )}
          {project.organization && (
            <span className="flex items-center gap-1.5">
              <Building size={14} />
              {project.organization[lang]}
            </span>
          )}
        </div>

        <h3 className={`${isFeatured ? "text-3xl md:text-4xl" : "text-xl"} font-bold text-foreground mb-4`}>
          {project.title}
        </h3>
        
        {/* Context / Problem */}
        <div className="space-y-2 mb-8">
          <div className="flex items-start gap-2">
            <Target size={18} className="text-foreground/40 mt-0.5 flex-shrink-0" />
            <p className="text-foreground/70 text-sm md:text-base leading-relaxed line-clamp-3">
              {project.problem ? project.problem[lang] : project.description[lang]}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-5 border-t border-foreground/10">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity active:scale-[0.98] group/btn w-max"
          >
            {lang === "en" ? "Read Case Study" : "Baca Case Study"}
            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { lang } = useLanguage();
  const t = translations[lang].projects;

  // Split into featured (1st) and others
  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-10 flex justify-between items-end border-b border-foreground/10 pb-6"
        >
          <div className="w-full flex justify-between items-end">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground tracking-tight">
              Selected Work
            </h2>
            <Link href="https://github.com/erielbudiman" target="_blank" className="text-sm font-medium hover:text-primary-500 transition-colors hidden sm:flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

        <div className="space-y-10">
          {/* Featured Project */}
          {featuredProject && (
            <ProjectCard project={featuredProject} index={0} />
          )}

          {/* Other Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
