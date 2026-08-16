import { hash } from 'bcryptjs';
import { RoleName } from '@prisma/client';
import { getPrisma } from '../lib/db';

async function main() {
  const prisma = getPrisma();

  for (const role of Object.values(RoleName)) {
    await prisma.role.upsert({
      where: { name: role },
      update: {},
      create: {
        name: role,
        description: role
          .split('_')
          .map((word) => word[0] + word.slice(1).toLowerCase())
          .join(' '),
      },
    });
  }

  const email = process.env.ADMIN_DEV_EMAIL;
  const password = process.env.ADMIN_DEV_PASSWORD;

  if (email && password) {
    const role = await prisma.role.findUniqueOrThrow({ where: { name: 'SUPER_ADMIN' } });
    await prisma.user.upsert({
      where: { email },
      update: {
        roleId: role.id,
      },
      create: {
        email,
        name: 'Development Admin',
        passwordHash: await hash(password, 12),
        roleId: role.id,
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await getPrisma().$disconnect();
  });
