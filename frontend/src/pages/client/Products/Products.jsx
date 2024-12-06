import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Banner from "@/assets/shoppage/banner.jpg";

const Products = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [product, setProduct] = useState(null); // Lưu thông tin sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

  // Fake API data (thay bằng API thực tế hoặc dữ liệu từ database)
  const fakeProducts = [
    { 
      _id: "1", 
      title: "Product 1", 
      description: "Description 1", 
      basePrice: 100, 
      image: "https://via.placeholder.com/400", 
      category: "Electronics" 
    },
    { 
      _id: "2", 
      title: "Product 2", 
      description: "Description 2", 
      basePrice: 150, 
      image: "https://via.placeholder.com/400", 
      category: "Clothing" 
    },
    { 
      _id: "3", 
      title: "Product 3", 
      description: "Description 3", 
      basePrice: 200, 
      image: "https://via.placeholder.com/400", 
      category: "Books" 
    },
  ];

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      // Giả lập việc lấy dữ liệu từ API
      const productData = fakeProducts.find((item) => item._id === id);
      setProduct(productData);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-600 py-10">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center text-red-600 py-10">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      {/* Banner Section */}
      <div className="relative h-64 flex flex-col justify-center items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ background: `url(${Banner})` }}
        ></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-medium mb-2 text-gray-200">{product.category}</h1> {/* Hiển thị tên category */}
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
            <span className="text-rose-500 font-medium">{product.category}</span>
            <span className="mx-2 font-medium text-gray-200">&gt;</span>
            <span className="font-medium text-gray-200">{product.title}</span>
          </h2>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Product Image */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
          {/* Product Details */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">{product.title}</h1>
            <p className="text-rose-600 text-2xl font-bold mb-6">${product.basePrice}</p>
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
            <button className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
