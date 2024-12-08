import React, {useState} from 'react'
import BannerImg from "@/assets/shoppage/banner.jpg";
import { Link, useParams } from "react-router-dom";
import useProducts from "@/hooks/useProducts";

const Banner = () => {
  const { id } = useParams();
  const { products, loading } = useProducts();

  const product = products.find((p) => p._id === id);

  if (loading) {
    return <div className="text-center text-gray-600 py-10">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="text-center text-red-600 py-10">Product not found</div>
    );
  }

  return (
    <div>
      {/* Banner Section */}
      <div className="relative h-64 flex flex-col justify-center items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ background: `url(${BannerImg})` }}
        ></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-medium mb-2 text-gray-200">
            {product.category}
          </h1>
          <h2 className="text-xl font-light text-gray-200">
            <Link
              to="/"
              className="hover:text-rose-500 font-medium text-gray-200"
            >
              Home
            </Link>
            <span className="mx-2 font-medium text-gray-200">&gt;</span>
            <Link
              to="/shop"
              className="hover:text-rose-500 font-medium text-gray-200"
            >
              Shop
            </Link>
            <span className="mx-2 font-medium text-gray-200">&gt;</span>
            <span className="text-rose-500 font-medium">
              {product.category}
            </span>
            <span className="mx-2 font-medium text-gray-200">&gt;</span>
            <span className="font-medium text-gray-200">{product.title}</span>
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Banner
