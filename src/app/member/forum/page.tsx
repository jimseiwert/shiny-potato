// import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

import withAuth from "@/lib/withAuth/page/server";

async function Forum() {
  return <div>Hello on forum</div>;
}

export default withAuth(Forum);