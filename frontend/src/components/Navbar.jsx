import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Download } from "lucide-react";
import { useApp } from "../store";
import { NAV_IDS, API_URL } from "../data";
import { scrollToId } from "../lenis";

export default function Navbar() {
  const { t, lang, setLang, dark, setDark } = useApp();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 180 && !open);
    setScrolled(y > 40);
  });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    setActive(id);
    scrollToId(id);
  };

  const linkCls = (id) =>
    `relative text-[13px] font-medium tracking-wide transition-colors duration-300 ${
      active === id ? "text-[var(--rose)]" : "text-[var(--muted)] hover:text-[var(--ink)]"
    }`;

  return (
    <motion.header
      animate={{ y: hidden ? "-120%" : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[70]"
    >
      <nav
        className={`mx-4 mt-4 flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3 transition-[background-color,box-shadow,border-color] duration-500 lg:mx-auto ${
          scrolled ? "glass shadow-[0_18px_40px_-20px_rgba(212,93,121,0.4)]" : "border border-transparent"
        }`}
      >
        <a
          href="#home"
          onClick={(e) => go(e, "home")}
          data-testid="nav-logo"
          className="font-display text-2xl font-bold text-gradient"
        >
          QS.
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {NAV_IDS.map((id) => (
            <a key={id} href={`#${id}`} onClick={(e) => go(e, id)} data-testid={`nav-link-${id}`} className={linkCls(id)}>
              {t.nav[id]}
              {active === id && (
                <motion.span layoutId="nav-dot" className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--rose)]" />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-[var(--line)] p-0.5 text-[11px] font-bold">
            {["en", "id"].map((l) => (
              <button
                key={l}
                data-testid={`lang-toggle-${l}`}
                onClick={() => setLang(l)}
                className={`rounded-full px-2.5 py-1 uppercase transition-colors duration-300 ${
                  lang === l ? "bg-[var(--rose)] text-white" : "text-[var(--muted)]"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            data-testid="theme-toggle"
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--rose)]"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
             data-testid="hero-download-cv"
              href={`${process.env.PUBLIC_URL}/cv.pdf`}
              download="Queena_Sangalang_CV.pdf"
            className="btn-primary hidden !px-5 !py-2.5 text-[13px] md:inline-flex"
          >
            <Download size={15} /> {t.hero.downloadCv}
          </a>
          <button
            data-testid="nav-hamburger"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] lg:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass mx-4 mt-2 rounded-2xl p-6 lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col gap-4">
              {NAV_IDS.map((id, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => go(e, id)}
                  data-testid={`mobile-nav-link-${id}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className={`font-display text-2xl ${active === id ? "text-gradient" : "text-[var(--ink)]"}`}
                >
                  {t.nav[id]}
                </motion.a>
              ))}
              <a data-testid="mobile-download-cv" href={`${API_URL}/cv`} className="btn-primary mt-2 justify-center">
                <Download size={15} /> {t.hero.downloadCv}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
