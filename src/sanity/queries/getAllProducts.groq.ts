import { groq } from "next-sanity";

export const getAllProductsQuery = groq`*[_type == "product"] {
    "images": images[].asset->url, categories[]->{title}, price, title, sizes[], "slug":slug.current, description[], _createdAt 
   } `;
