import { notFound } from 'next/navigation';
import AutomationTestUI from '../../components/AutomationTestUI';
import { requirePagePermission } from '../../../lib/auth/session';
import { getServerEnv } from '../../../lib/env';

export const dynamic = 'force-dynamic';

export default async function AdminAutomationPage() {
  await requirePagePermission('automation:run');

  if (!getServerEnv().ENABLE_ADMIN_AUTOMATION) {
    notFound();
  }

  return <AutomationTestUI />;
}
