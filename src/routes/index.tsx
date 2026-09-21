import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryIcon, MarketplaceBand, ProductRail, SectionHeading, TrustBand } from "@/components/marketplace";
import { assets, categories, products } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Sanitayaki — Produse pentru sănătate și wellness" },
    { name: "description", content: "Descoperă gama Sanitayaki de produse pentru sănătate, confort, monitorizare și wellness." },
    { property: "og:title", content: "Sanitayaki — Marketplace pentru sănătate și wellness" },
    { property: "og:description", content: "Produse Sanitayaki organizate simplu, cu descoperire rapidă pe categorii." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-4 pt-4 lg:px-6 lg:pt-6">
        <div className="relative min-h-[470px] overflow-hidden rounded-lg bg-brand-dark sm:min-h-[520px]">
          <img src={assets.heroImage} alt="Spațiu modern cu produse Sanitayaki pentru confort și îngrijire" width={1920} height={912} className="absolute inset-0 size-full object-cover object-center" />
          <div className="absolute inset-0 bg-linear-to-r from-brand-dark via-brand-dark/85 to-brand-dark/5" />
          <div className="relative flex min-h-[470px] max-w-2xl flex-col justify-center px-6 py-12 text-primary-foreground sm:min-h-[520px] sm:px-10 lg:px-14">
            <span className="w-fit rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1 text-xs font-bold backdrop-blur-md">CONFORT · ÎNGRIJIRE · WELLNESS</span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] sm:text-6xl">Sănătate, ordonată pe rafturi.</h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-primary-foreground/85 sm:text-lg">Produse pentru confort, monitorizare și rutina zilnică, reunite într-o experiență simplă de cumpărare.</p>
            <div className="mt-7 flex flex-wrap gap-3"><Button asChild size="lg" variant="secondary"><Link to="/magazin" search={{ categorie: undefined, q: undefined }}>Explorează categoriile <ArrowRight /></Link></Button><Button asChild size="lg" className="border border-primary-foreground/30 bg-primary-foreground/10 hover:bg-primary-foreground/20"><a href="#promovate">Produse promovate</a></Button></div>
          </div>
        </div>
      </section>

      <section className="market-section">
        <SectionHeading title="Descoperă categorii" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => <Link key={category.name} to="/magazin" search={{ categorie: category.name, q: undefined }} className="group frost-panel rounded-lg border border-border p-4 shadow-xs hover:border-primary/30 hover:shadow-md"><span className="grid size-11 place-items-center rounded-md bg-accent text-primary"><CategoryIcon name={category.name} /></span><h3 className="mt-4 text-sm font-bold group-hover:text-primary">{category.name}</h3><p className="mt-1 text-xs text-muted-foreground">{category.description}</p></Link>)}
        </div>
      </section>

      <section className="market-section">
        <div className="grid overflow-hidden rounded-lg border border-border bg-card/80 shadow-xs backdrop-blur-xl lg:grid-cols-2">
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <span className="text-xs font-extrabold text-primary">COLECȚIE · ÎNGRIJIRE</span>
            <h2 className="mt-3 font-display text-3xl font-bold">Bee Venom Cream & Scorpion Cream</h2>
            <p className="mt-3 max-w-md leading-7 text-muted-foreground">Două produse pentru rutina de îngrijire, prezentate clar și fără promisiuni medicale.</p>
            <div className="mt-6 space-y-3">
              {["Bee Venom Cream", "Scorpion Cream"].map((name) => <div key={name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-md border border-border bg-background p-3"><div className="min-w-0"><p className="truncate text-sm font-bold">{name}</p><p className="text-xs text-muted-foreground">Detalii și disponibilitate în pagina produsului</p></div><Button asChild size="sm" variant="outline"><Link to="/magazin" search={{ categorie: "Wellness", q: name }}>Vezi <ChevronRight /></Link></Button></div>)}
            </div>
          </div>
          <img src={assets.creamImage} alt="Bee Venom Cream și Scorpion Cream într-o prezentare cosmetică" loading="lazy" width={1200} height={912} className="min-h-80 size-full object-cover" />
        </div>
      </section>

      <div id="promovate"><ProductRail label="Produse promovate" products={products.slice(0, 6)} /></div>

      <ProductRail label="Cele mai vândute" products={products.slice(2)} />

      <section className="market-section">
        <div className="relative overflow-hidden rounded-lg bg-foreground p-7 text-background sm:p-10">
          <img src={assets.collectionImage} alt="Selecție de produse pentru confort și monitorizare" loading="lazy" width={1600} height={1008} className="absolute inset-0 size-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-linear-to-r from-foreground via-foreground/90 to-foreground/20" />
          <div className="relative max-w-xl"><span className="inline-flex items-center gap-2 text-xs font-extrabold text-sale"><Sparkles className="size-4" /> OFERTE SPECIALE</span><h2 className="mt-3 font-display text-3xl font-bold">Produsele potrivite, mai ușor de găsit.</h2><p className="mt-3 text-sm leading-6 text-background/70">Consultă selecțiile și prețurile actuale direct în catalogul Sanitayaki.</p><Button asChild className="mt-6"><Link to="/magazin" search={{ categorie: undefined, q: undefined }}>Vezi ofertele <ArrowRight /></Link></Button></div>
        </div>
      </section>

      <ProductRail label="S-ar putea să îți placă" products={[...products].reverse().slice(0, 6)} />
      <TrustBand />
      <MarketplaceBand />
    </>
  );
}
