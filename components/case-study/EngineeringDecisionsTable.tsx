"use client";

import { useLanguage } from "@/components/ui/LanguageProvider";
import { Project } from "@/data/projects";

interface EngineeringDecisionsTableProps {
  decisions: NonNullable<Project["engineeringDecisions"]>;
}

export default function EngineeringDecisionsTable({ decisions }: EngineeringDecisionsTableProps) {
  const { lang } = useLanguage();

  if (!decisions || decisions.length === 0) return null;

  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-foreground/20 text-sm font-semibold text-foreground">
            <th className="py-4 px-4 align-top w-1/4">{lang === "en" ? "Decision" : "Keputusan"}</th>
            <th className="py-4 px-4 align-top w-1/4">{lang === "en" ? "Alternatives" : "Alternatif"}</th>
            <th className="py-4 px-4 align-top w-1/2">{lang === "en" ? "Why This Choice" : "Alasan Pemilihan"}</th>
          </tr>
        </thead>
        <tbody className="text-sm text-foreground/70">
          {decisions.map((item, idx) => (
            <tr key={idx} className="border-b border-foreground/10 last:border-0 hover:bg-foreground/[0.02] transition-colors">
              <td className="py-4 px-4 align-top font-medium text-foreground">
                {item.decision}
              </td>
              <td className="py-4 px-4 align-top">
                {item.alternatives}
              </td>
              <td className="py-4 px-4 align-top leading-relaxed">
                {item.reason[lang]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
