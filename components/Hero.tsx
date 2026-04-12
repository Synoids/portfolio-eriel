"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Mail, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary-700/15 rounded-full blur-3xl animate-blob animation-delay-4000" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/20 text-sm text-primary-300"
          >
            <Sparkles size={14} className="text-primary-400" />
            Available for freelance work
          </motion.div>

          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/50 font-mono text-sm tracking-widest uppercase"
            >
              Hi there, I'm 👋
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight"
            >
              <span className="text-white">Eriel</span>
              <br />
              <span className="gradient-text">Budiman</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl font-semibold text-white/70"
            >
              Information Systems Student &{" "}
              <span className="text-primary-400">Junior Web Developer</span>
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-white/50 text-lg leading-relaxed max-w-md"
          >
            I build simple, clean, and functional web applications using modern
            web technologies.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => handleScroll("projects")}
              className="px-7 py-3.5 rounded-2xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm transition-all duration-300"
            >
              View Projects →
            </button>

            <button
              onClick={() => handleScroll("contact")}
              className="px-7 py-3.5 rounded-2xl glass border border-white/10 text-white/80 hover:text-white font-semibold text-sm transition-all duration-300"
            >
              Contact Me
            </button>
          </motion.div>

          {/* SOCIAL */}
          <div className="flex items-center gap-4">
            <span className="text-white/30 text-sm">Find me on</span>

            <div className="flex gap-3">
              <a
                href="https://github.com/Synoids"
                target="_blank"
                className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/50 hover:text-primary-400"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/eriel-budiman-029905373/"
                target="_blank"
                className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/50 hover:text-primary-400"
              >
                <FaLinkedin />
              </a>

              <a
                href="mailto:eriel473@gmail.com"
                className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/50 hover:text-primary-400"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT - PHOTO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-72 h-72 lg:w-80 lg:h-80">

            <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary-500/30 animate-spin [animation-duration:15s]" />

            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-primary-500/30 to-accent/10 blur-2xl" />

            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary-500/30">
              <Image
                src="/eriel.jpg"
                alt="Eriel Budiman"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* SCROLL */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 cursor-pointer"
        onClick={() => handleScroll("about")}
      >
        <span className="text-xs tracking-widest font-mono uppercase">
          Scroll
        </span>
        <ArrowDown size={16} />
      </div>
    </section>
  );
}