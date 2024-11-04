import { Application } from "./application";
import { Dinner } from "./dinner";
import { Fishing } from "./fishing";
import { Forum } from "./forum";
import { GetData } from "./getData";
import { Members } from "./members";
import { Memos } from "./memos";
import { Statements } from "./statements";
import { Work } from "./work";

export async function POST() {
  const data = await GetData();

  console.log('******* Starting Data *********')
  for (const key in data) {
    console.log(key, data[key].length)
  }
  console.log('******* Starting Data *********')

  //await Members(data['Member']);
  delete data['Member']


  //await Memos(data['Memo']);
  delete data['Memo']


  await Statements(data['Statement'], data['StatementConfig']);
  delete data['Statement']
  delete data['StatementConfig']

  await Work(data['Work']);
  delete data['Work']

  await Dinner(data['Dinner']);
  delete data['Dinner']

  await Fishing(data['GuestFishing']);
  delete data['GuestFishing']

  await Forum({
    category: data['Category'],
    topic: data['Topic'],
    discussion: data['Discussion'],
    comment: data['Comment'],
    post: data['Post']
  });

  delete data['Category']  
  delete data['Topic']  
  delete data['Discussion']  
  delete data['Comment']  
  delete data['Post']  

  await Application(data['Application']);
  delete data['Application']

  console.log('******* Ending Data *********')
  for (const key in data) {
    console.log(key, data[key].length)
  }
  console.log('******* Ending Data *********')

  return Response.json(data)
}


//{
  //status: 1,
  //sponsor: '357b4d7e-4dea-4a79-984f-4c007e89d82c',
  //dateInducted: 2005-01-06T00:00:00.000Z,
  //dateApplied: 2018-08-30T18:05:45.899Z,
  //created_at: 2018-10-20T14:00:21.091Z,
  //updated_at: 2023-02-28T22:49:26.560Z,
  //dateDeceased: 2019-12-03T16:26:10.458Z,

  // communications: {
  //   fullMembers: { subscribed: true, unsubscribed: false },
  //   shootingMembers: { subscribed: true, unsubscribed: false },
  //   spouses: { subscribed: true, unsubscribed: false },
  //   workParty: { subscribed: false, unsubscribed: false },
  //   bulletin: { subscribed: true, unsubscribed: false },
  //   fishing: { subscribed: false, unsubscribed: false },
  //   forum: { subscribed: true, unsubscribed: false }
  // },
  
  // aim: false,
  // spouse: 'a9f764fb-9ad2-4525-f439-4cc09991907c',
  // comms: {
  //   bulletin: true,
  //   forum: { all: false, responses: true, weeklyDigest: true },
  //   lists: {
  //     archery: true,
  //     fishing: true,
  //     grounds: true,
  //     lake: true,
  //     pistol: true,
  //     trap: true
  //   },
  //   roster: { publishEmail: false, publishPhone: true }
  // },
  //keycardAccess: { kitchen: false, master: false, trapCrew: false },
//}