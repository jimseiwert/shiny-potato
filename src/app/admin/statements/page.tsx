/* eslint-disable @next/next/no-img-element */

import AuthLayout from '@/app/layouts/authLayout'


const secondaryNavigation = [
  { name: 'Overview', href: '#', current: true },
  { name: 'Activity', href: '#', current: false },
  { name: 'Settings', href: '#', current: false },
  { name: 'Collaborators', href: '#', current: false },
  { name: 'Notifications', href: '#', current: false },
]
const stats = [
  { name: 'Number of deploys', value: '405' },
  { name: 'Average deploy time', value: '3.65', unit: 'mins' },
  { name: 'Number of servers', value: '3' },
  { name: 'Success rate', value: '98.5%' },
]

function classNames(...classes : string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <AuthLayout>


          <main>
            <header>
              {/* Secondary navigation */}
              <nav className="flex overflow-x-auto border-b border-white/10 py-4 justify-end">
                <ul
                  role="list"
                  className="flex min-w-full flex-none gap-x-6 px-4 text-sm/6 font-semibold text-gray-400 sm:px-6 lg:px-8"
                >
                  {secondaryNavigation.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className={item.current ? 'text-indigo-400' : ''}>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

   

              {/* Stats */}
              <div className="flex justify-between bg-black-500">
                {stats.map((stat, statIdx) => (
                  <div
                    key={stat.name}
                    // className={classNames(
                    //   statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
                    //   'border-t border-white/5 px-4 py-6 sm:px-6 lg:px-8',
                    // )}
                  >
                    <p className="text-sm/6 font-medium text-gray-400">{stat.name}</p>
                    <p className="mt-2 flex items-baseline gap-x-2">
                      <span className="text-4xl font-semibold tracking-tight text-white">{stat.value}</span>
                      {stat.unit ? <span className="text-sm text-gray-400">{stat.unit}</span> : null}
                    </p>
                  </div>
                ))}
              </div>
            </header>

        
          </main>
      
    </AuthLayout>
  )
}
