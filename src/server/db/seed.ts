import * as dotenv from "dotenv";
dotenv.config();


import { getTableName, sql, Table } from "drizzle-orm";
import { db } from "./index";
import * as schema from "./schemas";
import * as seeds from "./seeds";

async function resetTable(db: db, table: Table){
    return db.execute(
        sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE;`)
    );
}

    for(const table of [
        //schema.state,
        //schema.memberStatus,
        //schema.memberTypes,
        //schema.statementTypes,
        //schema.roles,
        //schema.personTypes,
        //schema.persons,
        //schema.address,
        schema.declerations,
        schema.memos,
    ]){
        await resetTable(db, table);
    }

    // await seeds.status(db);
    // await seeds.types(db);
    // await seeds.states(db);
    // await seeds.statementTypes(db);
    // await seeds.roles(db);
    // await seeds.personTypes(db);
    //await seeds.members(db);
