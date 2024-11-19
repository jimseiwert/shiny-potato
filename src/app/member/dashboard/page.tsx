import Maintenance from '@/app/maintenance';
import MemberStats from './stats';
import withAuth from '@/lib/withAuth/page/server'

function Dashboard() {



    return (
        <>
            <MemberStats />

            <div className='py-10 px-10 shadow-lg shadow-white'>
                <Maintenance/>
            </div>
        </>
    );


}


export default withAuth(Dashboard);
