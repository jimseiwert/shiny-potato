import AuthLayout from '@/app/layouts/authLayout';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Bulletins() {
  const { user } = await getSession();
  return <AuthLayout><div>Hello {user.name} on bulletins</div></AuthLayout>;
}, { returnTo: '/admin/bulletins' })