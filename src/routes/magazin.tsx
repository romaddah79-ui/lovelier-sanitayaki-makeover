import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MobileFilterSheet, ProductCard } from "@/components/marketplace";
import { Slider } from "@/components/ui/slider";
import { categories, products } from "@/lib/catalog";

export const Route = createFileRoute("/magazin")({
  validateSearch: (search: Record<string, unknown>) => ({ categorie: typeof search.categorie === "string" ? search.categorie : undefined }),
  head: () => ({ meta: [
    { title: "Magazin Sanitayaki — Catalog produse" },
    { name: "description", content: "Explorează catalogul Sanitayaki și filtrează produse pentru confort, monitorizare și wellness." },
    { property: "og:title", content: "Magazin Sanitayaki — Catalog produse" },
    { property: "og:description", content: "Categorii, filtre și produse Sanitayaki într-un catalog modern și ușor de parcurs." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ShopPage,
});

function Filters({ selected, onSelect }: { selected: string; onSelect: (value: string) => void }) {
  return <div className="space-y-7"><div><h2 className="font-display text-sm font-bold">Categorii</h2><div className="mt-3 space-y-3">{categories.map((category) => <label key={category.name} className="flex cursor-pointer items-center gap-3 text-sm"><Checkbox checked={selected === category.name} onCheckedChange={() => onSelect(selected === category.name ? "" : category.name)} /><span>{category.name}</span></label>)}</div></div><div><h2 className="font-display text-sm font-bold">Preț</h2><Slider defaultValue={[0, 100]} max={100} step={1} className="mt-5" /><div className="mt-3 flex justify-between text-xs text-muted-foreground"><span>Minim</span><span>Maxim</span></div></div><div><h2 className="font-display text-sm font-bold">Disponibilitate</h2><label className="mt-3 flex items-center gap-3 text-sm"><Checkbox defaultChecked /><span>În stoc</span></label></div></div>;
}

function ShopPage() {
  const routeSearch = Route.useSearch();
  const [category, setCategory] = useState(routeSearch.categorie ?? "");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("relevanta");
  const visible = useMemo(() => products.filter((product) => (!category || product.category === category) && product.name.toLocaleLowerCase("ro").includes(query.toLocaleLowerCase("ro"))), [category, query]);
  return <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-5 lg:px-6 lg:pb-12">
    <nav className="flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb"><Link to="/">Acasă</Link><ChevronRight className="size-3" /><span className="text-foreground">Magazin</span></nav>
    <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div className="min-w-0"><h1 className="font-display text-3xl font-extrabold sm:text-4xl">Magazin</h1><p className="mt-2 text-sm text-muted-foreground">Explorează gama Sanitayaki pe categorii.</p></div><span className="text-xs font-semibold text-muted-foreground">{visible.length} produse</span></div>
    <div className="mt-6 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card/75 p-3 backdrop-blur-xl">
      <div className="flex min-w-[220px] flex-1 items-center rounded-md border border-border bg-background"><Search className="ml-3 size-4 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-hidden" placeholder="Caută în catalog" /></div>
      <MobileFilterSheet><Filters selected={category} onSelect={setCategory} /></MobileFilterSheet>
      <label className="flex items-center gap-2 text-xs font-semibold"><span className="hidden sm:inline">Sortează:</span><select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-md border border-border bg-background px-3 py-2 text-sm"><option value="relevanta">Relevanță</option><option value="noi">Cele mai noi</option><option value="pret">Preț</option></select></label>
    </div>
    <div className="mt-6 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="hidden self-start rounded-lg border border-border bg-card/75 p-5 backdrop-blur-xl lg:block"><Filters selected={category} onSelect={setCategory} /></aside>
      <div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">{visible.map((product) => <ProductCard key={product.slug} product={product} compact />)}</div>{visible.length === 0 ? <div className="rounded-lg border border-border bg-card p-10 text-center"><p className="font-bold">Nu am găsit produse</p><p className="mt-2 text-sm text-muted-foreground">Încearcă altă căutare sau elimină filtrele.</p><Button className="mt-4" onClick={() => { setQuery(""); setCategory(""); }}>Resetează filtrele</Button></div> : <nav className="mt-8 flex justify-center gap-2" aria-label="Paginare"><Button variant="outline" size="sm" disabled>Anterior</Button><Button size="sm">1</Button><Button variant="outline" size="sm" disabled>Următor</Button></nav>}</div>
    </div>
  </div>;
}
