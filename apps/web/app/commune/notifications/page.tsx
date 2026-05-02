"use client";

import { useState } from "react";
import { Bell, CheckCircle, AlertCircle, Info, Trash2 } from "lucide-react";
import { ProtectedView } from "../../../components/ProtectedView";
import { Button } from "../../../components/ui/Button";
import { Card, CardBody } from "../../../components/ui/Card";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Badge } from "../../../components/ui/Badge";
import { Dropdown } from "../../../components/ui/Dropdown";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "error" | "info";
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Dossier approuvé",
    message: "Votre demande de déclaration de naissance a été approuvée et est prête à être retirée.",
    type: "success",
    timestamp: "Il y a 2 heures",
    read: false,
    actionUrl: "/commune/dossier/REF-001",
  },
  {
    id: "2",
    title: "Document manquant",
    message: "Veuillez fournir une copie de votre pièce d'identité pour continuer le traitement.",
    type: "warning",
    timestamp: "Il y a 5 heures",
    read: false,
    actionUrl: "/commune/dossier/REF-002",
  },
  {
    id: "3",
    title: "Nouvelle démarche disponible",
    message: "Une nouvelle démarche 'Demande de certificat de résidence' est maintenant disponible.",
    type: "info",
    timestamp: "Il y a 1 jour",
    read: true,
  },
  {
    id: "4",
    title: "Dossier rejeté",
    message: "Votre dossier a été rejeté. Veuillez consulter les détails pour plus d'informations.",
    type: "error",
    timestamp: "Il y a 2 jours",
    read: true,
    actionUrl: "/commune/dossier/REF-003",
  },
];

const iconMap = {
  success: <CheckCircle className="w-5 h-5 text-green-600" />,
  warning: <AlertCircle className="w-5 h-5 text-yellow-600" />,
  error: <AlertCircle className="w-5 h-5 text-red-600" />,
  info: <Info className="w-5 h-5 text-blue-600" />,
};

const bgColorMap = {
  success: "bg-green-50",
  warning: "bg-yellow-50",
  error: "bg-red-50",
  info: "bg-blue-50",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState("all");

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <ProtectedView>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50">
        <PageHeader
          badge="Alertes et mises à jour"
          title="Notifications"
          subtitle={`Vous avez ${unreadCount} notification${unreadCount > 1 ? "s" : ""} non lue${unreadCount > 1 ? "s" : ""}`}
          backgroundGradient="from-primary-600 to-secondary-600"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex gap-2">
              <Dropdown
                trigger={<span className="font-medium">Filtrer</span>}
                items={[
                  { label: "Toutes les notifications", value: "all" },
                  { label: "Non lues", value: "unread" },
                  { label: "Lues", value: "read" },
                ]}
                onSelect={setFilter}
              />
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                Marquer tout comme lu
              </Button>
            )}
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardBody className="text-center py-12">
                  <Bell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">Aucune notification à afficher</p>
                </CardBody>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`${bgColorMap[notification.type]} ${!notification.read ? "border-l-4 border-l-primary-600" : ""}`}
                >
                  <CardBody>
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-1">{iconMap[notification.type]}</div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                          <div>
                            <h3 className="font-semibold text-slate-900">{notification.title}</h3>
                            <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                          </div>
                          {!notification.read && (
                            <Badge variant="primary" className="flex-shrink-0">
                              Nouveau
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">{notification.timestamp}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex-shrink-0 flex gap-2">
                        {notification.actionUrl && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => (window.location.href = notification.actionUrl!)}
                          >
                            Voir
                          </Button>
                        )}
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<CheckCircle className="w-4 h-4" />}
                            onClick={() => handleMarkAsRead(notification.id)}
                          />
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Trash2 className="w-4 h-4" />}
                          onClick={() => handleDelete(notification.id)}
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </ProtectedView>
  );
}
