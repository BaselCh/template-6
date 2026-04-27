import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Menu, 
  Search, 
  User, 
  ShoppingBag, 
  ArrowRight, 
  Wind, 
  Minimize2, 
  ThermometerSun, 
  Layers, 
  Camera, 
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Reveal = ({ children, delay = 0, className = "" }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.25, 1, 0.5, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AnnouncementBar = () => (
  <div className="bg-bg-dark text-accent text-[10px] sm:text-xs font-extralight tracking-[0.2em] py-3 text-center uppercase relative z-50">
    Frete grátis em toda a coleção.
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Coleção", href: "#" },
    { name: "Filosofia", href: "#" },
    { name: "Journal", href: "#" }
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 w-full z-[100] px-6 lg:px-12 py-6 flex items-center justify-between transition-all duration-500",
        isScrolled || isMenuOpen ? "bg-bg-primary/80 backdrop-blur-md translate-y-0 pt-4 pb-4 shadow-sm" : "bg-transparent translate-y-12"
      )}>
        {/* Left Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-extralight tracking-wide text-text-main">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="hover:opacity-50 transition-opacity duration-300">{link.name}</a>
          ))}
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-text-main relative z-[110]"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
        </button>

        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center h-full">
          <a href="#" className="flex items-center">
            <img 
              src="https://addsuite.com.br/wp-content/themes/addsuite-theme/assets/images/logos/logo.svg" 
              alt="Addsuite Logo" 
              className="h-6 md:h-8 brightness-0" 
            />
          </a>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6 text-text-main">
          <button className="hover:opacity-50 transition-opacity duration-300 hidden md:block">
            <Search className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button className="hover:opacity-50 transition-opacity duration-300 hidden md:block">
            <User className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button className="hover:opacity-50 transition-opacity duration-300 relative flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[10px] font-extralight">(0)</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <motion.div 
        initial={false}
        animate={isMenuOpen ? { x: 0, opacity: 1 } : { x: "-100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 bg-bg-primary z-[90] flex flex-col justify-center px-12 md:hidden"
      >
        <div className="flex flex-col gap-8 text-4xl font-light tracking-tight text-text-main">
          {navLinks.map((link, i) => (
            <motion.a 
              key={link.name}
              href={link.href}
              initial={{ x: -20, opacity: 0 }}
              animate={isMenuOpen ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="hover:italic transition-all"
            >
              {link.name}
            </motion.a>
          ))}
        </div>
        <div className="absolute bottom-12 left-12 flex gap-8">
          <Camera className="w-5 h-5 text-text-muted" />
          <Share2 className="w-5 h-5 text-text-muted" />
        </div>
      </motion.div>
    </>
  );
};

const Hero = () => (
  <section className="relative min-h-screen w-full flex flex-col lg:flex-row bg-bg-primary pt-24 lg:pt-0">
    {/* Left 40% Image */}
    <div className="w-full lg:w-[40%] h-[60vh] lg:h-screen relative noise-overlay overflow-hidden">
      <img 
        src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e41b2970-e159-428d-a954-89f6e98d69aa_1600w.jpg" 
        alt="Mulher em quietude" 
        className="grayscale-[20%] sepia-[10%] object-center animate-image-fade w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent lg:hidden"></div>
    </div>

    {/* Right 60% Content */}
    <div className="lg:w-[60%] flex flex-col lg:px-24 w-full z-10 pt-16 pr-8 pb-16 pl-8 relative justify-center">
      <Reveal>
        <span className="text-[10px] tracking-[0.4em] text-text-muted uppercase mb-12 block">A Coleção Essencial →</span>
      </Reveal>
      
      <h1 className="text-6xl lg:text-8xl font-light tracking-tighter text-text-main leading-[1.05] mb-12">
        <Reveal delay={0.1}><span className="block">Mova-se</span></Reveal>
        <Reveal delay={0.2}><span className="block text-accent">com</span></Reveal>
        <Reveal delay={0.3}><span className="block font-thin italic">propósito.</span></Reveal>
      </h1>
      
      <Reveal delay={0.4}>
        <div className="w-16 h-[1px] bg-accent mb-8"></div>
      </Reveal>
      
      <Reveal delay={0.5}>
        <p className="leading-relaxed text-base text-text-muted font-extralight max-w-sm mb-16">
          Não para chamar a atenção.<br />Mas para habitar seu próprio corpo.
        </p>
      </Reveal>
      
      <Reveal delay={0.6}>
        <button className="bg-bg-dark text-bg-primary px-10 py-5 rounded-full text-[10px] tracking-[0.2em] font-light hover:scale-[1.02] transition-transform duration-500 uppercase">
          Descobrir a peça
        </button>
      </Reveal>
    </div>

    {/* Floating Product Card */}
    <Reveal delay={0.7} className="hidden lg:flex absolute bottom-12 right-12">
      <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl items-center gap-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 flex">
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-bg-secondary">
          <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop" alt="O Body" className="w-full h-full object-cover" />
        </div>
        <div className="pr-4">
          <p className="text-sm font-light text-text-main mb-1">The Form Bodysuit</p>
          <a href="#" className="text-[10px] tracking-widest uppercase font-extralight text-text-muted border-b border-text-muted/30 pb-0.5 hover:text-text-main transition-colors">Compre Agora</a>
        </div>
      </div>
    </Reveal>
  </section>
);

const ProductSection = () => (
  <section className="bg-bg-secondary flex flex-col lg:flex-row w-full overflow-hidden">
    {/* Left Image */}
    <div className="w-full lg:w-1/2 h-[60vh] lg:min-h-screen overflow-hidden group">
      <img 
        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600&auto=format&fit=crop" 
        alt="The Form Bodysuit" 
        className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-[2s] ease-out"
      />
    </div>

    {/* Right Details */}
    <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-24 py-24">
      <Reveal>
        <span className="text-[10px] tracking-[0.4em] text-text-muted uppercase mb-8 block">01 — A Peça</span>
        <h2 className="text-5xl lg:text-7xl font-light tracking-tight text-text-main mb-4">The Form Bodysuit</h2>
        <p className="text-lg font-light text-text-muted mb-12">R$ 549</p>
        
        <div className="w-full h-[1px] bg-accent mb-12"></div>
        
        <p className="text-base font-extralight text-text-main leading-[1.9] mb-16 max-w-md">
          Conforto de segunda pele. Suporte estruturado. 
          Construído para se mover com você, não contra você. 
          Para os momentos em que você escolhe a si mesma.
        </p>

        {/* Color Selector */}
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.2em] uppercase font-extralight mb-5 text-text-muted">Cor — <span className="text-text-main font-light">Onyx</span></p>
          <div className="flex gap-4">
            <button className="w-8 h-8 rounded-full bg-bg-dark ring-1 ring-offset-4 ring-offset-bg-secondary ring-bg-dark transition-all"></button>
            <button className="w-8 h-8 rounded-full bg-bg-primary border border-accent hover:ring-1 hover:ring-offset-4 ring-offset-bg-secondary ring-accent transition-all"></button>
            <button className="w-8 h-8 rounded-full bg-[#8A8480] border border-transparent hover:ring-1 hover:ring-offset-4 ring-offset-bg-secondary ring-[#8A8480] transition-all"></button>
          </div>
        </div>

        {/* Size Selector */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-5">
            <p className="text-[10px] tracking-[0.2em] uppercase font-extralight text-text-muted">Tamanho</p>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {['PP', 'P', 'M', 'G', 'GG'].map((size) => (
              <button 
                key={size}
                className={cn(
                  "py-3 border border-accent text-xs font-light transition-colors rounded-sm",
                  size === 'M' ? "bg-bg-dark text-bg-primary border-bg-dark shadow-sm" : "text-text-main hover:border-text-main"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full bg-bg-dark text-bg-primary py-5 rounded-md text-[10px] tracking-[0.2em] font-light hover:bg-[#2A2A28] transition-colors duration-300 mb-6 uppercase">
          Adicionar à Bolsa
        </button>
        <p className="text-[10px] text-center font-extralight text-text-muted tracking-widest">ENVIO EM ATÉ 24 HORAS.</p>
      </Reveal>
    </div>
  </section>
);

const ProductSlider = () => {
  const products = [
    { name: "Flow Bra", price: "R$ 289", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop" },
    { name: "Zen Leggings", price: "R$ 429", img: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800&auto=format&fit=crop" },
    { name: "Breath Short", price: "R$ 249", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" },
    { name: "Essential Tee", price: "R$ 199", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop" },
  ];

  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % products.length);
  const prev = () => setIndex((prev) => (prev - 1 + products.length) % products.length);

  return (
    <section className="bg-bg-primary py-40 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-24">
          <Reveal>
            <span className="text-[10px] tracking-[0.4em] text-text-muted uppercase mb-6 block">Sugestões</span>
            <h2 className="text-4xl lg:text-6xl font-light tracking-tight text-text-main">Complete o Ritual</h2>
          </Reveal>
          <div className="flex gap-4">
            <button onClick={prev} className="w-12 h-12 rounded-full border border-accent flex items-center justify-center hover:bg-bg-dark hover:text-bg-primary transition-all duration-500">
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button onClick={next} className="w-12 h-12 rounded-full border border-accent flex items-center justify-center hover:bg-bg-dark hover:text-bg-primary transition-all duration-500">
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-bg-secondary mb-6 relative">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                  <button className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md py-4 rounded-lg text-[10px] tracking-[0.2em] uppercase font-light opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    Comprar
                  </button>
                </div>
                <h3 className="text-sm font-light text-text-main mb-1">{p.name}</h3>
                <p className="text-xs font-extralight text-text-muted">{p.price}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => (
  <section className="bg-bg-dark py-48 px-6 flex flex-col items-center justify-center text-center">
    <div className="max-w-3xl w-full">
      <Reveal>
        <span className="text-[10px] tracking-[0.4em] text-accent uppercase mb-16 block font-extralight">Por que existimos</span>
      </Reveal>
      
      <Reveal delay={0.2}>
        <h2 className="text-5xl lg:text-8xl font-light tracking-tight text-bg-primary leading-[1.15] mb-16 uppercase">
          addsuite nasceu<br />para lembrar.
        </h2>
      </Reveal>
      
      <Reveal delay={0.4}>
        <p className="text-base lg:text-lg font-extralight text-[#8A8480] leading-[2.2] max-w-lg mx-auto">
          Não para seguir tendências.<br />
          Para o inmarcesível:<br />
          aquilo que não murcha com o tempo,<br />
          com a opinião, nem com o ruído do mundo.
        </p>
      </Reveal>
    </div>
  </section>
);

const Features = () => {
  const features = [
    { icon: Wind, title: "Tecido Respirável", desc: "Micro-perfurações que liberam o calor naturalmente." },
    { icon: Minimize2, title: "Núcleo Compressivo", desc: "Um abraço suave que sustenta sem restringir sua prática." },
    { icon: ThermometerSun, title: "Gestão Térmica", desc: "Adapta-se à sua temperatura corporal durante o movimento." },
    { icon: Layers, title: "Sem Costuras", desc: "Sem metais, sem pressão constante, zero distrações." },
  ];

  return (
    <section className="bg-bg-primary py-40 px-6 lg:px-12 border-b border-bg-secondary">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <h3 className="text-[10px] tracking-[0.4em] uppercase font-extralight text-center mb-24 text-text-muted">A Arquitetura do Conforto</h3>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-[#E8E3DA] p-10 rounded-xl hover:-translate-y-1 transition-transform duration-500 shadow-sm group">
                <f.icon className="w-6 h-6 mb-8 text-text-main group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                <h4 className="text-xl font-light tracking-tight text-text-main mb-4">{f.title}</h4>
                <p className="text-sm font-extralight text-text-muted leading-[1.8]">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Mariana S.", role: "Instrutora de Yoga", text: "Nunca senti algo tão leve e ao mesmo tempo tão seguro. É como se a roupa não existisse durante a prática." },
    { name: "Beatriz L.", role: "Arquiteta", text: "A estética minimalista combina perfeitamente com meu estilo de vida. O conforto é apenas um bônus incrível." },
    { name: "Clara M.", role: "Atleta Amadora", text: "A gestão térmica é real. Sinto que meu corpo respira muito melhor em treinos intensos." },
  ];

  return (
    <section className="bg-bg-dark py-40 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <span className="text-[10px] tracking-[0.4em] text-accent uppercase mb-20 block text-center">Vozes da Comunidade</span>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 0.2}>
              <div className="flex flex-col h-full">
                <MessageCircle className="w-8 h-8 text-accent mb-8" strokeWidth={1} />
                <p className="text-bg-primary text-lg font-extralight italic leading-relaxed mb-10 flex-grow">"{r.text}"</p>
                <div>
                  <p className="text-bg-primary text-sm font-light mb-1">{r.name}</p>
                  <p className="text-text-muted text-[10px] tracking-widest uppercase">{r.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const SensoryStory = () => (
  <section className="bg-bg-primary w-full overflow-hidden">
    {/* Row 1 */}
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen lg:min-h-0">
      <div className="flex flex-col justify-center px-8 lg:px-24 py-24 order-2 lg:order-1 bg-bg-secondary">
        <Reveal>
          <h3 className="text-4xl lg:text-6xl font-light tracking-tight text-text-main mb-3 leading-tight">O movimento não<br />é uma métrica.</h3>
          <h3 className="text-4xl lg:text-6xl font-light tracking-tight text-text-muted mb-10 pl-12">É um ritual.</h3>
          <p className="text-base font-extralight text-text-main leading-[1.9] max-w-md">
            Eliminamos o ruído das roupas esportivas tradicionais para focar no que importa: a sensação do tecido contra sua pele, a liberdade de uma respiração profunda e o poder silencioso de mover-se com intenção.
          </p>
        </Reveal>
      </div>
      <div className="order-1 lg:order-2 h-[50vh] lg:h-auto relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop" alt="Ritual de Yoga" className="w-full h-full object-cover grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-[2s]" />
      </div>
    </div>
    
    {/* Row 2 */}
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen lg:min-h-0">
      <div className="h-[50vh] lg:h-auto relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=1600&auto=format&fit=crop" alt="Detalhes do tecido" className="w-full h-full object-cover opacity-90 mix-blend-multiply hover:scale-105 transition-transform duration-[2s]" />
      </div>
      <div className="flex flex-col justify-center px-8 lg:px-24 py-24 bg-bg-primary">
        <Reveal>
          <h3 className="text-4xl lg:text-6xl font-light tracking-tight text-text-main mb-10 leading-[1.15]">
            Força em silêncio.<br />Elegância sem esforço.
          </h3>
          <p className="text-base font-extralight text-text-main leading-[1.9] max-w-md">
            Cada peça é disciplina. Presença. Respeito próprio. Não é roupa desenhada para o olhar alheio — é vestuário criado para habitar seu corpo de forma consciente.
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);

const NewsSection = () => {
  const posts = [
    { title: "A Ciência do Conforto: O que há por trás de nossas fibras", date: "24 Abr, 2024", img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop" },
    { title: "Encontrando Stillness em um mundo barulhento", date: "18 Abr, 2024", img: "https://images.unsplash.com/photo-1534126416832-a88fdf2911c2?q=80&w=800&auto=format&fit=crop" },
    { title: "Minimalismo como ferramenta de liberdade", date: "12 Abr, 2024", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop" },
  ];

  return (
    <section className="bg-bg-primary py-40 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex justify-between items-center mb-24">
            <h2 className="text-4xl lg:text-6xl font-light tracking-tight text-text-main">Journal</h2>
            <a href="#" className="text-[10px] tracking-[0.2em] uppercase font-extralight border-b border-accent pb-2 hover:text-accent transition-colors">Ver todos</a>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {posts.map((post, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="group cursor-pointer">
                <div className="aspect-video overflow-hidden rounded-lg mb-8 relative">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-text-muted mb-4">{post.date}</p>
                <h3 className="text-xl font-light text-text-main leading-snug group-hover:italic transition-all">{post.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const EditorialGrid = () => {
  const images = [
    { src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop", class: "" },
    { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop", class: "aspect-square" },
    { src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop", class: "aspect-[3/4]" },
    { src: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=800&auto=format&fit=crop", class: "hidden md:block" },
  ];

  return (
    <section className="bg-text-main py-32 px-6 lg:px-12 overflow-hidden">
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 max-w-[1400px] mx-auto space-y-6">
        {images.map((img, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="relative group overflow-hidden rounded-lg break-inside-avoid cursor-none">
              <motion.img 
                whileHover={{ scale: 1.05, filter: "grayscale(0%)" }}
                transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                src={img.src} 
                className={cn("w-full object-cover grayscale transition-all duration-700", img.class)} 
                alt={`Editorial ${i}`} 
              />
              <div className="absolute inset-0 bg-accent/20 mix-blend-multiply opacity-40 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"></div>
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-700 m-4 rounded-md pointer-events-none"></div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const Manifesto = () => (
  <section className="bg-bg-primary py-48 px-6 flex flex-col items-center text-center">
    <Reveal>
      <span className="text-[10px] tracking-[0.5em] text-text-main mb-20 block font-medium uppercase">addsuite</span>
    </Reveal>
    
    <Reveal delay={0.2}>
      <p className="text-3xl lg:text-5xl font-light tracking-tight text-text-main leading-[1.6] max-w-2xl mb-24">
        addsuite foi criada para a mulher que entendeu que seu valor não depende do mundo externo.<br /><br />
        Para quem deixou de se comparar.<br />
        Para quem cumpre sua palavra.<br />
        Para quem escolhe viver com propósito.
      </p>
    </Reveal>
    
    <Reveal delay={0.4}>
      <p className="text-xs tracking-[0.3em] text-text-muted font-extralight uppercase">
        O que é verdadeiro em você... não murcha.
      </p>
    </Reveal>
  </section>
);

const FinalCTA = () => (
  <section className="bg-bg-dark min-h-[80vh] flex flex-col justify-center items-center px-6 relative overflow-hidden">
    <Reveal>
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-5xl lg:text-8xl font-light tracking-tight text-bg-primary mb-16 text-center leading-tight">
          Comece seu movimento.
        </h2>
        
        <button className="border border-accent text-accent px-12 py-6 rounded-full text-[10px] tracking-[0.3em] font-light hover:bg-accent hover:text-bg-dark transition-all duration-500 uppercase flex items-center gap-4 group">
          Descobrir a peça
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
        </button>
      </div>
    </Reveal>
    
    {/* Decorative background element */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,_rgba(200,191,178,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
  </section>
);

const Footer = () => (
  <footer className="bg-bg-dark border-t border-white/5 pt-24 pb-12 px-6 lg:px-12 text-text-muted text-sm font-extralight tracking-wide">
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center mb-24">
      
      {/* Left: Links */}
      <div className="flex gap-10 justify-center md:justify-start uppercase text-[10px] tracking-[0.2em]">
        <a href="#" className="hover:text-bg-primary transition-colors">Shop</a>
        <a href="#" className="hover:text-bg-primary transition-colors">Filosofia</a>
        <a href="#" className="hover:text-bg-primary transition-colors">Contato</a>
      </div>

      {/* Center: Logo */}
      <div className="flex items-center justify-center h-12">
        <img 
          src="https://addsuite.com.br/wp-content/themes/addsuite-theme/assets/images/logos/logo.svg" 
          alt="Addsuite Logo" 
          className="h-full brightness-0 invert opacity-80" 
        />
      </div>

      {/* Right: Socials */}
      <div className="flex gap-8 justify-center md:justify-end">
        <a href="#" className="hover:text-bg-primary transition-colors">
          <Camera className="w-5 h-5" strokeWidth={1.5} />
        </a>
        <a href="#" className="hover:text-bg-primary transition-colors">
          <Share2 className="w-5 h-5" strokeWidth={1.5} />
        </a>
      </div>
    </div>
    
    <div className="flex flex-col md:flex-row justify-between items-center gap-12">
      <div className="text-[10px] tracking-widest text-text-muted/40 uppercase">
        © 2025 addsuite. Feito com intenção.
      </div>
      
      {/* Payment Icons */}
      <div className="flex gap-6 items-center opacity-30 grayscale brightness-150">
        <img src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/master/mono/visa.svg" className="h-4" alt="Visa" />
        <img src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/master/mono/mastercard.svg" className="h-6" alt="Mastercard" />
        <img src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/master/mono/amex.svg" className="h-6" alt="Amex" />
        <img src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/master/mono/discover.svg" className="h-6" alt="Discover" />
        <div className="w-[1px] h-4 bg-text-muted/30"></div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_Pix_Brasil.png" className="h-4 grayscale" alt="Pix" />
      </div>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="bg-bg-primary selection:bg-accent selection:text-bg-dark overflow-x-hidden font-inter">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <ProductSection />
      <Philosophy />
      <Features />
      <ProductSlider />
      <Testimonials />
      <SensoryStory />
      <EditorialGrid />
      <NewsSection />
      <Manifesto />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default App;
