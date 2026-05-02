"use client";

import { useState } from "react";
import { FileText, Download, Eye, Search, Filter, FolderOpen } from "lucide-react";
import { ProtectedView } from "../../../components/ProtectedView";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Card, CardBody, CardHeader } from "../../../components/ui/Card";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Badge } from "../../../components/ui/Badge";

interface Document {
  id: string;
  title: string;
  category: string;
  description: string;
  fileSize: string;
  uploadDate: string;
  type: "pdf" | "doc" | "image" | "zip";
}

const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Guide de la déclaration de naissance",
    category: "État Civil",
    description: "Guide complet pour effectuer une déclaration de naissance",
    fileSize: "2.4 MB",
    uploadDate: "15 avril 2024",
    type: "pdf",
  },
  {
    id: "2",
    title: "Formulaire de demande de certificat",
    category: "État Civil",
    description: "Formulaire à remplir pour demander un certificat de résidence",
    fileSize: "1.2 MB",
    uploadDate: "10 avril 2024",
    type: "pdf",
  },
  {
    id: "3",
    title: "Pièces justificatives requises",
    category: "Général",
    description: "Liste des documents à fournir pour les différentes démarches",
    fileSize: "856 KB",
    uploadDate: "5 avril 2024",
    type: "pdf",
  },
  {
    id: "4",
    title: "Tarifs des services municipaux 2024",
    category: "Tarification",
    description: "Tarifs applicables pour les services de la mairie",
    fileSize: "1.8 MB",
    uploadDate: "1er avril 2024",
    type: "pdf",
  },
  {
    id: "5",
    title: "Horaires d'ouverture",
    category: "Général",
    description: "Horaires d'accueil des services municipaux",
    fileSize: "245 KB",
    uploadDate: "25 mars 2024",
    type: "doc",
  },
  {
    id: "6",
    title: "Modèles de lettres",
    category: "Modèles",
    description: "Modèles de lettres pour vos correspondances avec la mairie",
    fileSize: "3.1 MB",
    uploadDate: "20 mars 2024",
    type: "zip",
  },
];

const categories = ["Tous", "État Civil", "Général", "Tarification", "Modèles"];

const typeIcons = {
  pdf: "📄",
  doc: "📋",
  image: "🖼️",
  zip: "📦",
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(mockDocuments);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (docId: string) => {
    // TODO: Implement download logic
    console.log("Downloading document:", docId);
  };

  const handlePreview = (docId: string) => {
    // TODO: Implement preview logic
    console.log("Previewing document:", docId);
  };

  return (
    <ProtectedView>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50">
        <PageHeader
          badge="Ressources"
          title="Documents utiles"
          subtitle="Accédez aux guides, formulaires et documents publics"
          backgroundGradient="from-primary-600 to-secondary-600"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search and Filters */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2">
              <Input
                placeholder="Rechercher un document..."
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

          {/* Documents Grid */}
          {filteredDocuments.length === 0 ? (
            <Card>
              <CardBody className="text-center py-12">
                <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">Aucun document trouvé</p>
              </CardBody>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="hover-lift" elevated>
                  <CardBody className="space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-3xl">{typeIcons[doc.type]}</div>
                      <Badge variant="primary">{doc.category}</Badge>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 line-clamp-2">{doc.title}</h3>
                      <p className="text-sm text-slate-600 mt-2 line-clamp-2">{doc.description}</p>
                    </div>

                    <div className="space-y-1 text-xs text-slate-500">
                      <p>Taille: {doc.fileSize}</p>
                      <p>Ajouté le: {doc.uploadDate}</p>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-slate-200">
                      <Button
                        variant="outline"
                        size="sm"
                        fullWidth
                        icon={<Eye className="w-4 h-4" />}
                        onClick={() => handlePreview(doc.id)}
                      >
                        Aperçu
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        icon={<Download className="w-4 h-4" />}
                        onClick={() => handleDownload(doc.id)}
                      >
                        Télécharger
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}

          {/* Info Section */}
          <Card elevated className="mt-12 bg-gradient-to-r from-blue-50 to-primary-50 border-primary-200">
            <CardBody className="space-y-3">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-600" />
                Besoin d'aide ?
              </h3>
              <p className="text-slate-700">
                Si vous ne trouvez pas le document que vous cherchez, n'hésitez pas à nous contacter via la page Messages ou à vous présenter directement aux services municipaux.
              </p>
              <div className="flex gap-3 pt-2">
                <Button variant="primary" size="sm">
                  Nous contacter
                </Button>
                <Button variant="outline" size="sm">
                  Horaires d'ouverture
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>
    </ProtectedView>
  );
}
