import { groq } from "next-sanity";

export const getProductInfoQuery = groq`*[_type == "product" && slug.current == $slug] {
    ..., "images": images[].asset->url, categories[]->{title}, price, title, sizes[], "slug":slug.current
   }`;
