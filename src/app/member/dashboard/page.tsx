import Maintenance from '@/app/maintenance';
import MemberStats from './stats';
import withAuth from '@/lib/withAuth/page/server'
import WaitingList from './waitingList';
import InviteCallToAction from '../invite/callToCation';
import FishingCallToAction from '../fishing/fishingCallToAction';
import LatestBulletin from '../documents/latestBulletin';
import BoardView from './boardview';

async function Dashboard() {
    return (
        <>
            <MemberStats />
            <div className="flex flex-row gap-4 px-4">
                <div className="basis-full">
                    <div className='h-80'>
                        <Maintenance />
                    </div>
                    <WaitingList />
                    <InviteCallToAction />
                    <FishingCallToAction />
                    <LatestBulletin />
                </div>
                <div className="basis-80">
                    <BoardView />
                </div>
            </div>
        </>
    );
}


export default withAuth(Dashboard);
