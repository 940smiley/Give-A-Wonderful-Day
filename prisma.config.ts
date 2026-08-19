import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  // @ts-ignore: Prisma 7 seed config isn't in Prisma 6 types yet
  seed: {
    run: 'tsx prisma/seed.ts',
  },
});