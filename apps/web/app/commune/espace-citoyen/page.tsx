"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FileText, Bell, MessageSquare, FileCheck, Plus, Filter, Menu, X, LogOut, Eye, Download, Settings } from "lucide-react";
import { apiGet, getApiErrorMessage } from "../../../lib/api";
import { readToken } from "../../../lib/session";
import { ProtectedView } from "../../../components/ProtectedView";
import { Button } from "../../../components/ui/Button";
import { Card, CardBody } from "../../../components/ui/Card";
import { StatCard } from "../../../components/ui/StatCard";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Badge } from "../../../components/ui/Badge";
import { Alert } from "../../../components/ui/Alert";
import { SkeletonCard, SkeletonTable } from "../../../components/Skeleton";
import type { CitizenDashboard } from "../../../lib/appTypes";

const shortcuts = [
  { href: "/commune/profil", label: "Profil", icon: <FileText className="w-5 h-5" />, text: "Gérer mes informations" },
  { href: "/commune/notifications", label: "Notifications", icon: <Bell className="w-5 h-5" />, text: "Mes alertes" },
  { href: "/commune/messages", label: "Messages", icon: <MessageSquare className="w-5 h-5" />, text: "Correspondances" },
  { href: "/commune/documents", label: "Documents", icon: <FileCheck className="w-5 h-5" />, text: "Mes documents" },
];

const statusColors = {
  draft: "primary",
  submitted: "info",
  qualified: "warning",
  in_review: "warning",
  waiting_citizen: "warning",
  validated: "success",
  issued: "success",
  available: "success",
  delivered: "success",
  archived: "secondary",
  rejected: "danger",
} as const;

const statusLabels = {
  draft: "Brouillon",
  submitted: "Soumis",
  qualified: "Qualifié",
  in_review: "En révision",
  waiting_citizen: "En attente",
  validated: "Validé",
  issued: "Émis",
  available: "Disponible",
  delivered: "Livré",
  archived: "Archivé",
  rejected: "Rejeté",
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-violet-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Sidebar */}
        <aside className={`fixed left-0 top-0 h-screen w-64 backdrop-blur-xl bg-white/5 border-r border-white/10 transition-transform duration-300 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-white/10">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              CiviTech
            </h1>
          </div>

          <nav className="p-4 space-y-2">
            <NavItem icon={<FileText className="w-5 h-5" />} label="Tableau de bord" href="/commune/espace-citoyen" active />
            <NavItem icon={<Plus className="w-5 h-5" />} label="Nouvelle démarche" href="/commune/demarches" />
            <NavItem icon={<MessageSquare className="w-5 h-5" />} label="Messages" href="/commune/messages" />
            <NavItem icon={<Bell className="w-5 h-5" />} label="Notifications" href="/commune/notifications" />
            <NavItem icon={<Settings className="w-5 h-5" />} label="Paramètres" href="/commune/settings" />
          </nav>

          <div className="absolute bottom-4 left-4 right-4 pt-4 border-t border-white/10">
            <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition duration-300 text-gray-400 hover:text-white">
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          {/* Top Bar */}
          <div className="sticky top-0 z-30 backdrop-blur-xl bg-white/5 border-b border-white/10 px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition duration-300 md:hidden"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h2 className="text-2xl font-bold">Tableau de bord citoyen</h2>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-white/10 transition duration-300 relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600"></div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {error && (
              <Alert variant="error" title="Erreur" dismissible className="mb-6">
                {error}
              </Alert>
            )}

            {isLoading ? (
              <div className="space-y-6">
                <div className="grid md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
                <SkeletonTable />
              </div>
            ) : dashboard ? (
              <div className="space-y-8">
                {/* Welcome Section */}
                <div className="relative backdrop-blur-xl bg-gradient-to-r from-cyan-500/10 to-violet-600/10 border border-white/10 rounded-2xl p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-600 opacity-0 hover:opacity-5 transition duration-300"></div>
                  <div className="relative">
                    <h3 className="text-3xl font-bold mb-2">Bienvenue, Citoyen ! 👋</h3>
                    <p className="text-gray-300">Gérez vos démarches et suivez vos dossiers en temps réel</p>
                  </div>
                </div>

                {/* Statistics */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Résumé</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Total dossiers', value: dashboard.summary.total, icon: FileText, color: 'from-cyan-500 to-blue-600' },
                      { label: 'Brouillons', value: dashboard.summary.drafts, icon: FileText, color: 'from-yellow-500 to-orange-600' },
                      { label: 'Soumis', value: dashboard.summary.submitted, icon: FileCheck, color: 'from-violet-500 to-purple-600' },
                      { label: 'En cours', value: dashboard.summary.inProgress, icon: FileText, color: 'from-pink-500 to-rose-600' },
                    ].map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <div key={stat.label} className="relative group backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/30 transition duration-300 overflow-hidden">
                          <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition duration-300`}></div>
                          <div className="relative">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} p-2 mb-3`}>
                              <Icon className="w-full h-full text-white" />
                            </div>
                            <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold">{stat.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link href="/commune/demarches">
                    <Button variant="primary" size="lg" className="bg-gradient-to-r from-cyan-500 to-violet-600 hover:shadow-neon-cyan">
                      <Plus className="w-5 h-5 mr-2" />
                      Nouvelle démarche
                    </Button>
                  </Link>
                  <button className="group relative px-6 py-3 font-semibold border-2 border-white/30 rounded-lg hover:border-white/50 hover:bg-white/10 transition duration-300">
                    Voir toutes les démarches
                  </button>
                </div>

                {/* Dossiers */}
                <div>
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <h3 className="text-2xl font-bold">Mes dossiers</h3>
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-gray-400" />
                      <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 hover:border-white/30 transition duration-300"
                      >
                        <option value="all" className="bg-slate-800">Tous les statuts</option>
                        <option value="draft" className="bg-slate-800">Brouillons</option>
                        <option value="submitted" className="bg-slate-800">Soumis</option>
                        <option value="in_review" className="bg-slate-800">En révision</option>
                        <option value="validated" className="bg-slate-800">Validés</option>
                        <option value="rejected" className="bg-slate-800">Rejetés</option>
                      </select>
                    </div>
                  </div>

                  {filteredDossiers.length === 0 ? (
                    <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 mb-4">Aucune démarche trouvée</p>
                      <Link href="/commune/demarches">
                        <Button variant="primary">Commencer une démarche</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredDossiers.map((dossier, idx) => (
                        <Link key={idx} href={`/commune/dossier/${dossier.reference}`}>
                          <div className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/30 transition duration-300 overflow-hidden cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-600 opacity-0 group-hover:opacity-5 transition duration-300"></div>
                            <div className="relative">
                              <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                                    <p className="font-bold text-lg">{dossier.procedureTitle || "Démarche"}</p>
                                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500 to-violet-600 text-white">
                                      {statusLabels[dossier.status as keyof typeof statusLabels]}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-400">Réf. {dossier.reference}</p>
                                </div>
                                {dossier.nextStep && (
                                  <p className="text-sm font-medium text-cyan-400">
                                    Prochaine étape: {dossier.nextStep}
                                  </p>
                                )}
                              </div>

                              {/* Progress Bar */}
                              {dossier.computedProgress !== undefined && (
                                <div className="mb-4">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-400">Progression</span>
                                    <span className="text-sm font-semibold">{dossier.computedProgress}%</span>
                                  </div>
                                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-cyan-500 to-violet-600 transition-all duration-500"
                                      style={{ width: `${dossier.computedProgress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}

                              {/* Actions */}
                              <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition duration-300 text-sm font-semibold">
                                  <Eye className="w-4 h-4" />
                                  Consulter
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition duration-300 text-sm font-semibold">
                                  <Download className="w-4 h-4" />
                                  Télécharger
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition duration-300 text-sm font-semibold">
                                  <MessageSquare className="w-4 h-4" />
                                  Messages
                                </button>
                              </div>
                            </div>
                          </div>
                        </Link>
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

function NavItem({ icon, label, href, active = false }: { icon: React.ReactNode; label: string; href: string; active?: boolean }) {
  return (
    <Link href={href}>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg transition duration-300 ${active ? 'bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border border-cyan-400/30 text-cyan-400' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}>
        {icon}
        <span className="font-medium">{label}</span>
      </div>
    </Link>
  );
}
