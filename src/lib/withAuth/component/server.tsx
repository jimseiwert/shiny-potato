"use server";
import { Claim } from '@/server/enums/claims';
import React from 'react';
import { auth0 } from "@/lib/auth0"


const withComponentAuth = (Component: React.FC<any>, RequiredClaim?: Claim) => {

  return async function Authenticated(props: any) {
    return <Component {...props} />;
    const session = await auth0.getSession()

    if(!session) {
      return null;
    }

    if(RequiredClaim) {
      if(session.user.claims.includes(RequiredClaim)) {
        return <Component {...props} />;
      }
      return null;
    }
    return <Component {...props} />;
  };
};

export default withComponentAuth;
