"use client";

import { ArrowUp, Code2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "@/data/profile";
import { useLanguage } from "@/components/ui/LanguageProvider";

export default function Footer() {
  const { lang } = useLanguage();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navLinks = [
    { href: "#home", label: lang === "en" ? "Home" : "Beranda" },
    { href: "#about", label: lang === "en" ? "Mindset" : "Pola Pikir" },
    { href: "#skills", label: lang === "en" ? "Expertise" : "Keahlian" },
    { href: "#projects", label: lang === "en" ? "Work" : "Karya" },
  ];

  return (
    <footer className="relative bg-foreground/[0.02] border-t border-foreground/5 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          {/* Brand & Narrative */}
          <div className="max-w-xs space-y-4">
            <div className="flex items-center gap-2 text-foreground font-bold font-mono tracking-tight text-lg">
              <Code2 size={20} className="text-foreground/70" />
              Eriel Budiman.
            </div>
            <p className="text-foreground/50 text-sm leading-relaxed">
              {lang === "en" 
                ? "Information Systems student & Software Engineer focused on problem-solving."
                : "Mahasiswa Sistem Informasi & Software Engineer yang berfokus pada pemecahan masalah."}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-8 md:gap-12 text-sm font-medium">
            <div className="flex flex-col gap-3">
              <span className="text-foreground/40 text-xs uppercase tracking-wider font-semibold mb-1">Menu</span>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-foreground/70 hover:text-foreground transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-foreground/40 text-xs uppercase tracking-wider font-semibold mb-1">Connect</span>
              <a href={profile.social.github.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors">
                <FaGithub size={16} /> GitHub
              </a>
              <a href={profile.social.linkedin.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors">
                <FaLinkedin size={16} /> LinkedIn
              </a>
              <a href={`mailto:${profile.email}`} className="text-foreground/70 hover:text-foreground transition-colors">
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-foreground/10 w-full mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-foreground/50">
          <p>
            © {new Date().getFullYear()} Eriel Budiman. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-foreground transition-colors group"
          >
            {lang === "en" ? "Back to top" : "Kembali ke atas"}
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
