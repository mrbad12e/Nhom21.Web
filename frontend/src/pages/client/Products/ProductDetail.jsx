import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart, FaMinus, FaPlus, FaTruck, FaUndo } from 'react-icons/fa';
import { useProducts } from '@/hooks/useProducts';
import { useCartQuery } from '@/hooks/useCart';
import Banner from '@/components/common/Banner';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
// import RelatedProducts from './RelatedProducts';

const ProductDetail = () => {
    const { id } = useParams();
    const { getProductDetails } = useProducts();
    const { data: product, isLoading } = getProductDetails(id);
    const { addItem } = useCartQuery();

    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(product?.images?.[0]);

    const handleQuantityChange = (e) => {
        setQuantity(Math.max(1, Math.floor(e.target.value)));
    };

    const handleBuyNow = async () => {
        await addItem({ productId: id, quantity });
        // Add navigation logic here
    };

    if (isLoading) return <LoadingSpinner />;
    if (!product) return <div className="text-center text-red-600 py-10">Product not found</div>;

    return (
        <div className="min-h-screen bg-gray-100 pb-10">
            <Banner />

            <section className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white shadow-lg rounded-lg p-6">
                        {/* Thumbnails */}
                        <div className="col-span-2 hidden lg:block overflow-hidden max-h-[600px]">
                            <div className="h-full overflow-y-auto space-y-4 pr-2">
                                {product.images?.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`${product.name} - View ${index + 1}`}
                                        className={`cursor-pointer rounded-lg border ${
                                            selectedImage === image ? 'border-rose-500' : 'border-gray-300'
                                        }`}
                                        onClick={() => setSelectedImage(image)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Main Image */}
                        <div className="col-span-1 lg:col-span-5 flex items-center justify-center max-h-[600px]">
                            <img
                                src={selectedImage || product.images?.[0]}
                                alt={product.name}
                                className="w-full h-auto max-h-full rounded-lg object-contain"
                            />
                        </div>

                        {/* Details */}
                        <div className="col-span-1 lg:col-span-5 flex flex-col gap-5">
                            <h2 className="text-black text-2xl font-semibold">{product.name}</h2>

                            {/* Price & Stock */}
                            <div className="flex flex-wrap items-center justify-between">
                                <span className="text-black text-2xl">${product.price}</span>
                                <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-black text-sm">{product.description}</p>

                            {/* Quantity Selector */}
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
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
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="border px-3 py-3 rounded"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>

                                <button
                                    onClick={handleBuyNow}
                                    disabled={!product.stock}
                                    className="bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600 disabled:bg-gray-400"
                                >
                                    Add to Cart
                                </button>

                                <button className="border p-3 rounded">
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
                                            Enter your postal code for delivery availability
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaUndo className="text-xl" />
                                    <div>
                                        <p className="font-medium">Free Returns</p>
                                        <p className="text-sm text-gray-500">Free 30 Days Delivery Returns</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <section className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <RelatedProducts categoryId={product.categoryId} currentProductId={id} />
                </div>
            </section> */}
        </div>
    );
};

export default ProductDetail;
