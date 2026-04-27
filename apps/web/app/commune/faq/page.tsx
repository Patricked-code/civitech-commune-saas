import { PublicPageShell } from '../../../components/PublicPageShell';

const questions = [
  {
    question: 'Comment creer un compte citoyen ?',
    answer: 'Depuis la page Connexion / Inscription, un citoyen peut creer son compte avec son nom, son prenom, son email et un mot de passe.',
  },
  {
    question: 'Comment suivre une demarche ?',
    answer: 'Apres connexion, l espace citoyen permet de consulter les brouillons, les dossiers soumis, les statuts et les prochaines etapes.',
  },
  {
    question: 'Quelles demarches sont prioritaires ?',
    answer: 'Les premieres demarches ciblees sont la declaration de naissance, la demande de copie d acte, la declaration de deces et l organisation de mariage.',
  },
  {
    question: 'Les pieces jointes sont-elles deja gerees ?',
    answer: 'Le socle permet deja de preparer et rattacher des pieces a un dossier. Le stockage binaire reel sera consolide dans une prochaine phase.',
  },
];

export default function FaqPage() {
  return (
    <PublicPageShell
      title="Questions frequentes"
      description="Une premiere base de reponses pour guider les citoyens dans l utilisation du portail numerique communal."
      primaryCta={{ href: '/auth/login', label: 'Me connecter' }}
      secondaryCta={{ href: '/commune/contact', label: 'Contacter la commune' }}
    >
      <div style={{ display: 'grid', gap: 16 }}>
        {questions.map((item) => (
          <article key={item.question} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 22 }}>
            <h2 style={{ marginTop: 0, fontSize: 21 }}>{item.question}</h2>
            <p style={{ color: '#475569', lineHeight: 1.75, marginBottom: 0 }}>{item.answer}</p>
          </article>
        ))}
      </div>
    </PublicPageShell>
  );
}
