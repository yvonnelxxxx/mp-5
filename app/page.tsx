import UrlForm from "@/components/UrlForm";

export default async function Home() {
  return (
      <main className="min-h-screen bg-blue-200 flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold">URL Shortener</h1>
              <p className="text-gray-400 p-2">Shorten your long URLs into compact, shareable links</p>
              <div className="flex flex-col items-start bg-white p-8 rounded-xl">
                  <h2 className="text-xl font-semibold">Shorten a URL</h2>
                  <p className="text-gray-400 py-2">Enter a long URL to create a shorter, shareable link</p>
                  <UrlForm></UrlForm>
              </div>
      </main>
  );
}