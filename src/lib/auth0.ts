import { GetClaims } from "@/server/db/queries/claims";
import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { NextResponse } from "next/server";

export const auth0 = new Auth0Client({
    async beforeSessionSaved(session) {
        console.log("before session", session)
        const claims = await GetClaims(session.user.sub)
        return {
          ...session,
          user: {
            ...session.user,
            claims: claims,
            foo: "bar",
          },
        }
      },
      signInReturnToPath: "/member",
    async onCallback(error, context, session) {
        // redirect the user to a custom error page
        if (error) {
            console.log(error)
          return NextResponse.redirect(
            new URL(`/error?error=${error.message}`, process.env.APP_BASE_URL)
          )
        }
        console.log("on callback: error", error)
        console.log("on callback: context", context)
        console.log("on callback: session", session)
        // complete the redirect to the provided returnTo URL
        return NextResponse.redirect(
          new URL(context.returnTo === "/" ? "" : context.returnTo || "/member", process.env.APP_BASE_URL)
        )
      },
});
