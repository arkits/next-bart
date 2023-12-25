import { Feed } from "@/components/Feed";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col font-mono text-sm items-center">
      <h2 className="text-4xl font-extrabold dark:text-white mb-5 drop-shadow-lg pt-10">
        next-BART
      </h2>
      <Feed />
      <Footer />
    </main>
  );
}
