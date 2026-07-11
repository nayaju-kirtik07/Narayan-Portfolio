"use client";

import { motion } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";

interface HeroProps {
  data: {
    title: string;
    subtitle: string[];
    available: string;
  };
}

export default function Hero({ data }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="relative z-20 container-max px-6 md:px-12 lg:px-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-accent text-sm md:text-base tracking-widest uppercase mb-6"
        >
          {data.available}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          Hi, I'm <br />
          <span className="text-gradient">Narayan Khatri</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {data.subtitle.map((item) => (
            <span
              key={item}
              className="px-4 py-2 border border-white/10 rounded-full text-sm text-muted"
            >
              {item}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#showreel"
            className="flex items-center gap-2 px-6 py-3 bg-accent text-background rounded-full font-medium hover:bg-accent-hover transition-colors"
          >
            <Play size={18} /> Watch Showreel
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-white/20 text-foreground rounded-full font-medium hover:bg-white/5 transition-colors"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={20} className="text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
