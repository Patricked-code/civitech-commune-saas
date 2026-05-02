'use client';

import { ProtectedView } from '../../../components/ProtectedView';
import Link from 'next/link';
import { FileText, Clock, CheckCircle, XCircle, Plus, FileCheck, HelpCircle, ArrowRight, MoreVertical, Home, Folder, Bell, MessageSquare, FileTextIcon, User, LogOut, Calendar } from 'lucide-react';
import { useState } from 'react';

function DashboardContent() {
  const [activeTab, setActiveTab] = useState('accueil');

  const stats = [
    { label: 'Dossiers en cours', value: 3, icon: Folder, color: 'bg-blue-100 text-blue-600', border: 'border-l-4 border-blue-600' },
    { label: 'En attente', value: 1, icon: Clock, color: 'bg-amber-100 text-amber-600', border: 'border-l-4 border-amber-600' },
    { label: 'Terminés', value: 2, icon: CheckCircle, color: 'bg-teal-100 text-teal-600', border: 'border-l-4 border-teal-600' },
    { label: 'Rejetés', value: 0, icon: XCircle, color: 'bg-red-100 text-red-600', border: 'border-l-4 border-red-600' },
  ];

  const shortcuts = [
    { label: 'Nouvelle demande', icon: Plus, color: 'bg-blue-600 text-white', href: '/commune/demarches' },
    { label: 'Mes documents', icon: FileCheck, color: 'bg-teal-600 text-white', href: '#' },
    { label: 'Contacter support', icon: HelpCircle, color: 'bg-amber-600 text-white', href: '#' },
  ];

  const recentDossiers = [
    {
      ref: 'DOS-2024-0123',
      title: 'Demande de permis de construire',
      status: 'En cours',
      statusColor: 'text-blue-600 bg-blue-50',
      progress: 60,
      date: '24 mai 2024',
    },
    {
      ref: 'DOS-2024-0111',
      title: 'Demande de certificat d\'urbanisme',
      status: 'En attente',
      statusColor: 'text-amber-600 bg-amber-50',
      progress: 30,
      date: '18 mai 2024',
    },
    {
      ref: 'DOS-2024-0098',
      title: 'Déclaration préalable de travaux',
      status: 'Terminé',
      statusColor: 'text-teal-600 bg-teal-50',
      progress: 100,
      date: '5 mai 2024',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                CT
              </div>
              <span className="text-lg font-bold text-gray-900">CiviTech Commune</span>
            </div>

            {/* Navigation Tabs */}
            <div className="hidden md:flex items-center gap-8">
              <button className="flex items-center gap-2 text-blue-600 font-semibold border-b-2 border-blue-600 pb-2">
                <Home className="w-5 h-5" />
                Accueil
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
                <FileText className="w-5 h-5" />
                Démarches
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition relative">
                <Bell className="w-5 h-5" />
                Notifications
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition relative">
                <MessageSquare className="w-5 h-5" />
                Messages
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">2</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
                <FileTextIcon className="w-5 h-5" />
                Documents
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
                <User className="w-5 h-5" />
                Profil
              </button>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                MD
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">Marie Dupont</p>
                <p className="text-xs text-gray-500">Citoyen</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block">
            <nav className="space-y-2">
              {[
                { icon: Home, label: 'Tableau de bord', active: true },
                { icon: FileText, label: 'Mes démarches' },
                { icon: Folder, label: 'Mes dossiers' },
                { icon: FileCheck, label: 'Mes documents' },
                { icon: Clock, label: 'Mes paiements' },
                { icon: Calendar, label: 'Mes rendez-vous' },
                { icon: Bell, label: 'Annonces & actualités' },
                { icon: HelpCircle, label: 'FAQ' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      item.active
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Support Card */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Besoin d'aide ?</span>
              </div>
              <p className="text-sm text-blue-800 mb-3">
                Consultez notre FAQ ou contactez le support.
              </p>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition flex items-center gap-1">
                Contacter le support <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-2xl p-8 mb-8">
              <h1 className="text-4xl font-bold mb-2">Tableau de bord</h1>
              <p className="text-blue-100">Bienvenue Marie 👋</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className={`bg-white rounded-lg p-6 ${stat.border}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <Link href="#" className="text-sm text-blue-600 hover:text-blue-700 transition mt-4 inline-flex items-center gap-1">
                      Voir tous les dossiers <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Shortcuts */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Raccourcis</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {shortcuts.map((shortcut) => {
                  const Icon = shortcut.icon;
                  return (
                    <Link key={shortcut.label} href={shortcut.href}>
                      <div className={`${shortcut.color} rounded-lg p-6 hover:shadow-lg transition cursor-pointer`}>
                        <Icon className="w-8 h-8 mb-3" />
                        <p className="font-semibold">{shortcut.label}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Recent Dossiers */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Mes dossiers récents</h2>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Référence</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Titre</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Statut</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentDossiers.map((dossier) => (
                      <tr key={dossier.ref} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <Link href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                            {dossier.ref}
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-gray-900 font-medium">{dossier.title}</p>
                            <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                              <div
                                className="h-full bg-gradient-to-r from-blue-600 to-teal-600 rounded-full"
                                style={{ width: `${dossier.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{dossier.progress}%</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${dossier.statusColor}`}>
                            {dossier.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{dossier.date}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition">
                              Voir le dossier
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                              <MoreVertical className="w-5 h-5 text-gray-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link href="#" className="text-blue-600 hover:text-blue-700 font-semibold mt-4 inline-flex items-center gap-1">
                Voir tous mes dossiers <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function EspaceCitoyenPage() {
  return (
    <ProtectedView>
      <DashboardContent />
    </ProtectedView>
  );
}
