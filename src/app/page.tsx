import { Feed } from "@/components/Feed";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24 font-mono text-sm items-center">
      <h2 className="text-4xl font-extrabold dark:text-white mb-5">
        next-BART
      </h2>
      <Feed />
    </main>
  );
}
