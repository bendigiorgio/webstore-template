import { groq } from "next-sanity";

export const getAllCategoriesQuery = groq`*[_type == "category"]
  {
    title}`;
