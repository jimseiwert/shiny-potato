import { getSession } from '@auth0/nextjs-auth0';

export default async function Dashboard() {
    const { user } = await getSession();

    return (
        <>
            <div>Hello on dashboard</div>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
    );
}