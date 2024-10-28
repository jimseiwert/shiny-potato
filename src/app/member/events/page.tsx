import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Events() {
  const { user } = await getSession();
  return <div>Hello {user.name} on events</div>;
}, { returnTo: '/member/events' })