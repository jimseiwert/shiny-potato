import { getAllmemberStatus } from "@/server/queries/memberStatus";
import { getAllMemberTypes } from "@/server/queries/memberTypes";
import { getAllPersonTypes } from "@/server/queries/personTypes";
import { EmailSearch, MemberStatus, PersonType, MemberType, NameSearch, PhoneSearch } from "./searchInputs";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default async function SearchPanel() {
    const memberTypes = await getAllMemberTypes();
    const memberStatus = await getAllmemberStatus();
    const personTypes = await getAllPersonTypes();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Member Search</CardTitle>
            </CardHeader>
            <CardContent>
                <NameSearch />
                <EmailSearch />
                <PhoneSearch />
                <MemberStatus memberStatus={memberStatus} />
                <MemberType memberTypes={memberTypes} />
                <PersonType personTypes={personTypes} />
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>

    );
}