"use client";

import { motion } from "framer-motion";
import { Code2, Heart, Mail, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { useLanguage } from "@/components/LanguageProvider";
import { translations } from "@/data/translations";

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].nav;
  const ft = translations[lang].footer;
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navLinks = [
    { href: "#home", label: t.home },
    { href: "#about", label: t.about },
    { href: "#skills", label: t.skills },
    { href: "#projects", label: t.projects },
    { href: "#contact", label: t.contact },
  ];

  return (
    <footer className="relative border-t border-foreground/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -top-20 bg-gradient-to-t from-primary-900/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary-500/20 border border-primary-500/30 flex items-center justify-center">
                <Code2 size={18} className="text-primary-400" />
              </div>
              <span className="text-lg font-bold font-mono">
                <span className="gradient-text">Eriel</span>
                <span className="text-foreground/70">.my.id</span>
              </span>
            </div>
            <p className="text-foreground/50 dark:text-white/40 text-sm leading-relaxed max-w-xs">
              {ft.brandDesc}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-foreground/60 dark:text-white/60 text-xs font-semibold uppercase tracking-widest">
              {ft.navigation}
            </h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground/50 dark:text-white/40 hover:text-primary-500 text-sm transition-colors duration-300 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-foreground/60 dark:text-white/60 text-xs font-semibold uppercase tracking-widest">
              {ft.connect}
            </h4>
            <div className="flex gap-3">
              {[
                { icon: FaGithub, href: "https://github.com/Synoids", label: "GitHub" },
                { icon: FaLinkedin, href: "https://www.linkedin.com/in/eriel-budiman-029905373/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:eriel473@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  dragListener={false}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl glass border border-foreground/10 hover:border-primary-500/40 flex items-center justify-center text-foreground/50 dark:text-white/40 hover:text-primary-400 transition-all duration-300 cursor-pointer"
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
            <p className="text-foreground/40 dark:text-white/30 text-xs">
              {ft.opportunities}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-foreground/10 dark:via-white/8 to-transparent mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-foreground/40 dark:text-white/30 text-sm flex items-center gap-1.5">
            © 2026 Eriel Budiman. {ft.madeWith}{" "}
            <Heart size={13} className="text-primary-500 fill-primary-500 inline" /> {ft.using}
            Next.js &amp; Tailwind
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-foreground/10 hover:border-primary-500/30 text-foreground/50 dark:text-white/40 hover:text-primary-500 text-sm transition-all duration-300"
            id="back-to-top-btn"
          >
            <ArrowUp size={14} />
            {ft.backToTop}
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
