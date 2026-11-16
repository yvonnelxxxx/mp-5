"use client";

import { useState } from "react";
import ShortUrlResult from "@/components/ShortUrlResult";

type CreateShortUrlResponse = {
  shortUrl?: string;
  error?: string;
};

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, alias }),
      });
      const data: CreateShortUrlResponse = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to create a shortened URL.");
        return;
      }
      setShortUrl(data.shortUrl ?? "");
    } catch {
      setError("Unable to connect to the server. Please try again.");
    }
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div>
        <label htmlFor="long-url">URL</label>
        <br />
        <input
          id="long-url"
          name="long-url"
          type="url"
          required
          value={url}
          placeholder="https://example.com/very/long/url"
          className="mr-2 border border-gray-300 px-2 py-1 w-full rounded-lg"
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>

      <div >
        <br />
        <label htmlFor="alias">Custom Alias</label>
        <br />
        <div className="flex">
          <p className="py-1 pr-1 text-gray-400">https://mp-5-xp5h.vercel.app/</p>
          <input
              id="alias"
              name="alias"
              type="text"
              required
              value={alias}
              placeholder="example-link"
              className="mr-2 border border-gray-300 px-2 py-1 rounded-lg"
              onChange={(event) => setAlias(event.target.value)}
          />
        </div>

      </div>

      <button
        type="submit"
        className="bg-blue-400 border border-gray-300 mt-4 p-2 w-full rounded-lg text-white"
      >
        Shorten
      </button>

      <br />
      {error ? <p role="alert" className="text-red-500 font-bold">{error}</p> : null}
      {shortUrl ? <ShortUrlResult shortUrl={shortUrl} /> : null}
    </form>
  );
}
