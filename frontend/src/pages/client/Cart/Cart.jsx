import {
  FaHeart,
  FaTimes,
  FaMinus,
  FaPlus,
  FaCartPlus,
  FaLongArrowAltRight,
} from "react-icons/fa";
const Cart = () => {
  return (
    <section class="bg-white py-8 antialiased md:py-16">
      <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 class="text-xl font-semibold text-gray-900 sm:text-2xl">
          Shopping Cart
        </h2>

        <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div class="space-y-6">
              <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <a href="#" class="w-20 shrink-0 md:order-1">
                    <img
                      class="h-20 w-20"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                      alt="imac image"
                    />
                  </a>

                  <label for="counter-input" class="sr-only">
                    Choose quantity:
                  </label>
                  <div class="flex items-center justify-between md:order-3 md:justify-end">
                    <div class="flex items-center">
                      <button
                        type="button"
                        id="decrement-button"
                        data-input-counter-decrement="counter-input"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                      >
                        <FaMinus className="h-2.5 w-2.5 text-gray-900" />
                      </button>
                      <input
                        type="text"
                        id="counter-input"
                        data-input-counter
                        class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                        placeholder=""
                        value="2"
                        required
                      />
                      <button
                        type="button"
                        id="increment-button"
                        data-input-counter-increment="counter-input"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                      >
                        <FaPlus className="h-2.5 w-2.5 text-gray-900" />
                      </button>
                    </div>
                    <div class="text-end md:order-4 md:w-32">
                      <p class="text-base font-bold text-gray-900">$1,499</p>
                    </div>
                  </div>

                  <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <a
                      href="#"
                      class="text-base font-medium text-gray-900 hover:underline"
                    >
                      PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple
                      M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, Keyboard
                      layout INT
                    </a>

                    <div class="flex items-center gap-4">
                      <button
                        type="button"
                        class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
                      >
                        <FaHeart className="me-1.5 h-4 w-4" />
                        Add to Favorites
                      </button>

                      <button
                        type="button"
                        class="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                      >
                        <FaTimes className="me-1.5 h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <a href="#" class="w-20 shrink-0 md:order-1">
                    <img
                      class="h-20 w-20"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg"
                      alt="imac image"
                    />
                  </a>

                  <label for="counter-input-2" class="sr-only">
                    Choose quantity:
                  </label>
                  <div class="flex items-center justify-between md:order-3 md:justify-end">
                    <div class="flex items-center">
                      <button
                        type="button"
                        id="decrement-button-2"
                        data-input-counter-decrement="counter-input-2"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                      >
                        <FaMinus className="h-2.5 w-2.5 text-gray-900" />
                      </button>
                      <input
                        type="text"
                        id="counter-input-2"
                        data-input-counter
                        class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                        placeholder=""
                        value="2"
                        required
                      />
                      <button
                        type="button"
                        id="increment-button-2"
                        data-input-counter-increment="counter-input-2"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                      >
                        <FaPlus className="h-2.5 w-2.5 text-gray-900" />
                      </button>
                    </div>
                    <div class="text-end md:order-4 md:w-32">
                      <p class="text-base font-bold text-gray-900">$598</p>
                    </div>
                  </div>

                  <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <a
                      href="#"
                      class="text-base font-medium text-gray-900 hover:underline"
                    >
                      Restored Apple Watch Series 8 (GPS) 41mm Midnight Aluminum
                      Case with Midnight Sport Band
                    </a>

                    <div class="flex items-center gap-4">
                      <button
                        type="button"
                        class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
                      >
                        <FaHeart className="me-1.5 h-4 w-4" />
                        Add to Favorites
                      </button>

                      <button
                        type="button"
                        class="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                      >
                        <FaTimes className="me-1.5 h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <a href="#" class="w-20 shrink-0 md:order-1">
                    <img
                      class="h-20 w-20"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-light.svg"
                      alt="imac image"
                    />
                  </a>

                  <label for="counter-input-3" class="sr-only">
                    Choose quantity:
                  </label>
                  <div class="flex items-center justify-between md:order-3 md:justify-end">
                    <div class="flex items-center">
                      <button
                        type="button"
                        id="decrement-button-3"
                        data-input-counter-decrement="counter-input-3"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                      >
                        <FaMinus className="h-2.5 w-2.5 text-gray-900" />
                      </button>
                      <input
                        type="text"
                        id="counter-input-3"
                        data-input-counter
                        class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                        placeholder=""
                        value="2"
                        required
                      />
                      <button
                        type="button"
                        id="increment-button-3"
                        data-input-counter-increment="counter-input-3"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                      >
                        <FaPlus className="h-2.5 w-2.5 text-gray-900" />
                      </button>
                    </div>
                    <div class="text-end md:order-4 md:w-32">
                      <p class="text-base font-bold text-gray-900 ">$1,799</p>
                    </div>
                  </div>

                  <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <a
                      href="#"
                      class="text-base font-medium text-gray-900 hover:underline"
                    >
                      Apple - MacBook Pro 16" Laptop, M3 Pro chip, 36GB Memory,
                      18-core GPU, 512GB SSD, Space Black
                    </a>

                    <div class="flex items-center gap-4">
                      <button
                        type="button"
                        class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
                      >
                        <FaHeart className="me-1.5 h-4 w-4" />
                        Add to Favorites
                      </button>

                      <button
                        type="button"
                        class="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                      >
                        <FaTimes className="me-1.5 h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="hidden xl:mt-8 xl:block">
              <h3 class="text-2xl font-semibold text-gray-900">
                People also bought
              </h3>
              <div class="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                <div class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm ">
                  <a href="#" class="overflow-hidden rounded">
                    <img
                      class="mx-auto h-44 w-44"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                      alt="imac image"
                    />
                  </a>
                  <div>
                    <a
                      href="#"
                      class="text-lg font-semibold leading-tight text-gray-900 hover:underline "
                    >
                      iMac 27”
                    </a>
                    <p class="mt-2 text-base font-normal text-gray-500 ">
                      This generation has some improvements, including a longer
                      continuous battery life.
                    </p>
                  </div>
                  <div>
                    <p class="text-lg font-bold text-gray-900 ">
                      <span class="line-through"> $399,99 </span>
                    </p>
                    <p class="text-lg font-bold leading-tight text-red-600 ">
                      $299
                    </p>
                  </div>
                  <div class="mt-6 flex items-center gap-2.5">
                    <button
                      data-tooltip-target="favourites-tooltip-1"
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                    >
                      <FaHeart className="h-5 w-5 text-gray-900" />
                    </button>
                    <div
                      id="favourites-tooltip-1"
                      role="tooltip"
                      class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 "
                    >
                      Add to favourites
                      <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                    <button
                      type="button"
                      class="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                    >
                      <FaCartPlus className="-ms-2 me-2 h-5 w-5" />
                      Add to cart
                    </button>
                  </div>
                </div>
                <div class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <a href="#" class="overflow-hidden rounded">
                    <img
                      class="mx-auto h-44 w-44"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg"
                      alt="imac image"
                    />
                  </a>
                  <div>
                    <a
                      href="#"
                      class="text-lg font-semibold leading-tight text-gray-900 hover:underline "
                    >
                      Playstation 5
                    </a>
                    <p class="mt-2 text-base font-normal text-gray-500">
                      This generation has some improvements, including a longer
                      continuous battery life.
                    </p>
                  </div>
                  <div>
                    <p class="text-lg font-bold text-gray-900 ">
                      <span class="line-through"> $799,99 </span>
                    </p>
                    <p class="text-lg font-bold leading-tight text-red-600 ">
                      $499
                    </p>
                  </div>
                  <div class="mt-6 flex items-center gap-2.5">
                    <button
                      data-tooltip-target="favourites-tooltip-2"
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                    >
                      <FaHeart className="h-5 w-5 text-gray-900" />
                    </button>
                    <div
                      id="favourites-tooltip-2"
                      role="tooltip"
                      class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 "
                    >
                      Add to favourites
                      <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                    <button
                      type="button"
                      class="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                    >
                      <FaCartPlus className="-ms-2 me-2 h-5 w-5" />
                      Add to cart
                    </button>
                  </div>
                </div>
                <div class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <a href="#" class="overflow-hidden rounded">
                    <img
                      class="mx-auto h-44 w-44 "
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg"
                      alt="imac image"
                    />
                    <img
                      class="mx-auto hidden h-44 w-44"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg"
                      alt="imac image"
                    />
                  </a>
                  <div>
                    <a
                      href="#"
                      class="text-lg font-semibold leading-tight text-gray-900 hover:underline "
                    >
                      Apple Watch Series 8
                    </a>
                    <p class="mt-2 text-base font-normal text-gray-500">
                      This generation has some improvements, including a longer
                      continuous battery life.
                    </p>
                  </div>
                  <div>
                    <p class="text-lg font-bold text-gray-900 ">
                      <span class="line-through"> $1799,99 </span>
                    </p>
                    <p class="text-lg font-bold leading-tight text-red-600">
                      $1199
                    </p>
                  </div>
                  <div class="mt-6 flex items-center gap-2.5">
                    <button
                      data-tooltip-target="favourites-tooltip-3"
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                    >
                      <FaHeart className="h-5 w-5 text-gray-900" />
                    </button>
                    <div
                      id="favourites-tooltip-3"
                      role="tooltip"
                      class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300"
                    >
                      Add to favourites
                      <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>

                    <button
                      type="button"
                      class="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                    >
                      <FaCartPlus className="-ms-2 me-2 h-5 w-5" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <p class="text-xl font-semibold text-gray-900 ">Order summary</p>

              <div class="space-y-4">
                <div class="space-y-2">
                  <dl class="flex items-center justify-between gap-4">
                    <dt class="text-base font-normal text-gray-500">
                      Original price
                    </dt>
                    <dd class="text-base font-medium text-gray-900">
                      $7,592.00
                    </dd>
                  </dl>

                  <dl class="flex items-center justify-between gap-4">
                    <dt class="text-base font-normal text-gray-500 ">
                      Savings
                    </dt>
                    <dd class="text-base font-medium text-green-600">
                      -$299.00
                    </dd>
                  </dl>

                  <dl class="flex items-center justify-between gap-4">
                    <dt class="text-base font-normal text-gray-500 ">
                      Store Pickup
                    </dt>
                    <dd class="text-base font-medium text-gray-900 ">$99</dd>
                  </dl>
                </div>

                <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                  <dt class="text-base font-bold text-gray-900 ">Total</dt>
                  <dd class="text-base font-bold text-gray-900">$8,191.00</dd>
                </dl>
              </div>

              <a
                href="#"
                class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 "
              >
                Proceed to Checkout
              </a>

              <div class="flex items-center justify-center gap-2">
                <span class="text-sm font-normal text-gray-500"> or </span>
                <a
                  href="#"
                  title=""
                  class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline"
                >
                  Continue Shopping
                  <FaLongArrowAltRight className="h-5 w-5 stroke-0" />
                </a>
              </div>
            </div>

            <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <form class="space-y-4">
                <div>
                  <label
                    for="voucher"
                    class="mb-2 block text-sm font-medium text-gray-900"
                  >
                    {" "}
                    Do you have a voucher or gift card?{" "}
                  </label>
                  <input
                    type="text"
                    id="voucher"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                    placeholder=""
                    required
                  />
                </div>
                <button
                  type="submit"
                  class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
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
