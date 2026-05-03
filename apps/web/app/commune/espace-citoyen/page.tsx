"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FileText, Bell, MessageSquare, FileCheck, Plus, Filter, Menu, X, LogOut, Eye, Download, Settings, Activity, Cpu, Shield, Clock } from "lucide-react";
import { apiGet, getApiErrorMessage } from "../../../lib/api";
import { readToken } from "../../../lib/session";
import { ProtectedView } from "../../../components/ProtectedView";
import { Button } from "../../../components/ui/Button";
import { Alert } from "../../../components/ui/Alert";
import { SkeletonCard, SkeletonTable } from "../../../components/Skeleton";
import type { CitizenDashboard } from "../../../lib/appTypes";

const statusColors = {
  draft: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  submitted: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  qualified: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  in_review: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  waiting_citizen: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  validated: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  issued: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  available: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  delivered: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  archived: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
} as const;

export default function EspaceCitoyenPage() {
  const [dashboard, setDashboard] = useState<CitizenDashboard | null>(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    async function load() {
      const token = readToken();
      if (!token) {
        setError("Session absente.");
        setIsLoading(false);
        return;
      }
      try {
        const response = await apiGet("/api/citizen/dashboard", token);
        setDashboard(response);
      } catch (err) {
        setError(getApiErrorMessage(err, "Impossible de charger le tableau de bord citoyen."));
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const filteredDossiers = useMemo(() => {
    const all = dashboard?.dossiers || [];
    if (filter === "all") return all;
    return all.filter((item) => item.status === filter);
  }, [dashboard, filter]);

  return (
    <ProtectedView>
      <main className="min-h-screen bg-[#030712] text-white selection:bg-cyan-500/30">
        {/* Cyber Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-violet-500/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03]"></div>
        </div>

        {/* Sidebar */}
        <aside className={`fixed left-0 top-0 h-screen w-72 backdrop-blur-3xl bg-black/40 border-r border-white/5 transition-all duration-500 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-8 mb-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
                <Cpu className="w-6 h-6 text-black" />
              </div>
              <span className="font-black italic text-xl tracking-tighter">CIVITECH</span>
            </Link>
          </div>

          <nav className="px-4 space-y-2">
            <SidebarItem icon={<Activity className="w-5 h-5" />} label="DASHBOARD" href="/commune/espace-citoyen" active />
            <SidebarItem icon={<Plus className="w-5 h-5" />} label="NOUVELLE DÉMARCHE" href="/commune/demarches" />
            <SidebarItem icon={<MessageSquare className="w-5 h-5" />} label="MESSAGERIE" href="/commune/messages" />
            <SidebarItem icon={<Bell className="w-5 h-5" />} label="NOTIFICATIONS" href="/commune/notifications" />
            <SidebarItem icon={<FileCheck className="w-5 h-5" />} label="DOCUMENTS" href="/commune/documents" />
            <SidebarItem icon={<Settings className="w-5 h-5" />} label="PARAMÈTRES" href="/commune/profil" />
          </nav>

          <div className="absolute bottom-8 left-4 right-4 pt-6 border-t border-white/5">
            <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-red-500/10 transition-all text-slate-500 hover:text-red-400 group">
              <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span className="text-[10px] font-black tracking-widest uppercase">Déconnexion</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className={`transition-all duration-500 ${sidebarOpen ? 'ml-72' : 'ml-0'}`}>
          {/* Top Bar */}
          <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/20 border-b border-white/5 px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h2 className="text-sm font-black tracking-[0.3em] text-slate-500 uppercase">Citoyen_Espace</h2>
                <h1 className="text-2xl font-black italic tracking-tighter">TABLEAU_DE_BORD</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-black text-emerald-400 tracking-widest uppercase">Système_Online</span>
              </div>
              
              <div className="flex items-center gap-4 pl-6 border-l border-white/10">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Utilisateur</p>
                  <p className="text-sm font-bold italic">Marie Dupont</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 p-0.5 shadow-neon-cyan">
                  <div className="w-full h-full rounded-[14px] bg-[#030712] flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="p-10 max-w-7xl mx-auto space-y-12 relative z-10">
            {error && (
              <Alert variant="error" title="ERREUR_SYSTÈME" className="border-red-500/30 bg-red-500/10">
                {error}
              </Alert>
            )}

            {isLoading ? (
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
                </div>
                <SkeletonTable />
              </div>
            ) : dashboard ? (
              <div className="space-y-16 animate-fade-in">
                {/* Hero Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <StatItem label="TOTAL_DOSSIERS" value={dashboard.summary.total} icon={<FileText />} color="cyan" />
                  <StatItem label="EN_BROUILLON" value={dashboard.summary.drafts} icon={<Clock />} color="amber" />
                  <StatItem label="SOUMIS_VALIDÉS" value={dashboard.summary.submitted} icon={<FileCheck />} color="emerald" />
                  <StatItem label="TRAITEMENT_IA" value={dashboard.summary.inProgress} icon={<Cpu />} color="violet" />
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-10 rounded-[40px] bg-gradient-to-r from-cyan-500/10 to-violet-600/10 border border-white/10 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black italic tracking-tighter mb-2 uppercase">Prêt pour une nouvelle démarche ?</h3>
                    <p className="text-slate-400 font-medium">Lancez une procédure automatisée en quelques clics.</p>
                  </div>
                  <Link href="/commune/demarches" className="relative z-10 group/btn">
                    <button className="px-10 py-5 bg-white text-black font-black rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
                      <Plus className="w-6 h-6" />
                      NOUVELLE DEMANDE
                    </button>
                  </Link>
                </div>

                {/* Dossiers List */}
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <h3 className="text-3xl font-black italic tracking-tighter uppercase">HISTORIQUE_FLUX</h3>
                    <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10">
                      <Filter className="w-4 h-4 text-slate-500 ml-2" />
                      <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-transparent text-[10px] font-black tracking-widest text-white border-none focus:ring-0 uppercase pr-8"
                      >
                        <option value="all">TOUS_LES_FLUX</option>
                        <option value="draft">BROUILLONS</option>
                        <option value="submitted">SOUMIS</option>
                        <option value="validated">VALIDÉS</option>
                        <option value="rejected">REJETÉS</option>
                      </select>
                    </div>
                  </div>

                  {filteredDossiers.length === 0 ? (
                    <div className="p-20 rounded-[40px] bg-white/5 border border-white/10 border-dashed text-center">
                      <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Activity className="w-10 h-10 text-slate-600" />
                      </div>
                      <p className="text-slate-500 font-bold uppercase tracking-widest mb-6">Aucune activité détectée</p>
                      <Link href="/commune/demarches">
                        <Button variant="outline" className="border-white/20 hover:bg-white/10">Initialiser un flux</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {filteredDossiers.map((dossier) => (
                        <div key={dossier.id} className="group relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6">
                          <div className="flex items-center gap-6 w-full md:w-auto">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                              <FileText className="w-6 h-6 text-slate-400 group-hover:text-cyan-400" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter mb-1">ID: {dossier.reference}</p>
                              <h4 className="text-lg font-bold italic">{dossier.title}</h4>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                            <div className="text-right">
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Dernière_MàJ</p>
                              <p className="text-xs font-bold">{new Date(dossier.updatedAt).toLocaleDateString()}</p>
                            </div>
                            
                            <span className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest border uppercase ${statusColors[dossier.status as keyof typeof statusColors] || statusColors.draft}`}>
                              {dossier.status}
                            </span>
                            
                            <Link href={`/commune/espace-citoyen/dossier/${dossier.id}`}>
                              <button className="p-3 rounded-xl bg-white/5 hover:bg-white text-slate-400 hover:text-black transition-all border border-white/10">
                                <Eye className="w-5 h-5" />
                              </button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </ProtectedView>
  );
}

function SidebarItem({ icon, label, href, active = false }: { icon: React.ReactNode, label: string, href: string, active?: boolean }) {
  return (
    <Link href={href} className="block group">
      <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
        active 
          ? 'bg-white text-black shadow-neon-cyan' 
          : 'text-slate-500 hover:text-white hover:bg-white/5'
      }`}>
        <span className={`${active ? 'text-black' : 'group-hover:text-cyan-400'} transition-colors`}>
          {icon}
        </span>
        <span className="text-[10px] font-black tracking-[0.2em] uppercase">{label}</span>
      </div>
    </Link>
  );
}

function StatItem({ label, value, icon, color }: { label: string, value: number, icon: React.ReactNode, color: 'cyan' | 'violet' | 'emerald' | 'amber' }) {
  const colors = {
    cyan: 'from-cyan-500 to-blue-600 shadow-neon-cyan',
    violet: 'from-violet-500 to-purple-600 shadow-neon-violet',
    emerald: 'from-emerald-500 to-teal-600 shadow-[0_0_15px_rgba(16,185,129,0.5)]',
    amber: 'from-amber-500 to-orange-600 shadow-[0_0_15px_rgba(245,158,11,0.5)]',
  };

  return (
    <div className="relative group p-8 rounded-[40px] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all duration-500">
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors[color]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
        <div className="text-white w-7 h-7">{icon}</div>
      </div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{label}</p>
      <p className="text-4xl font-black italic tracking-tighter">{value}</p>
    </div>
  );
}
