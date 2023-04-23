import { Product } from "@/utils/sanity.typing";
import ProductCard from "./ProductCard";

type FilterOption = {
  value: string;
  label: string;
  checked: boolean;
};

type FilterCategory = {
  id: string;
  name: string;
  options: FilterOption[];
};

type Props = {
  allProducts: Product[];
};

const ProductsSection = ({ allProducts }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {allProducts.map((product) => (
          <ProductCard key={product._id} productInfo={product} />
        ))}
      </div>
    </>
  );
};

export default ProductsSection;
