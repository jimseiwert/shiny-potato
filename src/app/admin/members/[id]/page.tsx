/* eslint-disable @next/next/no-img-element */

export default async function page() {
    const user = {
        name: 'Rebecca Nicholas',
        role: 'Product Designer',
        imageUrl:
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }
    const stats = [
        { label: 'Vacation days left', value: 12 },
        { label: 'Sick days left', value: 4 },
        { label: 'Personal days left', value: 2 },
    ]
    return (
        <>
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <h2 id="profile-overview-title" className="sr-only">
        Profile Overview
      </h2>
      <div className="bg-white p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
              <img alt="" src={user.imageUrl} className="mx-auto h-20 w-20 rounded-full" />
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-sm font-medium text-gray-600">Welcome back,</p>
              <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user.name}</p>
              <p className="text-sm font-medium text-gray-600">{user.role}</p>
            </div>
          </div>
          <div className="mt-5 flex justify-center sm:mt-0">
            <a
              href="#"
              className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              View profile
            </a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="px-6 py-5 text-center text-sm font-medium">
            <span className="text-gray-900">{stat.value}</span> <span className="text-gray-600">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
    <div className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">


          <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            <div>
              <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
              <p className="mt-1 text-sm/6 text-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>

              <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Full name</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">Tom Cook</div>
                    <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Update
                    </button>
                  </dd>
                </div>
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email address</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">tom.cook@example.com</div>
                    <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Update
                    </button>
                  </dd>
                </div>
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Title</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">Human Resources Manager</div>
                    <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Update
                    </button>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-base/7 font-semibold text-gray-900">Bank accounts</h2>
              <p className="mt-1 text-sm/6 text-gray-500">Connect bank accounts to your account.</p>

              <ul role="list" className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
                <li className="flex justify-between gap-x-6 py-6">
                  <div className="font-medium text-gray-900">TD Canada Trust</div>
                  <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Update
                  </button>
                </li>
                <li className="flex justify-between gap-x-6 py-6">
                  <div className="font-medium text-gray-900">Royal Bank of Canada</div>
                  <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Update
                  </button>
                </li>
              </ul>

              <div className="flex border-t border-gray-100 pt-6">
                <button type="button" className="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500">
                  <span aria-hidden="true">+</span> Add another bank
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-base/7 font-semibold text-gray-900">Integrations</h2>
              <p className="mt-1 text-sm/6 text-gray-500">Connect applications to your account.</p>

              <ul role="list" className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
                <li className="flex justify-between gap-x-6 py-6">
                  <div className="font-medium text-gray-900">QuickBooks</div>
                  <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Update
                  </button>
                </li>
              </ul>

              <div className="flex border-t border-gray-100 pt-6">
                <button type="button" className="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500">
                  <span aria-hidden="true">+</span> Add another application
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-base/7 font-semibold text-gray-900">Language and dates</h2>
              <p className="mt-1 text-sm/6 text-gray-500">
                Choose what language and date format to use throughout your account.
              </p>

              <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Language</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">English</div>
                    <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Update
                    </button>
                  </dd>
                </div>
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Date format</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">DD-MM-YYYY</div>
                    <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Update
                    </button>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
       
</div>
</div>
</>
    );
}