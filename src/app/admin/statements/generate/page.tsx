import withAuth from "@/lib/withAuth/page/server";
import { Claim } from "@/server/enums/claims";
import { GenerateStatementProvider } from "./context";
import { SearchPane } from "./searchPane";
import DataTable from "./table";

function GenerateStatements() {


    return (
        <GenerateStatementProvider>
            <div className="flex justify-between items-start gap-4">
                <div className="p-4 rounded-lg shadow-md w-80">
                    <SearchPane />
                </div>
                <div className="p-4 rounded-lg shadow-md grow">
                    <DataTable/>
                </div>
            </div>
        </GenerateStatementProvider>
    )
}

export default withAuth(GenerateStatements,Claim.StatementsWrite);