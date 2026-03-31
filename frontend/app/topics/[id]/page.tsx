import { notFound } from "next/navigation";
import { fetchNews } from "@/lib/news";
import { fetchTopics } from "@/lib/topics";
import NewsList from "@/components/NewsList";
import { News } from "@/types/News";
import type { Topic } from "@/types/Topic";
import HeroSection from "@/components/HeroSection";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TopicNewsPage({ params }: Props) {
  const { id } = await params;
  const topicId = Number.parseInt(id, 10);

  if (Number.isNaN(topicId) || topicId < 1) {
    notFound();
  }

  const [newsList, topics] = await Promise.all([
    fetchNews(topicId) as Promise<News[]>,
    fetchTopics(),
  ]);

  const topicName = topics.find((t: Topic) => t.id === topicId)?.name;
  const sectionTitle = topicName ?? `Topic #${topicId}`;

  return (
    <main className="min-h-screen pb-16">
      <HeroSection pageTitle={sectionTitle} topics={topics} />
      <NewsList newsList={newsList} sectionTitle={sectionTitle} />
    </main>
  );
}
