'use server';
import { getAllMembers } from '@/server/db/queries/member/search'
import { getAllMemberTypes } from '@/server/db/queries/memberTypes'
import { getAllPersonTypes } from '@/server/db/queries/personTypes'
import { getAllmemberStatus } from '@/server/db/queries/memberStatus'
import { SearchTable } from './search/searchTable';

const stats = [
  { name: 'Revenue', value: '$405,091.00', change: '+4.75%', changeType: 'positive' },
  { name: 'Overdue invoices', value: '$12,787.00', change: '+54.02%', changeType: 'negative' },
  { name: 'Outstanding invoices', value: '$245,988.00', change: '-1.39%', changeType: 'positive' },
  { name: 'Expenses', value: '$30,156.00', change: '+10.18%', changeType: 'negative' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default async function MemberSearch() {
  const allMembers = await getAllMembers();
  const allStatus = (await getAllmemberStatus()).map((status) => ({ label: status.name, value: status.id + ''}));
  const allMemberTypes = (await getAllMemberTypes()).map((type) => ({ label: type.name, value: type.id + ''}));
  const allPersonTypes = (await getAllPersonTypes()).map((type) => ({ label: type.name, value: type.id + ''}));



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
            <SearchTable members={allMembers} status={allStatus} memberTypes={allMemberTypes} personTypes={allPersonTypes}></SearchTable>
            </main>
        </div>
   
  )
}
