import { getAllCategoriesQuery } from "@/sanity/queries/getAllCategories.groq";
import { sanityClient } from "./sanity.client";

type CategoryType = {
  title: string;
};

export const useFilters = async () => {
  const categories: CategoryType[] = await sanityClient.fetch(
    getAllCategoriesQuery
  );
  const filterCategories = categories.map((category) => {
    return {
      value: category.title,
      label: category.title,
      checked: false,
    };
  });
  const filters = [
    {
      id: "category",
      name: "Category",
      options: filterCategories,
    },
    {
      id: "size",
      name: "Size",
      options: [
        { value: "small", label: "S", checked: false },
        { value: "medium", label: "M", checked: false },
        { value: "large", label: "L", checked: false },
        { value: "x-large", label: "XL", checked: false },
      ],
    },
  ];
  return filters;
};
