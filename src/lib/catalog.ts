import heroImage from "@/assets/sanitayaki-hero.jpg";
import creamImage from "@/assets/cream-duo.jpg";
import collectionImage from "@/assets/product-collection.jpg";

export type Product = {
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  imagePosition?: string;
  price?: number;
  previousPrice?: number;
  badge?: string;
  available?: boolean;
};

export const assets = { heroImage, creamImage, collectionImage };

export const categories = [
  { name: "Plasturi termici", icon: "patch", description: "Confort termic" },
  { name: "Perne ortopedice", icon: "pillow", description: "Somn și susținere" },
  { name: "Monitorizare", icon: "activity", description: "Dispozitive pentru acasă" },
  { name: "Nebulizatoare", icon: "wind", description: "Îngrijire respiratorie" },
  { name: "Wellness", icon: "sparkles", description: "Rutine de îngrijire" },
  { name: "Filtre țigări", icon: "filter", description: "Suzen și Targuard" },
] as const;

export const products: Product[] = [
  {
    slug: "plasturi-termici-carbune-activ-50-bucati",
    name: "Plasturi termici cu cărbune activ, 50 bucăți",
    category: "Plasturi termici",
    description: "Pachet de plasturi cu efect de încălzire pentru utilizare conform instrucțiunilor produsului.",
    image: collectionImage,
    imagePosition: "78% center",
    price: 200,
    previousPrice: 250,
    badge: "-20%",
    available: true,
  },
  {
    slug: "perna-ortopedica-cervicala-memory-foam",
    name: "Pernă ortopedică cervicală cu spumă memory",
    category: "Perne ortopedice",
    description: "Formă ergonomică și suprafață textilă moale pentru odihnă.",
    image: collectionImage,
    imagePosition: "18% center",
    available: true,
  },
  {
    slug: "monitor-digital-tensiune-u81q",
    name: "Monitor digital pentru tensiune arterială U81Q",
    category: "Monitorizare",
    description: "Dispozitiv digital compact pentru măsurători la domiciliu.",
    image: collectionImage,
    imagePosition: "34% center",
    available: true,
  },
  {
    slug: "nebulizator-un505",
    name: "Nebulizator compact UN505",
    category: "Nebulizatoare",
    description: "Format compact și accesorii pentru utilizare conform manualului.",
    image: collectionImage,
    imagePosition: "55% center",
    available: true,
  },
  {
    slug: "pulsoximetru-digital",
    name: "Pulsoximetru digital compact",
    category: "Monitorizare",
    description: "Ecran lizibil și format ușor de păstrat la îndemână.",
    image: collectionImage,
    imagePosition: "48% center",
    available: true,
  },
  {
    slug: "balsam-chinezesc",
    name: "Balsam chinezesc pentru rutina de wellness",
    category: "Wellness",
    description: "Balsam în recipient compact, pentru utilizare conform etichetei.",
    image: collectionImage,
    imagePosition: "92% center",
    available: true,
  },
  {
    slug: "filtre-suzen-92",
    name: "Filtre Suzen 92",
    category: "Filtre țigări",
    description: "Filtre din gama Suzen, în ambalaj original.",
    image: collectionImage,
    imagePosition: "70% center",
    available: true,
  },
  {
    slug: "filtre-targuard",
    name: "Filtre Targuard",
    category: "Filtre țigări",
    description: "Filtre reutilizabile din gama Targuard.",
    image: collectionImage,
    imagePosition: "70% center",
    available: true,
  },
];

export const featuredProduct = products[0];
