import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeadContent, Link, Outlet, Scripts, createRootRouteWithContext, useRouter } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { MarketplaceHeader } from "@/components/marketplace";
import { StoreProvider } from "@/lib/store";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return <div className="grid min-h-[70vh] place-items-center px-4"><div className="text-center"><p className="font-display text-7xl font-extrabold text-primary">404</p><h1 className="mt-3 text-xl font-bold">Pagina nu a fost găsită</h1><p className="mt-2 text-sm text-muted-foreground">Adresa căutată nu mai este disponibilă.</p><Button asChild className="mt-6"><Link to="/">Înapoi acasă</Link></Button></div></div>;
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return <div className="grid min-h-[70vh] place-items-center px-4"><div className="text-center"><h1 className="text-xl font-bold">Pagina nu s-a încărcat</h1><p className="mt-2 text-sm text-muted-foreground">Încearcă din nou sau revino la pagina principală.</p><div className="mt-6 flex justify-center gap-2"><Button onClick={() => { router.invalidate(); reset(); }}>Încearcă din nou</Button><Button variant="outline" asChild><Link to="/">Acasă</Link></Button></div></div></div>;
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Sanitayaki" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return <html lang="ro"><head><HeadContent /></head><body>{children}<Scripts /></body></html>;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <MarketplaceHeader />
        <main><Outlet /></main>
        <Toaster />
      </StoreProvider>
    </QueryClientProvider>
  );
}
