'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, MessageSquare, Briefcase, ShieldAlert } from 'lucide-react';

// ============================================================================
// 1. MEUS DADOS (DIREITO PENAL ECONÔMICO)
// ============================================================================
const meusDados = {
  telefoneFormatado: "(84) 9970-2095",
  linkWhatsapp: "https://wa.me/558499702095?text=Olá, Dr. Adrianno. Busco assessoria em Direito Penal Econômico."
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 20 } }
};
const stagger: Variants = { visible: { transition: { staggerChildren: 0.12 } } };

export default function PenalEconomico() {
  const [progressoScroll, setProgressoScroll] = useState(0);

  useEffect(() => {
    const lidarComRolagem = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgressoScroll((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', lidarComRolagem, { passive: true });
    return () => window.removeEventListener('scroll', lidarComRolagem);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-zinc-950 font-sans selection:bg-amber-600 selection:text-white">
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      <div className="fixed top-0 left-0 h-[3px] bg-amber-600 z-[100] transform-gpu origin-left" style={{ transform: `scaleX(${progressoScroll / 100})` }}></div>

      {/* Header com Botão de Voltar */}
      <header className="fixed top-0 w-full z-50 bg-[#fafaf9]/90 backdrop-blur-md py-6 border-b border-zinc-200/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex justify-between items-center">
          <a href="/" className="group flex items-center text-[0.65rem] uppercase tracking-widest font-black text-zinc-500 hover:text-zinc-950 transition-colors">
            <ArrowLeft size={16} className="mr-2 transform-gpu group-hover:-translate-x-1 transition-transform" />
            Voltar ao Início
          </a>
          <span className="font-serif text-2xl font-bold tracking-tighter text-zinc-950">Maldini<span className="text-amber-600">.</span></span>
        </div>
      </header>

      {/* TÍTULO PRINCIPAL (HERO) */}
      <section className="pt-40 md:pt-56 pb-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
          <motion.div variants={fadeInUp} className="flex items-center space-x-4 mb-8">
            <Briefcase className="text-amber-600" size={24} />
            <span className="text-[0.7rem] uppercase tracking-[0.4em] text-zinc-500 font-black">Especialidade</span>
          </motion.div>
          
          {/* Se eu quiser mudar o título, troco os textos "Direito Penal" e "Econômico." */}
          <motion.h1 variants={fadeInUp} className="text-6xl sm:text-7xl md:text-[7.5rem] font-serif font-bold leading-[0.9] tracking-tighter text-zinc-950 mb-12">
            Direito Penal <br /> <span className="italic font-medium text-zinc-400">Econômico.</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-zinc-600 font-medium leading-relaxed max-w-2xl border-l-4 border-amber-600 pl-6">
            A proteção do patrimônio e da imagem institucional corporativa frente aos rigores das operações policiais e agências de controle.
          </motion.p>
        </motion.div>
      </section>

      {/* TEXTO DESCRITIVO E CAIXA DE AÇÃO NEGRA */}
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Lado Esquerdo - Meus Textos */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger}>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-serif font-bold text-zinc-950 mb-10 leading-tight">
              Blindagem de ativos e defesa corporativa de alta complexidade.
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-zinc-600 font-medium leading-relaxed text-lg mb-8">
              Acusações de crimes do "colarinho branco" carregam um peso devastador para a reputação de executivos e empresas. Atuamos com extrema discrição na defesa contenciosa de crimes tributários, financeiros, lavagem de dinheiro e fraudes licitatórias.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-zinc-600 font-medium leading-relaxed text-lg">
              A advocacia penal empresarial moderna exige uma visão multidisciplinar. O Dr. Adrianno alia o rigor técnico do Direito Penal à compreensão estrutural das dinâmicas empresariais, mitigando riscos e promovendo defesas que preservam o legado corporativo.
            </motion.p>
          </motion.div>

          {/* Lado Direito - A Minha Caixa Preta */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="bg-zinc-950 p-12 md:p-16 rounded-sm shadow-2xl relative overflow-hidden">
            
            {/* Ícone gigante no fundo */}
            <ShieldAlert size={120} className="absolute -right-10 -bottom-10 text-zinc-900 opacity-50" />
            
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight mb-8 relative z-10">
              Operações complexas exigem atuação imediata.
            </h3>
            
            <p className="text-zinc-400 font-medium text-base leading-relaxed mb-12 relative z-10">
              Ações cautelares como busca e apreensão ou bloqueios de bens demandam um contra-ataque rápido e técnico. Assegure a sua proteção agora.
            </p>
            
            <a href={meusDados.linkWhatsapp} target="_blank" rel="noopener noreferrer" className="relative z-10 group inline-flex items-center justify-center space-x-4 py-5 bg-amber-600 text-white font-black uppercase tracking-widest text-[0.8rem] hover:bg-white hover:text-zinc-950 transition-all shadow-xl w-full transform-gpu hover:-translate-y-1 active:scale-95">
              <MessageSquare size={18} />
              <span>Acionar o Dr. Adrianno</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}