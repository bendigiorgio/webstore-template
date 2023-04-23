import StoreSideBar from "@/components/StoreSideBar";
import { getAllProductsQuery } from "@/sanity/queries/getAllProducts.groq";
import { sanityClient } from "@/utils/sanity.client";
import { Product } from "@/utils/sanity.typing";

import { getAllCategoriesQuery } from "@/sanity/queries/getAllCategories.groq";
import ProductsSection from "@/components/ProductsSection";
import { useFilters } from "@/utils/filters";

const Store = async () => {
  const categories = await useFilters();
  const allProducts: Product[] = await sanityClient.fetch(getAllProductsQuery);
  return (
    <main className="flex min-h-screen w-screen text-black">
      {/* Header */}

      {/* Body */}
      <StoreSideBar filters={categories}>
        <ProductsSection allProducts={allProducts} />
      </StoreSideBar>
      {/* Products */}

      {/* Footer */}
    </main>
  );
};

export default Store;
