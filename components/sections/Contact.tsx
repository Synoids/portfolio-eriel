"use client";

import { motion } from "framer-motion";
import { useState, useRef, FormEvent } from "react";
import { Send, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { profile } from "@/data/profile";
import { useLanguage } from "@/components/ui/LanguageProvider";

export default function Contact() {
  const { lang } = useLanguage();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    
    if (!accessKey) {
      console.error("Web3Forms Access Key is missing");
      setStatus("idle");
      alert("Error: Contact form not configured yet.");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `New Message from ${formState.name} (Portfolio)`,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error(error);
      setStatus("idle");
      alert(lang === "en" ? "Something went wrong. Please try again." : "Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <section id="contact" className="section-padding relative border-t border-foreground/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left — Narrative & Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-3">
                {lang === "en" ? "Have an idea in mind?" : "Punya ide proyek?"}
              </h2>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground/70 tracking-tight mb-6">
                {lang === "en" ? "Let's build something together." : "Mari kita bangun bersama."}
              </h3>
              <p className="text-foreground/70 text-lg leading-relaxed max-w-md">
                {lang === "en" 
                  ? "Whether you have a complex problem that needs solving, a project in mind, or just want to discuss software architecture—I&apos;m always open to a conversation."
                  : "Baik Anda memiliki masalah kompleks yang perlu diselesaikan, ide proyek baru, atau hanya ingin berdiskusi tentang arsitektur perangkat lunak—saya selalu terbuka untuk berbincang."}
              </p>
            </div>

            <div className="pt-8 flex flex-col gap-4 border-t border-foreground/10">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(profile.email);
                  const el = document.getElementById("copy-text");
                  if(el) {
                    el.innerText = lang === "en" ? "Copied!" : "Tersalin!";
                    setTimeout(() => {
                      el.innerText = profile.email;
                    }, 2000);
                  }
                }}
                className="group flex items-center justify-between py-2 w-max gap-8 text-foreground/80 hover:text-foreground transition-colors cursor-pointer text-left"
              >
                <span id="copy-text" className="font-medium text-lg border-b border-transparent group-hover:border-foreground/30 transition-colors pb-0.5">
                  {profile.email}
                </span>
                <ArrowRight size={18} className="-rotate-45 group-hover:scale-110 transition-transform" />
              </button>
              <div className="flex gap-6 mt-4">
                <a href={profile.social.github.url} target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-foreground transition-colors">
                  <FaGithub size={24} />
                </a>
                <a href={profile.social.linkedin.url} target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-foreground transition-colors">
                  <FaLinkedin size={24} />
                </a>
                <a href={profile.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-foreground transition-colors">
                  <FaWhatsapp size={24} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — Minimalist Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name */}
              <div className="space-y-2">
                <label className="text-foreground/50 text-xs font-semibold uppercase tracking-wider" htmlFor="name">
                  {lang === "en" ? "Name" : "Nama"}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-0 py-3 bg-transparent border-b border-foreground/20 text-foreground placeholder-foreground/30 focus:outline-none focus:border-foreground transition-colors text-base"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-foreground/50 text-xs font-semibold uppercase tracking-wider" htmlFor="email">
                  {lang === "en" ? "Email Address" : "Alamat Email"}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-0 py-3 bg-transparent border-b border-foreground/20 text-foreground placeholder-foreground/30 focus:outline-none focus:border-foreground transition-colors text-base"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-foreground/50 text-xs font-semibold uppercase tracking-wider" htmlFor="message">
                  {lang === "en" ? "Project Details / Message" : "Detail Proyek / Pesan"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  placeholder={lang === "en" ? "Tell me about your problem..." : "Ceritakan masalah yang ingin diselesaikan..."}
                  className="w-full px-0 py-3 bg-transparent border-b border-foreground/20 text-foreground placeholder-foreground/30 focus:outline-none focus:border-foreground transition-colors text-base resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`w-max px-8 py-3.5 mt-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${status === "success"
                  ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                  : "bg-foreground text-background hover:scale-[1.02] active:scale-[0.98]"
                  }`}
              >
                {status === "loading" && <Loader2 size={16} className="animate-spin" />}
                {status === "success" && <CheckCircle size={16} />}
                {status === "idle" && <Send size={16} />}
                {status === "loading" ? (lang === "en" ? "Sending..." : "Mengirim...") : status === "success" ? (lang === "en" ? "Message Sent!" : "Pesan Terkirim!") : (lang === "en" ? "Send Message" : "Kirim Pesan")}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
