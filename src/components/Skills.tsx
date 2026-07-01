"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations, useLocale } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const SKILL_GROUPS = [
  {
    categoryKey: "frontend",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
  },
  {
    categoryKey: "backend",
    skills: ["Node.js", "Express", "Prisma", "Socket.io"],
  },
  {
    categoryKey: "databases",
    skills: ["PostgreSQL", "MongoDB"],
  },
  {
    categoryKey: "tools",
    skills: ["Docker", "Clerk", "Stripe", "Cloudinary", "TurboRepo", "Hugging Face", "Judge0"],
  },
];

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Skills");
  const locale = useLocale();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
      });

      gsap.from(".skill-group", {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".skill-badge", {
        opacity: 0,
        scale: 0.95,
        stagger: 0.05,
        duration: 0.5,
        delay: 0.4,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      key={locale}
      className="py-16 sm:py-24 lg:py-32 bg-background"
      id="skills"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-12 sm:mb-16 lg:mb-24 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white">
            {t("title")}
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base lg:text-lg font-light max-w-2xl mx-auto px-4">
            {t("subtitle")}
          </p>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-10 lg:gap-y-16">
          {SKILL_GROUPS.map((group) => (
            <div key={group.categoryKey} className="skill-group space-y-4 sm:space-y-6">
              <h3 className="text-zinc-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] border-l-2 border-violet-500/30 pl-4">
                {t(`categories.${group.categoryKey}`)}
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {group.skills.map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      borderColor: "rgba(167, 139, 250, 0.3)",
                      boxShadow: "0 10px 20px -10px rgba(167, 139, 250, 0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="skill-badge glass-panel px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-white/5 bg-white/2 text-xs sm:text-sm text-zinc-300 font-medium cursor-default"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
