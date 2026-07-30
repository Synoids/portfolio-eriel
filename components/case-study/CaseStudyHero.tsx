"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { calculateReadingTime } from "@/utils/readingTime";

interface CaseStudyHeroProps {
  project: Project;
}

export default function CaseStudyHero({ project }: CaseStudyHeroProps) {
  const { lang } = useLanguage();
  const readingTime = calculateReadingTime(project, lang);

  return (
    <div className="pt-8 md:pt-12 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <Link 
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground/50 hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          {lang === "en" ? "Case Studies Archive" : "Arsip Studi Kasus"}
        </Link>

        {/* Title Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-widest text-foreground/50 mb-6">
            <span>{project.projectType?.[lang]}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
            {project.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/70 font-medium">
            {project.summary ? project.summary[lang] : project.description[lang]}
          </p>
        </motion.div>

        {/* Metadata Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center gap-x-12 gap-y-6 mb-12 py-6 border-y border-foreground/10"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground/40">{lang === "en" ? "Year" : "Tahun"}</span>
            <span className="text-sm font-medium text-foreground">{project.year || "2026"}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground/40">{lang === "en" ? "Role" : "Peran"}</span>
            <span className="text-sm font-medium text-foreground">{project.myRole?.[lang]}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground/40">{lang === "en" ? "Duration" : "Durasi"}</span>
            <span className="text-sm font-medium text-foreground">{project.duration?.[lang]}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground/40">{lang === "en" ? "Read Time" : "Waktu Baca"}</span>
            <span className="text-sm font-medium text-foreground">{readingTime} min</span>
          </div>
          {project.links?.demo && (
            <div className="flex items-center ml-auto">
              <a 
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
              >
                {project.links.demoLabel?.[lang] || (lang === "en" ? "Live Demo" : "Demo Langsung")}
                <ExternalLink size={16} />
              </a>
            </div>
          )}
        </motion.div>
      </div>

      {/* Hero Image - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full max-w-6xl mx-auto px-4 md:px-6"
      >
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden border border-foreground/10 bg-foreground/5">
          {project.heroImage || project.image ? (
            <Image
              src={project.heroImage || project.image || ""}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-8xl">
              {project.emoji}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
