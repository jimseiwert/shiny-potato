// app/api/auth/[auth0]/route.js
import { handleAuth,handleCallback, handleLogin } from '@auth0/nextjs-auth0';
import { GetClaims } from "@/server/db/queries/claims";
import { TransferAvatar } from "@/lib/avatar";

const afterCallback = async (req, session, state) => {
  const claims = await GetClaims(session.user.sub)


  const picture = await TransferAvatar(session.user.sub, session.user.picture);

  session.user.picture = picture || session.user.picture;
  session.user.claims = claims;
  delete session.refreshToken;

  return session;
};

export const GET = handleAuth({
  callback:  handleCallback({ afterCallback }),
  login: handleLogin({
    returnTo: "/member",
  }),
});


