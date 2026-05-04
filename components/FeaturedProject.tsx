"use client";

import { motion } from "framer-motion";
import { 
  Target, 
  BrainCircuit,
  BarChart3,
  Rocket,
  FileText
} from "lucide-react";

const fintrackFeatures = [
  {
    icon: <BrainCircuit className="w-5 h-5" />,
    title: "AI Finance Assistant",
    desc: "Powered by Gemini 2.5 Flash for real-time contextual financial insights."
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Advanced Analytics",
    desc: "Dynamic visualizations using Recharts with deep category-wise distribution."
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "Goal-Driven Design",
    desc: "Integrated savings target tracking and automated budget enforcement."
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Professional Reporting",
    desc: "Automated PDF generation for audit-ready financial summaries."
  }
];

export default function FeaturedProject() {
  return (
    <section className="py-12 relative overflow-hidden">
      {/* Glow Effects - Hidden on mobile */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[80px] -z-10 hidden md:block" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-indigo-600/5 rounded-full blur-[80px] -z-10 hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-6 bg-emerald-500/30 hidden sm:block" />
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold tracking-widest uppercase">
                <Rocket size={10} />
                Flagship Project
              </span>
              <div className="h-[1px] w-6 bg-emerald-500/30 hidden sm:block" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 leading-[1.1]">
              FinanceFlow <span className="text-emerald-500">AI</span>
              <br />
              <span className="text-foreground/50 text-xl md:text-2xl font-medium tracking-tight">AI-Powered Financial Intelligence</span>
            </h2>

            <p className="text-foreground/70 dark:text-foreground/50 text-base mb-8 leading-relaxed max-w-lg mx-auto">
              A professional-grade financial management ecosystem that transcends conventional tracking. 
              Utilizes <span className="text-primary-500 font-semibold">Generative AI</span> to transform raw data 
              into actionable coaching and contextual intelligence.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8 w-full text-left">
              {fintrackFeatures.map((f, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl glass border border-foreground/5 hover:bg-foreground/[0.05] hover:border-emerald-500/20 transition-all duration-300 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold text-[13px] mb-0.5">{f.title}</h4>
                    <p className="text-foreground/50 text-[11px] leading-tight">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <motion.a
                href="https://fintrack-id.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold text-sm text-center transition-all shadow-[0_10px_20px_rgba(16,185,129,0.2)]"
              >
                Launch FinanceFlow AI
              </motion.a>
              
              <div className="flex items-center gap-2 group cursor-help">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-foreground/50 text-xs font-medium group-hover:text-foreground/80 transition-colors">
                  Next.js 16 & React 19 Ready
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
