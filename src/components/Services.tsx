"use client";

import { motion } from "framer-motion";
import { Film, Clapperboard, Shapes, Palette, Globe, Smartphone } from "lucide-react";
import type { Service } from "@/lib/types";

interface ServicesProps {
  services: Service[];
}

const iconMap: Record<string, React.ReactNode> = {
  "Video Editing": <Film size={24} />,
  "Documentary Production": <Clapperboard size={24} />,
  "Motion Graphics": <Shapes size={24} />,
  "Color Grading": <Palette size={24} />,
  "YouTube Editing": <Globe size={24} />,
  "Social Media Content": <Smartphone size={24} />,
};

export default function Services({ services }: ServicesProps) {
  return (
    <section id="services" className="section-padding">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm tracking-widest uppercase mb-4">Services</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            What <span className="text-gradient">I do</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/20 text-accent flex items-center justify-center mb-5">
                {iconMap[service.title] || <Film size={24} />}
              </div>
              <h3 className="text-lg font-bold mb-3">{service.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
