"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useTranslations } from "next-intl";

const PROJECTS = [
  {
    title: "AI Teach Atelier",
    desc: "AI-powered coding education platform",
    url: "https://ai-teach-atelier.vercel.app",
    github: "https://github.com/Abdulloh-dev03/AI-Teach-Atelier",
  },
  {
    title: "Modern E-Commerce",
    desc: "Microservices + Stripe + Clerk + Kafka",
    url: "#",
    github: "https://github.com/Abdulloh-dev03/E-commerrce",
  },
  {
    title: "Furniture Web",
    desc: "Full-Stack premium furniture store",
    url: "https://full-stack-furniture-web.vercel.app",
    github: "https://github.com/Abdulloh-dev03/Full-Stack-Furniture-Web",
  },
  {
    title: "ChatType",
    desc: "Real-Time Chat Application",
    url: "https://chattype.netlify.app",
    github: "https://github.com/Abdulloh-dev03/Real-Time-ChatType",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const t = useTranslations("Hero");

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % PROJECTS.length),
      5000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center grow py-20"
      id="hero"
    >
      <div className="col-span-1 md:col-span-7 space-y-10" id="hero-content">
        <div className="space-y-4">
          <span className="text-violet-400 text-xs font-bold uppercase tracking-[0.4em] block">
            {t("role")}
          </span>
          <h1 className="text-6xl sm:text-7xl lg:text-[100px] leading-[0.85] font-bold tracking-tighter text-gradient">
            {t("firstName")}
            <br />
            {t("lastName")}
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-md leading-relaxed font-light text-balance">
            {t("bio")}
          </p>
        </div>

        <div className="flex gap-5">
          {/* GitHub Button */}
          <a
            href="https://github.com/Abdulloh-dev03"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="px-10 py-4 bg-zinc-100 text-black text-sm font-bold rounded-full hover:bg-white transition-colors cursor-pointer"
            >
              {t("viewProjects")}
            </motion.button>
          </a>

          {/* Download CV */}
          <motion.a
            href="/Abdulloh_Ortiqov_CV.pdf"
            download
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="px-10 py-4 border border-white/20 text-sm font-bold rounded-full hover:bg-white/5 transition-colors inline-flex items-center justify-center"
          >
            {t("downloadCv")}
          </motion.a>
        </div>
      </div>

      <div
        className="col-span-1 md:col-span-5 relative h-full flex flex-col justify-center"
        id="project-showcase"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-4xl p-6 lg:p-10 min-h-100 flex flex-col justify-between relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl" />

            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-violet-400 font-bold uppercase tracking-widest bg-violet-500/10 px-3 py-1 rounded-full">
                  {t("featuredProject")}
                </span>
                <div className="flex gap-2">
                  {PROJECTS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 transition-all duration-500 rounded-full ${index === i ? "w-8 bg-white" : "w-2 bg-white/20"}`}
                    />
                  ))}
                </div>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold tracking-tight mt-6">
                {PROJECTS[index].title}
              </h3>
              <p className="text-zinc-400 font-light text-base lg:text-lg">
                {PROJECTS[index].desc}
              </p>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex gap-8 items-center">
                <a
                  href={PROJECTS[index].url}
                  className="flex items-center gap-2 text-sm font-semibold hover:text-violet-400 transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={16} /> {t("liveDemo")}
                </a>
                <a
                  href={PROJECTS[index].github}
                  className="flex items-center gap-2 text-sm font-semibold hover:text-violet-400 transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub size={16} /> GitHub
                </a>
              </div>
              <div className="h-px w-full bg-white/10" />
              <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                <p>{t("tech")}</p>
                <p>{t("status")}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
