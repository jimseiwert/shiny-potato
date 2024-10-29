import AuthLayout from '@/app/layouts/authLayout';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Forum() {
  const { user } = await getSession();
  return <AuthLayout><div>Hello {user.name} on forum</div></AuthLayout>;
}, { returnTo: '/member/forum' })