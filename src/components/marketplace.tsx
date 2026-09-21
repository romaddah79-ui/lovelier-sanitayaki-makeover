import { Link, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  CreditCard,
  Filter,
  Heart,
  Home,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  RefreshCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Trash2,
  Truck,
  Wind,
} from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { categories, type Product } from "@/lib/catalog";
import { findProduct, formatLei, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Brand() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="Sanitayaki, pagina principală">
      <span className="grid size-9 place-items-center rounded-md bg-primary font-display text-base font-extrabold text-primary-foreground">S</span>
      <span className="font-display text-xl font-extrabold text-foreground">Sanitayaki</span>
    </Link>
  );
}

export function MarketplaceHeader() {
  const store = useStore();
  const navigate = useNavigate();
  const [term, setTerm] = useState("");

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3 lg:flex lg:gap-5">
            <Brand />
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void navigate({ to: "/magazin", search: { q: term || undefined, categorie: undefined } });
              }}
              className="order-3 col-span-2 flex min-w-0 flex-1 lg:order-none lg:col-span-1 lg:mx-auto lg:max-w-2xl"
              role="search"
            >
              <label className="sr-only" htmlFor="market-search">Caută produse</label>
              <div className="flex w-full items-center rounded-md border border-border bg-card shadow-xs focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10">
                <Search className="ml-3 size-4 shrink-0 text-muted-foreground" />
                <input id="market-search" name="q" value={term} onChange={(event) => setTerm(event.target.value)} className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm outline-hidden placeholder:text-muted-foreground" placeholder="Caută produse sau categorii" />
                <Button type="submit" size="sm" className="mr-1">Caută</Button>
              </div>
            </form>
            <nav className="flex items-center justify-end gap-1 sm:gap-2" aria-label="Cont și cumpărături">
              <HeaderAction icon={<CircleUserRound />} label="Cont" onClick={() => store.setAccountOpen(true)} />
              <HeaderAction icon={<Heart />} label="Favorite" badge={store.wishlistCount} onClick={() => store.setWishlistOpen(true)} />
              <HeaderAction icon={<ShoppingCart />} label="Coș" badge={store.cartCount} onClick={() => store.setCartOpen(true)} />
            </nav>
          </div>
          <nav className="scrollbar-none flex items-center gap-1 overflow-x-auto border-t border-border/60 py-2" aria-label="Categorii produse">
            <Link to="/magazin" search={{ categorie: undefined, q: undefined }} className="flex shrink-0 items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-bold text-primary-foreground sm:text-sm"><Menu className="size-4" /> Toate categoriile</Link>
            {categories.map((category) => <Link key={category.name} to="/magazin" search={{ categorie: category.name, q: undefined }} className="shrink-0 rounded-md px-3 py-2 text-xs font-semibold text-foreground/75 hover:bg-muted hover:text-primary sm:text-sm">{category.name}</Link>)}
          </nav>
        </div>
      </header>
      <MobileBottomNav />
      <CartPanel />
      <WishlistPanel />
      <AccountPanel />
    </>
  );
}

function HeaderAction({ icon, label, badge, onClick }: { icon: ReactNode; label: string; badge?: number; onClick?: () => void }) {
  return (
    <Button type="button" onClick={onClick} variant="ghost" className="relative flex h-auto min-h-10 min-w-10 flex-col items-center justify-center gap-0 rounded-md px-2 text-[10px] font-semibold text-foreground/75 hover:text-primary sm:text-xs" aria-label={label} title={label}>
      <span className="[&_svg]:size-5">{icon}</span><span className="hidden sm:inline">{label}</span>
      {badge ? <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-primary text-[9px] text-primary-foreground">{badge}</span> : null}
    </Button>
  );
}

function MobileBottomNav() {
  const store = useStore();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-border bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden" aria-label="Navigare mobilă">
      <Link to="/" className="mobile-nav-item"><Home />Acasă</Link>
      <Link to="/magazin" search={{ categorie: undefined, q: undefined }} className="mobile-nav-item"><ShoppingBag />Magazin</Link>
      <Button type="button" variant="ghost" onClick={() => store.setWishlistOpen(true)} className="mobile-nav-item h-auto rounded-none"><Heart />Favorite</Button>
      <Button type="button" variant="ghost" onClick={() => store.setCartOpen(true)} className="mobile-nav-item h-auto rounded-none"><ShoppingCart />Coș</Button>
    </nav>
  );
}

function CartPanel() {
  const store = useStore();
  return (
    <Sheet open={store.cartOpen} onOpenChange={store.setCartOpen}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader><SheetTitle>Coșul tău ({store.cartCount})</SheetTitle></SheetHeader>
        {store.cart.length === 0 ? (
          <div className="mt-8 text-center">
            <p className="font-bold">Coșul este gol</p>
            <p className="mt-2 text-sm text-muted-foreground">Adaugă produse din catalog pentru a continua.</p>
            <Button asChild className="mt-5" onClick={() => store.setCartOpen(false)}><Link to="/magazin" search={{ categorie: undefined, q: undefined }}>Mergi la magazin</Link></Button>
          </div>
        ) : (
          <>
            <div className="mt-4 flex-1 space-y-3 overflow-y-auto">
              {store.cart.map((line) => {
                const product = findProduct(line.slug);
                if (!product) return null;
                return (
                  <div key={line.slug} className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 rounded-md border border-border p-3">
                    <img src={product.image} alt={product.name} className={cn("size-16 rounded object-cover", product.imageClass)} />
                    <div className="min-w-0">
                      <Link to="/produs/$slug" params={{ slug: product.slug }} onClick={() => store.setCartOpen(false)} className="line-clamp-2 text-sm font-bold hover:text-primary">{product.name}</Link>
                      <p className="mt-1 text-xs text-muted-foreground">{typeof product.price === "number" ? formatLei(product.price) : "Preț disponibil în magazin"}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button type="button" variant="outline" size="icon" className="size-7" onClick={() => store.setQuantity(line.slug, line.quantity - 1)} aria-label="Scade cantitatea"><Minus /></Button>
                        <span className="w-6 text-center text-sm font-bold">{line.quantity}</span>
                        <Button type="button" variant="outline" size="icon" className="size-7" onClick={() => store.setQuantity(line.slug, line.quantity + 1)} aria-label="Crește cantitatea"><Plus /></Button>
                        <Button type="button" variant="ghost" size="icon" className="ml-auto size-7 text-muted-foreground" onClick={() => store.removeFromCart(line.slug)} aria-label="Elimină produsul"><Trash2 /></Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 border-t border-border pt-4">
              <div className="flex items-baseline justify-between"><span className="text-sm font-semibold">Total produse cu preț afișat</span><span className="font-display text-lg font-extrabold">{formatLei(store.cartTotal)}</span></div>
              <p className="mt-2 text-xs text-muted-foreground">Finalizarea comenzii se face în magazinul Sanitayaki; aici doar pregătești selecția.</p>
              <Button variant="outline" className="mt-3 w-full" onClick={store.clearCart}>Golește coșul</Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function WishlistPanel() {
  const store = useStore();
  return (
    <Sheet open={store.wishlistOpen} onOpenChange={store.setWishlistOpen}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader><SheetTitle>Favorite ({store.wishlistCount})</SheetTitle></SheetHeader>
        {store.wishlist.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">Nu ai încă produse favorite. Apasă inima de pe un produs pentru a-l salva.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {store.wishlist.map((slug) => {
              const product = findProduct(slug);
              if (!product) return null;
              return (
                <div key={slug} className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-3 rounded-md border border-border p-3">
                  <img src={product.image} alt={product.name} className={cn("size-16 rounded object-cover", product.imageClass)} />
                  <Link to="/produs/$slug" params={{ slug }} onClick={() => store.setWishlistOpen(false)} className="line-clamp-2 text-sm font-bold hover:text-primary">{product.name}</Link>
                  <Button type="button" variant="ghost" size="icon" onClick={() => store.toggleWishlist(product)} aria-label="Elimină din favorite"><Trash2 /></Button>
                </div>
              );
            })}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function AccountPanel() {
  const store = useStore();
  return (
    <Sheet open={store.accountOpen} onOpenChange={store.setAccountOpen}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader><SheetTitle>Contul Sanitayaki</SheetTitle></SheetHeader>
        <div className="mt-5 space-y-4 text-sm">
          <p className="text-muted-foreground">Autentificarea va folosi conturile din magazinul existent Sanitayaki, după conectarea acestuia.</p>
          <div className="space-y-2 rounded-md border border-border p-4">
            <p className="font-bold">Până atunci poți:</p>
            <ul className="list-inside list-disc text-muted-foreground"><li>salva produse la favorite</li><li>pregăti selecția în coș</li><li>naviga catalogul pe categorii</li></ul>
          </div>
          <Button className="w-full" onClick={() => store.setAccountOpen(false)}>Am înțeles</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function SectionHeading({ title, action = "Vezi toate", onPrevious, onNext }: { title: string; action?: string; onPrevious?: () => void; onNext?: () => void }) {
  return (
    <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
      <h2 className="min-w-0 font-display text-xl font-bold sm:text-2xl">{title}</h2>
      {onPrevious && onNext ? <div className="flex gap-2"><Button variant="outline" size="icon" onClick={onPrevious} aria-label="Produsele anterioare"><ChevronLeft /></Button><Button variant="outline" size="icon" onClick={onNext} aria-label="Produsele următoare"><ChevronRight /></Button></div> : <Link to="/magazin" search={{ categorie: undefined, q: undefined }} className="text-sm font-bold text-primary">{action} <span aria-hidden="true">→</span></Link>}
    </div>
  );
}

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const store = useStore();
  const favorite = store.isWishlisted(product.slug);
  const hasPrice = typeof product.price === "number";
  return (
    <article className={cn("group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-xs transition-shadow hover:shadow-md", compact && "min-w-0")}>
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link to="/produs/$slug" params={{ slug: product.slug }} aria-label={product.name}>
          <img src={product.image} alt={product.name} loading="lazy" width={1600} height={1008} className={cn("size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]", product.imageClass)} />
        </Link>
        {product.badge ? <span className="absolute left-2 top-2 rounded bg-primary px-2 py-1 text-[10px] font-extrabold text-primary-foreground">{product.badge}</span> : null}
        <Button type="button" variant="secondary" size="icon" onClick={() => store.toggleWishlist(product)} aria-label={favorite ? "Elimină din favorite" : "Adaugă la favorite"} className={cn("absolute right-2 top-2 size-8 rounded-full bg-card/90", favorite && "text-primary")}><Heart fill={favorite ? "currentColor" : "none"} /></Button>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="mb-1 text-[11px] font-bold uppercase text-muted-foreground">{product.category}</p>
        <Link to="/produs/$slug" params={{ slug: product.slug }} className="line-clamp-2 min-h-10 text-sm font-bold leading-5 hover:text-primary">{product.name}</Link>
        <div className="mt-2 min-h-10">
          {hasPrice ? <div className="flex flex-wrap items-baseline gap-2"><span className="font-display text-lg font-extrabold">{formatLei(product.price as number)}</span>{product.previousPrice ? <span className="text-xs text-muted-foreground line-through">{formatLei(product.previousPrice)}</span> : null}</div> : <span className="text-xs font-semibold text-muted-foreground">Preț disponibil în magazin</span>}
        </div>
        <Button className="mt-auto w-full" size="sm" type="button" onClick={() => store.addToCart(product)}><ShoppingCart /> Adaugă în coș</Button>
      </div>
    </article>
  );
}

export function ProductRail({ products: railProducts, label }: { products: Product[]; label: string }) {
  const railRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) => railRef.current?.scrollBy({ left: direction * 560, behavior: "smooth" });
  return (
    <section className="market-section">
      <SectionHeading title={label} onPrevious={() => scroll(-1)} onNext={() => scroll(1)} />
      <div ref={railRef} className="scrollbar-none grid auto-cols-[minmax(210px,250px)] grid-flow-col gap-4 overflow-x-auto pb-2 sm:auto-cols-[260px]">
        {railProducts.map((product) => <ProductCard key={`${label}-${product.slug}`} product={product} />)}
      </div>
    </section>
  );
}

export function TrustBand() {
  const items = [
    { icon: Truck, title: "Livrare", text: "Informații clare la comandă" },
    { icon: ShieldCheck, title: "Plată securizată", text: "Metode protejate" },
    { icon: RefreshCcw, title: "Retur", text: "Condiții transparente" },
    { icon: PackageCheck, title: "Suport clienți", text: "Ajutor pentru comenzi" },
  ];
  return <section className="market-section"><div className="grid grid-cols-2 overflow-hidden rounded-lg border border-border bg-card/75 backdrop-blur-xl lg:grid-cols-4 lg:divide-x lg:divide-border">{items.map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-3 border-b border-border p-4 last:border-b-0 lg:border-b-0"><Icon className="size-5 shrink-0 text-primary" /><div><h3 className="text-sm font-bold">{title}</h3><p className="mt-1 text-xs text-muted-foreground">{text}</p></div></div>)}</div></section>;
}

export function MarketplaceBand() {
  return <section className="market-section pb-24 lg:pb-12"><div className="flex flex-wrap items-center gap-x-8 gap-y-4 rounded-lg bg-foreground p-5 text-background"><span className="text-xs font-bold uppercase text-background/55">Sanitayaki este disponibil și pe</span>{["Amazon", "Temu", "Trendyol", "eMAG"].map((name) => <span key={name} className="font-display text-lg font-bold">{name}</span>)}</div></section>;
}

export function CategoryIcon({ name }: { name: string }) {
  const common = "size-6";
  if (name.includes("Perne")) return <Sparkles className={common} />;
  if (name.includes("Monitor")) return <Activity className={common} />;
  if (name.includes("Nebul")) return <Wind className={common} />;
  if (name.includes("Filtre")) return <Filter className={common} />;
  if (name.includes("Wellness")) return <Heart className={common} />;
  return <CreditCard className={common} />;
}

export function MobileFilterSheet({ children }: { children: ReactNode }) {
  return <Sheet><SheetTrigger asChild><Button variant="outline" className="lg:hidden"><Filter /> Filtre</Button></SheetTrigger><SheetContent side="left" className="overflow-y-auto"><SheetHeader><SheetTitle>Filtrează produsele</SheetTitle></SheetHeader><div className="mt-6">{children}</div></SheetContent></Sheet>;
}
