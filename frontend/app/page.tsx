import { fetchNews } from "@/lib/news";
import NewsList from "@/components/NewsList";
import { News } from "@/types/News";

export default async function Paage() {
  const newsList = (await fetchNews()) as News[];

  return (
    <main>
      <h1>Open News AI</h1>
      <NewsList newsList={newsList} />
    </main>
  );
}
