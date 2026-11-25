"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Design.module.css";

// Peça-chave da Vanio: uma apuração do Simples Nacional conferida enquanto a
// página desce. Cada correção acende numa altura da rolagem: o valor errado
// é riscado, o certo entra com marca-texto mostarda e a nota aparece na
// margem; no fim, o carimbo de conferido e a diferença no mês.
//
// Números fictícios, mas a conta é de verdade (tabelas da LC 123/2006):
// RBT12 de R$ 900 mil, 4ª faixa. Anexo V: 20,5% com dedução de R$ 17.100
// → efetiva 18,60%. Com fator R ≥ 28% a atividade vai pro Anexo III: 16% com
// dedução de R$ 35.640 → efetiva 12,04%. Receita do mês: R$ 84.300 menos
// R$ 2.350 de notas canceladas = R$ 81.950.
//   errado: 84.300 × 18,60% = 15.679,80
//   certo:  81.950 × 12,04% =  9.866,78   → diferença 5.813,02

const STEPS = [
  { at: 0, title: "Documentos", text: "Notas, extratos e folha do mês chegam e são conferidos com o que saiu no sistema." },
  { at: 0.3, title: "Apuração e revisão", text: "Regime, anexo e alíquota são revistos todo mês, não só quando a empresa abre." },
  { at: 0.78, title: "Conversa com o cliente", text: "A guia vai com o porquê do valor. Se mudou alguma coisa, você fica sabendo antes de pagar." },
];

const AT = { receita: 0.12, anexo: 0.32, aliquota: 0.5, das: 0.66, venc: 0.8, ok: 0.9 };

function Fix({ on, from, to }: { on: boolean; from: string; to: string }) {
  return (
    <span className={styles.fix} data-on={on ? "true" : undefined}>
      <del>{from}</del>
      <ins aria-hidden={!on}>{to}</ins>
    </span>
  );
}

function Note({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <span className={styles.note} data-on={on ? "true" : undefined} aria-hidden={!on}>
      {children}
    </span>
  );
}

export default function Ledger() {
  const sec = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = sec.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sem rolagem guiada: tudo já conferido
      setP(1);
      return;
    }
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

  const step = STEPS.reduce((cur, s, i) => (p >= s.at ? i : cur), 0);
  const is = (k: keyof typeof AT) => p >= AT[k];

  return (
    <section className={styles.ledger} ref={sec} id="como-trabalhamos" aria-labelledby="ledger-title">
      <div className={styles.ledgerStage}>
        <div className={styles.ledgerText}>
          <h2 id="ledger-title">Todo mês, a apuração passa por três conferências</h2>
          <ol className={styles.ledgerSteps}>
            {STEPS.map((s, i) => (
              <li key={s.title} data-on={i === step ? "true" : undefined} data-done={i < step ? "true" : undefined}>
                <span className={styles.ledgerN}>{String(i + 1).padStart(2, "0")}</span>
                <b>{s.title}</b>
                <span className={styles.ledgerStepText}>{s.text}</span>
              </li>
            ))}
          </ol>
          <p className={styles.ledgerFine}>Exemplo com números fictícios. O fator R usa a folha e a receita dos últimos 12 meses.</p>
        </div>

        <article className={styles.paper} aria-label="Exemplo de apuração do Simples Nacional sendo conferida">
          <header className={styles.paperHead}>
            <h3>Apuração mensal: Simples Nacional</h3>
            <p>Pousada Exemplo Ltda. Competência outubro de 2026</p>
          </header>

          <dl className={styles.paperRows}>
            <div>
              <dt>Receita bruta do mês</dt>
              <dd>
                R$ <Fix on={is("receita")} from="84.300,00" to="81.950,00" />
              </dd>
              <Note on={is("receita")}>2 notas canceladas no mês: R$ 2.350,00</Note>
            </div>
            <div>
              <dt>Receita dos últimos 12 meses</dt>
              <dd>R$ 900.000,00</dd>
            </div>
            <div>
              <dt>Anexo</dt>
              <dd>
                <Fix on={is("anexo")} from="V" to="III" />
              </dd>
              <Note on={is("anexo")}>folha ÷ receita = 31%. Fator R acima de 28%: vai pro anexo III</Note>
            </div>
            <div>
              <dt>Alíquota efetiva</dt>
              <dd>
                <Fix on={is("aliquota")} from="18,60%" to="12,04%" />
              </dd>
              <Note on={is("aliquota")}>anexo III, 4ª faixa: 16% com dedução de R$ 35.640</Note>
            </div>
            <div className={styles.paperTotal}>
              <dt>DAS a pagar</dt>
              <dd>
                R$ <Fix on={is("das")} from="15.679,80" to="9.866,78" />
              </dd>
            </div>
            <div>
              <dt>Vencimento</dt>
              <dd>
                <mark data-on={is("venc") ? "true" : undefined}>20/11/2026</mark>
              </dd>
              <Note on={is("venc")}>todo dia 20, do mês seguinte</Note>
            </div>
          </dl>

          <footer className={styles.paperFoot} data-on={is("ok") ? "true" : undefined}>
            <span>Diferença no mês: <b>R$ 5.813,02</b> a menos</span>
            <span className={styles.stamp} aria-hidden={!is("ok")}>Conferido</span>
          </footer>
        </article>
      </div>
    </section>
  );
}
