'use client'; // Esta linha é obrigatória no Next.js moderno para usar animações e interatividade (useEffect/useState)

// Aqui eu importo o React e os hooks necessários para o funcionamento do site
import React, { useState, useEffect } from 'react';
// Aqui eu importo as ferramentas de animação do framer-motion para deixar o site fluido
import { motion, AnimatePresence, Variants } from 'framer-motion';
// Aqui eu importo os ícones que uso no layout. A balança (Scale) e o marcador de mapa (MapPin) estão aqui!
import { 
  Scale, 
  ShieldAlert, 
  Award, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight,
  Phone,
  MessageCircle,
  MapPin
} from 'lucide-react';

// --- Minhas Configurações e Dados Principais ---
// Aqui eu centralizo as informações para que eu possa alterar facilmente no futuro
const meusDados = {
  nome: "Adrianno Maldini",
  cargo: "Advogado Criminalista",
  telefone: "+55 84 9970-2095",
  telefoneFormatado: "(84) 9970-2095",
  email: "maldiniadvogados@gmail.com",
  endereco: "Natal, Rio Grande do Norte, CEP 59064-320",
  sala: "Sala 205",
  escritorio: "Maldini Advogados",
  instagram: "@adriannomaldini",
  linkMaps: "https://www.google.com/maps/search/?api=1&query=Maldini+Advogados,+Natal,+Rio+Grande+do+Norte,+59064-320"
};

// Aqui você vai adicionar os nomes das fotos do Dr. Adrianno que estão no seu PC.
// PASSO IMPORTANTE: Você precisa copiar as suas fotos para dentro da pasta "public" do seu projeto Next.js.
const minhasFotos = [
  "/adr1.jpg",  
  "/adr22.png"  
];

// Aqui eu defino os links do menu de navegação que ficam no topo
const linksNavegacao = [
  { nome: 'Início', href: '#home' },
  { nome: 'Sobre', href: '#sobre' },
  { nome: 'Áreas de Atuação', href: '#atuacao' },
  { nome: 'Contato', href: '#contato' },
];

// --- Minhas Variáveis de Animação ---
// Aqui eu crio o efeito de "surgir de baixo para cima" (fade in up)
// Adicionado o tipo ': Variants' para o TypeScript entender perfeitamente o formato da animação
const animacaoSurgir: Variants = {
  escondido: { opacity: 0, y: 40 },
  visivel: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

// Aqui eu crio o efeito em cascata (um elemento aparece depois do outro)
const animacaoEmCascata: Variants = {
  escondido: { opacity: 0 },
  visivel: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// --- Estrutura Principal do Meu Site ---
export default function App() {
  // Aqui eu crio um estado para saber se o usuário rolou a página (para mudar a cor do menu)
  const [rolouPagina, setRolouPagina] = useState(false);
  // Aqui eu crio um estado para abrir e fechar o menu no celular
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  // Aqui eu crio um estado para controlar qual foto está aparecendo no momento
  const [fotoAtual, setFotoAtual] = useState(0);

  // Aqui eu uso um efeito para monitorar a rolagem da tela
  useEffect(() => {
    const lidarComRolagem = () => {
      setRolouPagina(window.scrollY > 50);
    };
    window.addEventListener('scroll', lidarComRolagem);
    // Aqui eu limpo o evento quando o componente é desmontado
    return () => window.removeEventListener('scroll', lidarComRolagem);
  }, []);

  // Aqui eu crio o efeito automático que troca as fotos a cada 4 segundos
  useEffect(() => {
    const intervaloFotos = setInterval(() => {
      setFotoAtual((fotoAnterior) => (fotoAnterior + 1) % minhasFotos.length);
    }, 8000); // 4000 milissegundos = 4 segundos. Pode alterar esse tempo se quiser!
    return () => clearInterval(intervaloFotos);
  }, []);

  return (
    // Aqui é o container principal. Fundo escuro (neutral-950) e texto claro. 
    // Configurei a cor de seleção de texto para um tom âmbar/dourado.
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-amber-700 selection:text-white overflow-x-hidden">
      
      {/* --- Meu Cabeçalho / Navegação --- */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          // Se eu rolei a página, o fundo fica translúcido. Se não, fica transparente.
          rolouPagina ? 'bg-neutral-950/90 backdrop-blur-md py-4 border-b border-neutral-800 shadow-lg' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Minha Logo com a Balança da Justiça Integrada */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center text-xl md:text-2xl font-serif font-bold tracking-wider text-white"
          >
            <Scale className="w-6 h-6 md:w-8 md:h-8 text-amber-500 mr-3 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" strokeWidth={1.5} />
            MALDINI<span className="text-amber-500">.</span>
          </motion.div>

          {/* Meu Menu para Computadores (Desktop) */}
          <nav className="hidden md:flex space-x-8">
            {linksNavegacao.map((link, index) => (
              <motion.a
                key={link.nome}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-sm uppercase tracking-widest text-neutral-400 hover:text-amber-500 transition-colors"
              >
                {link.nome}
              </motion.a>
            ))}
          </nav>

          {/* Meu Botão de Menu para Celulares (Mobile) */}
          <button 
            className="md:hidden text-neutral-300 hover:text-white"
            onClick={() => setMenuMobileAberto(!menuMobileAberto)}
          >
            {/* Troco o ícone entre X e Menu dependendo do estado */}
            {menuMobileAberto ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Minha Tela de Menu Aberto no Celular */}
      <AnimatePresence>
        {menuMobileAberto && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-neutral-950 pt-24 px-6 flex flex-col items-center space-y-8"
          >
            {linksNavegacao.map((link) => (
              <a
                key={link.nome}
                href={link.href}
                onClick={() => setMenuMobileAberto(false)}
                className="text-2xl font-serif text-neutral-300 hover:text-amber-500"
              >
                {link.nome}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Minha Seção Principal (Hero - A primeira coisa que o cliente vê) --- */}
      {/* Ajustei o espaçamento para ficar perfeito em celulares (pt-32 pb-16) */}
      <section id="home" className="relative min-h-screen flex items-center pt-32 pb-16 lg:py-20 overflow-hidden">
        {/* Este é um elemento de luz de fundo abstrata para dar um tom dourado escuro */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-900/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        
        {/* Alterei o grid para flex-col no celular. Assim o texto aparece primeiro e a foto logo embaixo */}
        <div className="container mx-auto px-6 md:px-12 flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Lado Esquerdo: Meus Textos Persuasivos */}
          <motion.div 
            initial="escondido"
            animate="visivel"
            variants={animacaoEmCascata}
            className="max-w-2xl z-10 w-full"
          >
            {/* Um pequeno selo de autoridade acima do título */}
            <motion.div variants={animacaoSurgir} className="flex items-center space-x-3 mb-6">
              <div className="h-[1px] w-12 bg-amber-500"></div>
              <span className="uppercase tracking-[0.2em] text-amber-500 text-xs md:text-sm font-semibold">
                Alta Complexidade em Defesa Penal
              </span>
            </motion.div>
            
            {/* Meu Título Principal - Ajustei os tamanhos das fontes para escalar no celular */}
            <motion.h1 
              variants={animacaoSurgir}
              className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-6 md:mb-8"
            >
              Autoridade <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">
                Incontestável.
              </span>
            </motion.h1>
            
            {/* Meu Subtítulo / Proposta de Valor */}
            <motion.p 
              variants={animacaoSurgir}
              className="text-base sm:text-lg md:text-xl text-neutral-400 mb-8 md:mb-10 leading-relaxed font-light"
            >
              A proteção da sua liberdade, imagem e patrimônio não admite amadorismo. Atuação estratégica, combativa e implacável no Tribunal do Júri e instâncias superiores.
            </motion.p>
            
            {/* Meu Botão de Chamada para Ação (Call to Action) Direto para o Doutor */}
            <motion.div variants={animacaoSurgir} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Ajustei o botão para ocupar 100% da tela no celular e o texto ficar centralizado */}
              <a 
                href={`https://wa.me/558499702095?text=Olá, Dr. Adrianno. Gostaria de falar diretamente com o senhor sobre o meu caso.`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-4 md:px-8 md:py-5 w-full sm:w-auto bg-amber-600 text-white font-bold uppercase tracking-wider text-xs md:text-sm overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] rounded-sm"
              >
                <span className="relative z-10 flex items-center justify-center text-center">
                  <MessageCircle className="mr-2 md:mr-3 w-4 h-4 md:w-5 md:h-5 shrink-0" />
                  Falar com Dr. Adrianno
                  <ArrowRight className="ml-2 md:ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                </span>
                {/* Efeito de hover no botão */}
                <div className="absolute inset-0 h-full w-full bg-amber-700 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
              </a>
            </motion.div>
          </motion.div>

          {/* Lado Direito: Minha Imagem e Elementos Visuais */}
          {/* Removi a classe 'hidden' para que a foto dele apareça em dispositivos móveis e adaptei as margens */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full max-w-[280px] sm:max-w-sm mx-auto lg:max-w-none mt-8 lg:mt-0"
          >
            {/* O container principal das fotos */}
            <div className="relative w-full aspect-[3/4] rounded-sm overflow-hidden border border-amber-500/30 bg-neutral-900 group shadow-[0_0_40px_rgba(245,158,11,0.15)]">
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent z-20 pointer-events-none"></div>
              
              {/* O laço de repetição que cria as imagens com transição elegante e sem o tom "morto" */}
              {minhasFotos.map((foto, index) => (
                <img 
                  key={index}
                  src={foto} 
                  alt={`Foto ${index + 1} - Adrianno Maldini`} 
                  // Adicionei um fallback caso a imagem não carregue no momento do desenvolvimento local
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-in-out ${
                    index === fotoAtual ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
                  }`}
                />
              ))}

              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-30 pointer-events-none">
                <p className="font-serif text-2xl md:text-3xl text-white">{meusDados.nome}</p>
                <p className="text-amber-500 tracking-widest text-xs md:text-sm uppercase mt-1">Advogado & Sócio Fundador</p>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* --- Minha Seção Sobre / Trajetória --- */}
      <section id="sobre" className="py-24 bg-neutral-900 border-y border-neutral-800 relative">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="escondido"
            whileInView="visivel"
            viewport={{ once: true, margin: "-100px" }}
            variants={animacaoEmCascata}
            className="grid grid-cols-1 lg:grid-cols-12 gap-16"
          >
            {/* Título da seção sobre */}
            <div className="lg:col-span-5">
              <motion.h2 variants={animacaoSurgir} className="text-sm text-amber-500 uppercase tracking-[0.3em] font-semibold mb-4">A Trajetória</motion.h2>
              <motion.h3 variants={animacaoSurgir} className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                Vocação inabalável no <span className="italic text-neutral-400">Tribunal do Júri.</span>
              </motion.h3>
            </div>
            
            {/* Conteúdo da seção sobre */}
            <div className="lg:col-span-7 space-y-8">
              <motion.p variants={animacaoSurgir} className="text-lg text-neutral-300 font-light leading-relaxed">
                Reconhecido pela sua profunda combatividade e excelência técnica, construí uma carreira baseada na busca incessante por resultados favoráveis e na defesa intransigente das garantias fundamentais de meus clientes, mesmo nos cenários mais adversos.
              </motion.p>
              
              {/* Meus Títulos / Credenciais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-neutral-800 mt-8">
                <motion.div variants={animacaoSurgir}>
                  <ShieldAlert className="w-8 h-8 text-amber-500 mb-4" strokeWidth={1.5} />
                  <h4 className="text-xl font-serif mb-2">Presidente de Comissão</h4>
                  <p className="text-sm text-neutral-400">À frente da Comissão de Tribunal do Júri da ANACRIM. Liderando debates e estratégias na esfera penal nacional.</p>
                </motion.div>
                
                <motion.div variants={animacaoSurgir}>
                  <Award className="w-8 h-8 text-amber-500 mb-4" strokeWidth={1.5} />
                  <h4 className="text-xl font-serif mb-2">Especialização de Elite</h4>
                  <p className="text-sm text-neutral-400">Especializando em Direito Penal e Criminologia pela prestigiada PUCRS Online, garantindo atualização jurídica constante.</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Minha Seção de Áreas de Atuação --- */}
      <section id="atuacao" className="py-32 relative">
        <div className="container mx-auto px-6 md:px-12">
          {/* Título centralizado das atuações */}
          <motion.div 
            initial="escondido"
            whileInView="visivel"
            viewport={{ once: true }}
            variants={animacaoSurgir}
            className="text-center mb-20"
          >
            <h2 className="text-sm text-amber-500 uppercase tracking-[0.3em] font-semibold mb-4">Especialidades</h2>
            <h3 className="text-4xl md:text-5xl font-serif">Áreas de Atuação</h3>
          </motion.div>

          {/* Cards com as áreas em que atuo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card de Atuação 1 */}
            <motion.div 
              initial="escondido" whileInView="visivel" viewport={{ once: true }} variants={animacaoSurgir}
              className="group p-10 bg-neutral-900/50 border border-neutral-800 hover:border-amber-500/50 transition-colors duration-500"
            >
              <Scale className="w-12 h-12 text-amber-600 mb-8 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" strokeWidth={1} />
              <h4 className="text-2xl font-serif mb-4">Tribunal do Júri</h4>
              <p className="text-neutral-400 font-light leading-relaxed text-sm">
                Defesa oral combativa, persuasão e técnica minuciosa. Atuação estratégica voltada para resultados incontestáveis perante o conselho de sentença.
              </p>
            </motion.div>

            {/* Card de Atuação 2 */}
            <motion.div 
              initial="escondido" whileInView="visivel" viewport={{ once: true }} variants={animacaoSurgir}
              className="group p-10 bg-neutral-900/50 border border-neutral-800 hover:border-amber-500/50 transition-colors duration-500"
            >
              <ShieldAlert className="w-12 h-12 text-amber-600 mb-8 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" strokeWidth={1} />
              <h4 className="text-2xl font-serif mb-4">Direito Penal Empresarial</h4>
              <p className="text-neutral-400 font-light leading-relaxed text-sm">
                Atuação contenciosa para corporações e executivos em crimes financeiros, tributários e licitatórios. Proteção do patrimônio e da imagem institucional.
              </p>
            </motion.div>

            {/* Card de Atuação 3 */}
            <motion.div 
              initial="escondido" whileInView="visivel" viewport={{ once: true }} variants={animacaoSurgir}
              className="group p-10 bg-neutral-900/50 border border-neutral-800 hover:border-amber-500/50 transition-colors duration-500"
            >
              <Award className="w-12 h-12 text-amber-600 mb-8 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" strokeWidth={1} />
              <h4 className="text-2xl font-serif mb-4">Tribunais Superiores (STJ/STF)</h4>
              <p className="text-neutral-400 font-light leading-relaxed text-sm">
                Elaboração de teses defensivas de altíssima complexidade e sustentação oral, buscando a garantia do direito e a reversão de decisões desfavoráveis.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Minha Seção de Chamada para Ação Final (Contato/Agendamento) --- */}
      <section id="contato" className="py-24 bg-amber-600 relative overflow-hidden text-neutral-950">
        {/* Aqui coloco uma textura sutil no fundo dourado */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-multiply pointer-events-none"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-serif font-bold mb-8"
            >
              A excelência é o único padrão que exijo.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl font-medium text-amber-950 mb-12"
            >
              Agende uma consultoria confidencial. Avaliarei seu cenário pessoalmente, com absoluto sigilo e rigor técnico.
            </motion.p>
            
            {/* Botão final que também leva ao WhatsApp DIRETAMENTE PARA O DOUTOR */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <a 
                href={`https://wa.me/558499702095?text=Olá, Dr. Adrianno. Gostaria de avaliar o meu cenário em uma consultoria confidencial.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-10 py-5 bg-neutral-950 text-white font-bold uppercase tracking-widest text-sm hover:bg-neutral-800 transition-colors shadow-2xl rounded-sm"
              >
                <MessageCircle className="mr-3 w-5 h-5 text-amber-500" />
                Falar Diretamente com Dr. Adrianno
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Meu Rodapé (Footer) --- */}
      <footer className="bg-neutral-950 pt-20 pb-10 border-t border-neutral-900">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Coluna 1: Sobre o profissional */}
            <div className="md:col-span-2">
              <div className="text-2xl font-serif font-bold tracking-wider text-white mb-6">
                MALDINI<span className="text-amber-500">.</span>
              </div>
              <p className="text-neutral-500 text-sm max-w-sm mb-6 leading-relaxed">
                Advogado criminalista focado exclusivamente em demandas de alta complexidade. Sócio fundador do Maldini Advogados. Proteção intransigente do seu patrimônio, da sua liberdade e da sua honra.
              </p>
              
              {/* Minhas Redes Sociais */}
              <div className="flex space-x-4">
                <a href={`https://www.instagram.com/adriannomaldini/`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-amber-500 hover:border-amber-500 transition-colors">
                  {/* Ícone SVG do Instagram para evitar problemas de importação */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                
              </div>
            </div>
            
            {/* Coluna 2: Meus Links */}
            <div>
              <h4 className="text-white font-serif mb-6 text-lg">Links Rápidos</h4>
              <ul className="space-y-3">
                {linksNavegacao.map((link) => (
                  <li key={link.nome}>
                    <a href={link.href} className="text-neutral-500 hover:text-amber-500 text-sm flex items-center transition-colors">
                      <ChevronRight size={14} className="mr-2" />
                      {link.nome}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Coluna 3: Meus Dados de Contato atualizados com Link para o MAPS */}
            <div>
              <h4 className="text-white font-serif mb-6 text-lg">Atendimento e Sede</h4>
              <ul className="space-y-4 text-sm text-neutral-500">
                <li className="flex items-center gap-2 text-amber-500 font-medium">
                  <Phone size={16} /> {meusDados.telefoneFormatado}
                </li>
                <li>{meusDados.email}</li>
                
                {/* O bloco do endereço foi convertido para um Botão que abre o Mapa */}
                <li>
                  <a 
                    href={meusDados.linkMaps} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group leading-relaxed flex items-start gap-2 hover:text-amber-500 transition-colors cursor-pointer"
                  >
                    <MapPin size={16} className="mt-1 shrink-0 text-neutral-600 group-hover:text-amber-500 transition-colors" />
                    <div>
                      Sede: {meusDados.escritorio}<br/>
                      {meusDados.endereco}<br/>
                      {meusDados.sala}<br/>
                      <span className="text-xs text-amber-600/70 group-hover:text-amber-500 font-medium mt-1 inline-flex items-center gap-1 uppercase tracking-wider">
                        Ver no mapa <ArrowRight size={12} />
                      </span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Base do Rodapé: Copyright e Créditos */}
          <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600">
            <p>&copy; {new Date().getFullYear()} {meusDados.nome}. Todos os direitos reservados.</p>
            
            {/* Créditos da uicode.site, conforme você solicitou */}
            <p className="mt-4 md:mt-0 flex items-center gap-1">
              Desenvolvido por <a href="https://uicode.site" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-amber-500 transition-colors font-medium">uicode.site</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}