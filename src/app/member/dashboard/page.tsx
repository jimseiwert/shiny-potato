import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Member() {
  const { user } = await getSession();
  return <div>Hello {user.name} on member dashboard</div>;
}, { returnTo: '/member/dashboard' })