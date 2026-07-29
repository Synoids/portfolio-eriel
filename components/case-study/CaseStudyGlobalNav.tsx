"use client";

import { useLanguage } from "@/components/ui/LanguageProvider";
import { projects } from "@/data/projects";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function CaseStudyGlobalNav({ currentSlug }: { currentSlug: string }) {
  const { lang } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to active item
  useEffect(() => {
    if (!scrollRef.current) return;
    const activeEl = scrollRef.current.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [currentSlug]);

  return (
    <div className="w-full border-b border-foreground/5 bg-background sticky top-[72px] z-40">
      <div className="max-w-4xl mx-auto px-6">
        <div 
          ref={scrollRef}
          className="flex items-center gap-6 overflow-x-auto py-4 scrollbar-hide"
        >
          {projects.map((project) => {
            const isActive = project.slug === currentSlug;
            return (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                data-active={isActive}
                className={`shrink-0 flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive 
                    ? "text-foreground" 
                    : "text-foreground/40 hover:text-foreground/80"
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-foreground" />}
                {project.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
