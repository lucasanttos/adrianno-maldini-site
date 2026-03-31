import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Configuração da fonte principal (sem serifa, limpa e moderna para leitura)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Configuração da fonte dos títulos (com serifa, elegante e autoritária)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

// --- Configuração Sênior de SEO (Otimização para Buscadores e Redes Sociais) ---
export const metadata: Metadata = {
  title: {
    default: "Adrianno Maldini | Advogado Criminalista",
    template: "%s | Adrianno Maldini", // Se criar outras páginas, o título se adapta
  },
  description: "Escritório boutique focado exclusivamente em Direito Penal de alta complexidade. Proteção intransigente do seu patrimônio, da sua liberdade e da sua honra em Natal/RN.",
  keywords: ["Advogado Criminalista", "Tribunal do Júri", "Direito Penal", "Natal", "Rio Grande do Norte", "Advocacia de Alta Complexidade"],
  authors: [{ name: "Adrianno Maldini" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://adriannomaldini.vercel.app/",  
    title: "Adrianno Maldini | Advogado Criminalista",
    description: "Atuação estratégica e excelência em Direito Penal de Alta Complexidade.",
    siteName: "Adrianno Maldini",
    images: [
      {
        url: "/adr22.png", 
        width: 1200,
        height: 630,
        alt: "Dr. Adrianno Maldini - Advogado Criminalista",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adrianno Maldini | Advogado Criminalista",
    description: "Atuação estratégica e excelência em Direito Penal de Alta Complexidade.",
    images: ["/adr22.png"], // Garante que fique bonito também se enviarem no Twitter/X
  },
  robots: {
    index: true,
    follow: true, // Garante que o Google vai ler e indexar o site
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR" // Alterado para Português do Brasil
      // Aqui eu injeto as variáveis das fontes e o scroll suave (scroll-smooth) para o menu
      className={`${inter.variable} ${playfair.variable} scroll-smooth antialiased h-full`}
    >
      {/* Movi as cores principais do fundo e texto para o body. 
        Isso garante que, se o site demorar 1 milissegundo a carregar, 
        a tela não pisque em branco, mantendo o aspecto escuro (Dark Mode).
      */}
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-50 selection:bg-amber-700 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}