"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Save, Edit2, Lock } from "lucide-react";
import { ProtectedView } from "../../../components/ProtectedView";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Card, CardBody, CardHeader } from "../../../components/ui/Card";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Alert } from "../../../components/ui/Alert";
import { Badge } from "../../../components/ui/Badge";
import { useSessionContext } from "../../../components/SessionProvider";

export default function ProfilPage() {
  const { user } = useSessionContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
  });

  const handleSave = () => {
    // TODO: Implement profile update API call
    setIsEditing(false);
  };

  return (
    <ProtectedView>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50">
        <PageHeader
          badge="Paramètres"
          title="Mon profil"
          subtitle="Gérez vos informations personnelles"
          backgroundGradient="from-primary-600 to-secondary-600"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <Card elevated>
                <CardBody className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white mx-auto mb-4">
                    <User className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">{user?.email}</p>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 uppercase">Type d'utilisateur</p>
                    <p className="text-sm font-medium text-slate-900 mt-1">
                      {user?.userType === "citizen" ? "Citoyen" : "Agent"}
                    </p>
                  </div>
                  {user?.roleCodes && user.roleCodes.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <p className="text-xs font-semibold text-slate-600 uppercase mb-2">Rôles</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {user.roleCodes.map((role) => (
                          <Badge key={role} variant="primary">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card elevated>
                <CardHeader className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">Informations personnelles</h2>
                  <Button
                    variant={isEditing ? "secondary" : "primary"}
                    size="sm"
                    icon={isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  >
                    {isEditing ? "Enregistrer" : "Modifier"}
                  </Button>
                </CardHeader>

                <CardBody className="space-y-6">
                  {!isEditing && (
                    <Alert variant="info" title="Mode lecture">
                      Cliquez sur "Modifier" pour mettre à jour vos informations.
                    </Alert>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Prénom"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      disabled={!isEditing}
                      icon={<User className="w-4 h-4" />}
                    />
                    <Input
                      label="Nom"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    icon={<Mail className="w-4 h-4" />}
                  />

                  <Input
                    label="Téléphone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    icon={<Phone className="w-4 h-4" />}
                  />

                  <Input
                    label="Adresse"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                    icon={<MapPin className="w-4 h-4" />}
                  />

                  {isEditing && (
                    <div className="flex gap-3 pt-4">
                      <Button variant="primary" onClick={handleSave}>
                        Enregistrer les modifications
                      </Button>
                      <Button variant="ghost" onClick={() => setIsEditing(false)}>
                        Annuler
                      </Button>
                    </div>
                  )}
                </CardBody>
              </Card>

              {/* Security Section */}
              <Card elevated>
                <CardHeader>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Sécurité
                  </h3>
                </CardHeader>
                <CardBody className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Mot de passe</p>
                      <p className="text-sm text-slate-600">Changez votre mot de passe régulièrement</p>
                    </div>
                    <Button variant="outline">Modifier</Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </ProtectedView>
  );
}
