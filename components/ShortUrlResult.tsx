"use client";

import { useState } from "react";

export default function ShortUrlResult({ shortUrl }: { shortUrl: string }) {
    const [copied, setCopied] = useState(false);

    async function copy() {
        await navigator.clipboard.writeText(shortUrl);
        setCopied(true);
    }
    return (
        <div className="justify-center w-full border border-gray-300 p-2 mt-4 rounded-lg">
            <p className="text-gray-400 p-1">Your shortened URL:</p>
            <div className="flex items-center gap-4">
                <a href={shortUrl} target="_blank" rel="noreferrer" className="text-xl font-bold">
                    {shortUrl}
                </a>
                <button type="button" onClick={copy} className="bg-gray-300 p-2 rounded-lg">
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>

        </div>
    );
}