"use client";

import { Project } from "@/data/projects";
import { useLanguage } from "@/components/ui/LanguageProvider";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudySection from "@/components/case-study/CaseStudySection";
import EngineeringDecisionsTable from "@/components/case-study/EngineeringDecisionsTable";
import ArchitectureFlow from "@/components/case-study/ArchitectureFlow";
import CaseStudyGallery from "@/components/case-study/CaseStudyGallery";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";

export default function CaseStudyContent({ project }: { project: Project }) {
  const { lang } = useLanguage();

  return (
    <>
      {/* HERO */}
      <CaseStudyHero project={project} />

      <div className="max-w-4xl mx-auto px-6">
        {/* WHY THIS MATTERS */}
        {project.whyThisMatters && (
          <CaseStudySection title={lang === "en" ? "Why This Matters" : "Mengapa Ini Penting"}>
            <p className="text-lg text-foreground/80 leading-relaxed font-medium mb-6">
              {project.whyThisMatters[lang]}
            </p>
          </CaseStudySection>
        )}

        {/* PROBLEM */}
        {project.problem && (
          <CaseStudySection title={lang === "en" ? "The Problem" : "Masalah"}>
            <p>{project.problem[lang]}</p>
          </CaseStudySection>
        )}

        {/* EXISTING WORKFLOW */}
        {project.existingWorkflow && Array.isArray(project.existingWorkflow) && project.existingWorkflow.length > 0 && (
          <CaseStudySection title={lang === "en" ? "Existing Workflow" : "Alur Kerja Saat Ini"}>
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-2 overflow-x-auto pb-4 mt-6">
              {project.existingWorkflow.map((flow, idx) => (
                <div key={idx} className="flex items-center min-w-[200px] shrink-0">
                  <div className="bg-foreground/5 border border-foreground/10 p-4 rounded-xl flex flex-col gap-2 w-full">
                    <span className="text-sm font-bold text-foreground">{flow.step[lang]}</span>
                    {flow.description && (
                      <span className="text-xs text-foreground/60 leading-relaxed">{flow.description[lang]}</span>
                    )}
                  </div>
                  {idx < (project.existingWorkflow as unknown[]).length - 1 && (
                    <div className="hidden md:flex shrink-0 w-8 justify-center text-foreground/20 px-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CaseStudySection>
        )}

        {/* CONSTRAINTS */}
        {project.constraints && project.constraints[lang].length > 0 && (
          <CaseStudySection title={lang === "en" ? "Constraints" : "Batasan"}>
            <ul className="list-disc pl-6 space-y-2">
              {project.constraints[lang].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CaseStudySection>
        )}

        {/* STAKEHOLDERS */}
        {project.stakeholders && project.stakeholders[lang].length > 0 && (
          <CaseStudySection title={lang === "en" ? "Stakeholders" : "Pemangku Kepentingan"}>
            <ul className="list-disc pl-6 space-y-2">
              {project.stakeholders[lang].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CaseStudySection>
        )}

        {/* SUCCESS CRITERIA */}
        {project.successCriteria && project.successCriteria[lang].length > 0 && (
          <CaseStudySection title={lang === "en" ? "Success Criteria" : "Indikator Keberhasilan"}>
            <ul className="list-disc pl-6 space-y-2">
              {project.successCriteria[lang].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CaseStudySection>
        )}

        {/* GOALS */}
        {project.goals && project.goals[lang].length > 0 && (
          <CaseStudySection title={lang === "en" ? "Goals" : "Tujuan"}>
            <ul className="list-disc pl-6 space-y-2">
              {project.goals[lang].map((goal, i) => (
                <li key={i}>{goal}</li>
              ))}
            </ul>
          </CaseStudySection>
        )}

        {/* SOLUTION */}
        {project.solutions && (
          <CaseStudySection title={lang === "en" ? "Solution" : "Solusi"}>
            <p>{project.solutions[lang]}</p>
          </CaseStudySection>
        )}

        {/* BEFORE VS AFTER */}
        {project.beforeVsAfter && project.beforeVsAfter.length > 0 && (
          <CaseStudySection title={lang === "en" ? "Before vs After" : "Sebelum vs Sesudah"}>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto mt-6">
              <table className="w-full text-left border-collapse border border-foreground/10 rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-foreground/5 text-sm font-semibold text-foreground">
                    <th className="py-4 px-6 w-1/2 border-b border-r border-foreground/10 text-red-500/80">Before</th>
                    <th className="py-4 px-6 w-1/2 border-b border-foreground/10 text-green-500/80">After</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-foreground/80">
                  {project.beforeVsAfter.map((item, idx) => (
                    <tr key={idx} className="border-b border-foreground/10 last:border-0 hover:bg-foreground/[0.01]">
                      <td className="py-4 px-6 align-top border-r border-foreground/10 leading-relaxed bg-red-500/[0.02]">
                        {item.before[lang]}
                      </td>
                      <td className="py-4 px-6 align-top leading-relaxed bg-green-500/[0.02]">
                        {item.after[lang]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Cards */}
            <div className="flex md:hidden flex-col gap-6 mt-6">
              {project.beforeVsAfter.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl">
                    <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mb-2">Before</span>
                    <p className="text-foreground/80 text-sm leading-relaxed">{item.before[lang]}</p>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 p-4 rounded-xl">
                    <span className="text-xs font-bold text-green-500 uppercase tracking-wider block mb-2">After</span>
                    <p className="text-foreground/80 text-sm leading-relaxed">{item.after[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </CaseStudySection>
        )}

        {/* ARCHITECTURE */}
        {project.architecture && project.architecture.length > 0 && (
          <CaseStudySection title={lang === "en" ? "Architecture" : "Arsitektur"}>
            <ArchitectureFlow architecture={project.architecture} />
          </CaseStudySection>
        )}

        {/* ENGINEERING DECISIONS */}
        {project.engineeringDecisions && project.engineeringDecisions.length > 0 && (
          <CaseStudySection title={lang === "en" ? "Engineering Decisions" : "Keputusan Engineering"}>
            <EngineeringDecisionsTable decisions={project.engineeringDecisions} />
          </CaseStudySection>
        )}

        {/* TRADE-OFFS */}
        {project.tradeOffs && (
          <CaseStudySection title={lang === "en" ? "Trade-offs" : "Trade-off"}>
            <p>{project.tradeOffs[lang]}</p>
          </CaseStudySection>
        )}

        {/* IMPLEMENTATION */}
        {project.implementation && (
          <CaseStudySection title={lang === "en" ? "Implementation Details" : "Detail Implementasi"}>
            <p>{project.implementation[lang]}</p>
          </CaseStudySection>
        )}

        {/* CHALLENGES */}
        {project.challenges && (
          <CaseStudySection title={lang === "en" ? "Challenges" : "Tantangan"}>
            <p>{project.challenges[lang]}</p>
          </CaseStudySection>
        )}

        {/* GALLERY */}
        {project.gallery && project.gallery.length > 0 && (
          <CaseStudySection title={lang === "en" ? "Gallery" : "Galeri"}>
            <CaseStudyGallery gallery={project.gallery} />
          </CaseStudySection>
        )}

        {/* BUSINESS IMPACT */}
        {project.businessImpact && (
          <CaseStudySection title={lang === "en" ? "Business Impact" : "Dampak Bisnis"}>
            <p>{project.businessImpact[lang]}</p>
          </CaseStudySection>
        )}

        {/* TECHNICAL ACHIEVEMENT */}
        {project.technicalAchievement && (
          <CaseStudySection title={lang === "en" ? "Technical Achievement" : "Pencapaian Teknis"}>
            <p>{project.technicalAchievement[lang]}</p>
          </CaseStudySection>
        )}

        {/* LESSONS LEARNED */}
        {project.lessonsLearned && (
          <CaseStudySection title={lang === "en" ? "Lessons Learned" : "Pelajaran Berharga"}>
            <p>{project.lessonsLearned[lang]}</p>
          </CaseStudySection>
        )}

        {/* FUTURE IMPROVEMENTS */}
        {project.futureImprovements && project.futureImprovements[lang].length > 0 && (
          <CaseStudySection title={lang === "en" ? "Future Improvements" : "Peningkatan ke Depan"}>
            <ul className="list-disc pl-6 space-y-2">
              {project.futureImprovements[lang].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CaseStudySection>
        )}

        {/* WHAT I'D DO DIFFERENTLY TODAY */}
        {project.whatIdDoDifferently && (
          <CaseStudySection title={lang === "en" ? "What I Would Do Differently Today" : "Apa yang Akan Saya Lakukan Berbeda Hari Ini"}>
            <p>{project.whatIdDoDifferently[lang]}</p>
          </CaseStudySection>
        )}
        
        {/* NAVIGATION FOOTER */}
        <CaseStudyNav currentProject={project} />
      </div>
    </>
  );
}
