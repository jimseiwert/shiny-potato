import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Applications() {
  const { user } = await getSession();
  return <div>Hello {user.name} on applications</div>;
}, { returnTo: '/admin/applications' })