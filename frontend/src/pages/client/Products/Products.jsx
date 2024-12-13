import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Banner from '@/components/common/Banner';
import useProductsById from '@/hooks/useProductsById'; // Custom hook to fetch product by ID
import RelatedProducts from '@/pages/client/Products/RelatedProducts';
import { FaHeart, FaTruck, FaUndo } from 'react-icons/fa';
import { useCart } from '@/components/features/cart/CartContext/CartContext';

const Products = () => {
    const { id } = useParams(); // Get the product ID from URL parameters
    const { product, loading, error } = useProductsById(id); // Fetch product by ID


    // State for quantity
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart(); // Use the custom hook for cart logic

    // State for selected image (initialize only if product exists)
    const [selectedImage, setSelectedImage] = useState(null);

    // Update selected image when product changes
    useEffect(() => {
        if (product) {
            setSelectedImage(product.product_image_urls?.[0] || '/path/to/placeholder-image.jpg'); // Fallback image
        }
    }, [product]);

    // Return loading state
    if (loading) {
        return <div className="text-center text-gray-600 py-10 min-h-screen">Loading...</div>;
    }

    // Handle error state if there's an error fetching products
    if (error) {
        return (
            <div className="text-center text-red-600 py-10 min-h-screen">
                <p>{error}</p>
                <Link to="/" className="text-blue-500 underline">Go back to Shop</Link>
            </div>
        );
    }

    // Return "not found" state if product is not found after loading
    if (!product) {
        return (
            <div className="text-center text-red-600 py-10 min-h-screen">
                <p>Product not found. Please check the URL or return to the shop.</p>
                <Link to="/" className="text-blue-500 underline">Go back to Shop</Link>
            </div>
        );
    }

    // Return product details
    return (
        <div className="min-h-screen bg-gray-100 pb-10">
            {/* Banner Section */}
            <Banner />

            {/* Product Section */}
            <section className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white shadow-lg rounded-lg p-6">
                        {/* Main Image Column */}
                        <div className="col-span-1 lg:col-span-5 flex items-center justify-center max-h-[600px]">
                            <img
                                src={selectedImage}
                                alt="Selected Product"
                                className="w-full h-auto max-h-full rounded-lg object-contain"
                            />
                        </div>

                        {/* Product Details Column */}
                        <div className="col-span-1 lg:col-span-7 flex flex-col gap-5">
                            <h2 className="text-black text-2xl font-semibold">{product.product_name}</h2>

                            {/* Review and Stock Information */}
                            <div className="flex flex-wrap items-start gap-4">
                                <div className="text-green-800 text-sm opacity-60">In Stock</div>
                            </div>

                            {/* Product Price */}
                            <div className="text-black text-2xl">${parseFloat(product.product_price).toFixed(2)}</div>

                            {/* Product Description */}
                            <p className="text-black text-sm">{product.product_description}</p>

                            {/* Actions */}
                            <div className="flex flex-wrap items-center gap-4">
                                {/* Quantity Controls */}
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>−</button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                                    className="border px-2 py-2 text-center w-16"
                                />
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                                
                                {/* Buy Now Button */}
                                <button 
                                    className="bg-rose-500 text-white px-3 py-2 rounded hover:bg-rose-600"
                                    onClick={() =>
                                        addToCart({
                                            id: product.product_id,
                                            name: product.product_name,
                                            image: product.product_image_urls?.[0] || '',
                                            price: product.product_price,
                                            quantity,
                                        })
                                    }
                                >
                                    Buy Now
                                </button>

                                <button onClick={() => alert('Added to wishlist')} className="border p-3 rounded">
                                    <FaHeart />
                                </button>
                            </div>

                            {/* Delivery Info */}
                            <div className="border rounded p-4 space-y-4">
                                <div className="flex items-center gap-2">
                                    <FaTruck className="text-xl" />
                                    <div>
                                        <p className="font-medium">Free Delivery</p>
                                        <p className="text-sm text-gray-500">Enter your postal code for delivery availability.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaUndo className="text-xl" />
                                    <div>
                                        <p className="font-medium">Free Returns</p>
                                        <p className="text-sm text-gray-500">Free 30 Days Delivery Returns.{' '}
                                            <a href="#" className="underline">Details</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products Section */}
            {product.category_name && (
                <section className="py-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <RelatedProducts currentCategoryName={product.category_name} /> {/* Pass category_name */}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Products;
