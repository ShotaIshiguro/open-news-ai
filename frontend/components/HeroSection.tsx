"use client";
import Link from "next/link";
import { Triangle } from "lucide-react";
import { useState } from "react";
import { Topic as Topic } from "@/types/Topic";
import { Plus, X } from "lucide-react";
type HeroSectionProps = {
  pageTitle?: string;
  /** サーバー（page.tsx）で await fetchTopics() した結果を渡す */
  topics?: Topic[];
};

export default function HeroSection({
  pageTitle,
  topics = [],
}: HeroSectionProps) {
  // トピックメニュー開閉
  const [isOpen, setIsOpen] = useState(false);
  // トピック追加モーダル開閉
  const [isTopicAddAreaOpen, setIsTopicAddAreaOpen] = useState(false);
  // トピック追加モーダルの新規トピック名
  const [newTopicName, setNewTopicName] = useState("");
  // トピック追加モーダルの新規RSSソースURL
  const [newSourceURL, setNewSourceURL] = useState("");
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const toggleTopicAddAreaOpen = () => {
    setIsTopicAddAreaOpen(!isTopicAddAreaOpen);
  };
  const handleSubmitTopicAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const topicName = formData.get("topicName") as string;
    const sourceURL = formData.get("sourceURL") as string;
  };

  return (
    <section className="hero-shell mx-auto mb-10 w-full min-h-screen px-20 py-12 relative overflow-hidden">
      <div className="grid gap-10 px-8 py-12 md:grid-cols-[1.2fr_0.8fr] md:px-12 md:py-14 relative z-10">
        <div>
          <h1 className="mb-5 text-4xl font-semibold leading-tight text-white md:text-6xl">
            {pageTitle ?? "OPEN NEWS AI"}
          </h1>
          <div className="hero-panel mt-4 w-[50%]">
            <p className=" tracking-[0.18em] text-neutral-500 text-xl">MENU</p>
            <div className="mt-4 text-sm text-neutral-700 flex flex-col gap-2">
              <Link
                href="/"
                className="group relative inline-block text-neutral-700 leading-none"
              >
                <span className="relative block">
                  <span className="block transition-colors duration-300 group-hover:text-neutral-900">
                    01 Top
                  </span>
                </span>
                {/* 下線（左→右） */}
                <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-neutral-900 transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </Link>
              <Link
                href="/bookmarks"
                className="group relative inline-block text-neutral-700 leading-none"
              >
                <span className="relative block">
                  <span className="block transition-colors duration-300 group-hover:text-neutral-900">
                    02 Bookmarks
                  </span>
                </span>
                {/* 下線（左→右） */}
                <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-neutral-900 transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </Link>

              <div className="flex gap-2 items-center" onClick={toggleOpen}>
                <Triangle
                  className={`w-3 h-3 transition-transform duration-300 ease-out ${isOpen ? "text-neutral-900 rotate-180" : "text-neutral-700 rotate-90"}`}
                />
                <p className="text-neutral-700 text-sm">Topics</p>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  isOpen
                    ? "mt-4 max-h-40 opacity-100 transition-all duration-300 ease-out"
                    : "mt-0 max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-1 text-sm text-neutral-700 flex flex-col gap-2">
                  {topics.map((topic: Topic) => (
                    <Link
                      key={topic.id}
                      href={`/topics/${topic.id}`}
                      className="group relative inline-block text-neutral-700 leading-none"
                    >
                      <span className="relative block">
                        <span className="block transition-colors duration-300 group-hover:text-neutral-900">
                          {topic.name}
                        </span>
                      </span>
                      {/* 下線（左→右） */}
                      <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-neutral-900 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    </Link>
                  ))}
                  <div className="flex justify-end">
                    <Plus
                      className="w-4 h-4 text-neutral-700"
                      onClick={toggleTopicAddAreaOpen}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`mt-6 transition-all duration-500 ease-out overflow-hidden bg-mauve-900 rounded-md p-4 ${isTopicAddAreaOpen ? " max-w-[80%] opacity-80" : "max-h-0 max-w-0 opacity-0"}`}
          >
            <form onSubmit={handleSubmitTopicAdd}>
              <div className="flex justify-between">
                <span className="text-md font-semibold text-white">
                  Topic を追加
                </span>
                <X
                  className="w-6 h-6 text-neutral-100"
                  onClick={toggleTopicAddAreaOpen}
                />
              </div>
              <div className="flex justify-between mt-4 items-center">
                <input
                  type="text"
                  className="border border-natural-100 h-10 rounded-md w-[70%] focus:outline-none text-neutral-100 pl-2"
                  name="topicName"
                  placeholder="Topic Name..."
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                />
              </div>
              <div className="flex justify-between mt-4">
                <input
                  type="text"
                  className="border border-natural-100 h-10 rounded-md w-[70%] focus:outline-none text-neutral-100 pl-2"
                  name="sourceURL"
                  placeholder="Source URL..."
                  value={newSourceURL}
                  onChange={(e) => setNewSourceURL(e.target.value)}
                />
                <select className="border border-natural-100 h-10 rounded-md w-[20%] focus:outline-none text-neutral-100 pl-2">
                  <option value="rss">RSS</option>
                  <option value="sns">SNS</option>
                </select>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-neutral-100 text-mauve-900 px-4 py-2 rounded-md h-10 w-[20%]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
