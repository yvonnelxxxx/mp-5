import getCollection from "@/lib/db";
import {notFound, redirect} from "next/navigation";

export const instant = false;

export default async function page({params,}:{params: Promise<{alias: string}>;
}){
    const {alias} = await params;
    const collection = await getCollection();
    const record = await collection.findOne({alias});
    if(!record){
        notFound();
    }
    redirect(record.href);
}
