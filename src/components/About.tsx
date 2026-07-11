"use client";

import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";

interface AboutProps {
  data: {
    image: string;
    yearsCraft: number;
    description: string;
    stats: { label: string; value: string }[];
    resumeUrl: string;
  };
}

export default function About({ data }: AboutProps) {
  return (
    <section id="about" className="section-padding">
      <div className="container-max">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${data.image})` }}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-accent text-background px-6 py-4 rounded-xl">
              <span className="text-3xl font-bold">{data.yearsCraft}+</span>
              <p className="text-sm font-medium">Years of craft</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-accent text-sm tracking-widest uppercase mb-4">
              About Me
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Stories told <br />
              <span className="text-gradient">in motion.</span>
            </h2>
            <p className="text-muted leading-relaxed mb-8">{data.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {data.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</p>
                  <p className="text-xs text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={data.resumeUrl}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-accent text-background rounded-full font-medium hover:bg-accent-hover transition-colors"
              >
                <Download size={16} /> Download Resume
              </a>
              <a
                href="#portfolio"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-foreground rounded-full font-medium hover:bg-white/5 transition-colors"
              >
                See my work <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
