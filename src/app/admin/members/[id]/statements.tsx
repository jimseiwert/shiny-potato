'use client';
import { useCallback, useContext, useEffect, useState } from "react";
import { MemberProfileContext } from "./context";
import { Button } from "@/components/ui/button";

export default function MemberStatementsView() {
    const { memberId } = useContext(MemberProfileContext)
    const [statements, setStatements] = useState([]);

    const loadStatements = useCallback(async() => {
        console.log('loading statements', memberId);
        const response = await fetch(`/api/member/${memberId}`);
        const statements = await response.json();
        setStatements(statements);
    }, [memberId])

    useEffect(() => {
        loadStatements();
    }, [memberId, loadStatements]);

   
    return (
        <div>
          <h2 className="text-base/7 font-semibold">Statements</h2>
          <ul role="list" className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
          <pre>{JSON.stringify(statements, null, 2)}</pre>
          </ul>
          <Button onClick={loadStatements}>Download All Statements</Button>
        </div>
      )
}