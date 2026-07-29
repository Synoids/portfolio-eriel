"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/projects";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaCheckCircle, FaLightbulb, FaTools, FaDatabase, FaServer, FaCode, FaRocket } from "react-icons/fa";

type ProjectModalProps = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  lang: "en" | "id";
};

export default function ProjectModal({
  project,
  isOpen,
  onClose,
  lang,
}: ProjectModalProps) {
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedImage, setSelectedImage] = useState<{ image: string, title?: import("@/data/projects").LocalizedString, description?: import("@/data/projects").LocalizedString } | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project) return null;

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    { id: "overview", label: lang === "en" ? "Overview" : "Ikhtisar" },
    { id: "features", label: lang === "en" ? "Features" : "Fitur", show: !!project.features },
    { id: "deepdive", label: lang === "en" ? "Deep Dive" : "Pembahasan", show: !!project.challenges },
    { id: "architecture", label: lang === "en" ? "Architecture" : "Arsitektur", show: !!project.architecture },
    { id: "gallery", label: lang === "en" ? "Gallery" : "Galeri", show: !!project.gallery },
  ].filter(item => item.show !== false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-5xl max-h-full overflow-y-auto bg-white/95 dark:bg-[#0A0A0F]/95 backdrop-blur-xl border border-foreground/10 rounded-2xl md:rounded-3xl shadow-2xl pointer-events-auto flex flex-col relative custom-scrollbar scroll-smooth"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Close modal"
              >
                <FaTimes size={16} />
              </button>

              {/* Header / Hero Section */}
              <div className="relative w-full h-72 md:h-96 overflow-hidden shrink-0">
                {project.heroImage || project.image ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${project.heroImage || project.image})`,
                    }}
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                )}
                {/* Overlay gradient to ensure text readability */}
                <div className="absolute inset-0 bg-white/30 dark:bg-[#0A0A0F]/50 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/20 dark:from-[#0A0A0F] dark:via-[#0A0A0F]/95 dark:to-[#0A0A0F]/20" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col items-start gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.projectType && (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-500/20 text-primary-400 border border-primary-500/30">
                        {project.projectType[lang]}
                      </span>
                    )}
                    {project.status && (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {project.status[lang]}
                      </span>
                    )}
                    {project.complexity && (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                        {project.complexity}
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground drop-shadow-sm">
                    {project.title}
                  </h2>
                  
                  {project.summary && (
                    <p className="text-foreground/80 md:text-lg max-w-3xl">
                      {project.summary[lang]}
                    </p>
                  )}
                  
                  {project.highlightTech && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.highlightTech.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-foreground/10 text-foreground/80 border border-foreground/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-3 mt-4">
                    {project.links?.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium flex items-center gap-2 transition-colors shadow-lg shadow-primary-500/20"
                      >
                        <span>{project.links.demoLabel ? project.links.demoLabel[lang] : "Live Demo"}</span>
                        <FaExternalLinkAlt size={12} />
                      </a>
                    )}
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-foreground/10 hover:bg-foreground/20 text-foreground font-medium flex items-center gap-2 transition-colors"
                      >
                        <FaGithub size={16} />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Internal Navigation */}
              <div className="sticky top-0 z-30 flex items-center gap-2 overflow-x-auto custom-scrollbar px-6 md:px-10 py-3 bg-white/80 dark:bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-foreground/10">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeSection === item.id
                        ? "bg-primary-500/10 text-primary-500"
                        : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Main Content Area */}
              <div className="p-6 md:p-10 space-y-16">
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {/* Left Column: The Story */}
                  <div className="lg:col-span-2 space-y-12">
                    
                    {/* Overview */}
                    <div id="section-overview" className="space-y-6 scroll-mt-24">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                          <FaLightbulb className="text-primary-500" />
                          {lang === "en" ? "The Story" : "Cerita di Balik Layar"}
                        </h3>
                        <p className="text-foreground/70 leading-relaxed">
                          {project.description[lang]}
                        </p>
                      </div>

                      {project.problem && (
                        <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/10 space-y-3">
                          <h4 className="text-lg font-semibold text-rose-500">
                            {lang === "en" ? "The Problem" : "Permasalahan"}
                          </h4>
                          <p className="text-foreground/80 leading-relaxed">
                            {project.problem[lang]}
                          </p>
                        </div>
                      )}
                      
                      {project.motivation && (
                        <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 space-y-3">
                          <h4 className="text-lg font-semibold text-amber-500">
                            {lang === "en" ? "Motivation" : "Motivasi"}
                          </h4>
                          <p className="text-foreground/80 leading-relaxed">
                            {project.motivation[lang]}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    {project.features && (
                      <div id="section-features" className="space-y-6 scroll-mt-24">
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                          <FaRocket className="text-emerald-500" />
                          {lang === "en" ? "Key Features" : "Fitur Utama"}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {project.features[lang].map((feature, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-foreground/5 border border-foreground/10">
                              <FaCheckCircle className="text-emerald-500 mt-1 shrink-0" />
                              <span className="text-foreground/80">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Deep Dive */}
                    {(project.challenges || project.solutions || project.outcome) && (
                      <div id="section-deepdive" className="space-y-6 scroll-mt-24">
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                          <FaTools className="text-indigo-500" />
                          {lang === "en" ? "Deep Dive" : "Pembahasan Mendalam"}
                        </h3>
                        
                        <div className="space-y-6">
                          {project.challenges && (
                            <div className="space-y-2">
                              <h4 className="font-semibold text-foreground/90">
                                {lang === "en" ? "Technical Challenges" : "Tantangan Teknis"}
                              </h4>
                              <p className="text-foreground/70 leading-relaxed p-4 rounded-xl border border-foreground/10 bg-foreground/5">
                                {project.challenges[lang]}
                              </p>
                            </div>
                          )}
                          
                          {project.solutions && (
                            <div className="space-y-2">
                              <h4 className="font-semibold text-foreground/90">
                                {lang === "en" ? "The Solution" : "Solusi"}
                              </h4>
                              <p className="text-foreground/70 leading-relaxed p-4 rounded-xl border border-primary-500/20 bg-primary-500/5">
                                {project.solutions[lang]}
                              </p>
                            </div>
                          )}

                          {project.outcome && (
                            <div className="space-y-2">
                              <h4 className="font-semibold text-foreground/90">
                                {lang === "en" ? "Outcome & Impact" : "Hasil & Dampak"}
                              </h4>
                              <p className="text-foreground/70 leading-relaxed p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                                {project.outcome[lang]}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Sidebar (Metrics & Tech Stack) */}
                  <div className="space-y-8">
                    {/* Metrics */}
                    {project.metrics && (
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/50">
                          {lang === "en" ? "Project Scale" : "Skala Proyek"}
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {project.metrics.map((metric, i) => (
                            <div key={i} className="p-4 rounded-xl bg-foreground/5 border border-foreground/10 flex flex-col gap-1">
                              <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                              <span className="text-xs font-medium text-foreground/60">{metric.label[lang]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech Stack */}
                    {project.techStack && (
                      <div className="space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/50">
                          Tech Stack
                        </h4>
                        <div className="space-y-4">
                          {project.techStack.map((category, i) => (
                            <div key={i} className="space-y-2">
                              <h5 className="text-xs font-semibold text-foreground/70">{category.category[lang]}</h5>
                              <div className="flex flex-wrap gap-2">
                                {category.items.map((item, j) => (
                                  <span
                                    key={j}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                                      item.highlight 
                                        ? "bg-primary-500/10 text-primary-500 border-primary-500/20" 
                                        : "bg-foreground/5 text-foreground/80 border-foreground/10 hover:bg-foreground/10"
                                    }`}
                                  >
                                    {item.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Timeline */}
                    {project.developmentTimeline && (
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/50">
                          {lang === "en" ? "Timeline" : "Lini Masa"}
                        </h4>
                        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-foreground/10 before:to-transparent">
                          {project.developmentTimeline.map((phase, i) => (
                            <div key={i} className="relative flex items-center gap-4 text-sm">
                              <div className="w-4 h-4 rounded-full bg-primary-500/20 border-2 border-primary-500 shrink-0 z-10" />
                              <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-3 w-full">
                                <h5 className="font-semibold">{phase.title[lang]}</h5>
                                {phase.description && (
                                  <p className="text-xs text-foreground/60 mt-1">{phase.description[lang]}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Architecture */}
                {project.architecture && (
                  <div id="section-architecture" className="space-y-8 scroll-mt-24 pt-8 border-t border-foreground/10">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <FaServer className="text-sky-500" />
                      {lang === "en" ? "System Architecture" : "Arsitektur Sistem"}
                    </h3>
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2">
                      {project.architecture.map((node, i) => (
                        <React.Fragment key={i}>
                          <div className="flex-1 min-w-[200px] w-full p-5 rounded-2xl bg-foreground/5 border border-foreground/10 flex flex-col items-center text-center gap-3 relative group hover:bg-foreground/10 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-background border border-foreground/10 flex items-center justify-center text-xl text-primary-500 shadow-sm">
                              <FaCode />
                            </div>
                            <div>
                              <h5 className="font-bold text-foreground">{node.title[lang]}</h5>
                              {node.description && (
                                <p className="text-xs text-foreground/60 mt-1">{node.description[lang]}</p>
                              )}
                            </div>
                          </div>
                          {i < project.architecture!.length - 1 && (
                            <div className="hidden md:block w-8 h-0.5 bg-foreground/20 shrink-0" />
                          )}
                          {i < project.architecture!.length - 1 && (
                            <div className="block md:hidden h-8 w-0.5 bg-foreground/20 shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                  <div id="section-gallery" className="space-y-6 scroll-mt-24 pt-8 border-t border-foreground/10">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <FaLightbulb className="text-amber-500" />
                      {lang === "en" ? "Gallery" : "Galeri"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {project.gallery.map((item, i) => (
                        <div 
                          key={i} 
                          className="group relative aspect-video rounded-xl overflow-hidden bg-foreground/5 cursor-pointer border border-foreground/10"
                          onClick={() => setSelectedImage(item)}
                        >
                          <img 
                            src={item.image} 
                            alt={item.title ? item.title[lang] : "Gallery image"} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                            {item.title && <h5 className="text-white font-bold text-sm">{item.title[lang]}</h5>}
                            {item.description && <p className="text-white/70 text-xs mt-1 line-clamp-2">{item.description[lang]}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Developer Notes / Reflections */}
                {(project.lessonsLearned || project.whatIdDoDifferently || project.developerNotes) && (
                  <div className="pt-8 border-t border-foreground/10 space-y-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <FaDatabase className="text-orange-500" />
                      {lang === "en" ? "Reflections" : "Refleksi"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.lessonsLearned && (
                        <div className="p-6 rounded-2xl bg-foreground/5 border border-foreground/10 space-y-3">
                          <h4 className="font-bold text-foreground">
                            {lang === "en" ? "Lessons Learned" : "Pelajaran Berharga"}
                          </h4>
                          <p className="text-sm text-foreground/70 leading-relaxed">
                            {project.lessonsLearned[lang]}
                          </p>
                        </div>
                      )}
                      
                      {project.whatIdDoDifferently && (
                        <div className="p-6 rounded-2xl bg-foreground/5 border border-foreground/10 space-y-3">
                          <h4 className="font-bold text-foreground">
                            {lang === "en" ? "What I'd Do Differently" : "Apa yang Akan Saya Ubah"}
                          </h4>
                          <p className="text-sm text-foreground/70 leading-relaxed">
                            {project.whatIdDoDifferently[lang]}
                          </p>
                        </div>
                      )}

                      {project.developerNotes && (
                        <div className="md:col-span-2 p-6 rounded-2xl bg-primary-500/5 border border-primary-500/10 space-y-3">
                          <h4 className="font-bold text-primary-500">
                            {lang === "en" ? "Developer's Note" : "Catatan Pengembang"}
                          </h4>
                          <p className="text-sm text-foreground/80 italic leading-relaxed">
                            &quot;{project.developerNotes[lang]}&quot;
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>

          {/* Lightbox for Gallery */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 md:p-10"
                onClick={() => setSelectedImage(null)}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <FaTimes size={20} />
                </button>
                <div 
                  className="relative max-w-5xl w-full max-h-full flex flex-col items-center justify-center gap-4"
                  onClick={e => e.stopPropagation()}
                >
                  <img 
                    src={selectedImage.image} 
                    alt="Gallery item" 
                    className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
                  />
                  {(selectedImage.title || selectedImage.description) && (
                    <div className="text-center text-white space-y-1">
                      {selectedImage.title && <h3 className="text-xl font-bold">{selectedImage.title[lang]}</h3>}
                      {selectedImage.description && <p className="text-white/70">{selectedImage.description[lang]}</p>}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
