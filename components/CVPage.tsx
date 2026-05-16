"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail, MapPin, GraduationCap, Code2, ArrowLeft
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { profile } from "@/data/profile";
import { skillCategories } from "@/data/skills";
import { projects } from "@/data/projects";
import { FaGithub, FaLinkedin, FaWhatsapp, FaGlobe, FaPrint, FaUser, FaBriefcase, FaChevronRight } from "react-icons/fa";

export default function CVPage() {
  const { lang, setLang } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  const featuredProjects = projects.filter(p => p.featured).slice(0, 4);

  // Content for Organizational Experience
  const experiences = [
    {
      title: {
        en: "Head of Research and Technology Division",
        id: "Ketua Divisi Riset dan Teknologi"
      },
      organization: "HIMSI UIN Raden Fatah",
      period: "2024 — 2025",
      description: {
        en: [
          "Leading technology-driven initiatives and research programs to enhance student technical capabilities.",
          "Managing technical projects and fostering a culture of innovation within the organization."
        ],
        id: [
          "Memimpin inisiatif berbasis teknologi dan program riset untuk meningkatkan kapabilitas teknis mahasiswa.",
          "Mengelola proyek teknis dan membangun budaya inovasi di dalam organisasi."
        ]
      }
    }
  ];



  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:py-0 print:px-0">
      {/* Top Actions - Hidden on print */}
      <div className="max-w-5xl mx-auto mb-8 flex justify-between items-center print:hidden">
        <button
          onClick={() => window.history.back()}
          className="group flex items-center gap-2 px-4 py-2 rounded-xl glass border border-foreground/5 text-foreground/60 hover:text-primary-500 transition-all"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">{lang === 'en' ? 'Back to Portfolio' : 'Kembali ke Portfolio'}</span>
        </button>
        
        <div className="flex gap-4 items-center">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 glass p-1 rounded-xl border border-foreground/5">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all ${
                lang === "en" ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20" : "text-foreground/40 hover:text-foreground/60"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("id")}
              className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all ${
                lang === "id" ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20" : "text-foreground/40 hover:text-foreground/60"
              }`}
            >
              ID
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-500/20 active:scale-95"
          >
            <FaPrint size={16} />
            {lang === 'en' ? 'Print CV' : 'Cetak CV'}
          </button>
        </div>

      </div>

      {/* CV Paper */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[210mm] mx-auto bg-white dark:bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-none overflow-hidden print:shadow-none print:w-full print:max-w-none rounded-3xl print:rounded-none border border-slate-100 dark:border-slate-800"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[297mm]">
          {/* SIDEBAR */}
          <div className="md:col-span-4 bg-[#0F172A] text-slate-100 p-10 flex flex-col gap-10 print:bg-[#0F172A] print:text-white">
            {/* Header / Photo */}
            <div className="flex flex-col items-center text-center gap-6">
              <div className="relative w-36 h-36 rounded-3xl overflow-hidden border-4 border-slate-800 shadow-2xl rotate-3">
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  className="object-cover -rotate-3 scale-110"
                />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl font-black tracking-tight leading-tight">{profile.name}</h1>
                <p className="text-primary-400 font-bold text-xs uppercase tracking-[0.2em]">{profile.role[lang]}</p>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 border-b border-slate-800 pb-3">
                {lang === 'en' ? 'Get In Touch' : 'Hubungi Saya'}
              </h2>
              <div className="space-y-4">
                <a href={`mailto:${profile.email}`} className="group flex items-center gap-4 text-sm text-slate-400 hover:text-white transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-slate-800/50 flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all">
                    <Mail size={16} />
                  </div>
                  <span className="font-medium truncate">{profile.email}</span>
                </a>
                <a href={profile.whatsappHref} className="group flex items-center gap-4 text-sm text-slate-400 hover:text-white transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-slate-800/50 flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all">
                    <FaWhatsapp size={16} />
                  </div>
                  <span className="font-medium">{profile.whatsapp}</span>
                </a>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <div className="w-9 h-9 rounded-xl bg-slate-800/50 flex items-center justify-center text-primary-400">
                    <MapPin size={16} />
                  </div>
                  <span className="font-medium">{profile.location}</span>
                </div>
                <a href={profile.social.linkedin.url} className="group flex items-center gap-4 text-sm text-slate-400 hover:text-white transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-slate-800/50 flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all">
                    <FaLinkedin size={16} />
                  </div>
                  <span className="font-medium">{profile.social.linkedin.display.split('/in/')[1] || 'linkedin'}</span>
                </a>
                <a href={profile.social.github.url} className="group flex items-center gap-4 text-sm text-slate-400 hover:text-white transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-slate-800/50 flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all">
                    <FaGithub size={16} />
                  </div>
                  <span className="font-medium">{profile.social.github.username}</span>
                </a>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 border-b border-slate-800 pb-3">
                {lang === 'en' ? 'Core Expertise' : 'Keahlian Utama'}
              </h2>
              <div className="grid gap-6">
                {skillCategories.map((category, idx) => (
                  <div key={idx} className="space-y-3">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{category.name[lang]}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1.5 bg-slate-800/40 text-slate-300 text-[10px] font-bold rounded-lg border border-slate-700/50"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 border-b border-slate-800 pb-3">
                {lang === 'en' ? 'Languages' : 'Bahasa'}
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-300">Indonesia</span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary-500" />)}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-300">English</span>
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary-500" />)}
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="md:col-span-8 p-12 flex flex-col gap-12 bg-white dark:bg-slate-900">
            {/* Header Title (Mobile only) */}
            <div className="md:hidden space-y-2 mb-4">
               <h1 className="text-3xl font-black text-slate-900 dark:text-white">{profile.name}</h1>
               <p className="text-primary-500 font-bold uppercase tracking-wider">{profile.role[lang]}</p>
            </div>

            {/* Professional Summary */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                  <FaUser size={18} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  {lang === 'en' ? 'Profile Summary' : 'Ringkasan Profil'}
                </h2>
              </div>
              <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed text-[15px]">
                {profile.bio[lang].map((paragraph, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
            </section>

            {/* Organizational Experience */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                  <FaBriefcase size={18} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  {lang === 'en' ? 'Organizational Experience' : 'Pengalaman Organisasi'}
                </h2>
              </div>
              
              <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 dark:before:bg-slate-800">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="relative pl-12">
                    <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-primary-500 flex items-center justify-center z-10 shadow-sm">
                       <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                        <div>
                          <h3 className="text-lg font-black text-slate-900 dark:text-white">{exp.organization}</h3>
                          <p className="text-primary-500 font-bold text-sm">{exp.title[lang]}</p>
                        </div>
                        <span className="inline-block px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 font-bold text-[11px] tracking-wider">
                          {exp.period}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {exp.description[lang].map((item, i) => (
                          <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                            <FaChevronRight size={10} className="mt-1 text-primary-400 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                  <GraduationCap size={20} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  {lang === 'en' ? 'Education' : 'Pendidikan'}
                </h2>
              </div>
              
              <div className="relative pl-12 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 dark:before:bg-slate-800">
                 <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-primary-500 flex items-center justify-center z-10 shadow-sm">
                    <GraduationCap size={16} className="text-primary-500" />
                 </div>
                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white">UIN Raden Fatah Palembang</h3>
                      <p className="text-primary-500 font-bold text-sm">B.S. in Information Systems</p>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 font-bold text-[11px] tracking-wider">
                      2022 — Present
                    </span>
                 </div>
              </div>
            </section>

            {/* Featured Projects */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                  <Code2 size={20} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  {lang === 'en' ? 'Strategic Projects' : 'Proyek Strategis'}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-5">
                {featuredProjects.map((project, idx) => (
                  <div key={idx} className="group p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary-500/30 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-black text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex gap-2">
                        {project.tech.slice(0, 3).map((t, i) => (
                          <span key={i} className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {project.description[lang]}
                    </p>
                    <div className="flex gap-5">
                      <a
                        href={project.github}
                        target="_blank"
                        className="text-[11px] font-black text-primary-500 hover:text-primary-600 flex items-center gap-1.5 transition-colors"
                      >
                        <FaGithub size={12} /> {lang === 'en' ? 'Repository' : 'Repositori'}
                      </a>
                      {project.demo && project.demo !== '#' && (
                        <a
                          href={project.demo}
                          target="_blank"
                          className="text-[11px] font-black text-emerald-500 hover:text-emerald-600 flex items-center gap-1.5 transition-colors"
                        >
                          <FaGlobe size={12} /> {lang === 'en' ? 'Live Demo' : 'Demo Langsung'}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer - Only visible on print */}
            <div className="hidden print:block mt-auto pt-10 text-center border-t border-slate-100">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                {profile.name} — {profile.role[lang]} — {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
