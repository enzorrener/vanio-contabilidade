"use client";

import { useRef, useState } from "react";
import { wa } from "./contact";
import styles from "./Design.module.css";

// Peças menores da Vanio:
// - Sectors: setores em letras gigantes; com mouse, a foto do setor segue o
//   cursor (no toque, a lista fica só como lista).
// - Reform: linha do tempo da reforma tributária (IBS e CBS), clicável.
// - ContactForm: nome, empresa e assunto viram a mensagem do WhatsApp.
//   Nada é enviado pelo site: o botão abre o WhatsApp com o texto pronto.

export type Sector = { name: string; tags: string; img: string };

export function Sectors({ items }: { items: Sector[] }) {
  const box = useRef<HTMLUListElement>(null);
  const follow = useRef<HTMLDivElement>(null);
  const [hot, setHot] = useState(-1);

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const b = box.current?.getBoundingClientRect();
    const f = follow.current;
    if (!b || !f) return;
    f.style.transform = `translate3d(${e.clientX - b.left}px, ${e.clientY - b.top}px, 0) translate(-50%, -50%)`;
  };

  return (
    <div className={styles.sectorsWrap}>
      <ul className={styles.sectors} ref={box} onPointerMove={move} onPointerLeave={() => setHot(-1)}>
        {items.map((s, i) => (
          <li key={s.name} data-hot={hot === i ? "true" : undefined} data-dim={hot >= 0 && hot !== i ? "true" : undefined} onPointerEnter={(e) => e.pointerType === "mouse" && setHot(i)}>
            <span className={styles.sectorN}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.sectorName}>{s.name}</span>
            <span className={styles.sectorTags}>{s.tags}</span>
          </li>
        ))}
      </ul>
      <div className={styles.follow} ref={follow} aria-hidden="true" data-on={hot >= 0 ? "true" : undefined}>
        {items.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element -- fotos estáticas do modelo
          <img key={s.img} src={s.img} alt="" data-on={hot === i ? "true" : undefined} loading="lazy" />
        ))}
      </div>
    </div>
  );
}

// Calendário da LC 214/2025 (regulamenta a EC 132/2023).
const REFORM = [
  {
    year: "2026",
    title: "Ano de teste",
    text: "A nota fiscal passa a mostrar CBS de 0,9% e IBS de 0,1%. É um teste: pra quem cumpre as obrigações, o valor é compensado e não vira imposto a mais.",
    tip: "O que fazer: conferir se o sistema de emissão de notas já destaca os campos novos.",
  },
  {
    year: "2027",
    title: "Chega a CBS",
    text: "A CBS entra pra valer e substitui PIS e Cofins, que deixam de existir. O IPI vai a zero na maior parte dos produtos e começa o Imposto Seletivo.",
    tip: "Empresa do Simples pode continuar no regime, ou escolher pagar IBS e CBS por fora, o que pode valer a pena pra quem vende pra outras empresas.",
  },
  {
    year: "2029 a 2032",
    title: "Transição do ICMS e do ISS",
    text: "ICMS e ISS diminuem um pouco a cada ano enquanto o IBS sobe no mesmo ritmo. Durante quatro anos convivem os dois sistemas.",
    tip: "Época de rever preço e contrato longo: a carga muda ano a ano.",
  },
  {
    year: "2033",
    title: "Sistema novo completo",
    text: "ICMS e ISS deixam de existir. Ficam o IBS (estados e municípios), a CBS (União) e o Imposto Seletivo.",
    tip: "Daqui pra frente, um imposto sobre consumo com regras únicas no país inteiro.",
  },
];

export function Reform() {
  const [i, setI] = useState(0);
  const r = REFORM[i];
  return (
    <div className={styles.reform}>
      <div className={styles.reformYears} role="tablist" aria-label="Etapas da reforma tributária">
        {REFORM.map((x, k) => (
          <button key={x.year} type="button" role="tab" id={`rf-${k}`} aria-selected={k === i} aria-controls="rf-panel" onClick={() => setI(k)}>
            <span>{x.year}</span>
          </button>
        ))}
        <i className={styles.reformLine} aria-hidden="true" style={{ transform: `scaleX(${(i + 1) / REFORM.length})` }} />
      </div>
      <div className={styles.reformPanel} role="tabpanel" id="rf-panel" aria-labelledby={`rf-${i}`} key={r.year}>
        <h3>{r.title}</h3>
        <p>{r.text}</p>
        <p className={styles.reformTip}>{r.tip}</p>
      </div>
    </div>
  );
}

const SUBJECTS = ["Abrir uma empresa", "Trocar de contador", "Folha de pagamento", "Impostos e reforma tributária", "Outro assunto"];

export function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const ready = name.trim().length > 1;
  const msg = `Olá, Vanio Contabilidade! Sou ${name.trim() || "..."}${company.trim() ? `, da ${company.trim()}` : ""}. Quero falar sobre: ${subject.toLowerCase()}.`;

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        if (ready) window.open(wa(msg), "_blank", "noopener");
      }}
    >
      <label>
        <span>Seu nome</span>
        <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
      </label>
      <label>
        <span>Empresa (se já tiver)</span>
        <input value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" />
      </label>
      <fieldset>
        <legend>Assunto</legend>
        <div className={styles.formChips}>
          {SUBJECTS.map((s) => (
            <button key={s} type="button" aria-pressed={s === subject} onClick={() => setSubject(s)}>
              {s}
            </button>
          ))}
        </div>
      </fieldset>
      <button className={styles.solidBtn} type="submit" disabled={!ready}>
        Enviar pelo WhatsApp
      </button>
      <p className={styles.formHint}>{ready ? "Abre o WhatsApp com a mensagem pronta. Você confere antes de mandar." : "Escreva seu nome pra liberar o botão."}</p>
    </form>
  );
}
