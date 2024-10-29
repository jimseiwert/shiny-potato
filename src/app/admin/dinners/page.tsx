
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Dinners() {
  const { user } = await getSession();
  return <div>Hello {user.name} on dinners</div>;
}, { returnTo: '/admin/dinners' })