import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronRight, Heart, Minus, Plus, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductRail } from "@/components/marketplace";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { assets, products } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/produs/$slug")({
  head: ({ params }) => ({ meta: [
    { title: `${products.find((item) => item.slug === params.slug)?.name ?? "Produs"} — Sanitayaki` },
    { name: "description", content: "Vezi informațiile, imaginile și disponibilitatea produsului Sanitayaki." },
    { property: "og:title", content: `${products.find((item) => item.slug === params.slug)?.name ?? "Produs"} — Sanitayaki` },
    { property: "og:description", content: "Detalii clare despre produs, livrare și opțiuni de cumpărare." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const store = useStore();
  const product = products.find((item) => item.slug === slug) ?? products[0];
  const favorite = store.isWishlisted(product.slug);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const gallery = [product.image, assets.collectionImage, assets.heroImage];
  return <>
    <div className="mx-auto max-w-[1440px] px-4 pb-4 pt-5 lg:px-6">
      <nav className="scrollbar-none flex items-center gap-2 overflow-x-auto whitespace-nowrap text-xs text-muted-foreground" aria-label="Breadcrumb"><Link to="/">Acasă</Link><ChevronRight className="size-3" /><Link to="/magazin" search={{ categorie: undefined, q: undefined }}>Magazin</Link><ChevronRight className="size-3" /><span className="truncate text-foreground">{product.name}</span></nav>
      <section className="mt-6 grid gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,.95fr)]">
        <div className="grid gap-3 sm:grid-cols-[76px_minmax(0,1fr)]">
          <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:flex-col">{gallery.map((image, index) => <button type="button" key={`${image}-${index}`} onClick={() => setActiveImage(index)} className={`size-16 shrink-0 overflow-hidden rounded-md border bg-card ${activeImage === index ? "border-primary ring-2 ring-primary/15" : "border-border"}`} aria-label={`Imaginea ${index + 1}`}><img src={image} alt="" className="size-full object-cover" /></button>)}</div>
          <div className="order-1 aspect-square overflow-hidden rounded-lg border border-border bg-card sm:order-2"><img src={gallery[activeImage]} alt={product.name} width={1600} height={1008} className="size-full object-cover" /></div>
        </div>
        <div className="self-start rounded-lg border border-border bg-card/80 p-5 shadow-xs backdrop-blur-xl sm:p-7">
          <p className="text-xs font-extrabold uppercase text-primary">{product.category}</p><h1 className="mt-2 font-display text-2xl font-extrabold leading-tight sm:text-3xl">{product.name}</h1><p className="mt-4 leading-7 text-muted-foreground">{product.description}</p>
          <div className="mt-6 border-y border-border py-5">{typeof product.price === "number" ? <div className="flex items-baseline gap-3"><span className="font-display text-3xl font-extrabold">{product.price.toFixed(2).replace(".", ",")} lei</span>{product.previousPrice ? <span className="text-sm text-muted-foreground line-through">{product.previousPrice.toFixed(2).replace(".", ",")} lei</span> : null}{product.badge ? <span className="rounded bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">{product.badge}</span> : null}</div> : <p className="font-bold text-muted-foreground">Prețul va fi preluat din magazin</p>}<p className="mt-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground"><Check className="size-4 text-primary" /> Disponibilitatea se confirmă la comandă</p></div>
          <div className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] gap-3"><div className="flex items-center rounded-md border border-border bg-background"><Button type="button" variant="ghost" size="icon" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Scade cantitatea"><Minus /></Button><span className="w-8 text-center text-sm font-bold">{quantity}</span><Button type="button" variant="ghost" size="icon" onClick={() => setQuantity((value) => value + 1)} aria-label="Crește cantitatea"><Plus /></Button></div><Button type="button" size="lg" onClick={() => store.addToCart(product, quantity)}><ShoppingCart /> Adaugă în coș</Button><Button type="button" variant="outline" size="lg" className="col-span-2" onClick={() => store.toggleWishlist(product)}><Heart fill={favorite ? "currentColor" : "none"} /> {favorite ? "Elimină din favorite" : "Adaugă la favorite"}</Button></div>
          <Button type="button" size="lg" className="mt-3 w-full bg-brand-dark hover:bg-brand-dark/90" onClick={() => { store.addToCart(product, quantity); store.setCartOpen(true); }}>Cumpără acum</Button>
          <div className="mt-6 grid gap-3 text-sm"><div className="flex gap-3 rounded-md bg-muted p-3"><Truck className="size-5 shrink-0 text-primary" /><div><p className="font-bold">Livrare</p><p className="text-xs text-muted-foreground">Costul și termenul apar înainte de confirmare.</p></div></div><div className="flex gap-3 rounded-md bg-muted p-3"><ShieldCheck className="size-5 shrink-0 text-primary" /><div><p className="font-bold">Plată securizată</p><p className="text-xs text-muted-foreground">Metodele disponibile sunt afișate la finalizare.</p></div></div></div>
        </div>
      </section>

      <section className="mt-10 rounded-lg border border-border bg-card/80 p-4 backdrop-blur-xl sm:p-6"><Tabs defaultValue="descriere"><TabsList className="scrollbar-none h-auto w-full justify-start overflow-x-auto rounded-md"><TabsTrigger value="descriere">Descriere</TabsTrigger><TabsTrigger value="specificatii">Specificații</TabsTrigger><TabsTrigger value="recenzii">Recenzii</TabsTrigger></TabsList><TabsContent value="descriere" className="py-5 text-sm leading-7 text-muted-foreground">{product.description} Informațiile complete de utilizare, compoziție și întreținere vor fi sincronizate din catalogul existent.</TabsContent><TabsContent value="specificatii" className="py-5"><dl className="grid max-w-2xl grid-cols-2 gap-3 text-sm"><dt className="text-muted-foreground">Categorie</dt><dd className="font-semibold">{product.category}</dd><dt className="text-muted-foreground">Cod produs</dt><dd className="font-semibold">Preluat din magazin</dd><dt className="text-muted-foreground">Stoc</dt><dd className="font-semibold">Sincronizat la conectare</dd></dl></TabsContent><TabsContent value="recenzii" className="py-5 text-sm text-muted-foreground">Recenziile reale vor apărea aici după conectarea magazinului existent.</TabsContent></Tabs></section>
    </div>
    <ProductRail label="Produse similare" products={products.filter((item) => item.slug !== product.slug).slice(0, 5)} />
    <ProductRail label="Vizualizate recent" products={products.slice(0, 4)} />
    <div className="h-20 lg:h-8" />
  </>;
}
