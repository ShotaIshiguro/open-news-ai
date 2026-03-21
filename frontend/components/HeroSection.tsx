import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="hero-shell mx-auto mt-8 mb-10 w-full min-h-[600px] px-20 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/50" />
      <div className="grid gap-10 px-8 py-12 md:grid-cols-[1.2fr_0.8fr] md:px-12 md:py-14 relative z-10">
        <div>
          <h1 className="mb-5 text-4xl font-semibold leading-tight text-white md:text-6xl">
            OPEN NEWS AI
          </h1>
          <div className="hero-panel mt-4 w-[50%]">
            <p className="text-xs tracking-[0.18em] text-neutral-500">MENU</p>
            <div className="mt-4 space-y-3 text-sm text-neutral-700 flex flex-col gap-2">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
