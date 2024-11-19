import { GetClaims } from "@/server/db/queries/claims";
import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client({
  authorizationParameters: {
    scope: "openid profile email",
  },
  async beforeSessionSaved(session) {
    const claims = await GetClaims(session.user.sub)
    return {
      ...session,
      user: {
        ...session.user,
        claims: claims,
      },
    }
  },
  signInReturnToPath: "/member",
});
