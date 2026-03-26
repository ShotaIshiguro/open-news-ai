"use client";
import Link from "next/link";
import { Triangle } from "lucide-react";
import { useState } from "react";

type HeroSectionProps = {
  pageTitle?: string;
};

export default function HeroSection({ pageTitle }: HeroSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <section className="hero-shell mx-auto mb-10 w-full min-h-screen px-20 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/50" />
      <div className="grid gap-10 px-8 py-12 md:grid-cols-[1.2fr_0.8fr] md:px-12 md:py-14 relative z-10">
        <div>
          <h1 className="mb-5 text-4xl font-semibold leading-tight text-white md:text-6xl">
            {pageTitle ?? "OPEN NEWS AI"}
          </h1>
          <div className="hero-panel mt-4 w-[50%]">
            <p className="text-xs tracking-[0.18em] text-neutral-500">MENU</p>
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
                  <p className="text-neutral-700 text-sm pl-5">Topic 1</p>
                  <p className="text-neutral-700 text-sm pl-5">Topic 2</p>
                  <p className="text-neutral-700 text-sm pl-5">Topic 3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
