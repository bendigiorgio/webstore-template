"use client";
import { Product } from "@/utils/sanity.typing";
import { useState } from "react";
import { sizeToLetter } from "./ProductCard";
import {
  ShoppingCartItem,
  useShoppingCartStore,
} from "@/state/shoppingCartStore";
import Carousel from "./Carousel";

type Props = {
  product: Product;
};

const ProductInfo = ({ product }: Props) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const handleQuantityChange = (quantity: number) => {
    if (quantity < 1) return;
    if (quantity > 10) return;
    setSelectedQuantity(quantity);
  };

  const addtoCart = useShoppingCartStore((state) => state.addItem);

  const handleAddToCart = (item: ShoppingCartItem) => {
    addtoCart(item);
  };

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0">
      <div className="flex basis-1/2 self-center">
        <Carousel images={product.images} />
      </div>
      <div className="flex basis-1/2 flex-col space-y-8 md:ml-10 xl:ml-0">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <h3 className="text-3xl font-bold">${product.price}</h3>
        </div>

        <hr className="mx-auto h-[1px] w-full bg-gray-100" />

        {/* Selectors */}
        <div className="flex flex-row items-end md:flex-col md:items-start md:space-y-8">
          <div className="flex w-full flex-row items-center">
            <div className="flex flex-col space-y-4">
              <span className="text-gray-600">Available Sizes</span>
              <div className="flex-row space-x-3">
                {product.sizes.map((size) => (
                  <button
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 ${
                      selectedSize === size
                        ? "bg-[#070915] text-white"
                        : "border border-gray-300 text-black"
                    } h-12 w-12 select-none rounded-md text-center`}
                  >
                    {sizeToLetter([size])}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <hr className="mx-auto hidden h-[1px] w-full bg-gray-100 md:block" />
          {/* Add to cart button */}
          <div className="flex flex-row space-x-5">
            <div className="flex items-center rounded-md border border-gray-300">
              <span
                onClick={() =>
                  selectedQuantity > 1 &&
                  setSelectedQuantity(selectedQuantity - 1)
                }
                className="flex h-8 w-8 cursor-pointer select-none items-center justify-center rounded-l bg-white text-center align-middle text-xl hover:bg-[#070915] hover:text-white md:h-13 md:w-13"
              >
                -
              </span>
              <input
                className=" h-13 w-13 border-none bg-white text-center text-lg  text-black outline-none"
                value={selectedQuantity}
                type="number"
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                min={1}
                max={10}
              />

              <span
                onClick={() =>
                  selectedQuantity < 10 &&
                  setSelectedQuantity(selectedQuantity + 1)
                }
                className="flex h-13 w-13 cursor-pointer select-none items-center justify-center rounded-r bg-white text-center align-middle text-xl hover:bg-[#070915] hover:text-white"
              >
                +
              </span>
            </div>
            <div>
              <button
                onClick={() =>
                  handleAddToCart({
                    id: product._id,
                    name: product.title,
                    price: product.price,
                    quantity: selectedQuantity,
                    size: selectedSize,
                    image: product.images[0],
                    slug: product.slug,
                  })
                }
                className="h-13 whitespace-nowrap rounded-md bg-[#070915] px-5 text-white"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
