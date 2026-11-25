import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vanio Contabilidade | Garopaba, SC",
  description: "Contabilidade, departamento pessoal, fiscal e societário em Garopaba, SC. Há 21 anos transformando burocracia em clareza e resultado.",
  // proposta em avaliação: fora do Google até a aprovação
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
