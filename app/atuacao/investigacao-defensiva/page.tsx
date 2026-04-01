'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, MessageSquare, Search, Target } from 'lucide-react';

// ============================================================================
// 1. MEUS DADOS (INVESTIGAÇÃO DEFENSIVA)
// ============================================================================
const meusDados = {
  telefoneFormatado: "(84) 9970-2095",
  linkWhatsapp: "https://wa.me/558499702095?text=Olá, Dr. Adrianno. Gostaria de entender mais sobre a Investigação Defensiva para o meu caso."
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 20 } }
};
const stagger: Variants = { visible: { transition: { staggerChildren: 0.12 } } };

export default function InvestigacaoDefensiva() {
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
            <Search className="text-amber-600" size={24} />
            <span className="text-[0.7rem] uppercase tracking-[0.4em] text-zinc-500 font-black">Especialidade</span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-6xl sm:text-7xl md:text-[7.5rem] font-serif font-bold leading-[0.9] tracking-tighter text-zinc-950 mb-12">
            Investigação <br /> <span className="italic font-medium text-zinc-400">Defensiva.</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-zinc-600 font-medium leading-relaxed max-w-2xl border-l-4 border-amber-600 pl-6">
            Não basta aguardar as provas da acusação. A defesa de elite age proativamente, buscando a verdade dos fatos com recursos próprios, inteligência e tecnologia.
          </motion.p>
        </motion.div>
      </section>

      {/* TEXTO DESCRITIVO E CAIXA DE AÇÃO */}
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* Lado Esquerdo - Meus Textos */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={stagger} className="lg:col-span-7">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-serif font-bold text-zinc-950 mb-10 leading-tight">
              A antecipação estratégica que muda o curso do processo.
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-zinc-600 font-medium leading-relaxed text-lg mb-8">
              Pautado pelo Provimento 188/2018 da OAB, o Dr. Adrianno exerce a Investigação Defensiva para desconstruir teses acusatórias ainda na estaca zero. Assumimos o protagonismo na formação do arcabouço probatório.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-zinc-600 font-medium leading-relaxed text-lg mb-12">
              Nossa equipe coordena a contratação de peritos particulares de diversas áreas (medicina legal, contabilidade forense, balística, computação), ouve testemunhas e analisa locais de fatos, produzindo relatórios técnicos que frequentemente evitam o oferecimento de denúncias ou garantem absolvições sumárias.
            </motion.p>
          </motion.div>

          {/* Lado Direito - Caixa Branca/Cinza com Botão */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="lg:col-span-5">
            <div className="bg-zinc-50 border border-zinc-200 p-10 md:p-14 rounded-sm shadow-xl">
              <Target className="text-amber-600 mb-8" size={32} />
              
              <h3 className="text-2xl font-serif font-bold text-zinc-950 mb-6">Assuma o controle da narrativa</h3>
              
              <p className="text-zinc-600 font-medium text-base leading-relaxed mb-10">
                Se você está sob investigação ou teme uma acusação injusta, a hora de agir é agora. O tempo é o recurso mais valioso na busca pela prova absolutória.
              </p>
              
              <a href={meusDados.linkWhatsapp} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center space-x-4 py-5 bg-zinc-950 text-white font-black uppercase tracking-widest text-[0.75rem] hover:bg-amber-600 transition-all shadow-md w-full transform-gpu hover:-translate-y-1 active:scale-95">
                <MessageSquare size={18} />
                <span>Agendar Consultoria</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}