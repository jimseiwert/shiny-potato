/* eslint-disable @next/next/no-img-element */
import { getMember } from "@/server/queries/member";
import { redirect } from "next/navigation";
import InputUpdate from "../components/inputUpdate";
import AddressWrapper from "@/app/admin/members/components/address";
import Dependants from "../components/dependants";


export default async function MemberDetail({
  params,
}: {
  params: { id: number; bar: string };
}) {

  const user = await getMember(params.id);
  if (!user) {
    redirect('/admin/members')
  }

  const stats = [
    { label: 'Vacation days left', value: 12 },
    { label: 'Sick days left', value: 4 },
    { label: 'Personal days left', value: 2 },
  ]

  return (
    <>
      <div className="overflow-hidden rounded-lg shadow">
        <h2 id="profile-overview-title" className="sr-only">
          Profile Overview
        </h2>
        <div className="p-4">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <img alt="" src={user.picture} className="h-20 w-20 rounded-full" />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user.memberInfo.firstName} {user.memberInfo.lastName}</p>
                <p className="text-sm font-medium text-gray-600">{user.role}</p>
              </div>
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
      <div className="lg:flex lg:gap-x-16 lg:px-8">
        <div className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
          <div className="space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            <div>
              <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
              <p className="mt-1 text-sm/6 text-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>

              <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
              <InputUpdate title="Full name" initialValue={`${user.memberInfo.firstName} ${user.memberInfo.lastName}`} />
              <InputUpdate title="Email Address" initialValue={user.memberInfo.email} />
              <InputUpdate title="Occupation" initialValue={user.memberInfo.occupation} />
              </dl>
            </div>

            <AddressWrapper memberAddress={user.address} />
            <Dependants memberDependants={user.dependents}/>
            

          </div>

        </div>
      </div>
    </>
  );
}