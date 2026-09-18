import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { products, type Product } from "@/lib/catalog";

type CartLine = { slug: string; quantity: number };

type StoreValue = {
  cart: CartLine[];
  wishlist: string[];
  cartCount: number;
  wishlistCount: number;
  cartTotal: number;
  cartOpen: boolean;
  wishlistOpen: boolean;
  accountOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  setAccountOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: (slug: string) => boolean;
};

const StoreContext = createContext<StoreValue | null>(null);
const CART_KEY = "sanitayaki.cart";
const WISHLIST_KEY = "sanitayaki.wishlist";

export function findProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}

export function formatLei(value: number) {
  return `${value.toFixed(2).replace(".", ",")} lei`;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(CART_KEY);
      const storedWishlist = window.localStorage.getItem(WISHLIST_KEY);
      if (storedCart) setCart(JSON.parse(storedCart) as CartLine[]);
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist) as string[]);
    } catch {
      /* ignore unreadable local data */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
      window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch {
      /* ignore storage errors */
    }
  }, [cart, wishlist]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart((lines) => {
      const existing = lines.find((line) => line.slug === product.slug);
      if (existing) return lines.map((line) => (line.slug === product.slug ? { ...line, quantity: line.quantity + quantity } : line));
      return [...lines, { slug: product.slug, quantity }];
    });
    toast.success("Adăugat în coș", { description: product.name });
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setCart((lines) => (quantity < 1 ? lines.filter((line) => line.slug !== slug) : lines.map((line) => (line.slug === slug ? { ...line, quantity } : line))));
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setCart((lines) => lines.filter((line) => line.slug !== slug));
    toast("Produs eliminat din coș");
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    toast("Coșul a fost golit");
  }, []);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((items) => {
      const exists = items.includes(product.slug);
      toast(exists ? "Eliminat din favorite" : "Adăugat la favorite", { description: product.name });
      return exists ? items.filter((slug) => slug !== product.slug) : [...items, product.slug];
    });
  }, []);

  const value = useMemo<StoreValue>(() => ({
    cart,
    wishlist,
    cartCount: cart.reduce((total, line) => total + line.quantity, 0),
    wishlistCount: wishlist.length,
    cartTotal: cart.reduce((total, line) => total + (findProduct(line.slug)?.price ?? 0) * line.quantity, 0),
    cartOpen,
    wishlistOpen,
    accountOpen,
    setCartOpen,
    setWishlistOpen,
    setAccountOpen,
    addToCart,
    setQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
    isWishlisted: (slug: string) => wishlist.includes(slug),
  }), [cart, wishlist, cartOpen, wishlistOpen, accountOpen, addToCart, setQuantity, removeFromCart, clearCart, toggleWishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore trebuie folosit în interiorul StoreProvider");
  return context;
}
