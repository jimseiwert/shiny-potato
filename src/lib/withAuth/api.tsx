import { Claim } from '@/server/enums/claims';
import { getSession } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

const withApiAuth = (handler: any, RequiredClaim: Claim) => {

  return async function Authenticated(req: NextRequest, res: NextResponse) {

    if(!RequiredClaim) {
      return handler(req, res);
    }


    const { user } = await getSession();

    if(RequiredClaim) {
      if(user.claims.includes(RequiredClaim)) {
        return handler(req, res);
      }
      return NextResponse.json(
        { error: 'not_authenticated', description: 'The user does not have an active session or is not authenticated' },
        { status: 401 }
      );
    }
  };
};

export default withApiAuth;
