import AuthLayout from '@/app/layouts/authLayout';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Applications() {
  const { user } = await getSession();
  return <AuthLayout><div>Hello {user.name} on applications</div></AuthLayout>;
}, { returnTo: '/admin/applications' })