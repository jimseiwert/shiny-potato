import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Reports() {
  const { user } = await getSession();
  return <div>Hello {user.name} on reports</div>;
}, { returnTo: '/admin/reports' })