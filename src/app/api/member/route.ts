import { getAllMembers } from "@/server/db/queries/member/search";
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const name = searchParams.get('name') || ''
    const email = searchParams.get('email') || ''
    const phone = searchParams.get('phone') || ''
    const page = searchParams.get('page') || 1
    const perPage = searchParams.get('perPage') || 10
    const memberType = searchParams.get('memberType') || 'all'
    const status = searchParams.get('status') || 'all'
    const personType = searchParams.get('personType') || 'all'
    
    const data = await getAllMembers({
        name,
        email,
        phone,
        memberType,
        status,
        personType,
        page: Number(page),
        perPage: Number(perPage)
    });

    return Response.json(data)
  
}