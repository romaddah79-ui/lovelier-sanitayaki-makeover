import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Ban, FlaskConicalOff, Leaf, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DISCLAIMER, formatLei, images, products, type Product } from "@/lib/herbix";
import { faqs } from "@/lib/herbix-content";

export const Route = createFileRoute("/herbix")({
  head: () => ({ meta: [
    { title: "HERBIX — Colecția Aromatic Wellness | Sanitayaki" },
    { name: "description", content: "Descoperă colecția HERBIX: patru arome din extracte naturale de plante, detalii despre sticks și ritualul aromatic." },
    { property: "og:title", content: "HERBIX — Arome naturale la Sanitayaki" },
    { property: "og:description", content: "Colecția Aromatic Wellness, arome și ritualuri pentru momentele tale." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HerbixPage,
});

const benefits = [
  { icon: Leaf, title: "100% Natural", text: "Extracte din plante" },
  { icon: Ban, title: "Fără Nicotină", text: "Fără combustie" },
  { icon: FlaskConicalOff, title: "Fără Parabeni", text: "Formulă curată" },
  { icon: Repeat, title: "Până la 600", text: "de utilizări / stick" },
];
const steps = [
  { n: "01", title: "Scoate capacul", text: "Îndepărtează ușor capacul transparent al stick-ului." },
  { n: "02", title: "Inspiră ușor", text: "Inspiră lent și bucură-te de aroma naturală a plantelor." },
  { n: "03", title: "Pune capacul la loc", text: "Închide stick-ul pentru a păstra aroma cât mai mult timp." },
];
const accents = { green: "text-herbix-green", blue: "text-herbix-blue", orange: "text-herbix-orange", gray: "text-herbix-gray" };

function HerbixPage() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const collection = products.find((p) => p.category === "colectie");
  const ordered = collection ? [collection, ...products.filter((p) => p.category === "stick")] : products;
  const openProduct = (product: Product) => { setImageIndex(0); setSelected(product); };
  return (
    <div className="herbix-page pb-24 lg:pb-12">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 text-xs text-muted-foreground sm:px-6">
        <div className="flex items-center gap-2"><Link to="/" className="hover:text-primary">Sanitayaki</Link><span>/</span><span className="font-semibold text-foreground">HERBIX</span></div>
        <span>Aromatic Wellness Collection</span>
      </div>
      <section className="herbix-hero relative overflow-hidden">
        <img src={images.hero} alt="Colecția HERBIX: sticks aromatice și ambalajele celor patru arome" className="h-[300px] w-full object-cover sm:h-[480px] lg:h-[620px]" fetchPriority="high" />
        <div className="relative mx-auto max-w-[1280px] lg:absolute lg:inset-0">
          <div className="herbix-hero-copy px-5 py-8 sm:px-8 lg:absolute lg:bottom-7 lg:left-6 lg:max-w-[470px] lg:p-8">
            <p className="text-xs font-bold uppercase text-primary">Aromatic Wellness Collection</p>
            <h1 className="mt-3 text-5xl font-semibold leading-tight sm:text-6xl">HERBIX</h1>
            <h2 className="mt-2 text-3xl leading-tight">Patru arome.<br /><span className="italic text-primary">Un singur gest simplu.</span></h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">Sticks aromatice din extracte naturale de plante, pentru momentele tale de calm, prospețime și energie.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => collection && openProduct(collection)}>Descoperă colecția <ArrowRight /></Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById("herbix-arome")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>Vezi aromele</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-border bg-muted/50">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 px-5 py-7 md:grid-cols-4 sm:px-6">
          {benefits.map(({ icon: Icon, title, text }) => <div key={title} className="flex items-center gap-3"><Icon className="size-6 shrink-0 text-primary" /><div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs text-muted-foreground">{text}</p></div></div>)}
        </div>
      </section>
      <section id="herbix-arome" className="herbix-scroll-target mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-xs font-bold uppercase text-primary">Colecția noastră</p>
        <h2 className="mt-2 text-4xl">Alege-ți aroma</h2>
        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((product) => <article key={product.slug} className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-soft">
            <Button variant="ghost" onClick={() => openProduct(product)} className="relative h-auto w-full overflow-hidden rounded-none p-0" aria-label={`Vezi ${product.name}`}>
              <img src={product.images[0]} alt={`HERBIX ${product.name}`} className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]" loading="lazy" />
              {product.badge && <span className="absolute left-3 top-3 rounded bg-card px-3 py-1.5 text-xs font-bold text-primary">{product.badge}</span>}
            </Button>
            <div className="flex flex-1 flex-col p-6">
              <p className={`text-xs font-bold ${accents[product.accent]}`}>{product.tagline}</p>
              <h3 className="mt-2 text-2xl">{product.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{product.short}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><div><span className="font-bold">{formatLei(product.price)}</span>{product.compareAt && <span className="ml-2 text-xs text-muted-foreground line-through">{formatLei(product.compareAt)}</span>}</div><Button variant="outline" onClick={() => openProduct(product)}>Vezi detalii <ArrowRight /></Button></div>
            </div>
          </article>)}
        </div>
      </section>
      <section className="bg-muted/50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:gap-20">
          <img src={images.cap} alt="Capacul transparent al stick-ului aromatic HERBIX" className="aspect-[4/5] max-h-[540px] w-full rounded-lg object-cover" loading="lazy" />
          <div><p className="text-xs font-bold uppercase text-primary">Cum se folosește</p><h2 className="mt-3 text-4xl leading-tight">Trei pași, un moment doar al tău</h2><div className="mt-9 space-y-7">{steps.map((step) => <div key={step.n} className="flex gap-5"><span className="font-serif text-3xl text-primary">{step.n}</span><div><h3 className="text-xl">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p></div></div>)}</div></div>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1280px] gap-10 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-[1fr_1.5fr]">
        <div><p className="text-xs font-bold uppercase text-primary">Întrebări frecvente</p><h2 className="mt-3 text-4xl">Tot ce vrei să știi</h2></div>
        <Accordion type="single" collapsible>{faqs.slice(0, 4).map((faq, index) => <AccordionItem key={faq.q} value={`herbix-${index}`}><AccordionTrigger className="text-left text-base">{faq.q}</AccordionTrigger><AccordionContent className="leading-relaxed text-muted-foreground">{faq.a}</AccordionContent></AccordionItem>)}</Accordion>
      </section>
      <div className="mx-auto max-w-[1280px] border-t border-border px-4 pt-6 sm:px-6"><p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">{DISCLAIMER}</p><Button asChild variant="link" className="mt-4 px-0"><Link to="/magazin" search={{ q: undefined, categorie: undefined }}>Înapoi la magazinul Sanitayaki <ArrowRight /></Link></Button></div>
      <Dialog open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <DialogContent className="herbix-page max-h-[85dvh] max-w-[calc(100%-2rem)] overflow-y-auto sm:max-w-3xl">
          {selected && <><DialogHeader><DialogTitle className="pr-6 font-serif text-2xl">HERBIX · {selected.name}</DialogTitle><DialogDescription>{selected.short}</DialogDescription></DialogHeader><div className="grid gap-6 sm:grid-cols-2"><div><img src={selected.images[imageIndex]} alt={selected.name} className="aspect-square w-full rounded-md object-cover" /><div className="mt-3 flex gap-2">{selected.images.map((image, index) => <Button key={image} variant="outline" className={`size-16 shrink-0 overflow-hidden p-0 ${index === imageIndex ? "ring-2 ring-primary" : ""}`} onClick={() => setImageIndex(index)} aria-label={`Imaginea ${index + 1}`} aria-pressed={imageIndex === index}><img src={image} alt="" className="size-full object-cover" /></Button>)}</div></div><div><p className="text-lg font-bold">{formatLei(selected.price)} {selected.compareAt && <span className="ml-2 text-sm font-normal text-muted-foreground line-through">{formatLei(selected.compareAt)}</span>}</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{selected.description}</p><h3 className="mt-6 text-lg">{selected.category === "stick" ? "Ingrediente" : "În colecție"}</h3><ul className="mt-2 space-y-2 text-sm">{selected.ingredients.map((ingredient) => <li key={ingredient} className="flex gap-2"><Leaf className="size-4 text-primary" />{ingredient}</li>)}</ul><p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">{DISCLAIMER}</p></div></div></>}
        </DialogContent>
      </Dialog>
    </div>
  );
}