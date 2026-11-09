import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Shell } from "@/components/shell";
import appCss from "../styles.css?url";

const APP_NAME = "Just enough";
const DESCRIPTION =
  "A short field guide to programming languages for people who code with AI. What to ask for, what to know, and what to skip.";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${APP_NAME} — languages for people who code with AI` },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#f3efe6" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,620;1,9..144,500&family=Outfit:wght@400;500;600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <Shell>
      <main className="mx-auto max-w-2xl px-5 py-24">
        <h1 className="font-serif text-4xl leading-display">This page is not in the guide.</h1>
        <p className="mt-4 text-muted">The map has six languages and three ways in. This is not one of them.</p>
        <Link to="/" className="mt-8 inline-flex min-h-11 items-center text-oxide underline underline-offset-4">
          Back to the map
        </Link>
      </main>
    </Shell>
  );
}
