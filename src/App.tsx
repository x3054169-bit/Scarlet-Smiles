import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Star, 
  Menu, 
  X, 
  CheckCircle2, 
  Stethoscope, 
  ShieldCheck, 
  Users, 
  Sparkles,
  ArrowRight,
  Instagram,
  Facebook
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Icons ---

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    width={size} 
    height={size} 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// --- Components ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border border-brand-600 rounded-full pointer-events-none z-[9999] hidden md:block"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isPointer ? 1.5 : 1,
        backgroundColor: isPointer ? 'rgba(0, 102, 255, 0.1)' : 'transparent',
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
    />
  );
};

const BackgroundPattern = () => (
  <div className="fixed inset-0 -z-50 pointer-events-none opacity-[0.03]">
    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#0066FF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
  </div>
);

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(currentProgress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none">
      <div 
        className="h-full bg-brand-600 transition-all duration-150" 
        style={{ width: `${progress}%` }} 
      />
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 py-6",
      isScrolled ? "bg-white/70 backdrop-blur-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] py-4 border-b border-slate-100" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#home" className="flex flex-col group">
          <span className="text-2xl sm:text-3xl font-serif font-black tracking-tighter text-slate-900 leading-none group-hover:text-brand-600 transition-colors">Scarlet</span>
          <span className="text-[10px] font-bold text-brand-500 tracking-[0.3em] uppercase mt-1">Smiles</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-brand-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="bg-brand-900 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-700 transition-all shadow-xl shadow-brand-900/20"
          >
            Book Now
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-slate-900 p-2 -mr-2 rounded-xl hover:bg-slate-50 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 flex flex-col space-y-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-bold text-slate-900 py-3 border-b border-slate-50 last:border-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-brand-600 text-white px-6 py-4 rounded-2xl text-center font-bold text-lg shadow-lg shadow-brand-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Appointment
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden atmos-bg">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-brand-200/20 rounded-full blur-[120px] -mr-96 -mt-96 animate-pulse" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-brand-100/30 rounded-full blur-[100px] -ml-64 -mb-64" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center space-x-3 bg-white/50 backdrop-blur-md border border-white/50 text-brand-700 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-10 shadow-sm">
            <Sparkles size={14} className="text-brand-500" />
            <span>Excellence in Dental Care</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-[90px] lg:text-[110px] font-serif font-black text-slate-900 leading-[0.95] mb-10 tracking-[-0.04em]">
            Advanced, Painless <br />
            <span className="text-gradient italic font-normal">Dental Care</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-14 max-w-lg leading-relaxed font-medium opacity-80">
            Trusted 5-star dental clinic in Jaipur for comfortable and precise treatments. Modern techniques for a healthier smile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a 
              href="#contact" 
              className="w-full sm:w-auto bg-brand-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-700 transition-all shadow-2xl shadow-brand-200/50 flex items-center justify-center group"
            >
              Book Appointment
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            <a 
              href="tel:+919680341731" 
              className="w-full sm:w-auto glass px-10 py-5 rounded-full font-bold text-lg text-slate-900 hover:bg-white/80 transition-all flex items-center justify-center"
            >
              <Phone className="mr-2 text-brand-600" size={20} />
              Call Now
            </a>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex items-center space-x-6"
          >
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                  <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="Patient" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div>
              <div className="flex text-amber-400 mb-1">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">5.0 Rating • 64+ Reviews</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1074&auto=format&fit=crop" 
              alt="Modern Dental Clinic" 
              className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Floating Glass Card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute -bottom-10 -left-10 glass p-8 rounded-[32px] z-20 max-w-[280px] hidden sm:block"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-brand-500 p-3 rounded-2xl text-white shadow-lg shadow-brand-500/30">
                <ShieldCheck size={24} />
              </div>
              <span className="font-bold text-slate-900 leading-tight">100% Safe & <br />Hygienic</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              We follow global sterilization protocols for your complete safety.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  const highlights = [
    { icon: <ShieldCheck size={20} />, text: "Clean & Hygienic Clinic" },
    { icon: <Stethoscope size={20} />, text: "Modern Equipment" },
    { icon: <Users size={20} />, text: "Patient Comfort Focused" },
    { icon: <Sparkles size={20} />, text: "Transparent & Affordable" },
  ];

  return (
    <section id="about" className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 lg:order-1"
        >
          <span className="text-brand-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-8 block">Our Heritage</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-black text-slate-900 mb-10 leading-[0.9] tracking-[-0.03em]">
            Modern Care for <br />
            <span className="italic font-normal text-brand-600">Healthy Smiles</span>
          </h2>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed font-medium opacity-80">
            Scarlet Smiles brings a fresh approach to dental health in Jaipur. Led by <span className="text-slate-900 font-bold">Dr. Purvi Bhargava</span>, our clinic is built on the pillars of painless treatments, conservative dentistry, and state-of-the-art technology.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-14">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-4 glass p-5 rounded-3xl border-white/40">
                <div className="text-brand-600 bg-brand-500/10 p-3 rounded-2xl">
                  {item.icon}
                </div>
                <span className="font-bold text-slate-800 text-sm tracking-tight">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-12">
            <div className="flex flex-col">
              <span className="text-5xl font-serif font-black text-slate-900 mb-1">10<span className="text-brand-600">+</span></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Years of Mastery</span>
            </div>
            <div className="w-px h-16 bg-slate-200" />
            <div className="flex flex-col">
              <span className="text-5xl font-serif font-black text-slate-900 mb-1">5k<span className="text-brand-600">+</span></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Success Stories</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-1 lg:order-2"
        >
          <div className="aspect-square rounded-[80px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=2069&auto=format&fit=crop" 
              alt="Clinic Interior" 
              className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-200/30 rounded-full -z-10 blur-[100px]" />
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Root Canal Alternatives",
      description: "Conservative approach to saving your natural teeth with advanced techniques.",
      icon: <Stethoscope className="w-8 h-8" />,
      className: "md:col-span-2 md:row-span-2 bg-brand-900 text-white",
    },
    {
      title: "Teeth Cleaning",
      description: "Professional scaling and polishing for a healthy, vibrant smile.",
      icon: <Sparkles className="w-8 h-8" />,
      className: "bg-white",
    },
    {
      title: "Dental Fillings",
      description: "Precise and painless fillings using high-quality composite materials.",
      icon: <ShieldCheck className="w-8 h-8" />,
      className: "bg-white",
    },
    {
      title: "Preventive Dentistry",
      description: "Comprehensive checkups and care to prevent future dental issues.",
      icon: <CheckCircle2 className="w-8 h-8" />,
      className: "bg-white",
    },
    {
      title: "Laser Treatments",
      description: "Advanced laser-assisted procedures for precise and faster healing.",
      icon: <Users className="w-8 h-8" />,
      className: "md:col-span-2 bg-brand-50",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="services" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-brand-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Our Expertise</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-black text-slate-900 tracking-[-0.03em] leading-[0.9]">
              Comprehensive <br />
              <span className="italic font-normal text-brand-600">Dental Solutions</span>
            </h2>
          </div>
          <p className="text-xl text-slate-500 max-w-sm leading-relaxed font-medium">
            We blend artistry with clinical excellence to craft your perfect smile.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[240px]"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={cn(
                "p-10 rounded-[40px] border border-slate-100 flex flex-col justify-between group transition-all duration-500",
                service.className,
                service.className?.includes('bg-brand-900') ? "card-shadow-hover" : "card-shadow"
              )}
            >
              <div>
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110",
                  service.className?.includes('bg-brand-900') ? "bg-white/10 text-white" : "bg-brand-50 text-brand-600"
                )}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{service.title}</h3>
                <p className={cn(
                  "leading-relaxed font-medium opacity-70",
                  service.className?.includes('bg-brand-900') ? "text-brand-100" : "text-slate-600"
                )}>
                  {service.description}
                </p>
              </div>
              <a 
                href="#contact" 
                className={cn(
                  "inline-flex items-center font-bold text-sm mt-8 group-hover:gap-2 transition-all",
                  service.className?.includes('bg-brand-900') ? "text-brand-400" : "text-brand-600"
                )}
              >
                Learn More <ChevronRight size={16} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const features = [
    { title: "Painless procedures", desc: "Advanced techniques for maximum patient comfort." },
    { title: "Advanced Equipment", desc: "State-of-the-art diagnostic and treatment tools." },
    { title: "Conservative Focus", desc: "Emphasis on saving natural teeth whenever possible." },
    { title: "Calming Environment", desc: "A clean, welcoming atmosphere designed for relaxation." },
  ];

  return (
    <section className="section-padding bg-[#0A0C10] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-600/10 rounded-full blur-[150px] -mr-96 -mt-96" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-400/5 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-brand-400 font-bold uppercase tracking-[0.4em] text-[10px] mb-10 block">Why Scarlet Smiles</span>
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-serif font-black mb-16 leading-[0.85] tracking-[-0.04em]">
            Painless <br />
            <span className="text-brand-400 italic font-normal">Precision</span>
          </h2>
          <div className="grid gap-12">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-8 group">
                <div className="bg-white/5 border border-white/10 p-4 rounded-[24px] group-hover:bg-brand-500/20 group-hover:border-brand-500/30 transition-all duration-500">
                  <CheckCircle2 className="text-brand-400" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed font-medium opacity-80">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="aspect-[3/4] rounded-[60px] overflow-hidden shadow-2xl border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=1470&auto=format&fit=crop" 
              alt="Advanced Dental Tech" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-brand-900/20 rounded-[60px]" />
        </motion.div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const testimonials = [
    {
      text: "Smooth and almost painless treatment with clear explanation. Dr. Purvi handles everything efficiently.",
      author: "Sneha Gupta",
      role: "Patient",
      rating: 5
    },
    {
      text: "Modern equipment and very clean clinic with professional care. Highly recommend for any dental issues.",
      author: "Vikram Singh",
      role: "Patient",
      rating: 5
    },
    {
      text: "Doctor handled treatment efficiently and avoided unnecessary procedures. Very transparent and honest.",
      author: "Ananya Sharma",
      role: "Patient",
      rating: 5
    }
  ];

  return (
    <section id="reviews" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-50/30 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-brand-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Patient Stories</span>
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-serif font-black text-slate-900 mb-10 tracking-[-0.04em] leading-none">
            Trusted by <br />
            <span className="italic font-normal text-brand-600">The Community</span>
          </h2>
          <div className="flex items-center space-x-6 glass px-8 py-4 rounded-full border-slate-100 shadow-sm">
            <div className="flex text-amber-400">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <div className="w-px h-6 bg-slate-200" />
            <span className="text-2xl font-serif font-black text-slate-900">4.9</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Standard</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-slate-50/50 backdrop-blur-sm p-12 rounded-[48px] border border-white flex flex-col hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] transition-all duration-700 group"
            >
              <div className="mb-10">
                <div className="flex text-brand-400 mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-xl md:text-2xl text-slate-800 font-serif italic leading-relaxed">
                  "{item.text}"
                </p>
              </div>
              
              <div className="mt-auto flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600 font-black text-xl shadow-inner">
                  {item.author[0]}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 tracking-tight">{item.author}</h4>
                  <p className="text-[10px] font-bold text-brand-600 uppercase tracking-widest">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-100/20 rounded-full blur-[120px] -mr-64 -mt-64" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-brand-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Patient Concierge</span>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-serif font-black text-slate-900 mb-12 leading-[0.85] tracking-[-0.04em]">
              Start Your <br />
              <span className="italic font-normal text-brand-600">Smile Journey</span>
            </h2>
            
            <div className="grid gap-12 mb-16">
              <div className="flex items-start space-x-8 group">
                <div className="bg-white p-5 rounded-[28px] text-brand-600 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">The Clinic</h3>
                  <p className="text-slate-500 text-lg leading-relaxed font-medium opacity-80">
                    A-35, Nu-Lite Colony, Bajaj Nagar Lane near Kanha Restaurant, <br />
                    Tonk Road, Bhaskar Flyover, Jaipur, Rajasthan 302018
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-8 group">
                <div className="bg-white p-5 rounded-[28px] text-brand-600 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <Phone size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Booking Desk</h3>
                  <a href="tel:+919680341731" className="text-slate-500 text-xl hover:text-brand-600 transition-colors font-bold">
                    +91 96803 41731
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-8 group">
                <div className="bg-white p-5 rounded-[28px] text-brand-600 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <Clock size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Consultation Hours</h3>
                  <p className="text-slate-500 text-lg font-bold uppercase tracking-tight">Mon – Sat: 10:30 AM – 7:30 PM</p>
                  <p className="text-slate-500 text-lg font-bold uppercase tracking-tight">Sun: 10:30 AM – 7:30 PM (Wed Closed)</p>
                  <p className="text-slate-400 text-sm font-medium italic mt-2">*Hours may vary on holidays</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <a 
                href="tel:+919680341731" 
                className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-700 transition-all shadow-2xl shadow-brand-900/20 flex items-center justify-center"
              >
                <Phone className="mr-2" size={20} />
                Call Now
              </a>
              <a 
                href="https://wa.me/919680341731?text=Hi,%20I%20want%20to%20book%20an%20appointment%20at%20Scarlet%20Smiles" 
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-10 py-5 rounded-full font-bold text-lg text-slate-900 hover:bg-white transition-all flex items-center justify-center"
              >
                <WhatsAppIcon className="mr-3 text-emerald-500" size={24} />
                WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[60px] overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,0.15)] border-[12px] border-white relative group"
          >
            <div className="absolute inset-0 bg-brand-900/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none z-10" />
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.218281340365!2d75.79601857616109!3d26.864805162146407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5573b015a17%3A0xac6b19ded0e19d81!2sScarlet%20Smiles!5e0!3m2!1sen!2sin!4v1776756318364!5m2!1sen!2sin" 
              width="100%" 
              height="600" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TrustBar = () => {
  const associations = [
    "Indian Dental Association",
    "ISO 9001:2015 Certified",
    "Dental Council of India",
    "American Academy of Implant Dentistry",
    "International Congress of Oral Implantologists"
  ];

  return (
    <div className="bg-white py-12 border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
          {associations.map((name, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 whitespace-nowrap">
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-900 text-white pt-32 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2">
            <a href="#home" className="flex flex-col mb-10 group">
              <span className="text-4xl font-serif font-black tracking-tighter text-white leading-none group-hover:text-brand-400 transition-colors">Scarlet</span>
              <span className="text-[10px] font-bold text-brand-400 tracking-[0.4em] uppercase mt-2">Smiles</span>
            </a>
            <p className="text-brand-200/60 text-xl max-w-md leading-relaxed font-medium">
              Redefining the dental experience through artistic precision, 
              advanced technology, and a commitment to your absolute comfort.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-brand-400 uppercase tracking-[0.4em] mb-10">Navigation</h4>
            <ul className="space-y-6">
              {['Home', 'About', 'Services', 'Reviews', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-lg font-medium text-white/60 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-brand-400 uppercase tracking-[0.4em] mb-10">Connect</h4>
            <div className="flex space-x-6 mb-10">
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-brand-600 transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-brand-600 transition-all">
                <Facebook size={20} />
              </a>
            </div>
            <p className="text-sm text-brand-200/40 font-bold uppercase tracking-widest">
              Jaipur, Rajasthan
            </p>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs font-bold text-brand-200/30 uppercase tracking-[0.2em]">
            © 2026 Scarlet Smiles. Crafted for Excellence.
          </p>
          <div className="flex space-x-12">
            <a href="#" className="text-[10px] font-bold text-brand-200/30 uppercase tracking-[0.2em] hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] font-bold text-brand-200/30 uppercase tracking-[0.2em] hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

import { GoogleGenAI } from "@google/genai";

const AIConcierge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "Welcome to Scarlet Smiles. I am your AI Dental Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          systemInstruction: "You are a professional, empathetic, and highly knowledgeable AI Dental Assistant for 'Scarlet Smiles' in Jaipur. Your goal is to provide helpful information about dental procedures (Dental Fillings, Cleaning, Laser treatments, etc.), offer basic symptom advice (always with a disclaimer to consult our doctors), and encourage users to book an appointment. Keep responses concise, premium in tone, and helpful. Mention Dr. Purvi Bhargava as our lead expert when relevant.",
        }
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || "I'm sorry, I couldn't process that. Please try calling us directly." }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting right now. Please feel free to call us at +91 96803 41731." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 left-0 w-[calc(100vw-32px)] sm:w-[350px] md:w-[400px] bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-brand-900 p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-sm tracking-tight">AI Concierge</h4>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-bold text-brand-300 uppercase tracking-widest">Online</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-grow h-[350px] sm:h-[400px] overflow-y-auto p-6 space-y-4 bg-slate-50/50">
              {messages.map((msg, i) => (
                <div key={i} className={cn(
                  "flex",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}>
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-brand-600 text-white rounded-tr-none shadow-lg shadow-brand-600/20" 
                      : "bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about procedures or symptoms..."
                  className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-brand-500 transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-600 text-white rounded-xl flex items-center justify-center hover:bg-brand-700 transition-colors disabled:opacity-50"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-brand-900 text-white shadow-2xl flex items-center justify-center group relative"
      >
        <div className="absolute inset-0 rounded-full bg-brand-500 animate-ping opacity-20 group-hover:opacity-0 transition-opacity" />
        <Sparkles size={28} className="group-hover:rotate-12 transition-transform" />
      </motion.button>
    </div>
  );
};

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/919680341731?text=Hi,%20I%20want%20to%20book%20an%20appointment%20at%20Scarlet%20Smiles"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40 bg-emerald-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center"
    >
      <WhatsAppIcon size={32} />
    </motion.a>
  );
};

// --- Main App ---

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-brand-100 selection:text-brand-900">
      <CustomCursor />
      <BackgroundPattern />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <WhyChooseUs />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <AIConcierge />
      <WhatsAppButton />
    </div>
  );
}
