"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ExternalLink, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FaGithub } from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";

const PROJECT_LIST = [
  {
    id: "aiTeach",
    demo: "https://ai-teach-atelier.vercel.app",
    github: "https://github.com/Abdulloh-dev03/AI-Teach-Atelier",
    tech: ["Next.js", "OpenAI", "Framer Motion", "Tailwind CSS"],
  },
  {
    id: "ecommerce",
    demo: "#",
    github: "https://github.com/Abdulloh-dev03/E-commerrce",
    tech: ["Node.js", "Kafka", "PostgreSQL", "Stripe", "Clerk"],
  },
  {
    id: "furniture",
    demo: "https://full-stack-furniture-web.vercel.app",
    github: "https://github.com/Abdulloh-dev03/Full-Stack-Furniture-Web",
    tech: ["React", "Express", "MongoDB", "GSAP"],
  },
  {
    id: "chattype",
    demo: "https://chattype.netlify.app",
    github: "https://github.com/Abdulloh-dev03/Real-Time-ChatType",
    tech: ["Socket.io", "React", "Node.js", "Redis"],
  },
];

export default function Projects() {
  const container = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<
    (typeof PROJECT_LIST)[0] | null
  >(null);
  const t = useTranslations('Projects');
  const locale = useLocale();

  useEffect(() => {
    if (!container.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      key={locale}
      ref={container}
      className="py-40 px-8 lg:px-12 relative"
      id="projects"
    >
      <div className="mb-16">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-gradient">
          {t('title')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="project-grid">
        {PROJECT_LIST.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.01 }}
            onClick={() => setSelectedProject(p)}
            className="project-card glass rounded-4xl group relative aspect-video p-8 lg:p-12 flex flex-col justify-end cursor-pointer overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 left-0 p-8 lg:p-12 w-full flex justify-between items-start pointer-events-none">
              <span className="text-[10px] text-violet-400 font-bold uppercase tracking-widest bg-violet-500/10 px-3 py-1 rounded-full">
                {t(`items.${p.id}.category`)}
              </span>
              <div className="glass p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={16} />
              </div>
            </div>

            <div className="relative z-10 space-y-4">
              <h3 className="text-3xl lg:text-4xl font-bold tracking-tight">
                {t(`items.${p.id}.name`)}
              </h3>
              <p className="text-zinc-400 text-sm font-medium uppercase tracking-widest flex items-center gap-2">
                {t('clickToExplore')}{" "}
                <ChevronRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </p>
            </div>

            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent transition-opacity" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-all duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Modal / Expanded View */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100 cursor-zoom-out"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 m-auto w-full max-w-3xl h-fit max-h-[90vh] glass rounded-[40px] z-101 overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="absolute top-8 right-8 z-20">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="glass p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-10 lg:p-16 space-y-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-violet-400 text-[10px] font-bold uppercase tracking-[0.3em] bg-violet-500/10 px-4 py-1.5 rounded-full">
                      {t(`items.${selectedProject.id}.category`)}
                    </span>
                    <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                      {t('status')}:
                      {t(`items.${selectedProject.id}.status`)}
                    </span>
                  </div>
                  <h2 className="text-4xl lg:text-7xl font-bold tracking-tighter text-gradient">
                    {t(`items.${selectedProject.id}.name`)}
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                  <div className="md:col-span-2 space-y-8">
                    <p className="text-zinc-300 text-lg lg:text-xl leading-relaxed font-light">
                      {t(`items.${selectedProject.id}.details`)}
                    </p>
                    <div className="flex gap-6 items-center pt-4">
                      <a
                        href={selectedProject.demo}
                        className="px-8 py-3 bg-zinc-100 text-black font-bold rounded-full hover:bg-white transition-colors flex items-center gap-2"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink size={18} /> {t('liveDemo')}
                      </a>
                      <a
                        href={selectedProject.github}
                        className="px-8 py-3 border border-white/20 font-bold rounded-full hover:bg-white/5 transition-colors flex items-center gap-2"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaGithub size={18} /> {t('sourceCode')}
                      </a>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 border-b border-white/10 pb-2">
                      {t('technologies')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t) => (
                        <span
                          key={t}
                          className="glass px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
