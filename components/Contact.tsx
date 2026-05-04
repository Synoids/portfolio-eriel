"use client";

import { motion } from "framer-motion";
import { useState, useRef, FormEvent } from "react";
import { Mail, Send, CheckCircle, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { profile } from "@/data/profile";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    color: "text-primary-400",
    bgColor: "bg-primary-500/10",
    borderColor: "border-primary-500/20",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: profile.social.github.display,
    href: profile.social.github.url,
    color: "text-foreground dark:text-white",
    bgColor: "bg-foreground/5 dark:bg-white/5",
    borderColor: "border-foreground/10 dark:border-white/10",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: profile.social.linkedin.display,
    href: profile.social.linkedin.url,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: profile.whatsapp,
    href: profile.whatsappHref,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
];

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary-600 dark:text-primary-400 font-mono text-sm tracking-widest uppercase mb-3">
            Let&apos;s talk
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-foreground/50 dark:text-white/40 max-w-lg mx-auto">
            Have a project in mind, or just want to say hi? My inbox is always open. I&apos;ll
            get back to you as soon as possible!
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground">Let&apos;s connect</h3>
              <p className="text-foreground/60 dark:text-white/50 leading-relaxed">
                Whether you want to collaborate on a project, ask a question, or just
                have a chat about tech — feel free to reach out through any channel.
              </p>
            </div>

            {/* Contact Links */}
            <div className="space-y-3">
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  dragListener={false}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4, scale: 1.01 }}
                  className={`flex items-center gap-4 p-4 glass border ${link.borderColor} rounded-2xl hover:shadow-lg transition-all duration-300 group cursor-pointer`}
                >
                  <div
                    className={`w-12 h-12 ${link.bgColor} border ${link.borderColor} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <link.icon size={20} className={link.color} />
                  </div>
                  <div>
                    <p className="text-foreground/50 dark:text-white/40 text-xs font-medium uppercase tracking-wider">
                      {link.label}
                    </p>
                    <p className={`font-semibold text-sm mt-0.5 ${link.color}`}>{link.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass border border-foreground/10 rounded-3xl p-8 space-y-5"
              style={{ borderColor: "var(--border)" }}
            >
              <h3 className="text-xl font-bold text-foreground mb-1">Send a message</h3>
              <p className="text-foreground/50 dark:text-white/40 text-sm">I&apos;ll reply within 24 hours.</p>

              {/* Name */}
              <div className="space-y-2">
                <label className="text-foreground/70 dark:text-white/50 text-sm font-medium" htmlFor="name">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-foreground/[0.03] border border-foreground/10 text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary-500/50 focus:bg-primary-500/5 transition-all duration-300 text-sm"
                  style={{
                    background: "var(--glass-bg)",
                    borderColor: "var(--glass-border)",
                  }}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-foreground/70 dark:text-white/50 text-sm font-medium" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-foreground/[0.03] border border-foreground/10 text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary-500/50 focus:bg-primary-500/5 transition-all duration-300 text-sm"
                  style={{
                    background: "var(--glass-bg)",
                    borderColor: "var(--glass-border)",
                  }}
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-foreground/70 dark:text-white/50 text-sm font-medium" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  placeholder={`Hi ${profile.firstName}, I'd love to talk about...`}
                  className="w-full px-4 py-3 rounded-xl bg-foreground/[0.03] border border-foreground/10 text-foreground placeholder-foreground/30 focus:outline-none focus:border-primary-500/50 focus:bg-primary-500/5 transition-all duration-300 text-sm resize-none"
                  style={{
                    background: "var(--glass-bg)",
                    borderColor: "var(--glass-border)",
                  }}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "loading" || status === "success"}
                whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
                whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
                id="contact-submit-btn"
                className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${status === "success"
                  ? "bg-green-500/20 border border-green-500/30 text-green-400"
                  : "bg-primary-500 hover:bg-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/25"
                  }`}
              >
                {status === "loading" && <Loader2 size={16} className="animate-spin" />}
                {status === "success" && <CheckCircle size={16} />}
                {status === "idle" && <Send size={16} />}
                {status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
