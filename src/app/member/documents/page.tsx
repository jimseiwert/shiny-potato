
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Documents() {
  const { user } = await getSession();
  return <div>Hello {user.name} on documents</div>;
}, { returnTo: '/memebr.documents' })