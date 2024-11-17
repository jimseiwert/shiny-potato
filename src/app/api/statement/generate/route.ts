
import { handleError } from "@/lib/errorHandler";
import { GenerateStatementSearch, GenerateStatementSearchProps } from "@/server/db/queries/statement";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
    try{
        const data: GenerateStatementSearchProps = await request.json();
        const results = await GenerateStatementSearch(data);
        return NextResponse.json(results);
    } catch (error) {
        return handleError(error);
    }
    
}