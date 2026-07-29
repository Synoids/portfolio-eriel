"use client";

import { useLanguage } from "@/components/ui/LanguageProvider";
import { Project } from "@/data/projects";
import { Database, Server, Smartphone, Globe, FileText, Send, ArrowRight } from "lucide-react";

interface ArchitectureFlowProps {
  architecture: NonNullable<Project["architecture"]>;
}

export default function ArchitectureFlow({ architecture }: ArchitectureFlowProps) {
  const { lang } = useLanguage();

  if (!architecture || architecture.length === 0) return null;

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "Database": return <Database size={24} />;
      case "Server": return <Server size={24} />;
      case "Smartphone": return <Smartphone size={24} />;
      case "Globe": return <Globe size={24} />;
      case "FileText": return <FileText size={24} />;
      case "Send": return <Send size={24} />;
      default: return <Server size={24} />;
    }
  };

  return (
    <div className="my-8 overflow-x-auto pb-6">
      <div className="flex items-start min-w-max">
        {architecture.map((node, idx) => (
          <div key={idx} className="flex items-center">
            {/* Node */}
            <div className="flex flex-col items-center w-40 text-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground">
                {getIcon(node.icon)}
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground mb-1">{node.title[lang]}</h4>
                {node.description && (
                  <p className="text-xs text-foreground/60 leading-relaxed">{node.description[lang]}</p>
                )}
              </div>
            </div>

            {/* Arrow */}
            {idx < architecture.length - 1 && (
              <div className="w-16 flex justify-center text-foreground/20 px-2 -mt-10">
                <ArrowRight size={20} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
