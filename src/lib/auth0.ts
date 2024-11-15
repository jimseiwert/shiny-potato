import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { NextResponse } from "next/server";

export const auth0 = new Auth0Client({
    async beforeSessionSaved(session) {
        console.log("before session")
        return {
          ...session,
          user: {
            ...session.user,
            foo: "bar",
          },
        }
      },
      signInReturnToPath: "/member",
    async onCallback(error, context, session) {
        console.log("on callback")
        // redirect the user to a custom error page
        if (error) {
            console.log(error)
          return NextResponse.redirect(
            new URL(`/error?error=${error.message}`, process.env.APP_BASE_URL)
          )
        }
    console.log(context)
        
        // complete the redirect to the provided returnTo URL
        return NextResponse.redirect(
          new URL(context.returnTo === "/" ? "" : context.returnTo || "/member", process.env.APP_BASE_URL)
        )
      },
});
