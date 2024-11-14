import { Claim } from '@/server/enums/claims';
import React from 'react';
import { getSession } from '@auth0/nextjs-auth0';
import UnAuthorized from '@/app/unauthorized';

const withAuth = (Component: React.FC<any>, RequiredClaim: Claim) => {

  return async function Authenticated(props: any) {
    const { user } = await getSession();

    if(RequiredClaim) {
      if(user.claims.includes(RequiredClaim)) {
        return <Component {...props} />;
      }
      return <UnAuthorized/>
    }
    return <Component {...props} />;
  };
};

export default withAuth;
