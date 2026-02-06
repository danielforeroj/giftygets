import { Prisma } from '@prisma/client';

export function toPrismaJson(value: unknown): Prisma.InputJsonValue {
  try {
    return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
  } catch {
    throw new Error('Invalid JSON payload for Prisma persistence');
  }
}
