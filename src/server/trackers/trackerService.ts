import { normalizedDomain } from '@/lib/url/normalize';
import { trackerSchema } from '@/lib/validation/tracker';
import { prisma } from '@/server/db/prisma';
import { isDomainAllowed } from '@/server/policy/domainAllowlist';

export async function listTrackers(userId: string) {
  return prisma.tracker.findMany({ where: { userId }, include: { rules: true }, orderBy: { createdAt: 'desc' } });
}

export async function getTracker(id: string, userId: string) {
  return prisma.tracker.findFirst({ where: { id, userId }, include: { rules: true } });
}

export async function createTracker(userId: string, payload: unknown) {
  const input = trackerSchema.parse(payload);
  if (!isDomainAllowed(input.url)) throw new Error('Domain not allowed.');

  return prisma.tracker.create({
    data: {
      userId,
      name: input.name,
      url: input.url,
      normalizedDomain: normalizedDomain(input.url),
      frequencyTier: input.frequencyTier,
      nextRunAt: new Date(),
      lastRunAt: null,
      rules: {
        create: {
          variantSize: input.variantSize,
          variantColor: input.variantColor,
          priceCapCents: input.priceCapCents
        }
      }
    },
    include: { rules: true }
  });
}

export async function updateTracker(id: string, userId: string, payload: unknown) {
  const input = trackerSchema.partial().parse(payload);
  const existing = await prisma.tracker.findFirst({ where: { id, userId } });
  if (!existing) throw new Error('Not found');

  const data: Record<string, unknown> = { ...input };
  if (input.url) {
    if (!isDomainAllowed(input.url)) throw new Error('Domain not allowed.');
    data.normalizedDomain = normalizedDomain(input.url);
  }

  const tracker = await prisma.tracker.update({ where: { id }, data });

  if (input.variantSize !== undefined || input.variantColor !== undefined || input.priceCapCents !== undefined) {
    await prisma.trackerRule.upsert({
      where: { trackerId: id },
      update: {
        variantSize: input.variantSize,
        variantColor: input.variantColor,
        priceCapCents: input.priceCapCents
      },
      create: {
        trackerId: id,
        variantSize: input.variantSize,
        variantColor: input.variantColor,
        priceCapCents: input.priceCapCents
      }
    });
  }

  return { ...tracker, rules: await prisma.trackerRule.findMany({ where: { trackerId: id } }) };
}

export async function deleteTracker(id: string, userId: string) {
  const deleted = await prisma.tracker.deleteMany({ where: { id, userId } });
  if (deleted.count === 0) throw new Error('Not found');
  return { ok: true };
}
