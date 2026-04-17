const { getPrismaClient } = require('../db/prisma');
const { dossiers } = require('../data/seedData');

async function addInternalComment(reference, payload) {
  const prisma = getPrismaClient();

  if (!prisma) {
    const dossier = dossiers.find((item) => item.reference === reference);
    if (!dossier) return null;
    const event = {
      id: 'evt-' + Date.now(),
      eventType: 'INTERNAL_COMMENT',
      eventLabel: 'Internal processing comment',
      payloadJson: JSON.stringify({ comment: payload.comment || '', visibility: 'internal' }),
    };
    dossier.events = dossier.events || [];
    dossier.events.push(event);
    return event;
  }

  const existing = await prisma.dossier.findUnique({ where: { reference } });
  if (!existing) return null;

  return prisma.dossierEvent.create({
    data: {
      dossierId: existing.id,
      actorUserId: payload.actorUserId,
      eventType: 'INTERNAL_COMMENT',
      eventLabel: 'Internal processing comment',
      payloadJson: JSON.stringify({ comment: payload.comment || '', visibility: 'internal' }),
    },
  });
}

module.exports = {
  addInternalComment,
};
