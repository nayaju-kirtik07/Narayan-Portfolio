"use client";

import { motion } from "framer-motion";

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#showreel", label: "Showreel" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-16 pb-8 px-6 md:px-12 lg:px-24">
      <div className="container-max">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <a href="#home" className="text-xl font-bold tracking-tight">
              <span className="text-gradient">N</span>arayan.
            </a>
            <p className="text-muted text-sm mt-4 max-w-xs">
              Video editor & documentary filmmaker crafting cinematic stories that move people.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted text-sm hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold text-sm mb-4">Follow</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted hover:text-accent transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-muted hover:text-accent transition-colors text-sm"
              >
                YouTube
              </a>
              <a
                href="#"
                className="text-muted hover:text-accent transition-colors text-sm"
              >
                Vimeo
              </a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">
            &copy; 2026 Narayan Khatri. All rights reserved.
          </p>
          <p className="text-muted text-xs">
            Crafted with cinematic care.
          </p>
        </div>
      </div>
    </footer>
  );
}
