'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Menu, X, ArrowRight, Gavel, Briefcase, Search, FileText,
  MessageSquare, MapPin, ChevronRight, Plus
} from 'lucide-react';

// ============================================================================
// 1. MEUS DADOS PESSOAIS E CONFIGURAÇÕES
// Aqui é onde eu devo alterar qualquer informação básica minha. 
// Se eu mudar aqui, vai atualizar automaticamente em todo o site!
// ============================================================================
const meusDados = {
  nome: "Adrianno Maldini",
  cargo: "Arquiteto da Liberdade & Estrategista Criminal", // Como eu me apresento no site
  telefoneFormatado: "(84) 9970-2095", // Meu telefone que aparece escrito na tela
  email: "maldiniadvogados@gmail.com", // Meu e-mail de contato
  endereco: "Natal, Rio Grande do Norte, CEP 59064-320", // Meu endereço físico
  sala: "Sala 205", // Complemento do meu endereço
  escritorio: "Maldini Advogados", // Nome do meu escritório
  anosAtuacao: "10", // Aqui eu atualizo meus anos de experiência com o passar do tempo
  
  // Este é o link que abre o Google Maps quando clicam no meu endereço
  linkMaps: "https://www.google.com/maps/search/?api=1&query=Maldini+Advogados,+Natal,+Rio+Grande+do+Norte,+59064-320",
  
  // Este é o link mágico do meu WhatsApp. Se eu mudar de número, altero o "558499702095" aqui.
  // Posso também alterar a mensagem padrão ("text=Olá...")
  linkWhatsapp: "https://wa.me/558499702095?text=Olá, Dr. Adrianno. Preciso de uma defesa técnica especializada."
};

// ============================================================================
// 2. MINHAS FOTOGRAFIAS
// Aqui eu defino quais imagens vão aparecer. 
// Para trocar, eu só preciso colocar a foto nova na pasta "public" do projeto 
// e mudar o nome do arquivo aqui embaixo (ex: "/nova-foto.jpg").
// ============================================================================
const minhasFotos = {
  heroBg: "/aaa.jpg", // A foto grande de fundo que aparece logo que o site abre
  perfil: "/adr22.png",        // A minha foto de perfil que aparece na seção "Quem sou eu"
};

// ============================================================================
// 3. MEU MENU DE NAVEGAÇÃO
// Estes são os links que ficam no topo do site. O "#sobre" faz a página rolar 
// até a seção que tem o id="sobre".
// ============================================================================
const linksNavegacao = [
  { nome: 'Trajetória', href: '#sobre' },
  { nome: 'Expertise', href: '#atuacao' },
  { nome: 'Contato', href: '#contato' },
];

// ============================================================================
// 4. MINHAS ÁREAS DE ATUAÇÃO (CARDS)
// Aqui eu configuro os 4 blocos de especialidade que aparecem na tela principal.
// Se eu quiser mudar o título ou o texto de algum deles, é aqui que eu mexo.
// O "slug" é o endereço da página que vai abrir (ex: meusoite.com/atuacao/tribunal-do-juri)
// ============================================================================
const expertiseCriminal = [
  {
    titulo: "Tribunal do Júri",
    subtitulo: "A soberania da defesa",
    descricao: "Atuação magistral perante o conselho de sentença, onde a técnica encontra a persuasão absoluta.",
    slug: "tribunal-do-juri", // Tem que bater exatamente com o nome da pasta que criei
    icon: <Gavel size={24} strokeWidth={1.5} />
  },
  {
    titulo: "Investigação Defensiva",
    subtitulo: "Antecipação estratégica",
    descricao: "Produção autônoma de provas para desconstruir narrativas acusatórias antes mesmo do julgamento.",
    slug: "investigacao-defensiva",
    icon: <Search size={24} strokeWidth={1.5} />
  },
  {
    titulo: "Direito Penal Econômico",
    subtitulo: "Proteção de ativos e honra",
    descricao: "Defesa de alta complexidade em crimes financeiros, lavagem de dinheiro e gestão empresarial.",
    slug: "direito-penal-economico",
    icon: <Briefcase size={24} strokeWidth={1.5} />
  },
  {
    titulo: "Cortes Superiores",
    subtitulo: "A última trincheira",
    descricao: "Intervenções cirúrgicas no STJ e STF para reversão de injustiças e fixação de precedentes.",
    slug: "cortes-superiores",
    icon: <FileText size={24} strokeWidth={1.5} />
  }
];

// ============================================================================
// 5. MINHAS CONFIGURAÇÕES VISUAIS (NÃO PRECISO MEXER MUITO AQUI)
// Códigos que fazem as animações do site ficarem suaves a 60fps.
// ============================================================================
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 20, mass: 1 } }
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const mobileMenuVariants = {
  hidden: { opacity: 0, y: "-100%" },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 20, staggerChildren: 0.1, delayChildren: 0.2 } },
  exit: { opacity: 0, y: "-100%", transition: { duration: 0.4, ease: "easeInOut" } }
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const IconInstagram = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const IconLinkedin = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

// ============================================================================
// 6. ESTRUTURA DA PÁGINA (AQUI COMEÇA O HTML DO MEU SITE)
// ============================================================================
export default function App() {
  const [rolouPagina, setRolouPagina] = useState(false);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const [progressoScroll, setProgressoScroll] = useState(0);

  // Aqui eu travo o scroll da tela quando abro o menu no celular
  useEffect(() => {
    if (menuMobileAberto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuMobileAberto]);

  // Aqui eu monitoro a rolagem para mudar a cor do menu de transparente para branco
  useEffect(() => {
    const lidarComRolagem = () => {
      setRolouPagina(window.scrollY > 50);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgressoScroll((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', lidarComRolagem, { passive: true });
    return () => window.removeEventListener('scroll', lidarComRolagem);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-zinc-950 font-sans selection:bg-zinc-900 selection:text-white overflow-x-hidden">
      
      {/* Camada de Textura (Grain) para dar ar de luxo */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      {/* Minha Barra de Progresso no topo */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-amber-600 z-[100] transform-gpu origin-left" 
        style={{ transform: `scaleX(${progressoScroll / 100})`, transition: 'transform 0.1s ease-out' }}
      ></div>

      {/* --- O MEU CABEÇALHO (HEADER) --- */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-700 transform-gpu ${rolouPagina ? 'bg-white/98 backdrop-blur-md py-4 border-b border-zinc-200 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex justify-between items-center">
          
          {/* Minha Logo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="flex items-center space-x-3">
            <span className={`font-serif text-3xl font-bold tracking-tighter transition-colors duration-500 ${rolouPagina ? 'text-zinc-950' : 'text-white'}`}>
              Maldini<span className="text-amber-600">.</span>
            </span>
          </motion.div>

          {/* Meu Menu (Telas Grandes) */}
          <nav className="hidden lg:flex items-center space-x-12">
            {linksNavegacao.map((link) => (
              <a key={link.nome} href={link.href} className={`text-[0.75rem] uppercase tracking-[0.2em] font-bold transition-colors duration-300 ${rolouPagina ? 'text-zinc-600 hover:text-zinc-950' : 'text-white/80 hover:text-white'}`}>
                {link.nome}
              </a>
            ))}
          </nav>

          {/* Meu Botão de WhatsApp no Cabeçalho */}
          <div className="hidden lg:flex items-center">
            <a 
              href={meusDados.linkWhatsapp} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`group flex items-center space-x-4 px-10 py-4 rounded-sm transition-all duration-500 shadow-xl font-bold transform-gpu hover:scale-105 active:scale-95 ${
                rolouPagina 
                ? 'bg-zinc-950 text-white hover:bg-amber-600 shadow-zinc-900/20' 
                : 'bg-white text-zinc-950 hover:bg-amber-600 hover:text-white shadow-black/20'
              }`}
            >
              <span className="text-[0.75rem] uppercase tracking-widest font-black">Falar com Dr. Adrianno</span>
              <MessageSquare size={18} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>

          {/* Botão de Menu para Celular */}
          <button 
            className={`lg:hidden p-2 rounded-full transition-colors active:scale-90 ${rolouPagina ? 'text-zinc-950 hover:bg-zinc-100' : 'text-white hover:bg-white/10'}`} 
            onClick={() => setMenuMobileAberto(true)}
          >
            <Menu size={32} />
          </button>
        </div>
      </header>

      {/* --- A MINHA PRIMEIRA TELA (HERO SECTION) --- */}
      <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-zinc-950">
        
        {/* Aqui eu puxo a foto do escritório configurada lá no topo */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, ease: "easeOut" }}
          className="absolute inset-0 z-0 transform-gpu"
        >
          <img src={minhasFotos.heroBg} alt="Dr. Adrianno Maldini Office" className="w-full h-full object-cover opacity-40 grayscale-[0.3]" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-transparent to-zinc-950"></div>
        </motion.div>

        {/* Textos Principais que o cliente lê logo que entra */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 text-center px-6 w-full max-w-6xl mx-auto flex flex-col items-center">
          <motion.p variants={fadeInUp} className="text-[0.7rem] md:text-[0.8rem] uppercase tracking-[0.4em] text-white/70 mb-8 font-extrabold shadow-sm">
            Dr. Adrianno Maldini • Advocacia Criminal
          </motion.p>
          
          {/* Meu grande título. Se eu quiser mudar "A Defesa Incontestável", é aqui! */}
          <motion.h1 variants={fadeInUp} className="text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-serif font-bold text-white leading-[0.95] tracking-tighter mb-12 drop-shadow-2xl">
            A Defesa <br /> <span className="italic font-normal text-white/95 text-5xl sm:text-6xl md:text-9xl block mt-2 md:mt-4">Incontestável.</span>
          </motion.h1>
          
          {/* Meu Botão Principal de Ação */}
          <motion.div variants={fadeInUp} className="w-full sm:w-auto">
            <a 
              href={meusDados.linkWhatsapp} 
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto space-x-6 group py-5 px-10 md:py-6 md:px-14 bg-amber-600 text-white rounded-sm shadow-[0_10px_40px_rgba(217,119,6,0.3)] hover:bg-white hover:text-zinc-950 transition-all duration-500 transform-gpu hover:-translate-y-1 active:scale-95"
            >
              <span className="text-[0.8rem] md:text-[0.85rem] uppercase tracking-[0.3em] font-black">Falar com Dr. Adrianno</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* --- A MINHA SEÇÃO "SOBRE MIM" (PERFIL PROFISSIONAL) --- */}
      <section id="sobre" className="py-24 md:py-48 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* A minha foto do perfil puxada das configurações */}
          <motion.div 
            initial={{ opacity: 0, x: -30, scale: 0.95 }} 
            whileInView={{ opacity: 1, x: 0, scale: 1 }} 
            viewport={{ once: true, margin: "-10%" }} 
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-5 relative order-2 lg:order-1 mt-12 lg:mt-0"
          >
            <div className="aspect-[3/4] overflow-hidden bg-zinc-200 shadow-2xl rounded-sm transform-gpu">
              <img src={minhasFotos.perfil} alt="Dr. Adrianno Maldini" className="w-full h-full object-cover transition-all duration-1000" />
            </div>
            <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-32 h-32 md:w-40 md:h-40 border-l border-b-2 border-amber-600/30 -z-10"></div>
          </motion.div>

          {/* O meu texto descritivo. Se eu quiser mudar minha história, eu mudo os parágrafos (<p>) abaixo */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <motion.span variants={fadeInUp} className="text-[0.7rem] md:text-[0.75rem] uppercase tracking-[0.3em] text-amber-700 font-black block mb-6 md:mb-8 underline underline-offset-8 decoration-amber-600/50">
              Perfil Profissional
            </motion.span>
            
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-8 md:mb-12 text-zinc-950">
              Dr. Adrianno Maldini <br /> 
              <span className="italic text-zinc-500 font-medium text-3xl sm:text-4xl md:text-5xl mt-2 block">Mestre na arte da defesa.</span>
            </motion.h2>
            
            <motion.div variants={fadeInUp} className="max-w-xl space-y-6 md:space-y-8 text-zinc-800 font-medium text-base md:text-lg leading-relaxed">
              <p>
                Reconhecido pela combatividade técnica e oratória persuasiva, o **Dr. Adrianno Maldini** é uma das vozes mais respeitadas no cenário penal potiguar. Como Presidente da Comissão de Tribunal do Júri da ANACRIM, ele lidera o debate nacional sobre as garantias constitucionais e o aprimoramento da advocacia criminal.
              </p>
              <p className="border-l-4 border-amber-600 pl-6 md:pl-8 italic bg-zinc-50 py-4 md:py-6 pr-4 md:pr-6 text-zinc-900 font-semibold shadow-sm text-sm md:text-base">
                "Minha vocação é transformar a complexidade do processo penal em uma defesa técnica intransponível. No Tribunal do Júri, cada caso é uma batalha artesanal pela liberdade e pela honra."
              </p>
              <p>
                Com especialização pela prestigiada PUCRS, o Dr. Adrianno dedica-se exclusivamente a causas de alta complexidade, provendo aos seus constituintes uma assessoria jurídica de elite, pautada no sigilo absoluto e na lealdade irrestrita ao cliente.
              </p>
            </motion.div>

            {/* Meus Números de Autoridade */}
            <motion.div variants={fadeInUp} className="pt-12 md:pt-16 grid grid-cols-2 gap-8 md:gap-12 border-t border-zinc-200 mt-12 md:mt-16">
              <div>
                <span className="text-4xl md:text-5xl font-serif font-bold text-zinc-950">{meusDados.anosAtuacao}+</span>
                <span className="block text-[0.6rem] md:text-[0.7rem] uppercase tracking-widest text-zinc-500 mt-2 md:mt-3 font-extrabold font-sans">Anos de Especialização</span>
              </div>
              <div>
                <span className="text-4xl md:text-5xl font-serif font-bold text-zinc-950">ANACRIM</span>
                <span className="block text-[0.6rem] md:text-[0.7rem] uppercase tracking-widest text-zinc-500 mt-2 md:mt-3 font-extrabold font-sans">Presidente Nacional</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* --- A MINHA SEÇÃO DE ÁREAS DE ATUAÇÃO (CARDS) --- */}
      <section id="atuacao" className="py-24 md:py-40 bg-zinc-950 relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6 md:gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-[0.7rem] md:text-[0.75rem] uppercase tracking-[0.4em] text-white/60 block mb-4 md:mb-6 font-black">Expertise Penal</span>
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white tracking-tighter">Domínio Técnico<span className="text-amber-600">.</span></h3>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-white/70 font-medium max-w-sm text-sm md:text-base leading-relaxed">
              Clique em cada área para entender a profundidade estratégica da atuação do Dr. Adrianno em uma nova aba.
            </motion.p>
          </div>

          {/* O laço que cria meus 4 cards baseado no array "expertiseCriminal" que configurei no topo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 shadow-2xl">
            {expertiseCriminal.map((area, index) => (
              <motion.a 
                key={area.titulo}
                href={`/atuacao/${area.slug}`} // Aqui eu pego o slug e crio o link da nova aba
                target="_blank" // Isso faz abrir em nova guia!
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-10%" }} 
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-zinc-950 p-8 md:p-12 hover:bg-zinc-900 transition-all duration-500 group h-full flex flex-col relative overflow-hidden transform-gpu active:scale-[0.98] block"
              >
                <div className="absolute top-4 right-4 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={20} className="text-amber-600" />
                </div>
                <div className="text-amber-600 mb-8 md:mb-12 transform-gpu group-hover:scale-110 transition-transform origin-left duration-500">{area.icon}</div>
                <span className="text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.2em] text-zinc-400 font-black mb-3 md:mb-4">{area.subtitulo}</span>
                <h4 className="text-xl md:text-2xl font-serif font-bold text-white mb-4 md:mb-6 tracking-wide">{area.titulo}</h4>
                <p className="text-zinc-400 md:text-zinc-300 text-sm md:text-base font-medium leading-relaxed mb-8 md:mb-12 line-clamp-3 md:line-clamp-none">{area.descricao}</p>
                <span className="mt-auto flex items-center text-[0.7rem] md:text-[0.75rem] uppercase tracking-widest text-amber-600 font-black">
                  Ver Detalhes <ChevronRight size={18} className="ml-2 transform-gpu group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* --- A MINHA SEÇÃO FINAL DE CONTATO --- */}
      <section id="contato" className="py-24 md:py-48 bg-white overflow-hidden relative border-t border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger}>
            <motion.h2 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-8xl font-serif font-bold tracking-tighter mb-8 md:mb-16 leading-[0.9] text-zinc-950">
              Sua Defesa <br /> Inicia <span className="italic font-medium text-zinc-400">Agora.</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-full">
              <a 
                href={meusDados.linkWhatsapp} target="_blank" rel="noopener noreferrer"
                className="group w-full md:w-auto inline-flex items-center justify-center md:justify-start space-x-6 md:space-x-10 p-6 md:p-8 rounded-sm bg-zinc-950 text-white hover:bg-amber-600 transition-all duration-500 shadow-2xl transform-gpu hover:-translate-y-1 active:scale-95"
              >
                <div className="hidden sm:flex w-16 h-16 md:w-20 md:h-20 bg-white rounded-full items-center justify-center text-zinc-950 group-hover:bg-zinc-950 group-hover:text-white transition-all duration-500 shadow-lg">
                  <ArrowRight size={28} className="transform-gpu group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-center md:text-left">
                  <span className="block text-[0.85rem] md:text-[1rem] uppercase tracking-[0.2em] font-black">Falar com o Dr. Adrianno</span>
                  <span className="block text-white/70 text-xs md:text-sm font-medium mt-1 md:mt-2">Consultoria imediata e confidencial.</span>
                </div>
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8 }} 
            className="space-y-12 md:space-y-16 lg:pl-16 lg:border-l border-zinc-100"
          >
            {/* Aqui puxa o meu telefone formatado que configurei no topo */}
            <div>
              <span className="text-[0.7rem] md:text-[0.8rem] uppercase tracking-[0.3em] text-zinc-500 font-black block mb-3 md:mb-4">Linha Privada</span>
              <span className="text-3xl md:text-4xl font-serif font-bold text-zinc-950">{meusDados.telefoneFormatado}</span>
            </div>
            
            <div className="relative">
              <span className="text-[0.7rem] md:text-[0.8rem] uppercase tracking-[0.3em] text-zinc-500 font-black block mb-3 md:mb-4">Sede Presencial</span>
              <div className="flex flex-col text-zinc-900 font-bold text-base md:text-lg leading-relaxed relative z-10 bg-white/80 p-4 md:p-6 border border-zinc-100 rounded-sm shadow-sm backdrop-blur-sm">
                <span className="flex items-center mb-2"><MapPin size={18} className="mr-2 text-amber-600" /> {meusDados.escritorio}</span>
                <span className="text-zinc-600 font-medium text-sm md:text-base">{meusDados.endereco} <br /> {meusDados.sala}</span>
              </div>
              
              {/* O meu Mapa Interativo que leva para o meu GPS */}
              <div className="mt-6 w-full h-48 bg-zinc-200 overflow-hidden relative group rounded-sm">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126916.74194098906!2d-35.2925206!3d-5.8053979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b2ff92484080dd%3A0xcda1dfa5b7829288!2sNatal%2C%20RN!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'grayscale(100%) contrast(110%) opacity(0.8)' }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 z-0 transform-gpu transition-transform duration-1000 group-hover:scale-105 pointer-events-none"
                ></iframe>
                
                <a 
                  href={meusDados.linkMaps} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950/20 hover:bg-zinc-950/40 transition-colors duration-300"
                >
                  <span className="px-6 py-3 bg-white text-zinc-950 text-[0.7rem] md:text-[0.75rem] uppercase tracking-widest font-black shadow-2xl flex items-center transform-gpu hover:scale-105 active:scale-95 transition-transform">
                    Abrir no GPS <ChevronRight size={14} className="ml-2" />
                  </span>
                </a>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* --- O MEU RODAPÉ (FOOTER) --- */}
      <footer className="bg-zinc-950 text-white py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-12 text-center md:text-left">
          <div>
            <div className="text-3xl font-serif font-bold tracking-tighter mb-3 md:mb-4">Maldini<span className="text-amber-600">.</span></div>
            <p className="text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.4em] md:tracking-[0.5em] text-white/50 font-black">Dr. Adrianno Maldini • Advocacia Criminal</p>
          </div>

          <div className="flex space-x-10 md:space-x-12">
            <a href="https://instagram.com/adriannomaldini" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transform-gpu hover:scale-110 active:scale-95 transition-all">
              <IconInstagram size={28} />
            </a>
            <a href="#" className="text-white/60 hover:text-white transform-gpu hover:scale-110 active:scale-95 transition-all">
              <IconLinkedin size={28} />
            </a>
          </div>

          <div className="text-center md:text-right mt-4 md:mt-0">
            <p className="text-[0.65rem] md:text-[0.7rem] uppercase tracking-[0.1em] text-white/40 font-bold mb-2">© {new Date().getFullYear()} Dr. Adrianno Maldini</p>
            <p className="text-[0.65rem] md:text-[0.7rem] uppercase tracking-[0.1em] text-white/30">Developed by <a href="https://uicode.site" className="hover:text-white transition-colors">uicode.site</a></p>
          </div>
        </div>
      </footer>

      {/* --- A MINHA TELA DE MENU PARA CELULARES --- */}
      <AnimatePresence>
        {menuMobileAberto && (
          <motion.div 
            variants={mobileMenuVariants}
            initial="hidden" 
            animate="visible" 
            exit="exit" 
            className="fixed inset-0 bg-white z-[200] flex flex-col items-center justify-center p-6 md:p-12 text-zinc-950 font-bold transform-gpu will-change-transform"
          >
            <button className="absolute top-6 right-6 md:top-10 md:right-10 p-4 active:scale-90 transition-transform" onClick={() => setMenuMobileAberto(false)}><X size={36} /></button>
            <div className="flex flex-col space-y-10 md:space-y-12 text-center w-full">
              {linksNavegacao.map((link) => (
                <motion.a 
                  variants={mobileItemVariants}
                  key={link.nome} 
                  href={link.href} 
                  onClick={() => setMenuMobileAberto(false)} 
                  className="text-4xl sm:text-5xl font-serif hover:italic transition-all active:opacity-50"
                >
                  {link.nome}
                </motion.a>
              ))}
              <motion.a 
                variants={mobileItemVariants}
                href={meusDados.linkWhatsapp} 
                className="mt-8 md:mt-12 py-5 md:py-6 px-8 md:px-12 bg-zinc-950 text-white font-black uppercase tracking-widest text-[0.75rem] md:text-[0.85rem] shadow-2xl active:scale-95 transition-transform mx-auto w-full sm:w-auto max-w-sm"
              >
                Falar com o Dr. Adrianno
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}