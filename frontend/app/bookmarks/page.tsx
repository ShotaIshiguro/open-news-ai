import { fetchBookmarks } from "@/lib/news";
import { fetchTopics } from "@/lib/topics";
import NewsList from "@/components/NewsList";
import { News } from "@/types/News";
import HeroSection from "@/components/HeroSection";

export default async function Page() {
  const newsList = (await fetchBookmarks()) as News[];
  const topics = await fetchTopics();

  return (
    <main>
      <HeroSection pageTitle="BOOKMARKS" topics={topics} />
      <NewsList newsList={newsList} sectionTitle="Bookmarks" />
    </main>
  );
}
