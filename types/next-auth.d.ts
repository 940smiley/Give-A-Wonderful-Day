import type { RoleName } from '@prisma/client';
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: RoleName;
    } & DefaultSession['user'];
  }

  interface User {
    role?: RoleName;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: RoleName;
  }
}
