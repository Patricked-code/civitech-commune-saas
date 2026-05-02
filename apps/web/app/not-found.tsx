import Link from "next/link";
import { Button } from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50 flex items-center justify-center px-4">
      <Card elevated className="max-w-md w-full">
        <CardBody className="text-center space-y-6 py-12">
          <div className="text-6xl font-display font-bold text-gradient">404</div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Page non trouvée</h1>
            <p className="text-slate-600">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            <Link href="/">
              <Button variant="primary">Retour à l'accueil</Button>
            </Link>
            <Link href="/commune/espace-citoyen">
              <Button variant="outline">Mon espace</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
