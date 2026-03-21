import { fetchNews } from "@/lib/news";
import NewsList from "@/components/NewsList";
import { News } from "@/types/News";
import HeroSection from "@/components/HeroSection";

export default async function Page() {
  const newsList = (await fetchNews()) as News[];

  return (
    <main className="min-h-screen pb-16">
      <HeroSection />
      <NewsList newsList={newsList} sectionTitle="ニュース一覧" />
    </main>
  );
}
