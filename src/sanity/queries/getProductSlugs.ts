import { groq } from "next-sanity";

export const getProductSlugsQuery = groq`*[_type == "product"] {
    __id, "slug": slug.current
  }
  `;
