"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import VideoPlayer from "./VideoPlayer";

interface ShowreelProps {
  data: {
    title: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
  };
}

export default function Showreel({ data }: ShowreelProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="showreel" className="section-padding bg-white/5">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-accent text-sm tracking-widest uppercase mb-4">Featured</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {data.title}
          </h2>
          <p className="text-muted max-w-2xl mx-auto">{data.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer"
          onClick={() => data.videoUrl && data.videoUrl !== "#" && setPlaying(true)}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${data.thumbnail})` }}
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-all">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play size={28} className="text-background ml-1" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded">
            2026 Reel
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted text-sm mt-4"
        >
          Narayan Khatri — Selected Work
        </motion.p>
      </div>

      <VideoPlayer src={data.videoUrl} open={playing} onClose={() => setPlaying(false)} />
    </section>
  );
}
