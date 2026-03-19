"use client";
import { News } from "@/types/News";

export default function NewsList({ newsList }: { newsList: News[] }) {
  return (
    <>
      <SectionHeader title="ニュース一覧" />
      <div className="py-4 w-[80%]">
        {newsList.map((news) => (
          <div
            key={news.id}
            className="mb-4 rounded-md bg-white p-4 shadow-md flex flex-col hover:translate-x-[16px] transition-all duration-300"
            onClick={() => window.open(news.link, "_blank")}
          >
            <span className="text-black text-2xl mb-2">{news.title}</span>
            <span className="text-gray-500 text-sm">{news.published}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <h2 className="text-2xl font-bold">{title}</h2>;
}
