import { getSession } from '@auth0/nextjs-auth0';
import MemberStats from './stats';

export default async function Dashboard() {
    const { user } = await getSession();

    return (
        <>
        {/* <MemberStats />
            <div>Hello on dashboard</div>
            <pre>{JSON.stringify(user, null, 2)}</pre> */}
        </>
    );
}