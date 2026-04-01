'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, MessageSquare, Gavel, CheckCircle } from 'lucide-react';

// ============================================================================
// 1. MEUS DADOS (TRIBUNAL DO JÚRI)
// Se eu precisar mudar meu telefone ou a mensagem específica dessa página,
// eu altero essas variáveis abaixo!
// ============================================================================
const meusDados = {
  telefoneFormatado: "(84) 9970-2095",
  linkWhatsapp: "https://wa.me/558499702095?text=Olá, Dr. Adrianno. Gostaria de uma consultoria sobre o Tribunal do Júri."
};

// Animações
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 20 } }
};
const stagger: Variants = { visible: { transition: { staggerChildren: 0.12 } } };

export default function TribunalDoJuri() {
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

      {/* Meu Header Simples (com botão de voltar) */}
      <header className="fixed top-0 w-full z-50 bg-[#fafaf9]/90 backdrop-blur-md py-6 border-b border-zinc-200/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex justify-between items-center">
          <a href="/" className="group flex items-center text-[0.65rem] uppercase tracking-widest font-black text-zinc-500 hover:text-zinc-950 transition-colors">
            <ArrowLeft size={16} className="mr-2 transform-gpu group-hover:-translate-x-1 transition-transform" />
            Voltar ao Início
          </a>
          <span className="font-serif text-2xl font-bold tracking-tighter text-zinc-950">Maldini<span className="text-amber-600">.</span></span>
        </div>
      </header>

      {/* TÍTULO PRINCIPAL DA PÁGINA (HERO) */}
      {/* Se eu quiser alterar o grande título "Tribunal do Júri", eu mexo na tag <h1> abaixo */}
      <section className="pt-40 md:pt-56 pb-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
          <motion.div variants={fadeInUp} className="flex items-center space-x-4 mb-8">
            <Gavel className="text-amber-600" size={24} />
            <span className="text-[0.7rem] uppercase tracking-[0.4em] text-zinc-500 font-black">Especialidade</span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-6xl sm:text-7xl md:text-[8rem] font-serif font-bold leading-[0.9] tracking-tighter text-zinc-950 mb-12">
            Tribunal <br /> <span className="italic font-medium text-zinc-400">do Júri.</span>
          </motion.h1>
          
          {/* Subtítulo curto abaixo do título principal */}
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-zinc-600 font-medium leading-relaxed max-w-2xl border-l-4 border-amber-600 pl-6">
            A defesa perante o Conselho de Sentença exige mais do que conhecimento jurídico; exige o domínio absoluto da oratória, da psicologia e da estratégia processual.
          </motion.p>
        </motion.div>
      </section>

      {/* TEXTO DETALHADO E VANTAGENS */}
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger}>
            
            {/* O título do bloco de texto */}
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-serif font-bold text-zinc-950 mb-10 leading-tight">
              A soberania dos veredictos garantida pela técnica.
            </motion.h2>
            
            {/* Meus parágrafos de explicação */}
            <motion.p variants={fadeInUp} className="text-zinc-600 font-medium leading-relaxed text-lg mb-8">
              O Dr. Adrianno atua de forma artesanal em crimes dolosos contra a vida. Ao assumir a tribuna, a sua defesa é fundamentada no esmiuçamento rigoroso das provas inquisitoriais e periciais. Nada escapa ao crivo da defesa técnica.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-zinc-600 font-medium leading-relaxed text-lg mb-12">
              Da escolha criteriosa dos jurados aos debates orais e réplicas, cada etapa do Plenário é orquestrada para traduzir a complexidade jurídica numa linguagem que ressoe verdade, clareza e justiça perante a sociedade.
            </motion.p>
            
            {/* Meus Tópicos (Aquelas bolinhas com o Check) */}
            {/* Se eu quiser adicionar ou remover um tópico, eu altero os textos dentro desse array [ 'Texto 1', 'Texto 2' ] */}
            <motion.div variants={stagger} className="space-y-4">
               {[
                 'Estudo minucioso do inquérito e laudos periciais', 
                 'Preparação estratégica de testemunhas e interrogatórios', 
                 'Oratória persuasiva e domínio do Plenário', 
                 'Atuação implacável em nulidades e recursos'
               ].map((item, i) => (
                 <motion.div variants={fadeInUp} key={i} className="flex items-start">
                   <CheckCircle className="text-amber-600 mr-4 mt-1 shrink-0" size={18} />
                   <span className="text-zinc-800 font-bold">{item}</span>
                 </motion.div>
               ))}
            </motion.div>
          </motion.div>

          {/* O MEU BOTÃO GIGANTE PRETO (CALL TO ACTION) */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="bg-zinc-950 p-12 md:p-16 rounded-sm shadow-2xl flex flex-col justify-center">
            <span className="text-[0.65rem] uppercase tracking-[0.4em] text-white/50 font-black mb-8 block">Atendimento Urgente</span>
            
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-8">
              Tem um caso de competência do Júri?
            </h3>
            
            <p className="text-zinc-400 font-medium text-lg leading-relaxed mb-12">
              A antecipação da estratégia defensiva é crucial em crimes contra a vida. Fale diretamente com o Dr. Adrianno para uma análise técnica e sigilosa.
            </p>
            
            <a href={meusDados.linkWhatsapp} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center space-x-4 py-6 bg-amber-600 text-white font-black uppercase tracking-widest text-[0.8rem] hover:bg-white hover:text-zinc-950 transition-all shadow-xl w-full transform-gpu hover:-translate-y-1 active:scale-95">
              <MessageSquare size={18} />
              <span>Consultar o Dr. Adrianno</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}