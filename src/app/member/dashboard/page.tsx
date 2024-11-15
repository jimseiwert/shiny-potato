import { auth0 } from "@/lib/auth0"
import MemberStats from './stats';
import withAuth from '@/lib/withAuth/serverPage'
import { Claim } from '@/server/enums/claims';

async function Dashboard() {
    
    const session = await auth0.getSession()

    return (
        <>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        {/* <MemberStats />
            <div>Hello on dashboard</div>
            <pre>{JSON.stringify(user, null, 2)}</pre> */}
        </>
    );
}



export default Dashboard