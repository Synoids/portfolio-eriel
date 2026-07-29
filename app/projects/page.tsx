"use client";

import { useLanguage } from "@/components/ui/LanguageProvider";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ProjectsArchivePage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="mb-16 md:mb-24">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground/50 hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              {lang === "en" ? "Back to Home" : "Kembali ke Beranda"}
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
              {lang === "en" ? "Engineering Case Studies" : "Studi Kasus Engineering"}
            </h1>
            <p className="text-xl text-foreground/60 max-w-2xl leading-relaxed">
              {lang === "en" 
                ? "A detailed archive of selected projects, exploring the architecture, technical decisions, and business impacts." 
                : "Arsip mendetail dari proyek terpilih, mengeksplorasi arsitektur, keputusan teknis, dan dampak bisnis."}
            </p>
          </div>

          {/* Archive List */}
          <div className="border-t border-foreground/10">
            {projects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <Link href={`/projects/${project.slug}`} className="group block py-10 border-b border-foreground/10 hover:bg-foreground/[0.02] transition-colors -mx-6 px-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-foreground/40">
                        <span>{project.year || "2026"}</span>
                        <span className="w-1 h-1 rounded-full bg-foreground/20" />
                        <span>{project.projectType?.[lang]}</span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary-600 transition-colors">
                        {project.title}
                      </h2>
                      
                      <p className="text-base text-foreground/60 line-clamp-2 max-w-3xl">
                        {project.summary ? project.summary[lang] : project.description[lang]}
                      </p>
                    </div>
                    
                    <div className="shrink-0 flex items-center gap-2 text-sm font-medium text-foreground/50 group-hover:text-primary-600 transition-colors">
                      <span>{lang === "en" ? "Read Case Study" : "Baca Studi Kasus"}</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
