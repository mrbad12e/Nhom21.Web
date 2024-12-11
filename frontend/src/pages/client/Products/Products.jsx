import Banner from "@/components/common/Banner";
import useProducts from "@/hooks/useProducts";
import { useProductLogic } from "@/pages/client/Products/index";
import "@/pages/client/Products/Products.module.css";
import RelatedProducts from "@/pages/client/Products/RelatedProducts";
import { useState } from "react";
import { useCart } from "@/components/features/cart/CartContext/CartContext";
import {
  FaHeart,
  FaMinus,
  FaPlus,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
  FaTruck,
  FaUndo,
} from "react-icons/fa";
import { useParams } from "react-router-dom";

const Products = () => {
  const { id } = useParams();
  const { products, loading } = useProducts();

  const product = products.find((p) => p._id === id);
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [quantity, setQuantity] = useState(1);

  const { handleBuyNow } = useProductLogic();

  if (loading) {
    return <div className="text-center text-gray-600 py-10">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="text-center text-red-600 py-10">Product not found</div>
    );
  }

  const images = [product.image];

  const totalReviews = 120;
  const positiveReviews = 90;

  const ratingPercentage = (positiveReviews / totalReviews) * 100;

  const renderStars = (percentage) => {
    const fullStars = Math.floor((percentage / 100) * 5);
    const halfStars = Math.ceil(((percentage / 100) * 5 - fullStars) * 2) / 2;
    const emptyStars = 5 - fullStars - halfStars;

    let stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    for (let i = 0; i < halfStars; i++) {
      stars.push(
        <FaStarHalfAlt key={`half-${i}`} className="text-yellow-400" />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-400" />);
    }

    return stars;
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Math.floor(e.target.value));
    setQuantity(value);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      {/* Banner Section */}
      <Banner />
  
      {/* Product Section */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white shadow-lg rounded-lg p-6">
            {/* Thumbnails Column */}
            <div className="col-span-2 hidden lg:block overflow-hidden max-h-[600px]">
              <div className="h-full overflow-y-auto space-y-4 pr-2">
                {images.length > 1 ? (
                  images.map((thumb, index) => (
                    <img
                      key={index}
                      src={thumb}
                      alt={`Thumbnail ${index + 1}`}
                      className={`cursor-pointer rounded-lg border ${
                        selectedImage === thumb
                          ? "border-rose-500"
                          : "border-gray-300"
                      }`}
                      onClick={() => setSelectedImage(thumb)}
                    />
                  ))
                ) : (
                  <p className="text-gray-500">No additional images available</p>
                )}
              </div>
            </div>
  
            {/* Main Image Column */}
            <div className="col-span-1 lg:col-span-5 flex items-center justify-center max-h-[600px]">
              <img
                src={selectedImage}
                alt="Selected Product"
                className="w-full h-auto max-h-full rounded-lg object-contain"
              />
            </div>
  
            {/* Product Details Column */}
            <div className="col-span-1 lg:col-span-5 flex flex-col gap-5">
              <h2 className="text-black text-2xl font-semibold">
                {product.title}
              </h2>
  
              {/* Review and Stock Information */}
              <div className="flex flex-wrap items-start gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">{renderStars(ratingPercentage)}</div>
                  <div className="text-black text-sm opacity-50">
                    ({totalReviews} Reviews)
                  </div>
                </div>
                <div className="text-green-800 text-sm opacity-60">
                  In Stock
                </div>
              </div>
  
              {/* Product Price */}
              <div className="text-black text-2xl">${product.basePrice}</div>
  
              {/* Product Description */}
              <p className="text-black text-sm">{product.description}</p>
  
              {/* Colours */}
              <div className="flex flex-wrap items-center gap-6">
                <span className="text-black text-xl">Colours:</span>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#a0bce0] rounded-full border"></div>
                  <div className="w-5 h-5 bg-[#e07575] rounded-full border"></div>
                </div>
              </div>
  
              {/* Sizes */}
              <div className="flex flex-wrap items-center gap-6">
                <span className="text-black text-xl">Size:</span>
                <div className="flex gap-2">
                  {["XS", "S", "M", "L", "XL"].map((size, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 flex items-center justify-center border ${
                        size === "M" ? "bg-rose-500 text-white" : "border-gray-300"
                      } rounded`}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
  
              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDecrease}
                    className="border px-3 py-3 rounded"
                  >
                    <FaMinus />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="border px-2 py-2 text-center w-16"
                    min="1"
                  />
                  <button
                    onClick={handleIncrease}
                    className="border px-3 py-3 rounded"
                  >
                    <FaPlus />
                  </button>
                </div>
                <button 
                  className="bg-rose-500 text-white px-3 py-2 rounded hover:bg-rose-600"
                  onClick={() => handleBuyNow(product, quantity)}>
                  Buy Now
                </button>
                <button
                  onClick={() => alert("Added to wishlist")}
                  className="border p-3 rounded"
                >
                  <FaHeart />
                </button>
              </div>
  
              {/* Delivery Info */}
              <div className="border rounded p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <FaTruck className="text-xl" />
                  <div>
                    <p className="font-medium">Free Delivery</p>
                    <p className="text-sm text-gray-500">
                      Enter your postal code for delivery availability.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaUndo className="text-xl" />
                  <div>
                    <p className="font-medium">Free Returns</p>
                    <p className="text-sm text-gray-500">
                      Free 30 Days Delivery Returns.{" "}
                      <a href="#" className="underline">
                        Details
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      {/* Related Products */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RelatedProducts />
        </div>
      </section>
    </div>
  );  
};

export default Products;
