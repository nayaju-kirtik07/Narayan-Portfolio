"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Film, Eye } from "lucide-react";
import type { Project } from "@/lib/types";
import VideoPlayer from "@/components/VideoPlayer";

export default function ProjectDetail({ project }: { project: Project }) {
  const [playing, setPlaying] = useState(false);
  const [youtubePlaying, setYoutubePlaying] = useState(false);

  const hasVideo = project.videoUrl && project.videoUrl !== "#";
  const hasYoutube = project.youtubeUrl && project.youtubeUrl !== "#";
  const youtubeId = hasYoutube
    ? project.youtubeUrl!.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)?.[1]
    : null;

  return (
    <>
      <section className="relative min-h-[80vh] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange/10 to-transparent" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-4 py-1.5 bg-orange/20 text-orange text-xs rounded-full font-medium border border-orange/30">
                {project.category}
              </span>
              {hasVideo && (
                <span className="px-4 py-1.5 bg-white/10 text-muted text-xs rounded-full font-medium flex items-center gap-1.5">
                  <Film size={12} /> Video
                </span>
              )}
              {hasYoutube && (
                <span className="px-4 py-1.5 bg-white/10 text-muted text-xs rounded-full font-medium flex items-center gap-1.5">
                  <Eye size={12} /> YouTube
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              {(hasVideo || hasYoutube) && (
                <button
                  onClick={() => {
                    if (hasYoutube) setYoutubePlaying(true);
                    else setPlaying(true);
                  }}
                  className="flex items-center gap-3 px-8 py-4 bg-orange text-white rounded-full font-medium hover:bg-orange-hover transition-all hover:scale-105 shadow-lg shadow-orange/25"
                >
                  <Play size={20} fill="white" /> Watch {hasYoutube ? "on YouTube" : "Showreel"}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-orange" />
              About This Project
            </h2>
            <p className="text-muted leading-relaxed text-lg">{project.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-sm font-semibold text-muted uppercase tracking-widest mb-4">
                Project Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted">Category</p>
                  <p className="text-sm font-medium mt-1">{project.category}</p>
                </div>
                {hasVideo && (
                  <div>
                    <p className="text-xs text-muted">Format</p>
                    <p className="text-sm font-medium mt-1 flex items-center gap-1.5">
                      <Film size={14} className="text-orange" /> Video File
                    </p>
                  </div>
                )}
                {hasYoutube && (
                  <div>
                    <p className="text-xs text-muted">Platform</p>
                    <p className="text-sm font-medium mt-1 flex items-center gap-1.5">
                      <Eye size={14} className="text-orange" /> YouTube
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              {hasVideo && (
                <button
                  onClick={() => setPlaying(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-orange/10 border border-orange/20 text-orange rounded-xl text-sm font-medium hover:bg-orange/20 transition-colors"
                >
                  <Play size={16} /> Play Video
                </button>
              )}
              {hasYoutube && (
                <button
                  onClick={() => setYoutubePlaying(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-muted rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  <Eye size={16} /> YouTube
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {hasVideo && (
        <VideoPlayer src={project.videoUrl!} open={playing} onClose={() => setPlaying(false)} />
      )}

      {youtubePlaying && youtubeId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
          onClick={() => setYoutubePlaying(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-5xl aspect-video mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setYoutubePlaying(false)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors z-10 text-sm"
            >
              Close [Esc]
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
              className="w-full h-full rounded-2xl shadow-2xl"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
