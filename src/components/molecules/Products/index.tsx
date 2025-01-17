import Image from 'next/image';

import { useProducts } from "providers/Products.provider";

export const Products = () => {
  const { products } = useProducts();

  return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 grow gap-2 gap-y-8">
    {
      products.map((product) => (
        <div key={product.id} className="flex flex-col" data-testid="product">
          <div className="relative text-center grow pt-[50%]">
            <Image
              src={product.image}
              alt={product.name}
              style={{ objectFit: "cover" }}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 769px) 50vw, (max-width: 1200px) 25vw"
            />
            {
              product.stock > 0
                ? null
                : (
                  <div className="absolute left-1/2 top-1/2 bg-white shadow -translate-x-1/2 -translate-y-1/2 text-nowrap px-2 py-1 text-sm">
                    Out of stock
                  </div>
                )
            }
          </div>
          <div className="flex justify-center">
            <span className="py-1 px-2 text-sm bg-white">
              { product.code }
            </span>
            <span className="py-1 px-2 text-sm bg-black text-white">
              { product.price.toFixed(2) }
            </span>
          </div>
        </div>
      ))
    }
  </div>
};
