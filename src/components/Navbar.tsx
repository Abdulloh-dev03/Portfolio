"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, ChevronDown, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

const languages = [
  { code: "EN", label: "English" },
  { code: "UZ", label: "O'zbek" },
  { code: "RU", label: "Русский" },
];

export default function Navbar() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLangChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
    setIsLangOpen(false);
    setIsMobileOpen(false);
  };

  const navLinks = [
    { href: "#about", label: t("about") },
    { href: "#projects", label: t("works") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <nav className="relative z-20" id="navbar">
      {/* Desktop / top bar */}
      <div className="flex justify-between items-center mb-8 sm:mb-12 lg:mb-16">
        <div
          className="text-xl font-bold tracking-tighter italic"
          id="nav-logo"
        >
          AO.
        </div>

        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          {/* Desktop nav links */}
          <div className="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Language switcher */}
          <div className="relative" id="nav-lang-container">
            <button
              onClick={() => !isPending && setIsLangOpen(!isLangOpen)}
              disabled={isPending}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 glass rounded-full text-[10px] font-bold tracking-widest uppercase hover:opacity-70 transition-opacity disabled:opacity-50"
              id="lang-toggle"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              {languages.find((l) => l.code.toLowerCase() === locale)?.code ||
                "EN"}
              <ChevronDown
                size={12}
                className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isLangOpen && (
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
                      className={`w-full text-left px-4 py-2 text-[10px] uppercase font-bold tracking-widest hover:bg-white/10 transition-colors ${
                        locale === l.code.toLowerCase() ? "text-violet-400" : ""
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden p-2 glass rounded-full hover:opacity-70 transition-opacity"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isMobileOpen ? "x" : "menu"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                {isMobileOpen ? <X size={16} /> : <Menu size={16} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
            id="mobile-menu"
          >
            <div className="glass rounded-2xl p-6 mb-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
