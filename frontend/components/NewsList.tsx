"use client";
import { News } from "@/types/News";
import { Bookmark } from "lucide-react";
import { toggleBookmark } from "@/lib/news";
import { useRouter } from "next/navigation";

export default function NewsList({
  newsList,
  sectionTitle,
}: {
  newsList: News[];
  sectionTitle: string;
}) {
  const router = useRouter();
  const handleToggleBookmark = (id: number) => {
    toggleBookmark(id);
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center">
      <SectionHeader title={sectionTitle} />
      <div className="py-8 px-8 w-[80%] grid grid-cols-3 gap-4 max-h-[600px] overflow-y-auto ">
        {newsList.map((news) => (
          <div
            key={news.id}
            className="mb-4 min-h-[150px] justify-between rounded-md bg-white p-4 shadow-md flex flex-col hover:translate-y-[-8px] transition-all duration-300"
          >
            <span
              className="text-black text-xl mb-2 hover:font-bold transition-all duration-300"
              onClick={() => window.open(news.link, "_blank")}
            >
              {news.title}
            </span>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">{news.published}</span>
              <button
                type="button"
                aria-label={`${news.title}をブックマーク`}
                aria-pressed={news.isBookmarked}
                onClick={() => handleToggleBookmark(news.id)}
                className={`rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${
                  news.isBookmarked
                    ? "bg-sky-100 text-sky-600"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                <Bookmark
                  className={`h-6 w-6 ${
                    news.isBookmarked ? "fill-current" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <h2 className="text-2xl font-bold">{title}</h2>;
}
