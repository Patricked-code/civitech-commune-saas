import { InfoGrid, PublicPageShell } from '../../../components/PublicPageShell';

const services = [
  { title: 'Etat civil', text: 'Naissance, copie d acte, deces, mariage et suivi des demandes associees.' },
  { title: 'Accueil citoyen', text: 'Orientation, information sur les pieces a fournir et accompagnement des usagers.' },
  { title: 'Administration generale', text: 'Organisation des procedures, traitement des dossiers et coordination des services.' },
  { title: 'Relation usager', text: 'Espace personnel, historique, notifications et suivi des demandes en ligne.' },
];

export default function ServicesPage() {
  return (
    <PublicPageShell
      title="Services municipaux"
      description="Une presentation claire des services progressivement relies au portail numerique de Niakara."
      primaryCta={{ href: '/commune/demarches', label: 'Demarrer une demarche' }}
      secondaryCta={{ href: '/commune/contact', label: 'Contacter la commune' }}
    >
      <InfoGrid items={services} />
    </PublicPageShell>
  );
}
