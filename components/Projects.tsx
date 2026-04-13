"use client";

import { motion } from "framer-motion";
import { ExternalLink, Tag } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`group glass border ${project.borderColor} rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl flex flex-col`}
      style={{ borderColor: project.featured ? undefined : "rgba(255,255,255,0.06)" }}
    >
      {/* Project Image / Banner */}
      <div className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Glowing orb */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-white/5 blur-2xl group-hover:scale-150 transition-transform duration-700" />
        </div>

        {/* Emoji Icon */}
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          className="relative z-10 text-7xl drop-shadow-2xl"
        >
          {project.emoji}
        </motion.div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary-500/80 text-xs font-semibold text-white backdrop-blur-sm">
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-white/50 text-sm leading-relaxed">{project.description}</p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium glass border border-white/8 ${project.accentColor} bg-white/2`}
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <Tag size={10} />
              {t}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2 mt-auto">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 hover:border-primary-500/40 text-white/60 hover:text-white text-sm font-medium transition-all duration-300 flex-1 justify-center"
          >
            <FaGithub size={15} />
            GitHub
          </motion.a>
          <motion.a
            href={project.demo}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(108, 99, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition-all duration-300 flex-1 justify-center"
          >
            <ExternalLink size={15} />
            Live Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary-400 font-mono text-sm tracking-widest uppercase mb-3">
            What I&apos;ve built
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto">
            A selection of projects I&apos;ve built during my learning journey — from management
            systems to food ordering apps.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href={profile.social.github.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl glass border border-white/10 hover:border-primary-500/40 text-white/60 hover:text-white font-medium text-sm transition-all duration-300"
          >
            <FaGithub size={16} />
            View All on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
