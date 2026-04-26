"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Wallet, 
  PieChart, 
  Target, 
  ExternalLink, 
  BrainCircuit,
  ShieldCheck,
  Zap,
  BarChart3,
  Rocket
} from "lucide-react";
import Image from "next/image";

const fintrackFeatures = [
  {
    icon: <Wallet className="w-5 h-5" />,
    title: "Multi-Wallet Hub",
    desc: "Unified management for Cash, Bank, and E-Wallets."
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Spending Forecast",
    desc: "AI-driven weighted-average predictions for better planning."
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "Smart Piggy Bank",
    desc: "Integrated financial goals with automated balance syncing."
  },
  {
    icon: <BrainCircuit className="w-5 h-5" />,
    title: "AI Financial Insights",
    desc: "Detects spending patterns and provides personal advice."
  }
];

export default function FeaturedProject() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#050508]">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Side (Mockup) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 relative"
          >
            {/* Mockup Container */}
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-[6px] border-slate-900 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
              <Image 
                src="/fintrack-mockup.png"
                alt="Fintrack ID Dashboard"
                width={800}
                height={550}
                className="w-full h-auto"
              />
              
              {/* Floating Tech Badges */}
              <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                 {["Next.js 16", "React 19", "Supabase", "Tailwind 4"].map(tech => (
                   <span key={tech} className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">
                     {tech}
                   </span>
                 ))}
              </div>
            </div>

            {/* Floating Stats Card */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-4 z-20 p-5 rounded-3xl bg-slate-900/80 border border-emerald-500/30 backdrop-blur-xl shadow-2xl hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Growth Trend</p>
                  <p className="text-white text-lg font-black">+24.8% <span className="text-emerald-500 text-xs font-medium">↑</span></p>
                </div>
              </div>
            </motion.div>

            {/* Security Badge */}
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 z-20 px-6 py-4 rounded-full bg-indigo-950/80 border border-indigo-500/30 backdrop-blur-xl shadow-2xl flex items-center gap-3 hidden md:flex"
            >
              <ShieldCheck className="text-indigo-400" size={20} />
              <span className="text-white text-xs font-bold tracking-tight">Supabase RLS Protected</span>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase">
                <Rocket size={12} />
                Flagship Project
              </span>
              <div className="h-[1px] w-12 bg-emerald-500/30" />
            </div>

            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">
              Fintrack <span className="text-emerald-500">ID</span>
              <br />
              <span className="text-slate-500 text-2xl lg:text-3xl font-medium tracking-tight">Modern Financial Ecosystem</span>
            </h2>

            <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl">
              A high-performance SaaS-ready finance management platform. 
              Built with <span className="text-white font-semibold">Feature-Sliced Design</span> for extreme scalability, 
              offering real-time analytics and AI-powered insights for personal financial growth.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {fintrackFeatures.map((f, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] hover:border-emerald-500/20 transition-all duration-300 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-0.5">{f.title}</h4>
                    <p className="text-slate-500 text-xs leading-tight">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-center">
              <motion.a
                href="https://fintrack-id.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-black text-center transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
              >
                Launch Fintrack ID
              </motion.a>
              
              <div className="flex items-center gap-2 group cursor-help">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-500 text-sm font-medium group-hover:text-slate-300 transition-colors">
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
