"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Reel } from "@/lib/types";
import VideoPlayer from "./VideoPlayer";

interface InstagramProps {
  data: {
    username: string;
    reels: Reel[];
  };
}

export default function Instagram({ data }: InstagramProps) {
  const [playing, setPlaying] = useState<string | null>(null);

  const activeReel = data.reels.find((r) => r.id === playing);

  return (
    <section id="instagram" className="section-padding bg-white/5">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-accent text-sm tracking-widest uppercase mb-4">Instagram</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Latest <span className="text-gradient">Reels</span>
          </h2>
          <a
            href={`https://instagram.com/${data.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors text-sm"
          >
            @{data.username}
          </a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {data.reels.map((reel) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative aspect-[9/16] rounded-xl overflow-hidden group cursor-pointer"
              onClick={() =>
                reel.videoUrl && reel.videoUrl !== "#" && setPlaying(reel.id)
              }
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${reel.image})` }}
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center">
                  <Play size={20} className="text-background ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex gap-4 text-white text-xs">
                  <span>&#9829; {reel.likes}</span>
                  <span>&#9654; {reel.views}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href={`https://instagram.com/${data.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-6 py-3 border border-white/20 text-foreground rounded-full font-medium hover:bg-white/5 transition-colors text-sm"
          >
            View More
          </a>
        </motion.div>
      </div>

      {activeReel && (
        <VideoPlayer
          src={activeReel.videoUrl}
          open={!!playing}
          onClose={() => setPlaying(null)}
        />
      )}
    </section>
  );
}
