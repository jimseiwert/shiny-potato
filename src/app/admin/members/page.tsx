
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';

export default withPageAuthRequired(async function Members() {
  const { user } = await getSession();
  return (
    <>
    <div>Hello {user.name} on members</div>
    <Link href="/admin/members/jim">Go to members</Link>
    </>
)});