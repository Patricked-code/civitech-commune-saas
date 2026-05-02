"use client";

import { useState } from "react";
import { MessageSquare, Send, Paperclip, Search } from "lucide-react";
import { ProtectedView } from "../../../components/ProtectedView";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Card, CardBody, CardHeader } from "../../../components/ui/Card";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Badge } from "../../../components/ui/Badge";

interface Message {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  timestamp: string;
  read: boolean;
  hasAttachment: boolean;
}

interface Conversation {
  id: string;
  messages: Array<{
    id: string;
    author: string;
    content: string;
    timestamp: string;
    isFromUser: boolean;
  }>;
}

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "Service État Civil",
    subject: "Concernant votre déclaration de naissance",
    preview: "Nous avons bien reçu votre dossier. Nous vous confirmons que...",
    timestamp: "Aujourd'hui 14:30",
    read: false,
    hasAttachment: true,
  },
  {
    id: "2",
    sender: "Mairie de Niakara",
    subject: "Mise à jour sur votre demande",
    preview: "Votre demande est actuellement en cours de traitement...",
    timestamp: "Hier 10:15",
    read: true,
    hasAttachment: false,
  },
  {
    id: "3",
    sender: "Service État Civil",
    subject: "Demande de documents complémentaires",
    preview: "Pour finaliser votre dossier, nous avons besoin de...",
    timestamp: "Il y a 3 jours",
    read: true,
    hasAttachment: false,
  },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [replyText, setReplyText] = useState("");

  const filteredMessages = messages.filter(
    (m) =>
      m.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendReply = () => {
    if (replyText.trim()) {
      // TODO: Implement API call to send message
      setReplyText("");
    }
  };

  return (
    <ProtectedView>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50">
        <PageHeader
          badge="Correspondances"
          title="Messages"
          subtitle="Échangez avec les services municipaux"
          backgroundGradient="from-primary-600 to-secondary-600"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1">
              <Card elevated>
                <CardHeader>
                  <h2 className="text-lg font-bold text-slate-900">Conversations</h2>
                </CardHeader>
                <CardBody className="p-0">
                  <div className="p-4 border-b border-slate-200">
                    <Input
                      placeholder="Rechercher..."
                      icon={<Search className="w-4 h-4" />}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="divide-y divide-slate-200 max-h-96 overflow-y-auto">
                    {filteredMessages.length === 0 ? (
                      <div className="p-4 text-center text-slate-600">
                        <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-sm">Aucun message trouvé</p>
                      </div>
                    ) : (
                      filteredMessages.map((message) => (
                        <button
                          key={message.id}
                          onClick={() => setSelectedMessage(message)}
                          className={`w-full text-left p-4 hover:bg-slate-50 transition-colors ${
                            selectedMessage?.id === message.id ? "bg-primary-50 border-l-4 border-l-primary-600" : ""
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className={`font-semibold text-sm ${!message.read ? "text-slate-900" : "text-slate-700"}`}>
                              {message.sender}
                            </p>
                            {!message.read && <Badge variant="primary">Nouveau</Badge>}
                          </div>
                          <p className="text-xs text-slate-600 truncate">{message.subject}</p>
                          <p className="text-xs text-slate-500 mt-1">{message.timestamp}</p>
                        </button>
                      ))
                    )}
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <Card elevated>
                  <CardHeader className="border-b-2 border-slate-200">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{selectedMessage.subject}</h3>
                        <p className="text-sm text-slate-600 mt-1">De: {selectedMessage.sender}</p>
                      </div>
                      <p className="text-xs text-slate-500">{selectedMessage.timestamp}</p>
                    </div>
                  </CardHeader>

                  <CardBody className="space-y-6">
                    {/* Message Content */}
                    <div className="prose prose-sm max-w-none">
                      <p className="text-slate-700 leading-relaxed">
                        Merci de nous avoir contactés. Nous avons bien reçu votre demande et nous la traitons actuellement.
                        <br />
                        <br />
                        Voici les informations concernant votre dossier :
                        <br />
                        - Référence: REF-001
                        <br />
                        - Statut: En cours de traitement
                        <br />
                        - Prochaine étape: Vérification des documents
                        <br />
                        <br />
                        Nous vous tiendrons informé de l'avancement de votre demande.
                      </p>
                    </div>

                    {/* Attachments */}
                    {selectedMessage.hasAttachment && (
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-slate-900 mb-3">Pièces jointes</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 p-2 bg-white rounded border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                            <Paperclip className="w-4 h-4 text-slate-600" />
                            <span className="text-sm text-slate-700">document.pdf</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Reply Section */}
                    <div className="border-t border-slate-200 pt-6">
                      <h4 className="font-semibold text-slate-900 mb-4">Répondre</h4>
                      <div className="space-y-4">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Écrivez votre réponse..."
                          className="textarea-field"
                          rows={4}
                        />
                        <div className="flex gap-3 justify-between">
                          <Button variant="ghost" size="sm" icon={<Paperclip className="w-4 h-4" />}>
                            Joindre un fichier
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            icon={<Send className="w-4 h-4" />}
                            onClick={handleSendReply}
                            disabled={!replyText.trim()}
                          >
                            Envoyer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ) : (
                <Card>
                  <CardBody className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600">Sélectionnez un message pour le consulter</p>
                  </CardBody>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </ProtectedView>
  );
}
