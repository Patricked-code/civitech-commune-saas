const { getPrismaClient } = require('../db/prisma');
const { dossiers } = require('../data/seedData');

async function updateDossierDraftPayload(reference, payload) {
  const prisma = getPrismaClient();
  const formData = payload.formData || {};

  if (!prisma) {
    const dossier = dossiers.find((item) => item.reference === reference);
    if (!dossier) return null;
    dossier.formData = formData;
    dossier.events = dossier.events || [];
    dossier.events.push({
      id: 'evt-' + Date.now(),
      eventType: 'DOSSIER_DRAFT_UPDATED',
      eventLabel: 'Dossier draft updated',
      payloadJson: JSON.stringify(formData),
    });
    return dossier;
  }

  const existing = await prisma.dossier.findUnique({ where: { reference } });
  if (!existing) return null;

  await prisma.dossierEvent.create({
    data: {
      dossierId: existing.id,
      actorUserId: payload.actorUserId,
      eventType: 'DOSSIER_DRAFT_UPDATED',
      eventLabel: 'Dossier draft updated',
      payloadJson: JSON.stringify(formData),
    },
  });

  return prisma.dossier.findUnique({
    where: { reference },
    include: {
      procedure: true,
      citizenUser: true,
      documents: true,
      events: { orderBy: { createdAt: 'asc' } },
    },
  });
}

module.exports = {
  updateDossierDraftPayload,
};
