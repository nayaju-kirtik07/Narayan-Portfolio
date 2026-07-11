"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/types";
import VideoPlayer from "./VideoPlayer";

interface PortfolioProps {
  projects: Project[];
}

const categories = ["All", "Documentary", "Commercial", "Music Videos", "Podcasts", "Travel", "Corporate"];

function getYouTubeEmbed(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null;
}

export default function Portfolio({ projects }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [playing, setPlaying] = useState<string | null>(null);
  const [youtubePlaying, setYoutubePlaying] = useState<string | null>(null);

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const activeProject = projects.find((p) => p.id === playing);
  const activeYoutube = projects.find((p) => p.id === youtubePlaying);

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
                    ? "bg-orange text-background font-medium"
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
            {filtered.map((project, i) => {
              const hasVideo = project.videoUrl && project.videoUrl !== "#";
              const hasYoutube = project.youtubeUrl && project.youtubeUrl !== "#";
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group rounded-2xl overflow-hidden bg-orange/10 border border-orange/20 hover:border-orange/40 transition-all"
                >
                  <Link href={`/projects/${project.id}`}>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                        style={{ backgroundImage: `url(${project.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-orange/40 to-transparent" />
                      {(hasVideo || hasYoutube) && (
                        <div
                          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-orange flex items-center justify-center cursor-pointer z-10 hover:bg-orange-hover transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            if (hasYoutube) setYoutubePlaying(project.id);
                            else setPlaying(project.id);
                          }}
                        >
                          <Play size={18} className="text-white ml-0.5" />
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-5">
                    <p className="text-orange text-xs tracking-widest uppercase mb-1">
                      {project.category}
                    </p>
                    <Link href={`/projects/${project.id}`}>
                      <h3 className="text-lg font-bold text-foreground hover:text-orange transition-colors">
                        {project.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted mt-2 line-clamp-2">
                      {project.description}
                    </p>
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1.5 text-orange text-sm font-medium mt-4 hover:text-orange-hover transition-colors"
                    >
                      View Project <ExternalLink size={14} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
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

      <AnimatePresence>
        {activeYoutube && (() => {
          const embedUrl = getYouTubeEmbed(activeYoutube.youtubeUrl!);
          if (!embedUrl) return null;
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
              onClick={() => setYoutubePlaying(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative w-full max-w-4xl aspect-video mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setYoutubePlaying(null)}
                  className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors z-10"
                >
                  <X size={28} />
                </button>
                <iframe
                  src={embedUrl}
                  className="w-full h-full rounded-xl"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
