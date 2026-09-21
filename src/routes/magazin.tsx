import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MobileFilterSheet, ProductCard } from "@/components/marketplace";
import { Slider } from "@/components/ui/slider";
import { categories, products } from "@/lib/catalog";
import { formatLei } from "@/lib/store";

const MAX_PRICE = Math.max(...products.map((product) => product.price ?? 0), 100);
const PAGE_SIZE = 6;

export const Route = createFileRoute("/magazin")({
  validateSearch: (search: Record<string, unknown>) => ({
    categorie: typeof search.categorie === "string" ? search.categorie : undefined,
    q: typeof search.q === "string" ? search.q : undefined,
  }),
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

type FilterProps = {
  selected: string;
  onSelect: (value: string) => void;
  price: [number, number];
  onPrice: (value: [number, number]) => void;
  inStockOnly: boolean;
  onInStock: (value: boolean) => void;
};

function Filters({ selected, onSelect, price, onPrice, inStockOnly, onInStock }: FilterProps) {
  return (
    <div className="space-y-7">
      <div>
        <h2 className="font-display text-sm font-bold">Categorii</h2>
        <div className="mt-3 space-y-3">
          {categories.map((category) => (
            <label key={category.name} className="flex cursor-pointer items-center gap-3 text-sm">
              <Checkbox checked={selected === category.name} onCheckedChange={() => onSelect(selected === category.name ? "" : category.name)} />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-display text-sm font-bold">Preț</h2>
        <Slider value={price} min={0} max={MAX_PRICE} step={5} className="mt-5" onValueChange={(value) => onPrice([value[0] ?? 0, value[1] ?? MAX_PRICE])} />
        <div className="mt-3 flex justify-between text-xs text-muted-foreground"><span>{formatLei(price[0])}</span><span>{formatLei(price[1])}</span></div>
      </div>
      <div>
        <h2 className="font-display text-sm font-bold">Disponibilitate</h2>
        <label className="mt-3 flex cursor-pointer items-center gap-3 text-sm">
          <Checkbox checked={inStockOnly} onCheckedChange={(value) => onInStock(value === true)} />
          <span>În stoc</span>
        </label>
      </div>
    </div>
  );
}

function ShopPage() {
  const routeSearch = Route.useSearch();
  const [category, setCategory] = useState(routeSearch.categorie ?? "");
  const [query, setQuery] = useState(routeSearch.q ?? "");
  const [sort, setSort] = useState("relevanta");
  const [price, setPrice] = useState<[number, number]>([0, MAX_PRICE]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => { setCategory(routeSearch.categorie ?? ""); setQuery(routeSearch.q ?? ""); setPage(1); }, [routeSearch.categorie, routeSearch.q]);
  useEffect(() => { setPage(1); }, [category, query, sort, price, inStockOnly]);

  const visible = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("ro");
    const filtered = products.filter((product) => {
      if (category && product.category !== category) return false;
      if (term && !`${product.name} ${product.category}`.toLocaleLowerCase("ro").includes(term)) return false;
      if (inStockOnly && product.available !== true) return false;
      if (typeof product.price === "number" && (product.price < price[0] || product.price > price[1])) return false;
      return true;
    });
    if (sort === "pret") return [...filtered].sort((a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY));
    if (sort === "noi") return [...filtered].reverse();
    return filtered;
  }, [category, query, sort, price, inStockOnly]);

  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageItems = visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const resetFilters = () => { setQuery(""); setCategory(""); setPrice([0, MAX_PRICE]); setInStockOnly(false); setSort("relevanta"); };
  const filterProps: FilterProps = { selected: category, onSelect: setCategory, price, onPrice: setPrice, inStockOnly, onInStock: setInStockOnly };

  return <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-5 lg:px-6 lg:pb-12">
    <nav className="flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb"><Link to="/">Acasă</Link><ChevronRight className="size-3" /><span className="text-foreground">Magazin</span></nav>
    <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div className="min-w-0"><h1 className="font-display text-3xl font-extrabold sm:text-4xl">Magazin</h1><p className="mt-2 text-sm text-muted-foreground">Explorează gama Sanitayaki pe categorii.</p></div><span className="text-xs font-semibold text-muted-foreground">{visible.length} produse</span></div>
    <div className="mt-6 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card/75 p-3 backdrop-blur-xl">
      <div className="flex min-w-[220px] flex-1 items-center rounded-md border border-border bg-background"><Search className="ml-3 size-4 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-hidden" placeholder="Caută în catalog" />{query ? <Button type="button" variant="ghost" size="icon" className="mr-1 size-8" onClick={() => setQuery("")} aria-label="Șterge căutarea"><X /></Button> : null}</div>
      <MobileFilterSheet><Filters {...filterProps} /></MobileFilterSheet>
      <label className="flex items-center gap-2 text-xs font-semibold"><span className="hidden sm:inline">Sortează:</span><select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-md border border-border bg-background px-3 py-2 text-sm"><option value="relevanta">Relevanță</option><option value="noi">Cele mai noi</option><option value="pret">Preț</option></select></label>
      {category || inStockOnly || query || price[0] > 0 || price[1] < MAX_PRICE ? <Button type="button" variant="ghost" size="sm" onClick={resetFilters}>Resetează</Button> : null}
    </div>
    <div className="mt-6 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="hidden self-start rounded-lg border border-border bg-card/75 p-5 backdrop-blur-xl lg:block"><Filters {...filterProps} /></aside>
      <div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">{pageItems.map((product) => <ProductCard key={product.slug} product={product} compact />)}</div>
        {visible.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-10 text-center"><p className="font-bold">Nu am găsit produse</p><p className="mt-2 text-sm text-muted-foreground">Încearcă altă căutare sau elimină filtrele.</p><Button className="mt-4" onClick={resetFilters}>Resetează filtrele</Button></div>
        ) : (
          <nav className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Paginare">
            <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Anterior</Button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((value) => <Button key={value} size="sm" variant={value === currentPage ? "default" : "outline"} onClick={() => setPage(value)} aria-current={value === currentPage ? "page" : undefined}>{value}</Button>)}
            <Button variant="outline" size="sm" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}>Următor</Button>
          </nav>
        )}
      </div>
    </div>
  </div>;
}
