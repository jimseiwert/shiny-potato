import { NextRequest, NextResponse } from "next/server";
import { GetData } from "../getData";
import { Members } from "../members";
import { Sponsors } from "../sponsors";
import { Memos } from "../memos";
import { Statements } from "../statements";
import { Work } from "../work";
import { Dinner } from "../dinner";
import { Fishing } from "../fishing";
import { Forum } from "../forum";
import { Application } from "../application";
import { handleError } from "@/lib/errorHandler";

export async function POST(req: NextRequest, { params }: { params: { type: string } }) {
    try{
    const { type } = await params
    let data = null;
    switch (type) {
        case "sponsors":
            data = await GetData(['Member']);
            await Sponsors(data['Member']);
            return NextResponse.json({ msg: `${data['Member'].length} memebrs migrated.` });
        case "members":
            data = await GetData(['Member']);
            await Members(data['Member']);
            return NextResponse.json({ msg: `${data['Member'].length} memebrs migrated.` });
        case "memos":
            data = await GetData(['Memo']);
            await Memos(data['Memo']);
            return NextResponse.json({ msg: `${data['Memo'].length} memos migrated.` });
        case "statements":
            data = await GetData(['Statement', 'StatementConfig']);
            await Statements(data['Statement'], data['StatementConfig']);
            return NextResponse.json({ msg: `${data['Statement'].length} statements, ${data['StatementConfig'].length} config migrated.` });
        case "work":
            data = await GetData(['Work']);
            await Work(data['Work']);
            return NextResponse.json({ msg: `${data['Work'].length} work records migrated.` });
        case "applications":
            data = await GetData(['Application']);
            await Application(data['Application']);
            return NextResponse.json({ msg: `${data['Application'].length} applications migrated.` });
        case "dinner":
            data = await GetData(['Dinner']);
            await Dinner(data['Dinner']);
            return NextResponse.json({ msg: `${data['Dinner'].length} dinner records migrated.` });
        case "fishing":
            data = await GetData(['GuestFishing']);
            await Fishing(data['GuestFishing']);
            return NextResponse.json({
                msg: `${data['GuestFishing'].length} fishing records migrate`
            })
        case "forum":
            data = await GetData(['Category', 'Discussion', 'Comment', 'Post']);
            await Forum({
                category: data['Category'],
                discussion: data['Discussion'],
                comment: data['Comment'],
                post: data['Post']
            });

            return NextResponse.json({
                msg: `${data['Category']?.length} Categories, ${data['Discussion']?.length} Discussions, ${data['Comment']?.length} Comments, ${data['Post']?.length} Posts records migrate`
            })
    }

} catch (error) {
    return handleError(error);
  }

    
}