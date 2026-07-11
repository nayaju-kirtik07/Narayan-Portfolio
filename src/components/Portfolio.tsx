"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import type { Project } from "@/lib/types";
import VideoPlayer from "./VideoPlayer";

interface PortfolioProps {
  projects: Project[];
}

const categories = ["All", "Documentary", "Commercial", "Music Videos", "Podcasts", "Travel", "Corporate"];

export default function Portfolio({ projects }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [playing, setPlaying] = useState<string | null>(null);

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const activeProject = projects.find((p) => p.id === playing);

  return (
    <section id="portfolio" className="section-padding">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-accent text-sm tracking-widest uppercase mb-4">Portfolio</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            Selected <span className="text-gradient">Work</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeCategory === cat
                    ? "bg-accent text-background font-medium"
                    : "bg-white/5 text-muted hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer"
                onClick={() =>
                  project.videoUrl && project.videoUrl !== "#" && setPlaying(project.id)
                }
              >
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  {project.videoUrl && project.videoUrl !== "#" && (
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-accent/90 flex items-center justify-center">
                      <Play size={18} className="text-background ml-0.5" />
                    </div>
                  )}
                  <p className="text-accent text-xs tracking-widest uppercase mb-1">
                    {project.category}
                  </p>
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  <p className="text-sm text-muted mt-1">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {activeProject && (
        <VideoPlayer
          src={activeProject.videoUrl!}
          open={!!playing}
          onClose={() => setPlaying(null)}
        />
      )}
    </section>
  );
}
