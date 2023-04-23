"use client";
import { Product } from "@/utils/sanity.typing";
import Image from "next/image";

type CardProps = {
  productInfo: Product;
};

export const sizeToLetter = (sizes: string[]) => {
  let letters = "";
  sizes.forEach((size) => {
    switch (size.toLocaleLowerCase()) {
      case "small":
        letters += "S";
        break;
      case "medium":
        letters += " M";
        break;
      case "large":
        letters += " L";
        break;
      case "x-large":
        letters += " XL";
        break;
    }
  });
  return letters;
};

const ProductCard = (props: CardProps) => {
  return (
    <>
      <a
        key={props.productInfo._id}
        href={`/products/${props.productInfo.slug}`}
        className="group h-fit w-full"
      >
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <Image
            src={props.productInfo.images[0]}
            alt={props.productInfo.title}
            width={500}
            height={500}
            className="h-full w-full max-w-xl object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="mt-3 flex flex-row justify-between w-full items-center text-gray-700">
          <h3 className="text-sm">{props.productInfo.title}</h3>
          <span className="text-gray-700">
            {sizeToLetter(props.productInfo.sizes)}
          </span>
        </div>
        <p className="mt-1 text-lg font-medium text-gray-900">
          ${props.productInfo.price}
        </p>
      </a>
    </>
  );
};

export default ProductCard;
