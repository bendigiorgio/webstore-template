export interface Category {
  title: string;
}

export interface BlockContent {
  _type: "block" | "image";
  _key: string;
  style?: string;
  listItem?: string;
  children?: Array<{
    _type: string;
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _type: "link";
    _key: string;
    href: string;
  }>;
  asset?: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

type Size = "small" | "medium" | "large" | "x-large";

export interface Product {
  _id: string;
  _type: "product";
  title: string;
  slug: string;
  description: BlockContent[];
  price: number;
  images: string[];
  categories: Category[];
  sizes: Size[];
  _createdAt: string;
}
