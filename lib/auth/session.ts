import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import type { RoleName } from '@prisma/client';
import { authOptions } from './options';
import { hasPermission, type Permission } from './permissions';

export type AuthenticatedUser = {
  id: string;
  email?: string | null;
  name?: string | null;
  role: RoleName;
};

export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !session.user.role) {
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: session.user.role,
  };
}

export async function requirePagePermission(permission: Permission): Promise<AuthenticatedUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/signin');
  }

  if (!hasPermission(user.role, permission)) {
    redirect('/admin/unauthorized');
  }

  return user;
}

export async function requireApiPermission(permission: Permission): Promise<AuthenticatedUser> {
  const user = await getCurrentUser();
  if (!user || !hasPermission(user.role, permission)) {
    throw new Error('Unauthorized.');
  }

  return user;
}
