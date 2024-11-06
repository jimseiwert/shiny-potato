import { getAllmemberStatus } from "@/server/queries/memberStatus";
import { getAllMemberTypes } from "@/server/queries/memberTypes";
import { getAllPersonTypes } from "@/server/queries/personTypes";
import { EmailSearch, MemberStatus, MemberType, NameSearch, PersonType, PhoneSearch } from "./searchInputs";

export default async function SearchPanel() {
    const memberTypes = await getAllMemberTypes();
    const memberStatus = await getAllmemberStatus();
    const personTypes = await getAllPersonTypes();

    return (
        <aside className="bg-gray-100 px-4">
            <NameSearch />
            <EmailSearch />
            <PhoneSearch />
            <MemberStatus memberStatus={memberStatus} />
            <MemberType memberTypes={memberTypes} />
            <PersonType personTypes={personTypes} />

        </aside>
    );
}