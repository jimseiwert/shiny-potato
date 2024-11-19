import { Claim } from '@/server/enums/claims';
import React from 'react';
import { auth0 } from "@/lib/auth0"
import UnAuthorized from '@/app/unauthorized';

const withAuth = (Component: React.FC<any>, RequiredClaim?: Claim) => {

  return async function Authenticated(props: any) {
    const session = await auth0.getSession()

    if(!session) {
      return <UnAuthorized/>
    }

    if(RequiredClaim) {
      if(session.user.claims.includes(RequiredClaim)) {
        return <Component {...props} />;
      }
      return <UnAuthorized/>
    }
    return <Component {...props} />;
  };
};

export default withAuth;
