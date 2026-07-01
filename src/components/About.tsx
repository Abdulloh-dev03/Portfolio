"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations, useLocale } from "next-intl";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const t = useTranslations("About");
  const locale = useLocale();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!textRef.current) return;

    const text = t("text");
    const words = text.split(" ");
    textRef.current.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block overflow-hidden pb-1"><span class="inline-block translate-y-full opacity-0 hover:text-violet-400 transition-colors duration-300 word-span cursor-default">${word}</span></span>`,
      )
      .join(" ");

    const wordSpans = textRef.current.querySelectorAll(".word-span");

    const ctx = gsap.context(() => {
      gsap.to(wordSpans, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 50%",
          scrub: 1.5,
        },
        y: 0,
        opacity: 1,
        stagger: 0.05,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <section
      ref={sectionRef}
      key={locale}
      id="about"
      className="py-16 sm:py-24 lg:py-32 px-0 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh]"
    >
      <h2 className="text-[10px] sm:text-xs font-semibold tracking-widest text-white/40 uppercase mb-8 sm:mb-12 self-start">
        {t("title")}
      </h2>
      <p
        ref={textRef}
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.6] tracking-tight text-white/90 text-left"
      >
        {/* Instantiated via GSAP */}
      </p>
    </section>
  );
}
