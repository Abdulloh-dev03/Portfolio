"use client";

import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("Contact");

  return (
    <section
      className="py-20 sm:py-28 lg:py-40 bg-white/5 relative overflow-hidden"
      id="contact"
    >
      <div className="glow blue-glow -bottom-20 -left-20 opacity-30" />

      <div className="max-w-4xl mx-auto text-center relative z-10 px-0">
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 sm:mb-8 text-balance text-gradient">
          {t("title")}
        </h2>
        <a
          href="mailto:ortiqovabdulloh15@gmail.com"
          className="text-base sm:text-lg md:text-2xl text-zinc-400 hover:text-white transition-colors underline underline-offset-8 decoration-violet-500/50 break-all"
        >
          ortiqovabdulloh15@gmail.com
        </a>

        <form
          className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 gap-6 sm:gap-8 text-left"
          id="contact-form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-4">
                {t("labels.fullName")}
              </label>
              <input
                type="text"
                placeholder={t("placeholders.fullName")}
                className="w-full glass rounded-2xl px-5 sm:px-6 py-4 outline-none focus:border-violet-400/50 transition-colors text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-4">
                {t("labels.email")}
              </label>
              <input
                type="email"
                placeholder={t("placeholders.email")}
                className="w-full glass rounded-2xl px-5 sm:px-6 py-4 outline-none focus:border-violet-400/50 transition-colors text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-4">
              {t("labels.message")}
            </label>
            <textarea
              rows={4}
              placeholder={t("placeholders.message")}
              className="w-full glass rounded-2xl px-5 sm:px-6 py-4 outline-none focus:border-violet-400/50 transition-colors resize-none text-sm"
            />
          </div>

          <button
            type="submit"
            className="mt-2 sm:mt-4 w-full sm:w-fit px-10 sm:px-12 py-4 bg-zinc-100 text-black font-bold rounded-full hover:bg-white transition-all transform hover:scale-105 cursor-pointer text-sm"
          >
            {t("submit")}
          </button>
        </form>
      </div>
    </section>
  );
}
