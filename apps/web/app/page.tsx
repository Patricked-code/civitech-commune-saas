'use client';

import Link from 'next/link';
import { ArrowRight, FileText, CheckCircle, Lock, Building2, Users, BarChart3, Zap, Shield, Smartphone, Globe, Cpu, MousePointer2 } from 'lucide-react';
import { FuturisticNav } from '../components/FuturisticNav';

export default function HomePage() {
  const features = [
    {
      icon: Cpu,
      title: 'IA & Automatisation',
      description: 'Traitement intelligent de vos dossiers pour une réponse ultra-rapide.',
      color: 'from-cyan-400 to-blue-600',
      shadow: 'shadow-neon-cyan',
    },
    {
      icon: Globe,
      title: 'Accessibilité Totale',
      description: 'Votre mairie disponible partout, tout le temps, sur tous vos appareils.',
      color: 'from-violet-400 to-purple-600',
      shadow: 'shadow-neon-violet',
    },
    {
      icon: Shield,
      title: 'Sécurité Quantique',
      description: 'Chiffrement de bout en bout pour une protection absolue de vos données.',
      color: 'from-pink-400 to-rose-600',
      shadow: 'shadow-neon-pink',
    },
  ];

  return (
    <main className="min-h-screen bg-[#030712] text-white overflow-hidden selection:bg-cyan-500/30">
      {/* Dynamic Cyber Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] bg-pink-500/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
      </div>

      {/* Navigation */}
      <FuturisticNav />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Content */}
            <div className="flex-1 space-y-10 animate-slide-up">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">
                    Système Opérationnel v2.0
                  </span>
                </div>
                
                <h1 className="text-6xl sm:text-8xl font-black tracking-tighter leading-[0.9]">
                  L'AVENIR DE VOTRE <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent italic">
                    COMMUNE
                  </span>
                </h1>
                
                <p className="text-xl text-slate-400 leading-relaxed max-w-xl font-medium">
                  Expérimentez la gestion municipale réinventée. Une interface futuriste, une sécurité absolue et une rapidité sans précédent.
                </p>
              </div>

              <div className="flex flex-wrap gap-6">
                <Link href="/commune/demarches" className="group relative px-10 py-5 bg-white text-black font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative flex items-center gap-3 group-hover:text-white transition-colors">
                    DÉMARRER L'EXPÉRIENCE <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                </Link>
                
                <Link href="/commune" className="group px-10 py-5 border-2 border-white/10 rounded-full font-black hover:bg-white/5 transition-all hover:border-white/30">
                  EXPLORER LE PORTAIL
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4 grayscale opacity-50">
                <div className="flex flex-col">
                  <span className="text-2xl font-black italic">99.9%</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Uptime</span>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black italic">256-BIT</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Security</span>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black italic">10ms</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Latency</span>
                </div>
              </div>
            </div>

            {/* Right - Interactive Visual */}
            <div className="flex-1 relative animate-fade-in hidden lg:block">
              <div className="relative z-10 w-full aspect-square rounded-[40px] bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-3xl p-1 shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative h-full bg-[#030712]/80 rounded-[38px] p-10 flex flex-col justify-between border border-white/5">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="w-12 h-1 bg-cyan-500 rounded-full"></div>
                      <h4 className="text-2xl font-black italic">CORE_DASHBOARD</h4>
                    </div>
                    <div className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-bold text-cyan-400">
                      LIVE_SYNC
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-xs font-bold text-slate-500">TRAITEMENT_DOSSIERS</span>
                        <span className="text-2xl font-black text-cyan-400">84%</span>
                      </div>
                      <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/10">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full w-[84%] shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <span className="text-[10px] font-bold text-slate-500 block mb-2 uppercase tracking-tighter">Actes_Générés</span>
                        <span className="text-4xl font-black italic">1,284</span>
                      </div>
                      <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <span className="text-[10px] font-bold text-slate-500 block mb-2 uppercase tracking-tighter">Citoyens_Actifs</span>
                        <span className="text-4xl font-black italic">42.5k</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                    <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center shadow-neon-cyan">
                      <MousePointer2 className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">SYSTÈME_OPTIMISÉ</p>
                      <p className="text-[10px] text-slate-400 uppercase">Prêt pour le déploiement final</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className={`group relative p-10 rounded-[40px] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-2 ${f.shadow}`}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <f.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black mb-4 italic tracking-tighter uppercase">{f.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed">{f.description}</p>
                
                <div className="absolute bottom-6 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-1 bg-white rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Minimalist */}
      <footer className="relative z-10 py-20 border-t border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-black italic tracking-tighter">CIVITECH_COMMUNE</span>
          </div>
          
          <div className="flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          
          <p className="text-[10px] font-bold text-slate-600">© 2026 NEXT_GEN_SYSTEMS</p>
        </div>
      </footer>
    </main>
  );
}
