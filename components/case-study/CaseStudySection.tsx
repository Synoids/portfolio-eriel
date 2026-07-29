"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CaseStudySectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function CaseStudySection({ title, children, className = "" }: CaseStudySectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`py-12 md:py-20 border-b border-foreground/10 last:border-0 ${className}`}
    >
      <div className="max-w-4xl mx-auto px-6">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 tracking-tight">
            {title}
          </h2>
        )}
        <div className="prose prose-lg dark:prose-invert prose-p:text-foreground/70 prose-p:leading-relaxed prose-headings:text-foreground prose-a:text-primary-500 max-w-none">
          {children}
        </div>
      </div>
    </motion.section>
  );
}
