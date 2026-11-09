import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { languages } from "@/content/languages";
import { paths } from "@/content/paths";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <Shell>
      <main>
        <section className="mx-auto max-w-5xl px-5 pt-16 pb-12 sm:pt-24">
          <p className="text-sm tracking-wide text-oxide uppercase">A field guide</p>
          <h1 className="mt-4 max-w-3xl font-serif text-6xl leading-display tracking-tight sm:text-8xl">
            Just
            <br />
            enough<span className="text-oxide">.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted">
            You already have an AI. You do not need a language course. You need to know what to ask for,
            the few ideas that let you steer, and how to tell when the answer is wrong.
          </p>
        </section>

        <section aria-label="Ways in" className="mx-auto grid max-w-5xl gap-px border-y border-line bg-line px-0 sm:grid-cols-3">
          {paths.map((path) => (
            <Link
              key={path.slug}
              to="/paths/$slug"
              params={{ slug: path.slug }}
              className="flex min-h-44 flex-col bg-paper px-5 py-6 transition-colors duration-200 hover:bg-paper-2"
            >
              <span className="tabular-nums text-sm text-oxide">{path.index}</span>
              <span className="mt-4 font-serif text-3xl leading-tight">{path.title}</span>
              <span className="mt-2 text-muted">{path.line}</span>
              <span className="mt-auto pt-6 text-sm tabular-nums text-muted">About {path.minutes} min</span>
            </Link>
          ))}
        </section>

        <section id="languages" className="mx-auto max-w-5xl px-5 py-16">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-serif text-4xl">The languages</h2>
            <p className="max-w-sm text-sm text-muted">
              Pick one. Read it once. Mark it when you can steer, not when you have memorized it.
            </p>
          </div>
          <div className="mt-8 border-b border-line">
            {languages.map((language) => (
              <Link
                key={language.slug}
                to="/languages/$slug"
                params={{ slug: language.slug }}
                className="grid grid-cols-[3rem_1fr] gap-x-3 border-t border-line py-5 hover:bg-paper-2 sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-x-6 sm:px-2"
              >
                <span className="font-serif text-oxide tabular-nums">{language.index}</span>
                <span>
                  <span className="block font-serif text-3xl">{language.name}</span>
                  <span className="mt-1 block text-muted">{language.line}</span>
                </span>
                <span className="col-start-2 mt-2 text-sm tabular-nums text-muted sm:col-start-auto sm:mt-0">
                  {language.minutes} min
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Shell>
  );
}
