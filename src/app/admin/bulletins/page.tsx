
import { getAllBulletins } from '@/server/db/queries/bulletin';
import { FileSelector } from './upload';
import { Table } from './table/table';
import { Bulletin } from './table/bulletin';

export default async function Bulletins() {
  const bulletins: Bulletin[] = await getAllBulletins();
  
  return (
    <div className="py-4 sm:px-6 lg:px-8">
          <FileSelector/>
          <Table bulletins={bulletins} ></Table>
    </div>
  );
}