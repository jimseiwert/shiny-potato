
import { getPlugins, uint8ArrayToBase64 } from "@/app/admin/letters/helper";
import { ClickSend } from "@/lib/clicksend";
import { handleError } from "@/lib/errorHandler";
import { UpdateStatus } from "@/server/db/queries/member";
import { ConstructStatementData, CreateStatement, GenerateStatementSearch, GenerateStatementSearchProps } from "@/server/db/queries/statement";
import { GetTemplate } from "@/server/db/queries/templates";
import { MemberStatus } from "@/server/enums/status";
import { StatementLetter, StatementPrintData } from "@/server/interfaces/letters/StatementLetter";
import { checkTemplate, Template } from "@pdfme/common";
import { generate } from "@pdfme/generator";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function PATCH(request: Request):  Promise<NextApiResponse>  {
    try {

        //preview statements
        const data: { year: number, letter: number, members: number[] } = await request.json();

        console.log(data)
        const statementData: StatementLetter[] = await ConstructStatementData(data.members, data.year);
        const letterTemplate = await GetTemplate(Number(data.letter))

        const template: Template = JSON.parse(letterTemplate.template);
        checkTemplate(template);

        const sData =  await Promise.all(statementData.map(async (s) => {
            return  await new StatementPrintData(s).getData()
        }));

        const pdf = await generate({
            template: template,
            inputs: sData,
            options: {
                lang: 'en',
                title: '2025 Statement',
            },
            plugins: getPlugins(),
        });
        
        const res = new NextResponse(pdf, {
            status: 200,
            headers: new Headers({
                "content-disposition": `attachment; filename=preview.pdf}`,
                "content-type": "application/octet-stream",
                "content-length": pdf.byteLength + "",
            }),
        });

        return res;
    } catch (error) {
        console.log(error)
        return handleError(error);
    }
}

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const data: GenerateStatementSearchProps = await request.json();
        const results = await GenerateStatementSearch(data);
        return NextResponse.json(results);
    } catch (error) {
        return handleError(error);
    }
}



export async function PUT(request: Request): Promise<NextResponse> {
    try {

        //generate statements
        const clickSend = new ClickSend();
        const data: { dryRun: boolean, year: number, letter: number, members: number[] } = await request.json();
        const statementData: StatementLetter[] = await ConstructStatementData(data.members, data.year);
        const letterTemplate = await GetTemplate(Number(data.letter))

        const template: Template = JSON.parse(letterTemplate.template);
        checkTemplate(template);

        const returnResult = await Promise.all(statementData.map(async (s) => {
            let returnObj: {
                memberId: number,
                data: boolean, pdf: boolean, sent: boolean, email: boolean,
                success: boolean, error: boolean, msg: string | unknown | null,
                statusChanged: boolean, statementCreated: boolean
            } = {
                memberId: s.memberId, data: false, pdf: false, sent: false, statementCreated: false,
                statusChanged: false, email: false, success: false, error: null
            };

            try {
                const sData = new StatementPrintData(s).getData();
                returnObj = { ...returnObj, data: true };

                const pdf = await generate({
                    template: template,
                    inputs: [sData],
                    options: {
                        lang: 'en',
                        title: '2025 Statement',
                    },
                    plugins: getPlugins(),
                });

                const base64 = uint8ArrayToBase64(pdf);
                returnObj = { ...returnObj, pdf: true };
                
                if(!data.dryRun) {
                    await clickSend.UploadAndSend(base64.replace('data:application/pdf;base64,', ''), [s.address], letterTemplate.print_mailing_template, letterTemplate.print_color, letterTemplate.print_duplex);
                    returnObj = { ...returnObj, sent: true };
                    await UpdateStatus(s.memberId, MemberStatus.RenewalPending);
                    returnObj = { ...returnObj, statusChanged: true };
                    await CreateStatement(s.memberId, data.year);
                    returnObj = { ...returnObj, statementCreated: true };
                }

                returnObj = { ...returnObj, success: true };
            } catch (e) {
                returnObj = { ...returnObj, success: false, error: true, msg: e.toString() };
                console.log(e);
            }
            return returnObj;
        }));

        return NextResponse.json(returnResult);
    } catch (error) {
        console.log(error)
        return handleError(error);
    }

}