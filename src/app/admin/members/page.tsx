import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Members() {
  const { user } = await getSession();
  return <div>Hello {user.name} on members</div>;
}, { returnTo: '/admin/memebrs' })