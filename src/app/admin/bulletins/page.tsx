
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';

export default withPageAuthRequired(async function Bulletins() {
  const { user } = await getSession();
  return <div>Hello {user.name} on bulletins
  <Link href="/admin/bulletins/create" className="btn btn-primary">
    New Bulletin</Link>
  </div>;
}, { returnTo: '/admin/bulletins' })