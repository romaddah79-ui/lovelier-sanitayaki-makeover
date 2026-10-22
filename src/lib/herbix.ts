import img1 from "@/assets/herbix-1.webp.asset.json";
import imgHepatic from "@/assets/herbix-2.webp.asset.json";
import imgResp from "@/assets/herbix-3.webp.asset.json";
import imgEnergie from "@/assets/herbix-4.webp.asset.json";
import imgColectie from "@/assets/herbix-5.webp.asset.json";
import imgSomn from "@/assets/herbix-6.webp.asset.json";
import imgLifestyle from "@/assets/herbix-7.webp.asset.json";
import imgCap from "@/assets/herbix-8.png.asset.json";

export const images = {
  hero: img1.url,
  lifestyle: imgLifestyle.url,
  cap: imgCap.url,
};

export type Accent = "green" | "blue" | "orange" | "gray";
export type Category = "stick" | "colectie";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  accent: Accent;
  category: Category;
  /* EDIT PRICES HERE (lei) */
  price: number;
  compareAt?: number;
  ingredients: string[];
  short: string;
  description: string;
  images: string[];
  badge?: string;
};

export const SHIPPING_FEE = 19; // lei
export const FREE_SHIPPING_FROM = 150; // lei

export const products: Product[] = [
  {
    slug: "respiratie-usoara",
    name: "Respirație Ușoară",
    tagline: "Clear & Easy Breathing",
    accent: "green",
    category: "stick",
    price: 49,
    ingredients: ["Eucalipt", "Flori albe"],
    short: "O aromă proaspătă de eucalipt și flori albe, pentru un moment de prospețime.",
    description:
      "Stick aromatic inspirat din natură, cu note revigorante de eucalipt îmbinate cu delicatețea florilor albe. Un gest simplu care te ajută să te bucuri de o pauză aromatică, oriunde te afli. Fără combustie, fără nicotină.",
    images: [imgResp.url, imgLifestyle.url, imgCap.url],
  },
  {
    slug: "somn-linistit",
    name: "Somn Liniștit",
    tagline: "Calm & Deep Sleep",
    accent: "blue",
    category: "stick",
    price: 49,
    ingredients: ["Lavandă", "Mușețel"],
    short: "Lavandă și mușețel pentru un ritual aromatic de seară.",
    description:
      "O experiență aromatică blândă, cu lavandă și mușețel, gândită pentru momentele liniștite de la finalul zilei. Te ajută să te bucuri de un moment de calm, în ritmul tău.",
    images: [imgSomn.url, imgCap.url],
  },
  {
    slug: "energie-vitalitate",
    name: "Energie & Vitalitate",
    tagline: "Boost Your Day",
    accent: "orange",
    category: "stick",
    price: 49,
    ingredients: ["Ghimbir", "Portocală"],
    short: "Note vibrante de ghimbir și portocală pentru o zi plină de culoare.",
    description:
      "Aroma caldă a ghimbirului întâlnește dulceața portocalei într-o combinație luminoasă. Un moment aromatic energizant pentru dimineți, pauze de birou sau drumuri lungi.",
    images: [imgEnergie.url, imgCap.url],
  },
  {
    slug: "echilibru-hepatic",
    name: "Echilibru Hepatic",
    tagline: "Natural Balance Support",
    accent: "green",
    category: "stick",
    price: 49,
    ingredients: ["Armurariu", "Anghinare"],
    short: "Armurariu și anghinare — o aromă verde, ierboasă, inspirată din natură.",
    description:
      "O aromă ierboasă și echilibrată, cu extracte de armurariu și anghinare. Pentru cei care iubesc notele verzi, naturale, într-o experiență aromatică discretă.",
    images: [imgHepatic.url, imgCap.url],
  },
  {
    slug: "colectia-aromatic-wellness",
    name: "Colecția Aromatic Wellness",
    tagline: "Patru arome într-un pachet",
    accent: "gray",
    category: "colectie",
    price: 169,
    compareAt: 196,
    badge: "Cel mai popular",
    ingredients: ["Respirație Ușoară", "Somn Liniștit", "Energie & Vitalitate", "Relaxare"],
    short: "4 sticks-uri aromatice într-un singur pachet. Cea mai bună valoare.",
    description:
      "Colecția completă HERBIX: Respirație Ușoară, Somn Liniștit, Energie & Vitalitate și Relaxare. Patru arome pentru fiecare moment al zilei, fiecare cu până la 600 de utilizări.",
    images: [imgColectie.url, img1.url, imgCap.url],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const accentClasses: Record<Accent, { bg: string; text: string; soft: string; border: string }> = {
  green: { bg: "bg-brand-green", text: "text-brand-green", soft: "bg-brand-green/10", border: "border-brand-green" },
  blue: { bg: "bg-brand-blue", text: "text-brand-blue", soft: "bg-brand-blue/10", border: "border-brand-blue" },
  orange: { bg: "bg-brand-orange", text: "text-brand-orange", soft: "bg-brand-orange/10", border: "border-brand-orange" },
  gray: { bg: "bg-brand-ink", text: "text-brand-ink", soft: "bg-brand-gray/15", border: "border-brand-ink" },
};

export const formatLei = (n: number) => `${n.toLocaleString("ro-RO")} lei`;

export const DISCLAIMER =
  "Produsul nu este un medicament și nu înlocuiește un tratament medical. A nu se utiliza de către copii sub 18 ani, femei însărcinate sau persoane alergice la ingredientele produsului.";

/* EDIT CONTACT DETAILS HERE */
export const company = {
  name: "[Denumire firmă SRL]",
  cui: "[CUI RO00000000]",
  reg: "[J00/0000/2026]",
  address: "[Str. Exemplu nr. 1, București]",
  email: "contact@herbix.ro",
  phone: "+40 700 000 000",
  whatsapp: "40700000000",
};
