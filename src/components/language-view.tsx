import { Link } from "@tanstack/react-router";
import { CopyPrompt } from "@/components/copy-prompt";
import { ReadCheck } from "@/components/read-check";
import { Button } from "@/components/ui/button";
import type { Language } from "@/content/languages";
import { pathsForLanguage } from "@/content/paths";
import { useProgress } from "@/lib/progress";

const jumps = [
  { href: "#ask", label: "You can ask for" },
  { href: "#know", label: "Know these" },
  { href: "#leave", label: "Leave these" },
  { href: "#prompt", label: "A prompt" },
  { href: "#read", label: "Read this" },
];

export function LanguageView({ language }: { language: Language }) {
  const steered = useProgress((state) => Boolean(state.steered[language.slug]));
  const toggle = useProgress((state) => state.toggleSteered);
  const related = pathsForLanguage(language.slug);

  return (
    <article className="mx-auto max-w-2xl px-5 py-12">
      <p className="tabular-nums text-sm text-oxide">{language.index}</p>
      <h1 className="mt-2 font-serif text-5xl leading-display tracking-tight">{language.name}</h1>
      <p className="mt-4 text-lg text-muted">{language.job}</p>
      <p className="mt-3 text-sm tabular-nums text-muted">
        About {language.minutes} minutes · {language.know.length} ideas
      </p>

      <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-x-4 gap-y-1 border-y border-line py-2 text-sm">
        {jumps.map((jump) => (
          <a key={jump.href} href={jump.href} className="py-2 text-muted hover:text-ink">
            {jump.label}
          </a>
        ))}
      </nav>

      <blockquote className="mt-10 border-l-2 border-oxide pl-5">
        <p className="text-xs tracking-wide text-muted uppercase">If you only remember one thing</p>
        <p className="mt-2 font-serif text-2xl leading-snug">{language.oneThing}</p>
      </blockquote>

      <section id="ask" className="mt-14 scroll-mt-8">
        <h2 className="font-serif text-3xl">You can already ask for</h2>
        <p className="mt-3 text-muted">
          These are small enough to finish in a sitting. Paste the prompt at the bottom and replace the brackets.
        </p>
        <ol className="mt-6 flex flex-col">
          {language.possible.map((item, index) => (
            <li key={item.title} className="grid grid-cols-[auto_1fr] gap-4 border-t border-line py-5">
              <span className="tabular-nums text-sm text-oxide">0{index + 1}</span>
              <span>
                <span className="block font-medium">{item.title}</span>
                <span className="mt-1 block text-sm text-muted">{item.detail}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section id="know" className="mt-14 scroll-mt-8">
        <h2 className="font-serif text-3xl">Know these</h2>
        <p className="mt-3 text-muted">Enough to steer. Not enough to recite.</p>
        <div className="mt-8 flex flex-col gap-10">
          {language.know.map((concept, index) => (
            <section key={concept.name}>
              <h3 className="font-serif text-2xl">
                <span className="mr-2 tabular-nums text-muted">{index + 1}</span>
                {concept.name}
              </h3>
              <p className="mt-3">{concept.body}</p>
              {concept.code ? (
                <figure className="mt-4">
                  {concept.codeLang ? (
                    <figcaption className="mb-2 text-sm text-muted">{concept.codeLang}</figcaption>
                  ) : null}
                  <pre className="overflow-x-auto bg-ink p-5 font-mono text-sm leading-relaxed text-paper">
                    {concept.code}
                  </pre>
                </figure>
              ) : null}
            </section>
          ))}
        </div>
      </section>

      <section id="leave" className="mt-14 scroll-mt-8">
        <h2 className="font-serif text-3xl">Leave these</h2>
        <p className="mt-3 text-muted">They are real. They are not first. Come back when a task forces them.</p>
        <ul className="mt-6 border-t border-line">
          {language.skip.map((item) => (
            <li key={item} className="border-b border-line py-3 text-muted">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section id="prompt" className="mt-14 scroll-mt-8">
        <h2 className="font-serif text-3xl">A prompt that works</h2>
        <p className="mt-3 text-muted">
          Replace the brackets with your real goal. Leave the constraints — they are the part that keeps the answer small.
        </p>
        <div className="mt-6">
          <CopyPrompt text={language.prompt} />
        </div>
      </section>

      <section id="read" className="mt-14 scroll-mt-8">
        <h2 className="font-serif text-3xl">Read this</h2>
        <p className="mt-3 mb-6 text-muted">
          Don’t write it. Decide what it does. That is the job now that you have a model.
        </p>
        <ReadCheck read={language.read} />
      </section>

      {related.length > 0 ? (
        <p className="mt-14 text-sm text-muted">
          Shows up in{" "}
          {related.map((path, index) => (
            <span key={path.slug}>
              {index > 0 ? ", " : null}
              <Link to="/paths/$slug" params={{ slug: path.slug }} className="text-oxide underline underline-offset-4">
                {path.title}
              </Link>
            </span>
          ))}
          .
        </p>
      ) : null}

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button type="button" variant={steered ? "quiet" : "primary"} onClick={() => toggle(language.slug)}>
          {steered ? "Marked as enough" : "That’s enough for now"}
        </Button>
        <Button asChild variant="quiet">
          <Link to="/">Back to the map</Link>
        </Button>
      </div>
    </article>
  );
}
