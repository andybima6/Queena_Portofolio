import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Crown } from "lucide-react";
import { useApp } from "../store";
import { SectionHeading } from "./Bits";

function RoleCard({ r, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: i % 2 ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="card-lift rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7 shadow-sm"
      data-testid={`org-role-${i}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="font-display text-lg leading-snug md:text-xl">{r.title}</h4>
        <span className="font-num text-xs text-[var(--gold)]">{r.period}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{r.desc}</p>
    </motion.div>
  );
}

export default function Organization() {
  const { t } = useApp();
  const [tab, setTab] = useState("esa");

  return (
    <section id="organization" data-testid="organization-section" className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading num={t.org.num} title={t.org.title} sub={t.org.sub} />

        <div className="mb-10 flex flex-wrap gap-2" role="tablist">
          {t.org.tabs.map((tb) => (
            <button
              key={tb.id}
              role="tab"
              aria-selected={tab === tb.id}
              data-testid={`org-tab-${tb.id}`}
              onClick={() => setTab(tb.id)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                tab === tb.id ? "text-white" : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              {tab === tb.id && (
                <motion.span layoutId="org-tab-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--rose)] to-[var(--pink)]" transition={{ duration: 0.4 }} />
              )}
              <span className="relative z-10">{tb.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab !== "events" ? (
            <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--rose)] to-[var(--pink)] text-white">
                  <Users size={17} />
                </span>
                <h3 className="font-display text-xl italic text-[var(--rose)]">{tab === "esa" ? t.org.esaTitle : t.org.kmkTitle}</h3>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {(tab === "esa" ? t.org.esa : t.org.kmk).map((r, i) => (
                  <RoleCard key={r.title} r={r} i={i} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="events" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--rose)] text-white">
                  <Crown size={17} />
                </span>
                <h3 className="font-display text-xl italic text-[var(--rose)]">{t.org.eventsTitle}</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {t.org.events.map((e, i) => (
                  <motion.div
                    key={e.event}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="card-lift rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm"
                    data-testid={`org-event-${i}`}
                  >
                    <span className="chip">{e.role}</span>
                    <h4 className="mt-3 text-sm font-semibold leading-snug text-[var(--ink)]">{e.event}</h4>
                    {e.note && <p className="mt-2 text-xs italic leading-relaxed text-[var(--muted)]">"{e.note}"</p>}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
