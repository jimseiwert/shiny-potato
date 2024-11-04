/* eslint-disable @next/next/no-html-link-for-pages */
'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { ModeToggle } from '../theme-toggle'
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Membership', href: '/membership' },
  { name: 'Trap', href: '/trap' },
]

const clubName = 'Maywood Sportsmen&apos;s Club'

export default function PublicTopNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <header className="background">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1 items-center">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">{clubName}</span>
            <Image
              alt="Logo"
              src="/logo.png"
              width={32}
              height={32}
            />
          </a>
        </div>
        <div className="flex lg:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-button"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 gap-4">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-link">
              {item.name}
            </a>
          ))}
        </div>
       
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-6">
        <ModeToggle />
        {user && (
          <>
          <Link href="/member" className="text-sm/6 font-semibold">
            Member Dashboard <span aria-hidden="true">&rarr;</span>
          </Link>
        <a href="/api/auth/logout" className="text-sm/6 font-semibold">
        Log out
      </a>
      </>
        )}

          {!user && (
          <a href="/api/auth/login" className="text-sm/6 font-semibold">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>)}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">{clubName}</span>
              <Image
              alt="Logo"
              src="/logo.png"
              width={32}
              height={32}
            />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
              <ModeToggle/>
                <a
                  href="/api/auth/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
