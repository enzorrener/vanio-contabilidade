"use client";

import { useEffect, useRef, useState } from "react";
import { getLenis } from "./SmoothScroll";
import { wa } from "./contact";
import styles from "./Design.module.css";

// As quatro áreas do escritório, presas na tela: a rolagem troca a área, a
// foto de fundo e o painel da direita, cujas linhas "se decodificam" (letras
// sorteadas até virarem o texto certo). As abas de baixo levam direto a uma
// área. Movimento reduzido: sem sorteio de letras, troca seca.

export type Area = {
  id: string;
  label: string;
  title: string;
  text: string;
  img: string;
  rows: [string, string][];
};

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/%-.";

function Scramble({ text, run }: { text: string; run: number }) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sem animação: texto final direto
      setOut(text);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 650;
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / dur);
      const fixed = Math.floor(k * text.length);
      let s = text.slice(0, fixed);
      for (let i = fixed; i < text.length; i++) s += text[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      setOut(s);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, run]);
  return <>{out}</>;
}

export default function Areas({ areas }: { areas: Area[] }) {
  const sec = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = sec.current;
    if (!el) return;
    let raf = 0;
    const read = () => {
      const r = el.getBoundingClientRect();
      setP(Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight))));
    };
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  const n = areas.length;
  const active = Math.min(n - 1, Math.floor(p * n * 0.999));
  const a = areas[active];
  const local = p * n - active; // progresso dentro da área (0 a 1)

  const go = (i: number) => {
    const el = sec.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const y = top + ((i + 0.15) / n) * (el.offsetHeight - window.innerHeight);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section className={styles.areas} ref={sec} id="areas" aria-label="Áreas de atuação" style={{ height: `${n * 100 + 60}vh` }}>
      <div className={styles.areasStage}>
        {areas.map((x, i) => (
          // eslint-disable-next-line @next/next/no-img-element -- fotos estáticas do modelo
          <img key={x.id} className={styles.areasBg} src={x.img} alt="" data-on={i === active ? "true" : undefined} loading={i === 0 ? "eager" : "lazy"} />
        ))}
        <div className={styles.areasShade} aria-hidden="true" />

        <div className={styles.areasGrid}>
          <div className={styles.areasNum} aria-hidden="true">
            <b>{String(active + 1).padStart(2, "0")}</b>
            <span>{a.label}</span>
          </div>

          <div className={styles.areasMain} key={a.id}>
            <h2>{a.title}</h2>
            <p>{a.text}</p>
            <a className={styles.ghostBtn} href={wa(`Olá, Vanio Contabilidade! Quero falar sobre ${a.label.toLowerCase()}.`)} target="_blank" rel="noopener">
              Falar sobre {a.label.toLowerCase()}
            </a>
          </div>

          <dl className={styles.areasPanel}>
            {a.rows.map(([k, v], i) => (
              <div key={`${a.id}-${i}`}>
                <dt>{k}</dt>
                <dd>
                  <Scramble text={v} run={active} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <nav className={styles.areasTabs} aria-label="Ir para a área">
          {areas.map((x, i) => (
            <button key={x.id} type="button" onClick={() => go(i)} aria-current={i === active ? "true" : undefined}>
              {String(i + 1).padStart(2, "0")} {x.label}
            </button>
          ))}
          <i className={styles.areasBar} aria-hidden="true" style={{ transform: `scaleX(${(active + local) / n})` }} />
        </nav>
      </div>
    </section>
  );
}
