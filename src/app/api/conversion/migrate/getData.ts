import { MongoClient } from "mongodb";

export async function GetData() {
    const client = new MongoClient(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();
    const database = client.db("maywood");
    const collection = database.collection("data");
    const allData = await collection.find({}).toArray();

    const data: any = {}


    allData.forEach((element) => {
        if (!data[element.__type]) {
            data[element.__type] = []
        }
        data[element.__type].push(element)
    })

    delete data['Workflow']
    delete data['MemberApplication']
    delete data['WorkObligation']
    delete data['Chat']
    delete data['ChatComment']
    delete data['Payment']
    delete data['Print']
    delete data['Photo']
    delete data['undefined']
    delete data['Range']
    delete data['Config']
    delete data['Board']
    delete data['Communication']
    delete data['GuestFishingPasses']

    return data;
}