"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FileText, Bell, MessageSquare, FileCheck, Plus, Filter } from "lucide-react";
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
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50">
        {/* Header */}
        <PageHeader
          badge="Espace personnel"
          title="Tableau de bord citoyen"
          subtitle="Gérez vos démarches et suivez vos dossiers"
          backgroundGradient="from-primary-600 to-secondary-600"
          actions={
            <Link href="/commune/demarches">
              <Button variant="primary" size="lg" className="bg-white text-primary-600">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle démarche
              </Button>
            </Link>
          }
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Error Alert */}
          {error && (
            <Alert variant="error" title="Erreur" dismissible className="mb-6">
              {error}
            </Alert>
          )}

          {/* Loading State */}
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
              {/* Quick Shortcuts */}
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4">Accès rapide</h2>
                <div className="grid md:grid-cols-4 gap-4">
                  {shortcuts.map((shortcut, idx) => (
                    <Link key={idx} href={shortcut.href}>
                      <Card interactive className="h-full hover-lift" elevated>
                        <CardBody className="flex flex-col items-center text-center gap-3">
                          <div className="p-3 bg-primary-50 rounded-lg text-primary-600">
                            {shortcut.icon}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{shortcut.label}</p>
                            <p className="text-sm text-slate-600">{shortcut.text}</p>
                          </div>
                        </CardBody>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4">Résumé</h2>
                <div className="grid md:grid-cols-4 gap-4">
                  <StatCard
                    label="Total dossiers"
                    value={dashboard.summary.total}
                    icon={<FileText className="w-6 h-6" />}
                    color="primary"
                  />
                  <StatCard
                    label="Brouillons"
                    value={dashboard.summary.drafts}
                    icon={<FileText className="w-6 h-6" />}
                    color="secondary"
                  />
                  <StatCard
                    label="Soumis"
                    value={dashboard.summary.submitted}
                    icon={<FileCheck className="w-6 h-6" />}
                    color="accent"
                  />
                  <StatCard
                    label="En cours"
                    value={dashboard.summary.inProgress}
                    icon={<FileText className="w-6 h-6" />}
                    color="warning"
                  />
                </div>
              </div>

              {/* Dossiers List */}
              <div>
                <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                  <h2 className="text-lg font-bold text-slate-900">Mes démarches</h2>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-600" />
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="select-field"
                    >
                      <option value="all">Tous les statuts</option>
                      <option value="draft">Brouillons</option>
                      <option value="submitted">Soumis</option>
                      <option value="in_review">En révision</option>
                      <option value="validated">Validés</option>
                      <option value="rejected">Rejetés</option>
                    </select>
                  </div>
                </div>

                {filteredDossiers.length === 0 ? (
                  <Card>
                    <CardBody className="text-center py-12">
                      <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-600 mb-4">Aucune démarche trouvée</p>
                      <Link href="/commune/demarches">
                        <Button variant="primary">Commencer une démarche</Button>
                      </Link>
                    </CardBody>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {filteredDossiers.map((dossier, idx) => (
                      <Link key={idx} href={`/commune/dossier/${dossier.reference}`}>
                        <Card interactive className="hover-lift">
                          <CardBody className="flex items-center justify-between gap-4 flex-wrap">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <p className="font-semibold text-slate-900 truncate">
                                  {dossier.procedureTitle || "Démarche"}
                                </p>
                                <Badge variant={statusColors[dossier.status as keyof typeof statusColors]}>
                                  {statusLabels[dossier.status as keyof typeof statusLabels]}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-slate-600 flex-wrap">
                                <span>Réf. {dossier.reference}</span>
                                {dossier.computedProgress !== undefined && (
                                  <div className="flex items-center gap-2">
                                    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-300"
                                        style={{ width: `${dossier.computedProgress}%` }}
                                      />
                                    </div>
                                    <span className="font-medium">{dossier.computedProgress}%</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              {dossier.nextStep && (
                                <p className="text-sm font-medium text-primary-600">
                                  Prochaine étape: {dossier.nextStep}
                                </p>
                              )}
                            </div>
                          </CardBody>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </ProtectedView>
  );
}
