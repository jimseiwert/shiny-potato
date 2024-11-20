import AvatarImg from "@/components/msc/avatar";
import { GetBoardView } from "@/server/db/queries/board";


export default async function BoardView() {
  const boardMembers = await GetBoardView();

  return (
    <nav aria-label="Directory" className="h-full w-full overflow-y-auto">
      <ul role="list" className="divide-y divide-gray-100 dark:divide-white/5">
        {boardMembers.map((person) => (
          <li key={person.email + person.id} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
            <div className="flex min-w-0 gap-x-4">
              <AvatarImg image={person.picture} name={person.name} />
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold dark:text-white text-gray-900  hover:dark:text-gray-900">
                  <a href={person.href}>
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    {person.name}
                  </a>
                </p>
                <p className="mt-1 flex text-xs/5 text-gray-500">
                  <a href={`mailto:${person.email}`} className="relative hover:underline">
                    {person.email}
                  </a>
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm/6 text-gray-900 dark:text-white hover:dark:text-gray-900">{person.role}</p>
                <div className="mt-1 flex items-center gap-x-1.5">
                  <p className="text-xs/5 text-gray-500">{person.endYear}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  )
}