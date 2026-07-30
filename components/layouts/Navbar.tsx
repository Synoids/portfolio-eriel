"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { translations } from "@/data/translations";

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const t = translations[lang].nav;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(
    pathname?.startsWith("/projects") ? "projects" : 
    pathname?.startsWith("/cv") ? "cv" : "home"
  );

  const navLinks = useMemo(() => [
    { href: "#home", label: t.home },
    { href: "#about", label: t.about },
    { href: "#skills", label: t.skills },
    { href: "#projects", label: t.projects },
    { href: "/cv", label: lang === 'en' ? "CV" : "CV", isRoute: true },
    { href: "#contact", label: t.contact },
  ], [t, lang]);

  useEffect(() => {
    if (pathname?.startsWith("/projects")) {
      setActiveSection("projects");
    } else if (pathname?.startsWith("/cv")) {
      setActiveSection("cv");
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Only run scroll spy on the home page where these sections exist
      if (pathname === "/") {
        const sections = navLinks.filter(l => !l.isRoute).map((l) => l.href.replace("#", ""));
        for (const section of sections.reverse()) {
          const el = document.getElementById(section);
          if (el && window.scrollY >= el.offsetTop - 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks, pathname]);

  const handleNavClick = (link: { href: string, isRoute?: boolean }) => {
    if (link.isRoute) {
      window.location.href = link.href;
      return;
    }

    const isMobile = isOpen;
    setIsOpen(false);
    
    const target = document.querySelector(link.href);
    if (target) {
      if (isMobile) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If target not found (e.g. on /cv page), go to home with hash
      window.location.href = "/" + link.href;
    }
  };

  const toggleLanguage = () => {
    setLang(lang === "en" ? "id" : "en");
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-foreground/10 shadow-sm"
          : "bg-background/80 backdrop-blur-lg md:bg-transparent md:backdrop-blur-none"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* Logo */}
          <motion.a
            href="/"
            onClick={(e) => { e.preventDefault(); handleNavClick({ href: "#home" }); }}
            className="flex items-center gap-2 group"
          >
            <div className="relative w-8 h-8 rounded-lg bg-foreground/5 border border-foreground/10 flex items-center justify-center group-hover:bg-foreground/10 transition-colors">
              <Code2 size={16} className="text-foreground/70" />
            </div>
            <span className="text-lg font-bold font-mono tracking-tight">
              <span className="text-foreground">erielbudiman</span>
              <span className="text-foreground/40">.my.id</span>
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link); }}
                className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-300 border ${
                  activeSection === link.href.replace("#", "")
                    ? "border-foreground text-foreground font-semibold"
                    : "border-transparent text-foreground/60 hover:text-foreground hover:bg-foreground/5 font-medium"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 rounded-lg border border-foreground/10 bg-foreground/5">
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${
                  lang === "en" ? "bg-foreground text-background shadow-md" : "text-foreground/40 hover:text-foreground"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("id")}
                className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${
                  lang === "id" ? "bg-foreground text-background shadow-md" : "text-foreground/40 hover:text-foreground"
                }`}
              >
                ID
              </button>
            </div>
            <ThemeToggle />
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick({ href: "#contact" }); }}
              className="px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              {t.hireMe}
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="px-2 py-1.5 rounded-lg bg-foreground/5 border border-foreground/10 text-[10px] font-bold text-foreground/70"
            >
              {lang.toUpperCase()}
            </button>
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 rounded-lg bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors"
            >
              {isOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-foreground/10 bg-background/95 backdrop-blur-xl"
          >
            <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link); }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeSection === link.href.replace("#", "")
                      ? "bg-foreground/5 text-foreground border border-foreground/10"
                      : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick({ href: "#contact" }); }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-2 px-4 py-3 rounded-lg text-sm font-semibold bg-foreground text-background text-center"
              >
                {t.hireMe}
              </motion.a>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
