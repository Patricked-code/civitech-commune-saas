'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FileText,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Menu,
  X,
  LogOut,
  Activity,
  Zap,
  MessageSquare,
  Eye,
  Edit,
  MoreVertical,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { apiGet, apiPost, getApiErrorMessage } from '../../../lib/api';
import { readToken } from '../../../lib/session';
import { ProtectedView } from '../../../components/ProtectedView';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Alert } from '../../../components/ui/Alert';
import type { DossierListItem } from '../../../lib/appTypes';

const statusColors = {
  pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  submitted: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  in_review: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  waiting_citizen: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  validated: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  issued: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  available: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
} as const;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

function PriorityBadge({ priority }: any) {
  const colors = {
    high: 'bg-red-100 text-red-800 border-red-300',
    medium: 'bg-amber-100 text-amber-800 border-amber-300',
    low: 'bg-blue-100 text-blue-800 border-blue-300',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${colors[priority as keyof typeof colors]}`}>
      {priority === 'high' && '🔴 Urgent'}
      {priority === 'medium' && '🟡 Normal'}
      {priority === 'low' && '🟢 Faible'}
    </span>
  );
}

function DossierCard({ dossier, onPushNext }: any) {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-bold text-slate-900">{dossier.reference}</h3>
              <PriorityBadge priority={dossier.priorityScore >= 80 ? 'high' : dossier.priorityScore >= 50 ? 'medium' : 'low'} />
            </div>
            <p className="text-sm text-slate-600">{dossier.procedureTitle || dossier.procedureCode}</p>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
            <MoreVertical className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Statut</span>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold border ${statusColors[dossier.status as keyof typeof statusColors]}`}>
              {dossier.status === 'submitted' && '📝 Soumis'}
              {dossier.status === 'in_review' && '👁️ En révision'}
              {dossier.status === 'validated' && '✓ Validé'}
              {dossier.status === 'issued' && '✓ Émis'}
              {dossier.status === 'available' && '✓ Disponible'}
              {dossier.status === 'rejected' && '✗ Rejeté'}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Étape actuelle</span>
            <span className="font-medium text-slate-900">{dossier.currentStep}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Prochaine étape</span>
            <span className="font-medium text-slate-900">{dossier.nextStep || 'N/A'}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex gap-2">
          <Link href={`/commune/dossiers/${encodeURIComponent(dossier.reference)}`} className="flex-1">
            <Button size="sm" variant="outline" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              Consulter
            </Button>
          </Link>
          <Button size="sm" className="flex-1" onClick={() => onPushNext(dossier.reference)}>
            <ArrowRight className="w-4 h-4 mr-2" />
            Avancer
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

export default function AgentDossiersPage() {
  const [dossiers, setDossiers] = useState<DossierListItem[]>([]);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [procedureFilter, setProcedureFilter] = useState('all');

  async function load() {
    const token = readToken();
    if (!token) {
      setStatus('Session absente.');
      setIsLoading(false);
      return;
    }
    try {
      const query = new URLSearchParams({ status: statusFilter, procedureCode: procedureFilter }).toString();
      const response = await apiGet('/api/agent/queue?' + query, token);
      setDossiers(response.data || []);
      setStatus('');
    } catch (error) {
      setStatus(getApiErrorMessage(error, 'Chargement des dossiers impossible.'));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [statusFilter, procedureFilter]);

  async function pushNext(reference: string) {
    const token = readToken();
    if (!token) return;
    try {
      await apiPost('/api/dossiers/' + encodeURIComponent(reference) + '/next-step', { comment: 'Transition agent depuis la file de traitement' }, token);
      setStatus('Transition effectuée avec succès.');
      await load();
    } catch (error) {
      setStatus(getApiErrorMessage(error, 'Transition agent impossible.'));
    }
  }

  const procedureOptions = Array.from(new Set(dossiers.map((item) => item.procedureCode || item.procedureId))).filter(Boolean) as string[];

  const queueStats = useMemo(() => {
    return {
      total: dossiers.length,
      submitted: dossiers.filter((item) => item.status === 'submitted').length,
      inReview: dossiers.filter((item) => item.status === 'in_review').length,
      highPriority: dossiers.filter((item) => (item.priorityScore || 0) >= 80).length,
    };
  }, [dossiers]);

  const filteredDossiers = useMemo(() => {
    let all = dossiers;

    if (searchTerm) {
      all = all.filter((d) =>
        d.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (d.procedureTitle || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return all;
  }, [dossiers, searchTerm]);

  return (
    <ProtectedView roles={['agent', 'admin']}>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Sidebar */}
        <aside className={`fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-200 transition-all duration-500 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-8 mb-8 border-b border-slate-200">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-accent-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="font-black text-lg text-slate-900">CIVITECH</span>
            </Link>
          </div>

          <nav className="px-4 space-y-2">
            {[
              { icon: Activity, label: 'MES DOSSIERS', href: '/commune/agent-dossiers', active: true },
              { icon: Clock, label: 'PRIORITÉ DU JOUR', href: '/commune/agent-priorite-du-jour' },
              { icon: FileText, label: 'VALIDATION DOCS', href: '/commune/agent-validation-documents' },
              { icon: MessageSquare, label: 'COMMENTAIRES', href: '/commune/agent-dossiers/[reference]/internal-comments' },
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
                <h2 className="text-sm font-bold tracking-wide text-slate-600 uppercase">Agent Municipal</h2>
                <h1 className="text-2xl font-bold text-slate-900">File de Traitement</h1>
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
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wide">Agent</p>
                  <p className="text-sm font-bold text-slate-900">Pierre Martin</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 p-0.5">
                  <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center">
                    <Users className="w-6 h-6 text-brand-600" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="p-10 max-w-7xl mx-auto space-y-12">
            {status && (
              <Alert variant={status.includes('impossible') ? 'error' : 'success'} title={status.includes('impossible') ? 'Erreur' : 'Succès'}>
                {status}
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
            ) : (
              <motion.div
                initial="initial"
                animate="animate"
                variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
                className="space-y-12"
              >
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <motion.div variants={fadeInUp}>
                    <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-blue-600 uppercase">Total</p>
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="text-3xl font-bold text-blue-900">{queueStats.total}</p>
                    </Card>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-purple-600 uppercase">Soumis</p>
                        <Clock className="w-5 h-5 text-purple-600" />
                      </div>
                      <p className="text-3xl font-bold text-purple-900">{queueStats.submitted}</p>
                    </Card>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-amber-600 uppercase">En Révision</p>
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                      </div>
                      <p className="text-3xl font-bold text-amber-900">{queueStats.inReview}</p>
                    </Card>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100/50 border-red-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-red-600 uppercase">Urgent</p>
                        <TrendingUp className="w-5 h-5 text-red-600" />
                      </div>
                      <p className="text-3xl font-bold text-red-900">{queueStats.highPriority}</p>
                    </Card>
                  </motion.div>
                </div>

                {/* Search & Filters */}
                <motion.div variants={fadeInUp} className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Rechercher par référence ou procédure..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-3 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="all">Tous les statuts</option>
                      <option value="submitted">Soumis</option>
                      <option value="in_review">En révision</option>
                      <option value="validated">Validé</option>
                    </select>
                    <select
                      value={procedureFilter}
                      onChange={(e) => setProcedureFilter(e.target.value)}
                      className="px-4 py-3 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="all">Toutes les procédures</option>
                      {procedureOptions.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                </motion.div>

                {/* Dossiers Grid */}
                <motion.div
                  variants={{ animate: { transition: { staggerChildren: 0.05 } } }}
                  initial="initial"
                  animate="animate"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredDossiers.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                      <p className="text-slate-500 font-medium">Aucun dossier trouvé</p>
                    </div>
                  ) : (
                    filteredDossiers.map((dossier) => (
                      <DossierCard key={dossier.reference} dossier={dossier} onPushNext={pushNext} />
                    ))
                  )}
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </ProtectedView>
  );
}
