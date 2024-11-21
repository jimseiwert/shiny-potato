import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { GetClaims } from "@/server/db/queries/claims";

export const auth0 = new Auth0Client({
  signInReturnToPath: "/member",
  async beforeSessionSaved(session) {
    const sessionClaims = await GetClaims(session.user.sub);
    return {
      ...session,
      user: {
        sub: session.user.sub,
        given_name: "Jim",
        family_name: "Seiwert",
        nickname: "jimseiwert",
        name: "Jim Seiwert",
        picture: "https://lh3.googleusercontent.com/a/ACg8ocLbV9l4RhqpAKTH-LpZ5MyfmRTiX-z9foHs9d6yR1J8pHMj28FkPg=s96-c",
        claims: sessionClaims,
      },
    };
  },
});


const GetManagementToken = async () => {
  const request = await fetch('https://msc.auth0.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: 'DG2X6ze3sc0AY3xOiy70kW4FoXB7pssc',
      client_secret: '5R_-6O6eW4m-MmvDob6mSIQ0eiIZjKvd6YF7ktlQluG8tGPt0HNFvz-gZzQwBGum',
      audience: 'https://msc.auth0.com/api/v2/',
      grant_type: 'client_credentials',
    }),
  });

  const response = await request.json();
  const token = response.access_token;
  return token;
}

export const GetRules = async () => {
  const token = await GetManagementToken();
  const request = await fetch('https://msc.auth0.com/api/v2/rules', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const response = await request.json();

  console.log(response)
}
export const GetUsers = async () => {
  const token = await GetManagementToken();

  const users = [];
  let page = 0;
  let total = 0
  do {
    const request = await fetch('https://msc.auth0.com/api/v2/users?' + new URLSearchParams({
      page: page + '',
      per_page: '100',
      include_totals: 'true',
      sort: 'created_at:-1',
    }), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    const response = await request.json();

    users.push(...response.users);
    page++;
    total = response.total
    console.log(`Page ${page} of ${response.total} / ${users.length}`);
  }
  while (total != users.length)
  return users;
}
