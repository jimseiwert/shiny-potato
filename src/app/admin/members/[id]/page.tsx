/* eslint-disable @next/next/no-img-element */
import { getMember } from "@/server/queries/member/profile";
import { redirect } from "next/navigation";
import InputUpdate from "../components/inputUpdate";
import AddressWrapper from "@/app/admin/members/components/address";
import Dependants from "../components/dependants";
import MemberActivity from "./activity";
import MemberStats from "./stats";
import Profile from "./profile";


export default async function MemberDetail({
  params,
}: {
  params: { id: number; bar: string };
}) {

  const user = await getMember(params.id);
  if (!user) {
    redirect('/admin/members')
  }



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
        <MemberStats />
      </div>
      <div className="flex ...">
        <div className="grow h-14 ...">
          <div className="lg:flex lg:gap-x-16 lg:px-8 flex-col">
            <div className="px-4 py-8 sm:px-6">
              <div className="space-y-16 sm:space-y-20 lg:mx-0 ">
                  <Profile firstName={user.memberInfo.firstName} lastName={user.memberInfo.lastName} email={user.memberInfo.email} occupation={user.memberInfo.occupation} />

                <AddressWrapper memberAddress={user.address} />
                <Dependants memberDependants={user.dependents} />


              </div>

            </div>

          </div>
        </div>
        <div className="flex-none w-1/4 p-1.5 m-5">
          <MemberActivity activity={user.activity} />
        </div>
      </div>





    </>
  );
}