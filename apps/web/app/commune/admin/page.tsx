'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Users,
  FileText,
  AlertCircle,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Settings,
  Menu,
  X,
  LogOut,
  Activity,
  Shield,
  Zap,
  Filter,
  Download,
  Eye,
  MoreVertical
} from 'lucide-react';
import { apiGet, getApiErrorMessage } from '../../../lib/api';
import { readToken } from '../../../lib/session';
import { ProtectedView } from '../../../components/ProtectedView';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Alert } from '../../../components/ui/Alert';
import type { AdminDashboard } from '../../../lib/appTypes';

const statusColors = {
  pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  processing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
} as const;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

function StatCard({ icon: Icon, label, value, change, color }: any) {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="p-6 relative overflow-hidden group">
        <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity ${color === 'cyan' ? 'bg-cyan-500' : color === 'emerald' ? 'bg-emerald-500' : color === 'amber' ? 'bg-amber-500' : 'bg-violet-500'}`} />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color === 'cyan' ? 'bg-cyan-500/20' : color === 'emerald' ? 'bg-emerald-500/20' : color === 'amber' ? 'bg-amber-500/20' : 'bg-violet-500/20'}`}>
              <Icon className={`w-6 h-6 ${color === 'cyan' ? 'text-cyan-500' : color === 'emerald' ? 'text-emerald-500' : color === 'amber' ? 'text-amber-500' : 'text-violet-500'}`} />
            </div>
            {change && (
              <div className={`text-sm font-bold ${change > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {change > 0 ? '+' : ''}{change}%
              </div>
            )}
          </div>
          <p className="text-slate-600 text-sm font-medium mb-1">{label}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
        </div>
      </Card>
    </motion.div>
  );
}

function DossierRow({ dossier }: any) {
  return (
    <motion.tr variants={fadeInUp} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 text-sm font-medium text-slate-900">{dossier.reference}</td>
      <td className="px-6 py-4 text-sm text-slate-600">{dossier.citizen}</td>
      <td className="px-6 py-4 text-sm">{dossier.type}</td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${statusColors[dossier.status as keyof typeof statusColors]}`}>
          {dossier.status === 'pending' && '⏳ En attente'}
          {dossier.status === 'processing' && '⚙️ Traitement'}
          {dossier.status === 'completed' && '✓ Complété'}
          {dossier.status === 'rejected' && '✗ Rejeté'}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-slate-600">{dossier.date}</td>
      <td className="px-6 py-4 text-right">
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <MoreVertical className="w-4 h-4 text-slate-600" />
        </button>
      </td>
    </motion.tr>
  );
}

export default function AdminPage() {
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    async function load() {
      const token = readToken();
      if (!token) {
        setError('Session absente.');
        setIsLoading(false);
        return;
      }
      try {
        const response = await apiGet('/api/admin/dashboard', token);
        setDashboard(response);
      } catch (err) {
        setError(getApiErrorMessage(err, 'Impossible de charger le tableau de bord administrateur.'));
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const filteredDossiers = useMemo(() => {
    const all = dashboard?.recentDossiers || [];
    if (filter === 'all') return all;
    return all.filter((item) => item.status === filter);
  }, [dashboard, filter]);

  return (
    <ProtectedView roles={['admin']}>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Sidebar */}
        <aside className={`fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-200 transition-all duration-500 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-8 mb-8 border-b border-slate-200">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-accent-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="font-black text-lg text-slate-900">CIVITECH</span>
            </Link>
          </div>

          <nav className="px-4 space-y-2">
            {[
              { icon: Activity, label: 'TABLEAU DE BORD', href: '/commune/admin', active: true },
              { icon: FileText, label: 'DOSSIERS', href: '/commune/admin-gestion' },
              { icon: Users, label: 'UTILISATEURS', href: '/commune/admin-crud' },
              { icon: Zap, label: 'PROCÉDURES', href: '/commune/admin-console' },
              { icon: BarChart3, label: 'STATISTIQUES', href: '/commune/admin' },
              { icon: Settings, label: 'PARAMÈTRES', href: '/commune/profil' },
            ].map((item, idx) => (
              <Link key={idx} href={item.href}>
                <button className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${item.active ? 'bg-brand-50 text-brand-600 border border-brand-200' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-bold tracking-wide uppercase">{item.label}</span>
                </button>
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-8 left-4 right-4 pt-6 border-t border-slate-200">
            <button className="w-full flex items-center gap-4 px-6 py-4 rounded-xl hover:bg-red-50 transition-all text-slate-600 hover:text-red-600 group">
              <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-bold tracking-wide uppercase">Déconnexion</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className={`transition-all duration-500 ${sidebarOpen ? 'ml-72' : 'ml-0'}`}>
          {/* Top Bar */}
          <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h2 className="text-sm font-bold tracking-wide text-slate-600 uppercase">Administration</h2>
                <h1 className="text-2xl font-bold text-slate-900">Tableau de Bord Communal</h1>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-emerald-600 tracking-wide uppercase">Système Actif</span>
              </div>

              <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wide">Administrateur</p>
                  <p className="text-sm font-bold text-slate-900">Jean Maire</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 p-0.5">
                  <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center">
                    <Shield className="w-6 h-6 text-brand-600" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="p-10 max-w-7xl mx-auto space-y-12">
            {error && (
              <Alert variant="error" title="Erreur Système">
                {error}
              </Alert>
            )}

            {isLoading ? (
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="p-6 h-32 bg-slate-200 animate-pulse" />
                  ))}
                </div>
              </div>
            ) : dashboard ? (
              <motion.div
                initial="initial"
                animate="animate"
                variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
                className="space-y-12"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard icon={FileText} label="Dossiers Totaux" value={dashboard.stats.totalDossiers} change={12} color="cyan" />
                  <StatCard icon={Clock} label="En Attente" value={dashboard.stats.pending} change={-5} color="amber" />
                  <StatCard icon={CheckCircle2} label="Complétés" value={dashboard.stats.completed} change={23} color="emerald" />
                  <StatCard icon={AlertCircle} label="Alertes SLA" value={dashboard.stats.alerts} change={0} color="violet" />
                </div>

                {/* Quick Actions */}
                <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-8 bg-gradient-to-br from-brand-50 to-brand-100/50 border-brand-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-brand-900">Nouveaux Dossiers</h3>
                      <TrendingUp className="w-6 h-6 text-brand-600" />
                    </div>
                    <p className="text-3xl font-bold text-brand-900 mb-2">{dashboard.stats.newDossiers}</p>
                    <p className="text-sm text-brand-700">+15% par rapport à la semaine dernière</p>
                  </Card>

                  <Card className="p-8 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-emerald-900">Taux de Satisfaction</h3>
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <p className="text-3xl font-bold text-emerald-900 mb-2">94%</p>
                    <p className="text-sm text-emerald-700">Basé sur les retours citoyens</p>
                  </Card>

                  <Card className="p-8 bg-gradient-to-br from-violet-50 to-violet-100/50 border-violet-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-violet-900">Temps Moyen</h3>
                      <Clock className="w-6 h-6 text-violet-600" />
                    </div>
                    <p className="text-3xl font-bold text-violet-900 mb-2">3.2j</p>
                    <p className="text-sm text-violet-700">Pour traiter une demande</p>
                  </Card>
                </motion.div>

                {/* Recent Dossiers */}
                <motion.div variants={fadeInUp}>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
                    <h3 className="text-2xl font-bold text-slate-900">Dossiers Récents</h3>
                    <div className="flex items-center gap-4">
                      <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      >
                        <option value="all">Tous les statuts</option>
                        <option value="pending">En attente</option>
                        <option value="processing">En traitement</option>
                        <option value="completed">Complétés</option>
                        <option value="rejected">Rejetés</option>
                      </select>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Exporter
                      </Button>
                    </div>
                  </div>

                  <Card className="overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wide">Référence</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wide">Citoyen</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wide">Type</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wide">Statut</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wide">Date</th>
                          <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wide">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDossiers.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                              Aucun dossier trouvé
                            </td>
                          </tr>
                        ) : (
                          filteredDossiers.map((dossier) => (
                            <DossierRow key={dossier.id} dossier={dossier} />
                          ))
                        )}
                      </tbody>
                    </table>
                  </Card>
                </motion.div>
              </motion.div>
            ) : null}
          </div>
        </div>
      </main>
    </ProtectedView>
  );
}
