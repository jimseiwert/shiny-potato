import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Profile() {
  const { user } = await getSession();
  return <div>Hello {user.name}</div>;
}, { returnTo: '/member/profile' })