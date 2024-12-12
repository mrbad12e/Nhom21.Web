import React from "react";
import { Link } from "react-router-dom";
import useProducts from "@/hooks/useProducts";

const RelatedProducts = ({ currentCategoryName }) => {
  const { products, loading } = useProducts(); // Fetch all products

  // Filter related products based on the current product's category name
  const relatedProducts = products.filter(product => product.category_name === currentCategoryName).slice(0, 4); // Get only up to 4 related products

  if (loading) {
    return <div className="text-center text-gray-600 py-10">Loading...</div>;
  }

  if (!relatedProducts || relatedProducts.length === 0) {
    return <div className="text-center text-gray-600 py-10">No related products found.</div>;
  }

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope font-bold text-4xl text-black mb-8 max-lg:text-center">
          Related Products
        </h2>
        <div className="flex-1 container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((product) => (
            <div
              key={product.product_id}
              className="bg-white shadow-sm border rounded-lg p-4 max-h-96 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <Link to={`/products/${product.product_id}`} className="block">
                {product.product_image_urls ? (
                  <img
                    src={product.product_image_urls}
                    alt={product.product_name}
                    className="h-48 w-full object-cover mb-4 rounded hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="h-48 w-full bg-gray-300 mb-4 rounded"></div> // Placeholder if no image is available
                )}
              </Link>
              {/* Title */}
              <Link to={`/products/${product.product_id}`} className="block mb-2">
                <p className="text-gray-800 text-xl font-semibold leading-tight hover:text-rose-600 transition-colors duration-200">
                  {product.product_name}
                </p>
              </Link>

              {/* Price and Description */}
              <div className="mb-2 flex items-start justify-between gap-2">
                <p className="text-rose-600 text-xl font-semibold">
                  ${parseFloat(product.product_price).toFixed(2)}
                </p>
              </div>
              <p className="text-gray-600 leading-normal font-light">
                {product.product_description}
              </p>

              {/* Add to Cart Button */}
              <button className="mt-3 w-full bg-rose500 text-white py-2 rounded-lg hover:bg-rose600 transition-colors duration-200">
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
