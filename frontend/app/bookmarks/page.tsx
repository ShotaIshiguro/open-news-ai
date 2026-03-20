import { fetchBookmarks } from "@/lib/news";
import NewsList from "@/components/NewsList";
import { News } from "@/types/News";

export default async function Page() {
  const newsList = (await fetchBookmarks()) as News[];

  return (
    <main>
      <h1>Open News AI</h1>
      <NewsList newsList={newsList} sectionTitle="ブックマーク一覧" />
    </main>
  );
}
