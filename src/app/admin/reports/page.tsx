import AuthLayout from '@/app/layouts/authLayout';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Reports() {
  const { user } = await getSession();
  return <AuthLayout><div>Hello {user.name} on reports</div></AuthLayout>;
}, { returnTo: '/admin/reports' })