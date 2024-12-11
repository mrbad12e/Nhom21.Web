import React from "react";
import { useCart } from "@/components/features/cart/CartContext/CartContext";
import {
  FaHeart,
  FaTimes,
  FaMinus,
  FaPlus,
  FaCartPlus,
  FaLongArrowAltRight,
} from "react-icons/fa";
import { useCartLogic } from "@/pages/client/Cart/index";
const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

    const handleNavigateToCheckout = useCartLogic();

  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cartItems.map((item, index) => (
                <div
                key={`${item.id}-${index}`}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                >
                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    {/* Hình ảnh */}
                    <a href="#" className="w-20 shrink-0 md:order-1">
                      <img
                        className="h-20 w-20"
                        src={item.image}
                        alt={item.name}
                      />
                    </a>

                    {/* Thao tác số lượng */}
                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
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
                          onClick={() => increaseQuantity(item.id)}
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                        >
                          <FaPlus className="h-2.5 w-2.5 text-gray-900" />
                        </button>
                      </div>
                      <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Tên sản phẩm và thao tác */}
                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                      <a
                        href="#"
                        className="text-base font-medium text-gray-900 hover:underline"
                      >
                        {item.name}
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
                          onClick={() => removeFromCart(item.id)}
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
            <div className="hidden xl:mt-8 xl:block">
              <h3 className="text-2xl font-semibold text-gray-900">
                People also bought
              </h3>
              <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm ">
                  <a href="#" className="overflow-hidden rounded">
                    <img
                      className="mx-auto h-44 w-44"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                      alt="imac image"
                    />
                  </a>
                  <div>
                    <a
                      href="#"
                      className="text-lg font-semibold leading-tight text-gray-900 hover:underline "
                    >
                      iMac 27”
                    </a>
                    <p className="mt-2 text-base font-normal text-gray-500 ">
                      This generation has some improvements, including a longer
                      continuous battery life.
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900 ">
                      <span className="line-through"> $399,99 </span>
                    </p>
                    <p className="text-lg font-bold leading-tight text-red-600 ">
                      $299
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2.5">
                    <button
                      data-tooltip-target="favourites-tooltip-1"
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-rose-500 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                    >
                      <FaHeart className="h-5 w-5 text-gray-900" />
                    </button>
                    <div
                      id="favourites-tooltip-1"
                      role="tooltip"
                      className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 "
                    >
                      Add to favourites
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-lg bg-rose-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-300"
                    >
                      <FaCartPlus className="-ms-2 me-2 h-5 w-5" />
                      Add to cart
                    </button>
                  </div>
                </div>
                <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <a href="#" className="overflow-hidden rounded">
                    <img
                      className="mx-auto h-44 w-44"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg"
                      alt="imac image"
                    />
                  </a>
                  <div>
                    <a
                      href="#"
                      className="text-lg font-semibold leading-tight text-gray-900 hover:underline "
                    >
                      Playstation 5
                    </a>
                    <p className="mt-2 text-base font-normal text-gray-500">
                      This generation has some improvements, including a longer
                      continuous battery life.
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900 ">
                      <span className="line-through"> $799,99 </span>
                    </p>
                    <p className="text-lg font-bold leading-tight text-red-600 ">
                      $499
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2.5">
                    <button
                      data-tooltip-target="favourites-tooltip-2"
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-rose-500 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                    >
                      <FaHeart className="h-5 w-5 text-gray-900" />
                    </button>
                    <div
                      id="favourites-tooltip-2"
                      role="tooltip"
                      className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 "
                    >
                      Add to favourites
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-lg bg-rose-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-300"
                    >
                      <FaCartPlus className="-ms-2 me-2 h-5 w-5" />
                      Add to cart
                    </button>
                  </div>
                </div>
                <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <a href="#" className="overflow-hidden rounded">
                    <img
                      className="mx-auto h-44 w-44 "
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg"
                      alt="imac image"
                    />
                    <img
                      className="mx-auto hidden h-44 w-44"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg"
                      alt="imac image"
                    />
                  </a>
                  <div>
                    <a
                      href="#"
                      className="text-lg font-semibold leading-tight text-gray-900 hover:underline "
                    >
                      Apple Watch Series 8
                    </a>
                    <p className="mt-2 text-base font-normal text-gray-500">
                      This generation has some improvements, including a longer
                      continuous battery life.
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900 ">
                      <span className="line-through"> $1799,99 </span>
                    </p>
                    <p className="text-lg font-bold leading-tight text-red-600">
                      $1199
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2.5">
                    <button
                      data-tooltip-target="favourites-tooltip-3"
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-rose-500 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                    >
                      <FaHeart className="h-5 w-5 text-gray-900" />
                    </button>
                    <div
                      id="favourites-tooltip-3"
                      role="tooltip"
                      className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300"
                    >
                      Add to favourites
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>

                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-lg bg-rose-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-300"
                    >
                      <FaCartPlus className="-ms-2 me-2 h-5 w-5" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <p className="text-xl font-semibold text-gray-900 ">
                Order summary
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">
                      Original price
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      $7,592.00
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 ">
                      Savings
                    </dt>
                    <dd className="text-base font-medium text-green-600">
                      -$299.00
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 ">
                      Store Pickup
                    </dt>
                    <dd className="text-base font-medium text-gray-900 ">
                      $99
                    </dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                  <dt className="text-base font-bold text-gray-900 ">Total</dt>
                  <dd className="text-base font-bold text-gray-900">
                    $8,191.00
                  </dd>
                </dl>
              </div>

              <button
                onClick={handleNavigateToCheckout}
                className="flex w-full items-center justify-center rounded-lg bg-rose-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-300"
              >
                Proceed to Checkout
              </button>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500"> or </span>
                <a
                  href="#"
                  title=""
                  className="inline-flex items-center gap-2 text-sm font-medium text-rose-500 underline hover:no-underline"
                >
                  Continue Shopping
                  <FaLongArrowAltRight className="h-5 w-5 stroke-0" />
                </a>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="voucher"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    {" "}
                    Do you have a voucher or gift card?{" "}
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
