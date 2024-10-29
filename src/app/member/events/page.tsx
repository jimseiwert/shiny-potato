import AuthLayout from '@/app/layouts/authLayout';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Events() {
  const { user } = await getSession();
  return <AuthLayout><div>Hello {user.name} on events</div></AuthLayout>;
}, { returnTo: '/member/events' })