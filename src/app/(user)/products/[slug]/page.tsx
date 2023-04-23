import Breadcrumb from "@/components/Breadcrumb";
import ProductInfo from "@/components/ProductInfo";
import { getProductInfoQuery } from "@/sanity/queries/getProductInfo.groq";
import { sanityClient } from "@/utils/sanity.client";
import type { Product } from "@/utils/sanity.typing";
import { PortableText } from "@portabletext/react";

type Props = {
  params: {
    slug: string;
  };
};

async function getProductInfo(slug: string) {
  const productInfo = await sanityClient.fetch(getProductInfoQuery, {
    slug,
  });
  return productInfo[0];
}

const getPath = (productInfo: Product) => {
  const path = [{ title: "Store", slug: "/products" }];
  if (productInfo.categories) {
    return path
      .concat(
        productInfo.categories.map((category) => ({
          title: category.title,
          slug: "placeholder",
        }))
      )
      .concat([{ title: productInfo.title, slug: productInfo.slug }]);
  }
  return path.concat([{ title: productInfo.title, slug: productInfo.slug }]);
};

export default async function ProductPage({ params: { slug } }: Props) {
  const productInfo: Product = await getProductInfo(slug);

  const path = getPath(productInfo);

  if (productInfo)
    return (
      <section className="mx-auto min-h-screen max-w-7xl space-y-8 px-4 pt-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb path={path} />
        {/* Heading */}
        <ProductInfo product={productInfo} />
        {/* Description */}
        <div className="text-black">
          <PortableText value={productInfo.description} />
        </div>
      </section>
    );

  return <div className="min-h-screen bg-[#ECECF0] ">Product not found</div>;
}
