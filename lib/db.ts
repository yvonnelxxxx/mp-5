import {MongoClient,Db, Collection} from 'mongodb';
import {URLProps} from "@/Type";

const MONGODB_URI = process.env.MONGO_URI as string;
if (!MONGODB_URI) {
    throw new Error('MongoDB_URI is undefined');
}
const DB_NAME = "cs303-mp5";

export const HREF_COLLECTION = "href-collection";

let client: MongoClient | null = null;
let db: Db | null = null;
async function connect(): Promise<Db> {
    if(!client){
        client = new MongoClient(MONGODB_URI);
        await client.connect();
    }
    return client.db(DB_NAME);
}
export default async function getCollection(): Promise<Collection<URLProps>>{
    if(!db){
        db = await connect();
    }
    const collection = db.collection<URLProps>(HREF_COLLECTION);
    await collection.createIndex({alias:1},{unique:true});
    return collection;
}