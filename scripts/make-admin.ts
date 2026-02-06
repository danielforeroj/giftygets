import { prisma } from '../src/server/db/prisma';

async function main() {
  const email = process.argv[2];
  if (!email) throw new Error('Usage: pnpm make-admin <email>');
  await prisma.user.update({ where: { email }, data: { role: 'ADMIN' } });
  console.log(`Promoted ${email} to ADMIN`);
}

main().finally(async () => prisma.$disconnect());
