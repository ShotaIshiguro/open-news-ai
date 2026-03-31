import { fetchNews } from "@/lib/news";
import { fetchTopics } from "@/lib/topics";
import NewsList from "@/components/NewsList";
import { News } from "@/types/News";
import HeroSection from "@/components/HeroSection";

export default async function Page() {
  const newsList = (await fetchNews()) as News[];
  const topics = await fetchTopics();

  return (
    <main className="min-h-screen pb-16">
      <HeroSection pageTitle="TOP" topics={topics} />
      <NewsList newsList={newsList} sectionTitle="News" />
    </main>
  );
}
