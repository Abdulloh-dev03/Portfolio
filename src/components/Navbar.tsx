"use client";


import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, routing } from "@/i18n/routing";

const languages = [
  { code: 'EN', label: 'English' },
  { code: 'UZ', label: 'O\'zbek' },
    { code: 'RU', label: 'Русский' }
  ];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLangChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
    setIsOpen(false);
  };

  return (
    <nav className="relative z-20 flex justify-between items-center mb-16" id="navbar">
      <div className="text-xl font-bold tracking-tighter italic" id="nav-logo">AO.</div>
      
      <div className="flex items-center gap-8">
        <div className="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
          <a href="#about" className="hover:text-white transition-colors">{t("about")}</a>
          <a href="#projects" className="hover:text-white transition-colors">{t("works")}</a>
          <a href="#contact" className="hover:text-white transition-colors">{t("contact")}</a>
        </div>

        <div className="relative" id="nav-lang-container">
          <button 
            onClick={() => !isPending && setIsOpen(!isOpen)}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2 glass rounded-full text-[10px] font-bold tracking-widest uppercase hover:opacity-70 transition-opacity disabled:opacity-50"
            id="lang-toggle"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400"></div>
            {languages.find((l) => l.code.toLowerCase() === locale)?.code || 'EN'}
            <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-4 py-2 w-32 glass rounded-lg overflow-hidden z-30"
                id="lang-dropdown"
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => handleLangChange(l.code.toLowerCase())}
                    className={`w-full text-left px-4 py-2 text-[10px] uppercase font-bold tracking-widest hover:bg-white/10 transition-colors ${locale === l.code.toLowerCase() ? "text-violet-400" : ""}`}
                  >
                    {l.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
