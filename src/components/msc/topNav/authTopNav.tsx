/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Breadcrumbs from '@/components/msc/nav/breadcrumbs'
import { ModeToggle } from '@/components/msc/theme-toggle'
import { Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { auth0 } from "@/lib/auth0"
import Image from 'next/image'

const userNavigation = [
    { name: 'Your Profile', href: '/member/profile' },
]

export default async function AuthTopNav() {
    const session = await auth0.getSession()
    const user = session?.user || {}

    return (
        session && (
        <div>
            {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
            <Popover
                as="header"
                className="shadow-sm data-[open]:fixed data-[open]:inset-0 data-[open]:z-40 data-[open]:overflow-y-auto lg:static lg:overflow-y-visible data-[open]:lg:static data-[open]:lg:overflow-y-visible"
            >
                <div>
                    <div className="flex justify-between items-center  border-b border-gray-200 px-4">
                        <Breadcrumbs />
                        <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                            {/* Mobile menu button */}
                            <PopoverButton className="group relative -mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                            </PopoverButton>
                        </div>
                        <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4 gap-2">
                            <ModeToggle />

                            {/* Profile dropdown */}
                            <Menu as="div" className="mx-4 gap-2 py-2">
                                <div>
                                    <MenuButton className="relative flex rounded-full">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <img alt={user.name} src={user.picture} className=" w-10 rounded-full mx-4" />
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    {userNavigation.map((item) => (
                                        <MenuItem key={item.name}>
                                            <Link href={item.href} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                                {item.name}
                                            </Link>
                                        </MenuItem>
                                    ))}
                                    <a href="/auth/logout" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                                Log Out
                                            </a>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>

                <PopoverPanel as="nav" aria-label="Global" className="lg:hidden">
                    <div className="border-t border-gray-200 pb-3 py-2">
                        <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                            <div className="flex-shrink-0">
                                <img src={user.picture} width={10} height={10} alt={user.name} className=" w-10 rounded-full" />
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-gray-800">{user.name}</div>
                                <div className="text-sm font-medium text-gray-500">{user.email}</div>
                            </div>
                            <ModeToggle />
                        </div>
                        <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                            {userNavigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                >
                                    {item.name}
                                </Link>
                            ))}
                             <a
                                    key={"logout"}
                                    href={"/auth/logout"}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                >
                                    Log Out
                                </a>
                        </div>
                    </div>
                </PopoverPanel>
            </Popover>
        </div>
    ))
}
