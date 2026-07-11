"use client";

import { motion } from "framer-motion";

interface BTSProps {
  images: string[];
}

export default function BTS({ images }: BTSProps) {
  const duplicated = [...images, ...images, ...images, ...images];

  return (
    <section id="bts" className="py-24 bg-white/5 overflow-hidden">
      <div className="container-max px-6 md:px-12 lg:px-24 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent text-sm tracking-widest uppercase mb-4">Behind The Scenes</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            On <span className="text-gradient">set.</span>
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
          {duplicated.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-64 h-80 rounded-xl overflow-hidden"
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
