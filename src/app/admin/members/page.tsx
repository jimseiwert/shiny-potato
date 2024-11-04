import SearchTable from './components/memberSearchTable'
import { getAllMembers } from '@/server/queries/member'
import MemberSearchProvider from './contexts/memberSearchProvider'
import SearchPanel from './searchPanel/panel'

export default async function MemberSearch() {
  const members = await getAllMembers({})
  return (

    <div>
      <main className="w-full px-4">
        <div className="border-b border-gray-200 pb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>
          <p className="mt-4 text-base text-gray-500">
            Checkout out the latest release of Basic Tees, new and improved with four openings!
          </p>
        </div>
        <MemberSearchProvider>
          <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
              <SearchTable data={members} />
            </div>

            <SearchPanel />
          </div>
        </MemberSearchProvider>
      </main>
    </div>

  )
}
