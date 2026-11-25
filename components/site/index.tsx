import { Archivo, IBM_Plex_Mono, Newsreader } from "next/font/google";
import SmoothScroll from "./SmoothScroll";
import Areas, { type Area } from "./Areas";
import Ledger from "./Ledger";
import { ContactForm, Reform, Sectors, type Sector } from "./Interactive";
import { PHONE_HREF, PHONE_LABEL, WHATSAPP_LABEL, wa } from "./contact";
import styles from "./Design.module.css";

// Site-proposta da Vanio Contabilidade (Garopaba, SC), feito pela OzneAi em
// 2026-11 a partir do Instagram @vaniocontabilidade, pra avaliação.
// Peças: topo de cinema, áreas presas na tela (Areas.tsx), apuração do
// Simples conferida pela rolagem (Ledger.tsx), setores, reforma tributária
// e contato que monta a mensagem do WhatsApp (Interactive.tsx).
// Fotos de ambiente geradas por IA; retrato do Vanio recortado de um post
// (baixa resolução: trocar por foto original).

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--vn-display", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--vn-mono", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], weight: ["400", "600"], variable: "--vn-serif", display: "swap" });

// imagens em public/img; no GitHub Pages o site mora em /vanio-contabilidade
const IMG = (n: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/img/${n}.webp`;
const FALAR = wa("Olá, Vanio Contabilidade! Vim pelo site e quero conversar com vocês.");

const AREAS: Area[] = [
  {
    id: "contabil",
    label: "Contábil",
    title: "Números que explicam a empresa",
    text: "Balancete e demonstrativo de resultado todo mês, com uma conversa sobre o que mudou. Contabilidade pra decidir, não só pra cumprir prazo.",
    img: IMG("contabil"),
    rows: [
      ["Balancete", "MENSAL, COMENTADO"],
      ["Resultado", "DRE POR COMPETÊNCIA"],
      ["Obrigações", "ECD E ECF NO PRAZO"],
      ["Sócios", "DISTRIBUIÇÃO DE LUCROS"],
    ],
  },
  {
    id: "pessoal",
    label: "Departamento pessoal",
    title: "Folha certa no dia certo",
    text: "Admissão, folha, férias, 13º e rescisão, com eSocial e FGTS Digital em dia. Você contrata e a papelada acompanha.",
    img: IMG("pessoal"),
    rows: [
      ["eSocial", "EVENTOS TRANSMITIDOS"],
      ["FGTS", "FGTS DIGITAL EM DIA"],
      ["Férias e 13º", "CÁLCULO E AVISO"],
      ["Rescisões", "AVISO PRÉVIO E VERBAS"],
    ],
  },
  {
    id: "fiscal",
    label: "Fiscal",
    title: "Imposto no valor certo, pago uma vez",
    text: "Apuração e guias todo mês, e revisão do regime pra empresa não pagar a mais. Simples Nacional, Lucro Presumido e a reforma tributária no radar.",
    img: IMG("fiscal"),
    rows: [
      ["Simples", "ANEXO E FATOR R REVISTOS"],
      ["Presumido", "PIS, COFINS, IRPJ E CSLL"],
      ["Federal", "DCTFWEB TRANSMITIDA"],
      ["Reforma", "IBS E CBS NAS NOTAS"],
    ],
  },
  {
    id: "societario",
    label: "Societário",
    title: "Abrir, mudar ou fechar sem travar",
    text: "Abertura de empresa, alteração de contrato social, entrada e saída de sócios, alvarás e baixa. Cada etapa com prazo e responsável.",
    img: IMG("societario"),
    rows: [
      ["Abertura", "CNPJ E INSCRIÇÕES"],
      ["Alteração", "CONTRATO SOCIAL"],
      ["Licenças", "ALVARÁS E CERTIDÕES"],
      ["Encerramento", "BAIXA COMPLETA"],
    ],
  },
];

const SECTORS: Sector[] = [
  { name: "Comércio", tags: "loja física, e-commerce, estoque", img: IMG("comercio") },
  { name: "Turismo", tags: "pousada, restaurante, temporada", img: IMG("turismo") },
  { name: "Construção", tags: "obra, empreitada, imóveis", img: IMG("construcao") },
  { name: "Saúde", tags: "clínica, consultório, laboratório", img: IMG("saude") },
  { name: "Autônomos", tags: "profissional liberal, prestador de serviço", img: IMG("liberais") },
];

function Mark({ className }: { className?: string }) {
  // "V" de visto, desenhado pro site (não é o arquivo do logo deles)
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" />
      <path d="M11 17.5 L18.5 29 L29 9" />
    </svg>
  );
}

export default function VanioContabilidade() {
  return (
    <div className={`${styles.root} ${display.variable} ${mono.variable} ${serif.variable}`}>
      <SmoothScroll />
      <div className={styles.grain} aria-hidden="true" />

      <header className={styles.nav}>
        <a href="#inicio" className={styles.brand} aria-label="Vanio Contabilidade, início">
          <Mark className={styles.brandMark} />
          <span>Vanio Contabilidade</span>
        </a>
        <nav aria-label="Seções">
          <a href="#areas">Áreas</a>
          <a href="#como-trabalhamos">Como trabalhamos</a>
          <a href="#reforma">Reforma tributária</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className={styles.navCta} href={FALAR} target="_blank" rel="noopener">
          WhatsApp
        </a>
      </header>

      <main id="inicio">
        <section className={styles.hero}>
          {/* eslint-disable-next-line @next/next/no-img-element -- foto estática do modelo */}
          <img className={styles.heroImg} src={IMG("hero")} alt="Mão com caneta revisando demonstrativos sobre a mesa, com o mar ao fundo" />
          <div className={styles.heroShade} aria-hidden="true" />
          <ul className={styles.heroAreas} aria-label="Áreas">
            <li>Contábil</li>
            <li>Departamento pessoal</li>
            <li>Fiscal</li>
            <li>Societário</li>
          </ul>
          <div className={styles.heroBottom}>
            <h1>
              <Mark className={styles.heroMark} />
              <span>Burocracia em clareza e resultado</span>
            </h1>
            <div className={styles.heroStrip}>
              <span>Escritório de contabilidade</span>
              <span>Garopaba, SC</span>
              <span>Desde 2005</span>
              <a href={FALAR} target="_blank" rel="noopener">
                Falar com a equipe
              </a>
            </div>
          </div>
        </section>

        <Areas areas={AREAS} />

        <Ledger />

        <section className={styles.block} aria-labelledby="set-title">
          <div className={styles.blockHead}>
            <h2 id="set-title">Setores</h2>
            <p>Cada ramo tem suas armadilhas de imposto e de folha. Em Garopaba, temporada e turismo pesam tanto quanto o comércio.</p>
          </div>
          <Sectors items={SECTORS} />
        </section>

        <section className={`${styles.block} ${styles.reformBlock}`} id="reforma" aria-labelledby="rf-title">
          <div className={styles.blockHead}>
            <h2 id="rf-title">Reforma tributária</h2>
            <p>IBS e CBS vão substituir cinco impostos até 2033. Toque em cada etapa e veja o que muda pra sua empresa.</p>
          </div>
          <Reform />
        </section>

        <section className={styles.partner} aria-labelledby="partner-title">
          {/* eslint-disable-next-line @next/next/no-img-element -- retrato provisório (recorte do Instagram) */}
          <img className={styles.partnerImg} src={IMG("vanio-retrato")} alt="Vanio Amorim, de blazer escuro, sorrindo de braços cruzados" loading="lazy" />
          <div className={styles.partnerText}>
            <h2 id="partner-title">Um escritório que atende pelo nome</h2>
            <p>
              Há 21 anos a Vanio Contabilidade cuida de empresas de Garopaba e região. Quem liga fala com gente que conhece a sua empresa, e quem
              manda mensagem recebe resposta de quem cuida dela.
            </p>
            <dl className={styles.people}>
              <div>
                <dt>Vanio Amorim</dt>
                <dd>Sócio-fundador. CRC-SC [número a confirmar]</dd>
              </div>
            </dl>
          </div>
        </section>

        <dl className={styles.facts}>
          <div>
            <dt>Anos de escritório</dt>
            <dd>21</dd>
          </div>
          <div>
            <dt>Áreas num lugar só</dt>
            <dd>4</dd>
          </div>
          <div>
            <dt>Fundação</dt>
            <dd>2005</dd>
          </div>
        </dl>

        <section className={styles.final} id="contato" aria-labelledby="final-title">
          {/* eslint-disable-next-line @next/next/no-img-element -- foto estática do modelo */}
          <img className={styles.finalImg} src={IMG("reuniao")} alt="" loading="lazy" />
          <div className={styles.finalShade} aria-hidden="true" />
          <div className={styles.finalGrid}>
            <div>
              <h2 id="final-title">
                <Mark className={styles.heroMark} />
                <span>Antes do próximo vencimento</span>
              </h2>
              <dl className={styles.channels}>
                <div>
                  <dt>WhatsApp, só mensagens</dt>
                  <dd>
                    <a href={FALAR} target="_blank" rel="noopener">
                      {WHATSAPP_LABEL}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Telefone, ligações</dt>
                  <dd>
                    <a href={PHONE_HREF}>{PHONE_LABEL}</a>
                  </dd>
                </div>
                <div>
                  <dt>Escritório</dt>
                  <dd>Garopaba, SC</dd>
                </div>
              </dl>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Vanio Contabilidade. Garopaba, SC. CRC-SC [a confirmar]</span>
        <a href="https://www.instagram.com/vaniocontabilidade/" target="_blank" rel="noopener">
          Instagram
        </a>
        <span className={styles.footNote}>Fotos de ambiente ilustrativas, geradas por IA. A apuração mostrada é um exemplo com números fictícios.</span>
        <a className={styles.madeBy} href="https://ozneai.com" target="_blank" rel="noopener">
          Desenvolvido por <b>OzneAi</b>
        </a>
      </footer>
    </div>
  );
}
