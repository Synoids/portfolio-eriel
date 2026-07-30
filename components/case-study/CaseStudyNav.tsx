"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Grid } from "lucide-react";
import { Project, projects } from "@/data/projects";
import { useLanguage } from "@/components/ui/LanguageProvider";

interface CaseStudyNavProps {
  currentProject: Project;
}

export default function CaseStudyNav({ currentProject }: CaseStudyNavProps) {
  const { lang } = useLanguage();
  
  const currentIndex = projects.findIndex(p => p.id === currentProject.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  return (
    <div className="py-12 mt-12 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6">
      <Link 
        href={`/projects/${prevProject.slug}`}
        className="flex-1 flex items-center gap-4 group w-full hover:bg-foreground/5 p-4 rounded-xl transition-colors"
      >
        <ArrowLeft size={20} className="text-foreground/40 group-hover:text-foreground group-hover:-translate-x-1 transition-all shrink-0" />
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground/40">{lang === "en" ? "Previous" : "Sebelumnya"}</span>
          <span className="font-medium text-foreground">{prevProject.title}</span>
        </div>
      </Link>

      <div className="shrink-0">
        <Link 
          href="/#projects"
          className="flex p-3 rounded-full border border-foreground/10 text-foreground/50 hover:text-foreground hover:bg-foreground/5 transition-colors"
          title={lang === "en" ? "All Projects" : "Semua Proyek"}
        >
          <Grid size={20} />
        </Link>
      </div>

      <Link 
        href={`/projects/${nextProject.slug}`}
        className="flex-1 flex items-center gap-4 group w-full hover:bg-foreground/5 p-4 rounded-xl transition-colors text-right justify-end"
      >
        <div className="flex flex-col items-end">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground/40">{lang === "en" ? "Next" : "Selanjutnya"}</span>
          <span className="font-medium text-foreground">{nextProject.title}</span>
        </div>
        <ArrowRight size={20} className="text-foreground/40 group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0" />
      </Link>
    </div>
  );
}
