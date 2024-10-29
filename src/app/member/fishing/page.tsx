import AuthLayout from '@/app/layouts/authLayout';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Fishing() {
  const { user } = await getSession();
  return <div>Hello {user.name} on fishing</div>;
}, { returnTo: '/member/fishing' })