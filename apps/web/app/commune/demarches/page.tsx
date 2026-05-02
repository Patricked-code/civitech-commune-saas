"use client";

import Link from "next/link";
import { useState } from "react";
import { FileText, ArrowRight, Search, Clock } from "lucide-react";
import { ProtectedView } from "../../../components/ProtectedView";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Card, CardBody } from "../../../components/ui/Card";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Badge } from "../../../components/ui/Badge";

interface Procedure {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: "facile" | "moyen" | "complexe";
  icon: string;
}

const mockProcedures: Procedure[] = [
  {
    id: "1",
    title: "Déclaration de naissance",
    description: "Déclarez la naissance de votre enfant auprès de la mairie",
    category: "État Civil",
    duration: "2-3 jours",
    difficulty: "facile",
    icon: "👶",
  },
  {
    id: "2",
    title: "Demande de copie d'acte",
    description: "Obtenez une copie de votre acte de naissance, mariage ou décès",
    category: "État Civil",
    duration: "1-2 jours",
    difficulty: "facile",
    icon: "📄",
  },
  {
    id: "3",
    title: "Déclaration de décès",
    description: "Déclarez le décès d'une personne auprès de la mairie",
    category: "État Civil",
    duration: "1 jour",
    difficulty: "moyen",
    icon: "🕯️",
  },
  {
    id: "4",
    title: "Organisation de mariage",
    description: "Organisez votre mariage civil à la mairie",
    category: "État Civil",
    duration: "1-2 mois",
    difficulty: "complexe",
    icon: "💍",
  },
  {
    id: "5",
    title: "Certificat de résidence",
    description: "Obtenez un certificat de résidence pour vos démarches administratives",
    category: "Certificats",
    duration: "1 jour",
    difficulty: "facile",
    icon: "🏠",
  },
  {
    id: "6",
    title: "Autorisation de travaux",
    description: "Demandez une autorisation pour effectuer des travaux sur votre propriété",
    category: "Urbanisme",
    duration: "2-4 semaines",
    difficulty: "complexe",
    icon: "🏗️",
  },
];

const categories = ["Tous", "État Civil", "Certificats", "Urbanisme"];
const difficultyColors = {
  facile: "success",
  moyen: "warning",
  complexe: "danger",
} as const;

export default function DemarchesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredProcedures = mockProcedures.filter((proc) => {
    const matchesSearch =
      proc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || proc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <ProtectedView>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50">
        <PageHeader
          badge="Services disponibles"
          title="Démarches en ligne"
          subtitle="Accédez à toutes les démarches municipales"
          backgroundGradient="from-primary-600 to-secondary-600"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search and Filters */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2">
              <Input
                placeholder="Rechercher une démarche..."
                icon={<Search className="w-4 h-4" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select-field"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-primary-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-primary-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Procedures Grid */}
          {filteredProcedures.length === 0 ? (
            <Card>
              <CardBody className="text-center py-12">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">Aucune démarche trouvée</p>
              </CardBody>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProcedures.map((proc) => (
                <Card key={proc.id} className="hover-lift" elevated interactive>
                  <CardBody className="space-y-4 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-4xl">{proc.icon}</div>
                      <Badge variant={difficultyColors[proc.difficulty]}>
                        {proc.difficulty.charAt(0).toUpperCase() + proc.difficulty.slice(1)}
                      </Badge>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 text-lg">{proc.title}</h3>
                      <p className="text-sm text-slate-600 mt-2">{proc.description}</p>
                    </div>

                    <div className="space-y-2 text-sm text-slate-600 border-t border-slate-200 pt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase">Catégorie</span>
                        <span>{proc.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary-600" />
                        <span>Durée estimée: {proc.duration}</span>
                      </div>
                    </div>

                    <Link href={`/commune/demarches/${proc.id}`} className="w-full">
                      <Button variant="primary" fullWidth icon={<ArrowRight className="w-4 h-4" />}>
                        Commencer
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}

          {/* Info Section */}
          <Card elevated className="mt-12 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
            <CardBody className="space-y-3">
              <h3 className="font-semibold text-slate-900">💡 Besoin d'aide ?</h3>
              <p className="text-slate-700">
                Toutes les démarches sont disponibles en ligne pour votre confort. Vous pouvez les commencer, les sauvegarder comme brouillon et les reprendre quand vous le souhaitez.
              </p>
              <div className="flex gap-3 pt-2">
                <Button variant="primary" size="sm">
                  Consulter nos guides
                </Button>
                <Button variant="outline" size="sm">
                  Nous contacter
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>
    </ProtectedView>
  );
}
