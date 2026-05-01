'use client';

import React from 'react';
import Card from './Card';
import Badge from './Badge';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';

interface DossierStats {
  total: number;
  draft: number;
  submitted: number;
  inProgress: number;
  completed: number;
}

interface DossierDashboardProps {
  stats?: DossierStats;
  recentDossiers?: Array<{
    id: string;
    reference: string;
    procedure: string;
    status: string;
    createdAt: string;
  }>;
}

const statusColors = {
  DRAFT: '#94a3b8',
  SUBMITTED: '#3b82f6',
  IN_PROGRESS: '#f59e0b',
  COMPLETED: '#10b981',
  REJECTED: '#ef4444',
};

const statusLabels = {
  DRAFT: 'Brouillon',
  SUBMITTED: 'Soumis',
  IN_PROGRESS: 'En cours',
  COMPLETED: 'Complété',
  REJECTED: 'Rejeté',
};

export default function DossierDashboard({ 
  stats = {
    total: 24,
    draft: 5,
    submitted: 8,
    inProgress: 7,
    completed: 4,
  },
  recentDossiers = []
}: DossierDashboardProps) {
  const chartData = [
    { name: 'Brouillons', value: stats.draft, fill: statusColors.DRAFT },
    { name: 'Soumis', value: stats.submitted, fill: statusColors.SUBMITTED },
    { name: 'En cours', value: stats.inProgress, fill: statusColors.IN_PROGRESS },
    { name: 'Complétés', value: stats.completed, fill: statusColors.COMPLETED },
  ];

  const timelineData = [
    { month: 'Jan', dossiers: 2 },
    { month: 'Fév', dossiers: 4 },
    { month: 'Mar', dossiers: 3 },
    { month: 'Avr', dossiers: 5 },
    { month: 'Mai', dossiers: 6 },
    { month: 'Juin', dossiers: 4 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total de dossiers</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stats.total}</p>
            </div>
            <FileText className="w-10 h-10 text-primary-600 opacity-20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">En cours</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stats.inProgress}</p>
            </div>
            <Clock className="w-10 h-10 text-yellow-600 opacity-20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Complétés</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stats.completed}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600 opacity-20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Brouillons</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stats.draft}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-slate-600 opacity-20" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Distribution des dossiers</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Line Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Évolution des dossiers</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="dossiers" 
                stroke="#0284c7" 
                strokeWidth={2}
                dot={{ fill: '#0284c7', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Dossiers Table */}
      {recentDossiers.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Dossiers récents</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Référence</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Démarche</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Statut</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentDossiers.map((dossier) => (
                  <tr key={dossier.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium text-slate-900">{dossier.reference}</td>
                    <td className="py-3 px-4 text-slate-600">{dossier.procedure}</td>
                    <td className="py-3 px-4">
                      <Badge variant="info">
                        {statusLabels[dossier.status as keyof typeof statusLabels] || dossier.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {new Date(dossier.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
