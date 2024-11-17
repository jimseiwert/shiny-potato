
import { getAllBulletins } from '@/server/db/queries/bulletin';
import { FileSelector } from './upload';

import { Bulletin } from '../../../server/interfaces/bulletin';
import { Table, TableProps } from '@/components/msc/dataTable/table';



async function Bulletins() {
  const bulletins: Bulletin[] = await getAllBulletins();

  const tableConfig: TableProps<Bulletin> = {
    mainFilter: {
      show: true,
      title: 'Search Bulletins',
      column: 'name'
    },
    data: bulletins,
    columnConfig: 'bulletin',
  }

  return (
    <div className="py-4 sm:px-6 lg:px-8">
          <FileSelector/>
          <Table config={tableConfig} ></Table>
    </div>
  );
}


export default Bulletins