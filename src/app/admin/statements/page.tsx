import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Dashboard() {
  const { user } = await getSession();
  return <div>Hello {user.name} on dashboard</div>;
}, { returnTo: '/admin/statements' })