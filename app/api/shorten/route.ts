import getCollection from "@/lib/db";
import {validateUrl} from "@/lib/validateUrl";

export async function POST(request: Request){
    const req = await request.json();
    const url = req.url;
    const alias = req.alias;
    if (typeof url !== "string" || typeof alias !== "string") {
        return Response.json(
            { error: "URL and alias are required." },
            { status: 400 }
        );
    }

    if (!validateUrl(url)) {
        return Response.json(
            { error: "Invalid URL: Could not verify URL. Please try again.\n" },
            { status: 400 }
        );
    }

    const collection = await getCollection();
    const existing = await collection.findOne({alias});
    if (existing) {
        return Response.json(
            { error: "Invalid alias: This alias already exists.\n" },
            { status: 409 }
        );
    }
    await collection.insertOne({alias: alias, href: url});
    const origin = new URL(request.url).origin;
    const shortUrl = `${origin}/${alias}`;
    return Response.json({ shortUrl }, { status: 201 });
}