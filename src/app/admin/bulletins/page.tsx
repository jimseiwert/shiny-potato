import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Bulletins() {
  const { user } = await getSession();
  return <div>Hello {user.name} on bulletins</div>;
}, { returnTo: '/admin/bulletins' })