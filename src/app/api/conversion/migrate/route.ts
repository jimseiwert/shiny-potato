import { Application } from "./application";
import { Dinner } from "./dinner";
import { Fishing } from "./fishing";
import { Forum } from "./forum";
import { GetData } from "./getData";
import { Members } from "./members";
import { Memos } from "./memos";
import { Sponsors } from "./sponsors";
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
  //await Sponsors(data['Member']);
  await Memos(data['Member'], data['Memo']);
  delete data['Memo']
  delete data['Member']


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