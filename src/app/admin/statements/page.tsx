import AuthLayout from '@/app/layouts/authLayout';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Statements() {
  const { user } = await getSession();
  return <AuthLayout><div>Hello {user.name} on statements</div></AuthLayout>;
}, { returnTo: '/admin/statements' })