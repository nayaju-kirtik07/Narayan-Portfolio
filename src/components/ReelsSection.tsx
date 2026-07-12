"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import type { Reel } from "@/lib/types";

interface ReelsSectionProps {
  reels: Reel[];
}

export default function ReelsSection({ reels }: ReelsSectionProps) {
  if (!reels || reels.length === 0) return null;

  return (
    <section id="reels" className="py-24 bg-white/5 overflow-hidden">
      <div className="container-max px-6 md:px-12 lg:px-24 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Video <span className="text-gradient">Reels.</span>
          </h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="flex gap-4 overflow-x-auto pb-4 px-6 md:px-12 lg:px-24 no-scrollbar">
          {reels.map((reel, i) => (
            <ReelCard key={reel.id || i} reel={reel} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ReelCard({ reel }: { reel: Reel }) {
  const [playing, setPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (playing && videoRef.current) {
      videoRef.current.play();
    }
  }, [playing]);

  const togglePlay = () => {
    if (playing) {
      videoRef.current?.pause();
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  };

  return (
    <div
      className="flex-shrink-0 w-64 h-112 rounded-xl overflow-hidden relative group cursor-pointer"
      onClick={playing ? undefined : togglePlay}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => !playing && setShowOverlay(false)}
    >
      {!playing ? (
        <>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${reel.image})` }}
          />
          <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity ${showOverlay ? "opacity-100" : "opacity-0"}`}>
            <Play size={48} className="text-white fill-white" />
          </div>
          <div className="absolute bottom-2 left-2 right-2 flex justify-between text-xs text-white/80 px-2">
            <span>{reel.views} views</span>
            <span>❤️ {reel.likes}</span>
          </div>
        </>
      ) : (
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            src={reel.videoUrl}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            autoPlay
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              videoRef.current?.pause();
              setPlaying(false);
            }}
            className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full hover:bg-black/80 transition-colors"
          >
            <X size={16} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
