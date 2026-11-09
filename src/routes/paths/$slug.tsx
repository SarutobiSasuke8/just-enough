import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { getLanguage } from "@/content/languages";
import { getPath } from "@/content/paths";

export const Route = createFileRoute("/paths/$slug")({
  loader: ({ params }) => {
    const path = getPath(params.slug);
    if (!path) throw notFound();
    return { path };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData ? `${loaderData.path.title} — Just enough` : "Just enough",
      },
    ],
  }),
  component: PathPage,
});

function PathPage() {
  const { path } = Route.useLoaderData();
  const first = path.steps[0];

  return (
    <Shell>
      <main className="mx-auto max-w-2xl px-5 py-12">
        <p className="tabular-nums text-sm text-oxide">{path.index}</p>
        <h1 className="mt-2 font-serif text-5xl leading-display tracking-tight">{path.title}</h1>
        <p className="mt-4 text-lg text-muted">{path.promise}</p>
        <p className="mt-3 text-sm tabular-nums text-muted">About {path.minutes} minutes, if you make the thing</p>

        <ol className="mt-12 flex flex-col">
          {path.steps.map((step, index) => {
            if (step.kind === "review") {
              return (
                <li key="review" className="border-t border-line py-6">
                  <p className="tabular-nums text-sm text-oxide">0{index + 1}</p>
                  <h2 className="mt-2 font-serif text-3xl">How to read</h2>
                  <p className="mt-2 text-muted">{step.why}</p>
                  <Link
                    to="/review"
                    className="mt-4 inline-flex min-h-11 items-center text-oxide underline underline-offset-4"
                  >
                    Open the six habits
                  </Link>
                </li>
              );
            }
            const language = getLanguage(step.slug);
            if (!language) return null;
            return (
              <li key={step.slug} className="border-t border-line py-6">
                <p className="tabular-nums text-sm text-oxide">0{index + 1}</p>
                <h2 className="mt-2 font-serif text-3xl">{language.name}</h2>
                <p className="mt-2 text-muted">{step.why}</p>
                <Link
                  to="/languages/$slug"
                  params={{ slug: language.slug }}
                  className="mt-4 inline-flex min-h-11 items-center text-oxide underline underline-offset-4"
                >
                  Read {language.name}
                </Link>
              </li>
            );
          })}
        </ol>

        <blockquote className="mt-4 border-l-2 border-oxide py-2 pl-5">
          <p className="text-xs tracking-wide text-muted uppercase">Stop when</p>
          <p className="mt-2 font-serif text-2xl leading-snug">{path.stop}</p>
        </blockquote>

        <div className="mt-10">
          {first?.kind === "review" ? (
            <Button asChild>
              <Link to="/review">Start with how to read</Link>
            </Button>
          ) : first?.kind === "language" ? (
            <Button asChild>
              <Link to="/languages/$slug" params={{ slug: first.slug }}>
                Start with {getLanguage(first.slug)?.name}
              </Link>
            </Button>
          ) : null}
        </div>
      </main>
    </Shell>
  );
}
