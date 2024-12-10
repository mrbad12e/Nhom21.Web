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
        <div className="flex-1 container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product._id}
              className="bg-white shadow-sm border rounded-lg p-4 max-h-96 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <Link to={`/products/${product._id}`} className="block">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-48 w-full object-cover mb-4 rounded hover:scale-105 transition-transform duration-300"
                />
              </Link>
              {/* Title */}
              <Link to={`/products/${product._id}`} className="block mb-2">
                <p className="text-gray-800 text-xl font-semibold leading-tight hover:text-rose-600 transition-colors duration-200">
                  {product.title}
                </p>
              </Link>

              {/* Price and Description */}
              <div className="mb-2 flex items-start justify-between gap-2">
                <p className="text-rose-600 text-xl font-semibold">
                  ${product.basePrice}
                </p>
              </div>
              <p className="text-gray-600 leading-normal font-light">
                {product.description}
              </p>

              {/* Add to Cart Button */}
              <button className="mt-3 w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-colors duration-200">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
