import { fetchBookmarks } from "@/lib/news";
import NewsList from "@/components/NewsList";
import { News } from "@/types/News";
import HeroSection from "@/components/HeroSection";

export default async function Page() {
  const newsList = (await fetchBookmarks()) as News[];

  return (
    <main>
      <HeroSection pageTitle="BOOKMARKS" />
      <NewsList newsList={newsList} sectionTitle="Bookmarks" />
    </main>
  );
}
