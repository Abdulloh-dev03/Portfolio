import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const currentYear = new Date().getFullYear();

  return (
    <main className="relative bg-background text-zinc-100 overflow-x-hidden min-h-screen flex flex-col">
      <div className="glow violet-glow -top-20 -left-20 hidden md:block" />
      <div className="glow blue-glow bottom-0 -right-20 hidden md:block" />

      <div className="relative z-10 px-4 sm:px-6 lg:px-12 py-6 sm:py-8 lg:py-10 grow flex flex-col">
        <Navbar />
        <div className="grow">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </div>

      <footer className="relative z-20 mt-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 text-[10px] font-medium tracking-[0.2em] text-zinc-500 uppercase">
        <div>© {currentYear} Abdulloh Ortiqov — Available for work</div>
        <div className="flex gap-6 sm:gap-8">
          <a
            href="https://www.linkedin.com/in/abdulloh-ortiqov-a98741326"
            className="hover:text-white transition-colors"
            target="_blank"
            rel="noreferrer"
            id="footer-linkedin"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Abdulloh-dev03"
            className="hover:text-white transition-colors"
            target="_blank"
            rel="noreferrer"
            id="footer-github"
          >
            GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}
