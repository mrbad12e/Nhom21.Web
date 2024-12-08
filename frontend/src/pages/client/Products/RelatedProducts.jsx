import React from "react";
import { Link } from "react-router-dom";
import useProducts from "@/hooks/useProducts";

const RelatedProducts = () => {
  let { products, loading } = useProducts();

  products = products.slice(0, 4);

  if (loading) {
    return <div className="text-center text-gray-600 py-10">Loading...</div>;
  }

  if (!products || products.length === 0) {
    return <div className="text-center text-gray-600 py-10">No related products found.</div>;
  }

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope font-bold text-4xl text-black mb-8 max-lg:text-center">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="group rounded-lg p-4 bg-white shadow-lg transition-transform transform hover:scale-105"
            >
              <div>
                <img
                  src={product.image}
                  alt={`${product.title} image`}
                  className="w-full aspect-square rounded-2xl object-cover"
                />
              </div>
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <h6 className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-rose-500">
                    {product.title}
                  </h6>
                  <h6 className="font-semibold text-xl leading-8 text-rose-500">
                    {product.price}
                  </h6>
                </div>
                <p className="mt-2 font-normal text-sm leading-6 text-gray-500">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
