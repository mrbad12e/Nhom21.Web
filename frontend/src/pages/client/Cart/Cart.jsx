import React from 'react';
import { useCart } from '@/components/features/cart/CartContext/CartContext';
import { FaHeart, FaTimes, FaMinus, FaPlus, FaCartPlus, FaLongArrowAltRight } from 'react-icons/fa';
import { useCartLogic } from '@/pages/client/Cart/index';
import { Link } from 'react-router-dom';
import useAllProducts from '@/hooks/useAllProducts';
const Cart = () => {
    const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
    const { products, loading, error } = useAllProducts();

    const relatedProductIds = cartItems.map((item) => item.category_id); // Assuming category_id is available
    const relatedProducts = products
        .filter(
            (product) =>
                relatedProductIds.includes(product.category_id) &&
                !cartItems.some((item) => item.product_id === product.product_id)
        )
        .slice(0, 4); // Get only up to 4 related products

    const handleNavigateToCheckout = useCartLogic();

    // Calculate total price
    const originalPrice = cartItems.reduce((total, item) => total + item.unit_price * item.quantity, 0);
    const savings = originalPrice * 0.1;
    const storePickup = 99.0;
    const totalPrice = originalPrice - savings + storePickup;

    return (
        <section className="bg-white py-8 antialiased md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Shopping Cart</h2>

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div className="space-y-6">
                            {cartItems.map((item) => (
                                <div
                                    key={item.product_id}
                                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                                >
                                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                        {/* Hình ảnh */}
                                        <a href="#" className="w-20 shrink-0 md:order-1">
                                            <img
                                                className="h-20 w-20"
                                                src={item.image || 'default_image_url.jpg'}
                                                alt={item.product_name}
                                            />
                                        </a>

                                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                                            <div className="flex items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => decreaseQuantity(item.product_id)}
                                                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                                                >
                                                    <FaMinus className="h-2.5 w-2.5 text-gray-900" />
                                                </button>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                                                    value={item.quantity}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => increaseQuantity(item.product_id)}
                                                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                                                >
                                                    <FaPlus className="h-2.5 w-2.5 text-gray-900" />
                                                </button>
                                            </div>
                                            <div className="text-end md:order-4 md:w-32">
                                                <p className="text-base font-bold text-gray900">
                                                    ${(item.unit_price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Tên sản phẩm và thao tác */}
                                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                            <a href="#" className="text-base font-medium text-gray-900 hover:underline">
                                                {item.product_name}
                                            </a>

                                            <div className="flex items-center gap-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
                                                >
                                                    <FaHeart className="me-1.5 h-4 w-4" />
                                                    Add to Favorites
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item.product_id)}
                                                    className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                                                >
                                                    <FaTimes className="me-1.5 h-4 w-4" />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* People Also Bought Section */}
                        {relatedProducts.length > 0 && (
                            <>
                                <h3 className="text-2xl font-semibold text-gray-900 mt-8">People Also Bought</h3>
                                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {relatedProducts.map((product) => (
                                        <div
                                            key={product.product_id}
                                            className="bg-white shadow-sm border rounded-lg p-4"
                                        >
                                            {/* Image */}
                                            <Link to={`/products/${product.product_id}`} className="block">
                                                {product.product_image_urls && product.product_image_urls.length > 0 ? (
                                                    <img
                                                        src={product.product_image_urls[0]} // Accessing first image in array
                                                        alt={product.product_name}
                                                        className="h-44 w-full object-cover mb-4 rounded hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="h-44 w-full bg-gray-300 mb-4 rounded"></div> // Placeholder if no image is available
                                                )}
                                            </Link>

                                            {/* Title */}
                                            <Link to={`/products/${product.product_id}`} className="block mb-2">
                                                <p className="text-gray-800 text-xl font-semibold leading-tight hover:text-rose-600 transition-colors duration-200">
                                                    {product.product_name}
                                                </p>
                                            </Link>

                                            {/* Price */}
                                            <p className="text-lg font-bold text-red-600">
                                                ${parseFloat(product.product_price).toFixed(2)}
                                            </p>

                                            {/* Add to Cart Button */}
                                            <button
                                                onClick={() => {
                                                    addToCart({
                                                        id: product.product_id,
                                                        name: product.product_name,
                                                        image: product.product_image_urls?.[0] || '',
                                                        price: product.product_price,
                                                        quantity: 1,
                                                    });
                                                }}
                                                className="mt-2 w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-colors duration-200"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Order Summary Section */}
                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                            <p className="text-xl font-semibold text-gray-900 ">Order Summary</p>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500">Original Price</dt>
                                        <dd className="text-base font-medium text-gray-900">
                                            ${originalPrice.toFixed(2)}
                                        </dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500">Savings</dt>
                                        <dd className="text-base font-medium text-green-600">-${savings.toFixed(2)}</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500">Store Pickup</dt>
                                        <dd className="text-base font-medium text-gray-900">
                                            ${storePickup.toFixed(2)}
                                        </dd>
                                    </dl>
                                </div>

                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                                    <dt className="text-base font-bold text-gray-900 ">Total</dt>
                                    <dd className="text-base font-bold text-gray-900">${totalPrice.toFixed(2)}</dd>
                                </dl>
                            </div>

                            <button
                                onClick={handleNavigateToCheckout}
                                className="flex w-full items-center justify-center rounded-lg bg-rose-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-300"
                            >
                                Proceed to Checkout
                            </button>

                            {/* Continue Shopping Link */}
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-normal text-gray-500"> or </span>
                                <Link
                                    to="/shop" // Use Link to navigate to /shop
                                    title=""
                                    className="inline-flex items-center gap-2 text-sm font-medium text-rose-500 underline hover:no-underline"
                                >
                                    Continue Shopping
                                    <FaLongArrowAltRight className="h-5 w-5 stroke-0" />
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900">
                                        {' '}
                                        Do you have a voucher or gift card?{' '}
                                    </label>
                                    <input
                                        type="text"
                                        id="voucher"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-rose-400 focus:ring-rose-400 "
                                        placeholder=""
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center rounded-lg bg-rose-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-300"
                                >
                                    Apply Code
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
