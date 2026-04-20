import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  const currentYear = new Date().getFullYear();
  return (
    <main className="relative bg-background text-zinc-100 overflow-hidden min-h-screen flex flex-col">
      <div className="glow violet-glow -top-20 -left-20"></div>
      <div className="glow blue-glow bottom-0 -right-20"></div>
      
      <div className="relative z-10 px-8 lg:px-12 py-10 grow flex flex-col">
        <Navbar/>
        <div className="grow">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </div>

      <footer className="relative z-20 mt-auto py-8 px-8 lg:px-12 border-t border-white/5 flex justify-between items-center text-[10px] font-medium tracking-[0.2em] text-zinc-500 uppercase">
        <div>© {currentYear} Abdulloh Ortiqov — Available for work</div>
        <div className="flex gap-8">
          <a href="https://www.linkedin.com/in/abdulloh-ortiqov-a98741326" className="hover:text-white transition-colors" target="_blank" rel="noreferrer" id="footer-linkedin">LinkedIn</a>
          <a href="https://github.com/Abdulloh-dev03" className="hover:text-white transition-colors" target="_blank" rel="noreferrer" id="footer-github">GitHub</a>
        </div>
      </footer>
    </main>
  );
}
