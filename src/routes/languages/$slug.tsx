import { createFileRoute, notFound } from "@tanstack/react-router";
import { LanguageView } from "@/components/language-view";
import { Shell } from "@/components/shell";
import { getLanguage } from "@/content/languages";

export const Route = createFileRoute("/languages/$slug")({
  loader: ({ params }) => {
    const language = getLanguage(params.slug);
    if (!language) throw notFound();
    return { language };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.language.name} — Just enough`
          : "Just enough",
      },
    ],
  }),
  component: LanguagePage,
});

function LanguagePage() {
  const { language } = Route.useLoaderData();
  return (
    <Shell>
      <main>
        <LanguageView language={language} />
      </main>
    </Shell>
  );
}
