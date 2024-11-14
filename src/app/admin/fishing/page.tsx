'use server';

import { Table, TableProps } from '@/components/msc/dataTable/table';
import withAuth from '@/lib/withAuth/serverPage';
import { getAllPasses } from '@/server/db/queries/fishing';
import { Claim } from '@/server/enums/claims';

const stats = [
  { name: 'Revenue', value: '$405,091.00', change: '+4.75%', changeType: 'positive' },
  { name: 'Overdue invoices', value: '$12,787.00', change: '+54.02%', changeType: 'negative' },
  { name: 'Outstanding invoices', value: '$245,988.00', change: '-1.39%', changeType: 'positive' },
  { name: 'Expenses', value: '$30,156.00', change: '+10.18%', changeType: 'negative' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

async function Fishing() {
  const allPasses = await getAllPasses();

  const tableConfig: TableProps = {
    mainFilter: {
      show: true,
      title: 'Search Passes',
      column: 'pass'
    },
    data: allPasses,
    columnConfig: 'fishing',
  }


  return (
    <div>
            <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.name}
                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-gray-100 px-4 py-10 sm:px-6 xl:px-8"
                    >
                        <dt className="text-sm/6 font-medium text-gray-500">{stat.name}</dt>
                        <dd
                            className={classNames(
                                stat.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700',
                                'text-xs font-medium',
                            )}
                        >
                            {stat.change}
                        </dd>
                        <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">{stat.value}</dd>
                    </div>
                ))}
            </dl>
            <main className="w-full px-4">
            <Table config={tableConfig} ></Table>
            </main>
        </div>
   
  )
}


export default withAuth(Fishing, Claim.FishingRead)