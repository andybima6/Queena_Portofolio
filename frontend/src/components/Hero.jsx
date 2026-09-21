import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GraduationCap, Globe, Star, Download, ArrowDown, Camera } from "lucide-react";
import { useApp } from "../store";
import { useTyping } from "../hooks";
import { API_URL } from "../data";
import { scrollToId } from "../lenis";

const cardIcons = { grad: GraduationCap, globe: Globe, star: Star };
const floatCls = ["float-a", "float-b", "float-c"];
const cardPos = [
  "-left-4 top-6 sm:-left-16",
  "-right-3 top-1/3 sm:-right-14",
  "left-1/2 -bottom-6 -translate-x-1/2",
];

const line = {
  hidden: { y: "115%" },
  show: (i) => ({ y: 0, transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Hero({ started }) {
  const { t, lang } = useApp();
  const typed = useTyping(t.hero.roles, started);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const blobX = useTransform(sx, [-1, 1], [-14, 14]);
  const blobY = useTransform(sy, [-1, 1], [-10, 10]);
  const bgX = useTransform(sx, [-1, 1], [22, -22]);
  const bgY = useTransform(sy, [-1, 1], [16, -16]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const state = started ? "show" : "hidden";

  return (
    <section
      id="home"
      data-testid="hero-section"
      onMouseMove={onMove}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32 md:px-12 lg:px-20"
    >
      <motion.div style={{ x: bgX, y: bgY }} className="pointer-events-none absolute -right-24 top-16 h-96 w-96 rounded-full bg-[var(--bg-alt)] blur-3xl" />
      <motion.div style={{ x: bgY, y: bgX }} className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[rgba(242,120,159,0.16)] blur-3xl" />
      <span className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[11px] font-semibold uppercase tracking-[0.5em] text-[var(--muted)]/60 xl:block">
        Portfolio 2026
      </span>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[55%_45%]">
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--ink)]"
            data-testid="hero-badge"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t.hero.badge}
          </motion.div>

          <h1 className="font-display">
            <span className="block overflow-hidden">
              <motion.span variants={line} custom={0} initial="hidden" animate={state} className="block text-2xl italic text-[var(--muted)] md:text-3xl">
                {t.hero.greeting}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={line} custom={1} initial="hidden" animate={state} className="text-gradient block text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
                {t.hero.name}
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={started ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="font-num mt-5 min-h-[2rem] text-lg text-[var(--rose)] md:text-xl"
            data-testid="hero-typing"
          >
            {typed}
            <span className="typing-caret">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] md:text-lg"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button data-testid="hero-view-work" onClick={() => scrollToId("portfolio")} className="btn-primary">
              {t.hero.viewWork}
            </button>
            <a

              data-testid="hero-download-cv"
              href={`${process.env.PUBLIC_URL}/cv.pdf`}
              download="Queena_Sangalang_CV.pdf"
              className="btn-ghost"
            >
              <Download size={16} /> {t.hero.downloadCv}
            </a>
          </motion.div>
        </div>

        <motion.div style={{ x: blobX, y: blobY }} className="order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={started ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="group relative mx-auto aspect-[4/5] w-[270px] sm:w-[340px] lg:w-[400px]"
          >
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[var(--bg-alt)] blur-xl" />
            <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-[rgba(242,120,159,0.25)] blur-lg" />

            <div className="blob ring-spin absolute -inset-3" />
            <div
              role="img"
              aria-label={t.hero.portraitAlt}
              data-testid="hero-portrait"
              className="blob absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--bg-alt)] via-[rgba(242,120,159,0.35)] to-[rgba(212,93,121,0.5)] transition-transform duration-500 group-hover:-rotate-2 group-hover:scale-[1.02]"
            >
              <span className="font-display text-8xl text-white/90 drop-shadow-lg">QS</span>
              <span className="mt-3 flex items-center gap-2 rounded-full bg-white/25 px-4 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                <Camera size={12} /> {t.hero.portraitNote}
              </span>
            </div>

            {t.hero.cards.map((c, i) => {
              const Icon = cardIcons[c.icon];
              return (
                <motion.div
                  key={c.title + i}
                  initial={{ opacity: 0, y: 26 }}
                  animate={started ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9 + i * 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`glass absolute z-10 rounded-2xl px-4 py-3 shadow-lg ${cardPos[i]}`}
                  data-testid={`hero-card-${i}`}
                >
                  <div className={`flex items-center gap-3 ${floatCls[i]}`}>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--rose)] to-[var(--pink)] text-white">
                      <Icon size={16} />
                    </span>
                    <div>
                      <p className="font-num text-[13px] leading-tight text-[var(--ink)]">{c.title}</p>
                      <p className="text-[11px] text-[var(--muted)]">{c.sub}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        data-testid="hero-scroll-down"
        onClick={() => scrollToId("about")}
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[var(--muted)]"
        aria-label={t.hero.scroll}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">{t.hero.scroll}</span>
        <ArrowDown size={16} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
