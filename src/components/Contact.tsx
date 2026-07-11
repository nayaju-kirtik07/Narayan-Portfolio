"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, MapPin, Send, Camera } from "lucide-react";
import type { SiteData } from "@/lib/types";

interface ContactProps {
  data: SiteData["contact"];
}

export default function Contact({ data }: ContactProps) {
  return (
    <section id="contact" className="section-padding">
      <div className="container-max">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent text-sm tracking-widest uppercase mb-4">Contact</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Let's make <br />
              <span className="text-gradient">something unforgettable.</span>
            </h2>
            <p className="text-muted mb-8">
              Have a project in mind? Send me the details and I'll get back within 24 hours.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-3 text-muted hover:text-accent transition-colors"
              >
                <Mail size={18} className="text-accent" />
                {data.email}
              </a>
              <a
                href={`https://wa.me/${data.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted hover:text-accent transition-colors"
              >
                <MessageCircle size={18} className="text-accent" />
                {data.whatsapp}
              </a>
              <div className="flex items-center gap-3 text-muted">
                <MapPin size={18} className="text-accent" />
                Based in {data.location}
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent transition-colors text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent transition-colors text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Project Type"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent transition-colors text-sm"
              />
              <input
                type="text"
                placeholder="Budget"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent transition-colors text-sm"
              />
            </div>
            <textarea
              rows={4}
              placeholder="Message"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent transition-colors text-sm resize-none"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-background rounded-full font-medium hover:bg-accent-hover transition-colors"
            >
              Send Message <Send size={16} />
            </button>
          </motion.form>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-8 border-t border-white/5"
        >
          <p className="text-muted text-sm">
            Or DM me on Instagram &mdash; I usually reply faster there.
          </p>
          <a
            href={`https://instagram.com/${data.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors mt-2"
          >
            <Camera size={18} /> {data.instagram}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
