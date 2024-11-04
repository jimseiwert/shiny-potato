import { db } from "../../../../server/db";

export async function POST() {
  try{
    const schema = 'msc';
    db.execute(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
    db.execute(`CREATE TABLE IF NOT EXISTS ${schema}.members (id SERIAL PRIMARY KEY);`);
    return Response.json({ message: 'Data Seeded' })
  } catch (error) {
    console.log(error)
    return Response.json({ message: 'Error' })
  }
  


  // Insert a record with just the id field
  //await db.insert('members').values({});

  // Add additional fields and relations to the schema
  //await db.schema.alterTable('members', (table) => {
  //  table.string('name').notNullable();
  //  table.string('email').notNullable();
    // Add any additional fields or relations here
  //});

  //const seedMember = {
  //  name: 'Admin',
  //  email: 'none@none.com'
  //}

  //mySchema.
  //const member = await db.insert(members).values(seedMember);
//console.log(member)
  // const seedMemberTypes = ['Full', 'Shooting', 'Employee', 'AIM'];
  // const seedStatus = ['Active', 'Paid', 'Lifetime', 'Bulletin Only', 'Deceased', 'Dropped Out', 'Inactive', 'Renewal Pending', 'Term By Board', 'Waiting List', 'Widow', 'Undetermined', 'Banned', 'Non-Payment', 'Vendor', 'Guest', 'Membership Declined', 'On Hold', 'Application Submitted', 'Induct', 'Application Requested', 'Reinstatement Granted', 'Not In Good Standing'];

  // const existingMemberTypes = await db.query.memberTypes.findMany();
  // const existingStatus = await db.query.memberTypes.findMany();

  // await processDataSet(existingMemberTypes, seedMemberTypes, memberTypes);
  

  return Response.json({ message: 'Data Seeded' })
}

// async function processDataSet(existingData: any[], newData: any[], typeOf: any) {
//   const data: (typeof typeOf.$inferInsert)[] = [];

//   newData.forEach((value) => {
//     const typeExists = existingData.find((typ) => typ.name === value);

//     if (!typeExists) {
//       data.push({
//         name: value,
//       });
//     }
//   });
//   await db.insert(typeOf).values(data);
// }
