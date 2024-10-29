import { HomeIcon, UsersIcon, FolderIcon, CalendarIcon, DocumentDuplicateIcon, ChartPieIcon, Cog6ToothIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { usePathname } from 'next/navigation';

export default function SideBar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path || pathname.startsWith(`${path}/`);
      };
      
    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
      }

    const navigation = [
        { name: 'Dashboard', href: '/member/dashboard', icon: HomeIcon, current: true },
        { name: 'Forum', href: '/member/forum', icon: UsersIcon, current: false },
        { name: 'Fishing', href: '/member/fishing', icon: FolderIcon, current: false },
        { name: 'Events', href: '/member/events', icon: CalendarIcon, current: false },
        { name: 'Documents', href: '/member/documents', icon: DocumentDuplicateIcon, current: false },
        { name: 'Gallery', href: '/member/gallery', icon: ChartPieIcon, current: false },
      ]
      const adminNavigation = [
        { name: 'Applications', href: '/admin/applications', icon: HomeIcon, current: true },
        { name: 'Bulletins', href: '/admin/bulletins', icon: UsersIcon, current: false },
        { name: 'Dinners', href: '/admin/dinners', icon: FolderIcon, current: false },
        { name: 'Fishing', href: '/admin/fishing', icon: CalendarIcon, current: false },
        { name: 'Members', href: '/admin/members', icon: DocumentDuplicateIcon, current: false },
        { name: 'Statements', href: '/admin/statements', icon: ChartPieIcon, current: false },
        { name: 'Reports', href: '/admin/reports', icon: ChartPieIcon, current: false },
      ]

      return (
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 ring-1 ring-white/10 h-f">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className={classNames(
                                isActive(item.href)
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                              )}
                            >
                              <item.icon aria-hidden="true" className="h-6 w-6 shrink-0" />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <div className="text-xs/6 font-semibold text-gray-400">Admin</div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {adminNavigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className={classNames(
                                isActive(item.href)
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                              )}
                            >
                              <item.icon aria-hidden="true" className="h-6 w-6 shrink-0" />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <Link
                        href="/member/profile"
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                      >
                        <Cog6ToothIcon aria-hidden="true" className="h-6 w-6 shrink-0" />
                        Settings
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
      )
}