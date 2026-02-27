import React from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  MessageCircle, 
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  Calendar,
  User,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const WHATSAPP_LINK = "https://wa.me/51951160323";

const ConsultationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    name: '',
    service: '',
    message: ''
  });

  const services = [
    "Gestión de Patrimonio",
    "Banca Privada",
    "Planificación Sucesoria",
    "Inversiones Internacionales"
  ];

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = () => {
    const text = `Hola, mi nombre es ${formData.name}. Estoy interesado en el servicio de ${formData.service}. ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`${WHATSAPP_LINK}?text=${encodedText}`, '_blank');
    onClose();
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gold-accent/10 rounded-full flex items-center justify-center text-gold-dark">
                <Calendar size={20} />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900">Agendar Consulta</h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Paso {step} de 3</p>
              </div>
            </div>

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <User size={16} className="text-gold-dark" /> ¿Cómo podemos llamarle?
                  </label>
                  <input 
                    type="text"
                    placeholder="Su nombre completo"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <button 
                  disabled={!formData.name}
                  onClick={handleNext}
                  className="w-full bg-gold-accent hover:bg-gold-dark disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                >
                  Continuar <ArrowRight size={18} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-4 flex items-center gap-2">
                    <Briefcase size={16} className="text-gold-dark" /> Servicio de Interés
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {services.map((s) => (
                      <button
                        key={s}
                        onClick={() => setFormData({ ...formData, service: s })}
                        className={`text-left px-4 py-3 rounded-lg border transition-all ${
                          formData.service === s 
                            ? 'border-gold-accent bg-gold-accent/5 text-gold-dark font-medium' 
                            : 'border-slate-100 hover:border-slate-200 text-slate-600'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={handleBack}
                    className="flex-1 border border-slate-200 text-slate-600 py-4 rounded-lg font-medium hover:bg-slate-50 transition-all"
                  >
                    Atrás
                  </button>
                  <button 
                    disabled={!formData.service}
                    onClick={handleNext}
                    className="flex-[2] bg-gold-accent hover:bg-gold-dark disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                  >
                    Siguiente <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    ¿Desea agregar algún detalle adicional? (Opcional)
                  </label>
                  <textarea 
                    placeholder="Cuéntenos brevemente su consulta..."
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none transition-all h-32 resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={handleBack}
                    className="flex-1 border border-slate-200 text-slate-600 py-4 rounded-lg font-medium hover:bg-slate-50 transition-all"
                  >
                    Atrás
                  </button>
                  <button 
                    onClick={handleSubmit}
                    className="flex-[2] bg-gold-accent hover:bg-gold-dark text-white py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                  >
                    Confirmar en WhatsApp <CheckCircle2 size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <div className={`relative ${className} flex items-center justify-center`}>
    <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f9e49f" />
          <stop offset="25%" stopColor="#e1b35e" />
          <stop offset="50%" stopColor="#c5a059" />
          <stop offset="75%" stopColor="#a67c37" />
          <stop offset="100%" stopColor="#7a5a26" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <g filter="url(#glow)">
        <path d="M12 13.5L10.5 12L12 10.5L13.5 12L12 13.5Z" fill="url(#goldGradient)" />
        <path d="M12 0L16.5 4.5L12 9L7.5 4.5L12 0Z" fill="url(#goldGradient)" />
        <path d="M12 24L7.5 19.5L12 15L16.5 19.5L12 24Z" fill="url(#goldGradient)" />
        <path d="M24 12L19.5 16.5L15 12L19.5 7.5L24 12Z" fill="url(#goldGradient)" />
        <path d="M0 12L4.5 7.5L9 12L4.5 16.5L0 12Z" fill="url(#goldGradient)" />
      </g>
    </svg>
  </div>
);

const Navbar = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gold-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <Logo />
            <div>
              <span className="text-2xl font-serif font-semibold tracking-tight text-slate-900">GroupOne Bank</span>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold-dark font-medium -mt-1">Banca Privada y Gestión de Patrimonio</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#servicios" className="text-sm font-medium text-slate-600 hover:text-gold-accent transition-colors">Servicios</a>
            <a href="#nosotros" className="text-sm font-medium text-slate-600 hover:text-gold-accent transition-colors">Nosotros</a>
            <a href="#estrategias" className="text-sm font-medium text-slate-600 hover:text-gold-accent transition-colors">Productos</a>
            <button 
              onClick={onOpenModal}
              className="bg-gold-accent hover:bg-gold-dark text-white px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2"
            >
              <Calendar size={16} />
              Agendar Consulta
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gold-accent/10 px-4 py-6 space-y-4">
          <a href="#servicios" className="block text-lg font-serif text-slate-900">Servicios</a>
          <a href="#nosotros" className="block text-lg font-serif text-slate-900">Nosotros</a>
          <a href="#estrategias" className="block text-lg font-serif text-slate-900">Productos</a>
          <button 
            onClick={() => {
              onOpenModal();
              setIsOpen(false);
            }}
            className="w-full bg-gold-accent text-white px-6 py-3 rounded-full text-center font-medium flex items-center justify-center gap-2"
          >
            <Calendar size={20} />
            Agendar Consulta
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <section className="relative h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1920" 
          alt="Skyline de Lima" 
          className="w-full h-full object-cover brightness-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl text-white mb-6 leading-tight">
            Asesores Expertos en <br />
            <span className="italic">Gestión de Patrimonio</span> en Perú
          </h1>
          <p className="text-xl text-white/80 mb-10 font-light leading-relaxed">
            Proteja y haga crecer su legado con estrategias financieras diseñadas exclusivamente para sus necesidades y objetivos a largo plazo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onOpenModal}
              className="bg-gold-accent hover:bg-gold-dark text-white px-8 py-4 rounded-sm text-lg font-medium transition-all text-center"
            >
              Agendar Consulta
            </button>
            <p className="text-white/50 text-xs self-center sm:self-end mt-2 sm:mt-0 italic">
              Una entidad bancaria regulada por la SBS
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <ShieldCheck className="text-gold-accent" size={40} />,
      title: "Protección de Activos",
      desc: "Asegure y proteja su riqueza con estrategias robustas y personalizadas de gestión de riesgos.",
    },
    {
      icon: <TrendingUp className="text-gold-accent" size={40} />,
      title: "Inteligencia Macroeconómica",
      desc: "Navegue los mercados globales con nuestra investigación e insights impulsados por datos de mercado.",
    },
    {
      icon: <Users className="text-gold-accent" size={40} />,
      title: "Relationship Manager Personal",
      desc: "Acceda a un asesor dedicado que entiende sus objetivos financieros y le brinda soluciones exclusivas y atención prioritaria.",
    }
  ];

  return (
    <section id="servicios" className="py-24 bg-gold-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="text-center group"
            >
              <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>
              <h3 className="text-2xl mb-4 text-slate-900">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {f.desc}
              </p>
              <a href="#" className="inline-flex items-center text-gold-dark font-medium hover:gap-2 transition-all">
                Saber más <ChevronRight size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "Gestión de Patrimonio",
      desc: "Estrategias de inversión y diversificación de portafolio.",
      img: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Banca Privada",
      desc: "Soluciones financieras y de crédito personalizadas.",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Planificación Sucesoria",
      desc: "Planificación de herencia y preservación de riqueza.",
      img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="estrategias" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-slate-900 mb-4">Estrategias a Medida para Individuos de Alto Patrimonio</h2>
          <div className="w-24 h-1 bg-gold-accent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white border border-slate-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={s.img} 
                  alt={s.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <h4 className="text-2xl mb-2 text-slate-900">{s.title}</h4>
                <p className="text-slate-500 mb-6 text-sm">{s.desc}</p>
                <a href="#" className="text-gold-dark font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  Explorar <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <section id="contacto" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1920" 
          alt="Asesora financiera" 
          className="w-full h-full object-cover brightness-[0.3]"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl text-white mb-6">¿Listo para Preservar y Aumentar su Riqueza?</h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto font-light">
            Conversemos sobre cómo podemos ayudarle a asegurar su futuro financiero y el de las próximas generaciones.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={onOpenModal}
              className="bg-gold-accent hover:bg-gold-dark text-white px-10 py-4 rounded-sm text-lg font-medium transition-all"
            >
              Agendar una Consulta
            </button>
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white hover:bg-white hover:text-slate-900 text-white px-10 py-4 rounded-sm text-lg font-medium transition-all"
            >
              Contáctenos
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AboutUs = () => {
  return (
    <section id="nosotros" className="py-24 bg-gold-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl text-slate-900 mb-8">Nuestra Historia y Compromiso</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              En GroupOne Bank, entendemos que la riqueza es más que solo números; es el fruto de años de esfuerzo, visión y dedicación. Fundada con la misión de proporcionar un refugio seguro y estratégico para el capital de las familias más influyentes de la región, nuestra institución se ha consolidado como un referente de confianza y excelencia en el sector financiero.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              Nuestra filosofía se basa en la personalización absoluta. No creemos en soluciones genéricas. Cada cliente es único, y por ello, asignamos un equipo multidisciplinario de expertos para diseñar estrategias que no solo preserven su patrimonio, sino que lo proyecten hacia el futuro, asegurando el bienestar de las generaciones venideras.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-serif text-gold-dark mb-2">25+</h4>
                <p className="text-slate-500 text-sm uppercase tracking-wider">Años de Experiencia</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-gold-dark mb-2">B+</h4>
                <p className="text-slate-500 text-sm uppercase tracking-wider">Activos Bajo Gestión</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800" 
                alt="Nuestra oficina" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-8 shadow-xl rounded-sm hidden lg:block border border-gold-accent/10">
              <p className="text-gold-dark font-serif italic text-lg">"Excelencia en cada detalle, <br />discreción en cada paso."</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Testimonial = () => {
  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-6xl font-serif text-gold-accent opacity-50 block mb-4">“</span>
          <p className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-8">
            GroupOne Bank ha sido fundamental para brindar el asesoramiento financiero estratégico que ha asegurado la riqueza de nuestra familia durante generaciones. Su experiencia en gestión de patrimonio es inigualable.
          </p>
          <div className="flex flex-col items-center">
            <div className="w-12 h-0.5 bg-gold-accent mb-4"></div>
            <p className="text-gold-accent font-medium tracking-widest uppercase text-sm">Isabella M.</p>
            <p className="text-white/40 text-xs mt-1">Cliente de Largo Plazo</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid md:grid-cols-4 gap-12 border-t border-slate-100 pt-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Logo className="w-8 h-8" />
              <span className="text-xl font-serif font-semibold tracking-tight text-slate-900">GroupOne Bank</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              Soluciones exclusivas de banca privada y gestión de patrimonio para individuos y familias que buscan excelencia y discreción.
            </p>
          </div>
          
          <div>
            <h5 className="font-serif font-bold text-slate-900 mb-6">Enlaces</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-gold-accent transition-colors">Servicios</a></li>
              <li><a href="#" className="hover:text-gold-accent transition-colors">Productos</a></li>
              <li><a href="#" className="hover:text-gold-accent transition-colors">Investigación</a></li>
              <li><a href="#" className="hover:text-gold-accent transition-colors">Privacidad</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif font-bold text-slate-900 mb-6">Contacto</h5>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>Lima, Perú</li>
              <li>+51 1 234 5678</li>
              <li>info@grouponebank.pe</li>
              <li>
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gold-dark font-medium hover:text-gold-accent transition-colors"
                >
                  <MessageCircle size={16} />
                  WhatsApp Directo
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} GroupOne Bank. Todos los derechos reservados.
          </p>
          <p className="text-slate-400 text-[10px] uppercase tracking-widest">
            Regulado por la Superintendencia de Banca, Seguros y AFP (SBS)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);

  return (
    <div className="min-h-screen selection:bg-gold-accent/30">
      <Navbar onOpenModal={openModal} />
      <main>
        <Hero onOpenModal={openModal} />
        <Features />
        <ServicesSection />
        <CTASection onOpenModal={openModal} />
        <AboutUs />
        <Testimonial />
      </main>
      <Footer />
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
