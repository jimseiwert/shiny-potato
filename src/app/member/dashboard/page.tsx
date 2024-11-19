"use client"

import { useUser } from "@auth0/nextjs-auth0"
import MemberStats from './stats';
import withAuth from '@/lib/withAuth/serverPage'
import { Claim } from '@/server/enums/claims';
import Maintenance from "@/app/maintenance";

function Dashboard() {

    const { user, isLoading, error } = useUser()


    return (
        <>

            <MemberStats />
            <div>Hello on dashboard</div>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
    );


}



export default Dashboard