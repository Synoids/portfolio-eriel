"use client";

import { Project } from "@/data/projects";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { Check, X } from "lucide-react";

interface CaseStudyQuickFactsProps {
  project: Project;
}

export default function CaseStudyQuickFacts({ project }: CaseStudyQuickFactsProps) {
  const { lang } = useLanguage();

  const facts = [
    { label: lang === "en" ? "Project Type" : "Tipe Proyek", value: project.projectType?.[lang] },
    { label: lang === "en" ? "Role" : "Peran", value: project.myRole?.[lang] },
    { label: lang === "en" ? "Client / Org" : "Klien / Org", value: project.organization?.[lang] },
    { label: "Status", value: project.status?.[lang] },
    { label: lang === "en" ? "Duration" : "Durasi", value: project.duration?.[lang] },
    { label: lang === "en" ? "Complexity" : "Kompleksitas", value: project.complexity },
    { 
      label: "Responsive", 
      value: project.responsive !== undefined ? (
        project.responsive ? <Check size={16} className="text-green-500" /> : <X size={16} className="text-red-500" />
      ) : undefined
    },
    { 
      label: "Open Source", 
      value: project.openSource !== undefined ? (
        project.openSource ? <Check size={16} className="text-green-500" /> : <X size={16} className="text-red-500" />
      ) : undefined
    },
  ].filter(f => f.value !== undefined);

  if (facts.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-foreground/10 my-12">
      {facts.map((fact, index) => (
        <div key={index} className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground/40">
            {fact.label}
          </span>
          <span className="text-sm font-medium text-foreground flex items-center h-6">
            {fact.value}
          </span>
        </div>
      ))}
    </div>
  );
}
