
import { FileSelector } from './upload';

import { Table, TableProps } from '@/components/msc/dataTable/table';
import { GetAllMinutes } from '@/server/db/queries/minute';
import { Minute } from '@/server/interfaces/minute';


async function Minutes() {
  const minutes: Minute[] = await GetAllMinutes();

  const tableConfig: TableProps<Minute> = {
    mainFilter: {
      show: true,
      title: 'Search Minutes',
      column: 'name'
    },
    data: minutes,
    columnConfig: 'minute',
  }

  return (
    <div className="py-4 sm:px-6 lg:px-8">
          <FileSelector/>
          <Table config={tableConfig} ></Table>
    </div>
  );
}


export default Minutes