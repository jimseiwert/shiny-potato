import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Forum() {
  const { user } = await getSession();
  return <div>Hello {user.name} on forum</div>;
}, { returnTo: '/member/forum' })