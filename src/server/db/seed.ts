import * as dotenv from "dotenv";
dotenv.config();


import { getTableName, sql, Table } from "drizzle-orm";
import { db } from "./index";
import * as schema from "./schemas";
import * as seeds from "./seeds";

const clearTables = false;

async function resetTable(db: db, table: Table) {


    return db.execute(
        sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE;`)
    );
}

if (clearTables) {
    for (const table of [
        schema.memberStatus,
        schema.memberTypes,
        schema.statementTypes,
        schema.roles,
        schema.personTypes,
        schema.persons,
        schema.address,
        schema.declerations,
        schema.statements,
        schema.applications,
        schema.dinners,
        schema.fishingPass,
        schema.forum,
        schema.forumComments,
        schema.forumCommentsReaction,
        schema.forumTagAssignments,
        schema.forumTags,
        schema.activity,
        schema.permissions,
        schema.roleAssignments,
        schema.statementConfig,
        schema.statementLines,
        schema.payments,
        schema.work,
        schema.membersToComms,
        schema.comms,
        schema.members,
        schema.memberStatusHistory
    ]) {
        await resetTable(db, table);
    }
}


await seeds.status(db);
await seeds.types(db);
await seeds.statementTypes(db);
await seeds.roles(db);
await seeds.personTypes(db);
await seeds.comms(db);
await seeds.claims(db);
// await seeds.members(db);
