import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow } from "swiper/modules";
import { useHomeLogic } from "@/pages/client/Home/index";

import Shipping from "@/assets/images/HomePage/Shipping.png";
import Guarantee from "@/assets/images/HomePage/Guarantee.png";
import Support from "@/assets/images/HomePage/Support.png";

const Home = () => {
  const { handleExploreMore, statistics, categories, products } =
    useHomeLogic();

  return (
    <div className="relative bg-gray-50 px-6 lg:px-8">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex flex-col-reverse lg:flex-row items-center justify-between w-full min-h-screen px-6 py-14 lg:px-12"
      >
        {/* Left Content */}
        <div className="lg:w-1/2 flex flex-col items-start justify-center text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
            <span>Discover </span>
            <span className="text-rose-600">Amazing Products</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Shop the latest trends in fashion, electronics, and more. Elevate
            your shopping experience with exclusive deals.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={handleExploreMore}
              className="bg-rose-500 text-white px-6 py-3 rounded-md shadow hover:bg-rose-600 transition duration-300"
            >
              Shop Now
            </button>
            <button
              onClick={() => {
                const element = document.querySelector("#browse-categories");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border border-rose-500 text-rose-500 px-6 py-3 rounded-md shadow hover:bg-rose-500 hover:text-white transition duration-300"
            >
              Browse Categories
            </button>
          </div>
          <div className="flex items-center justify-start space-x-12 mt-10">
            {statistics.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-gray-800">
                  {stat.value}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="flex h-[90vh] w-full items-center justify-center">
          <div className="grid h-full w-full gap-4 bg-gray-200 p-2 grid-cols-4 grid-rows-6 rounded-lg shadow-md">
            {/* Cosmetics */}
            <div className="col-span-2 row-span-2 bg-pink-200 rounded-lg shadow-md relative">
              <img
                src="https://i.pinimg.com/736x/e4/09/72/e40972a9213f64e24c2097b753e051cd.jpg"
                alt="Cosmetics"
                className="h-full w-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
                <p className="text-white text-lg font-bold">Cosmetics</p>
              </div>
            </div>

            {/* Fashions */}
            <div className="col-span-2 row-span-2 bg-lime-200 rounded-lg shadow-md relative">
              <img
                src="https://i.pinimg.com/1200x/16/e5/37/16e5371c7fc5b7e4c85f9661c0c2f466.jpg"
                alt="Fashions"
                className="h-full w-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
                <p className="text-white text-lg font-bold">Fashions</p>
              </div>
            </div>

            {/* Electronics */}
            <div className="col-span-1 row-span-4 bg-yellow-200 rounded-lg shadow-md relative">
              <img
                src="https://i.pinimg.com/736x/43/9e/e3/439ee3c344dbd4af31ae9f17015c4195.jpg"
                alt="Electronics"
                className="h-full w-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
                <p className="text-white text-lg font-bold">Electronics</p>
              </div>
            </div>

            {/* Books & Stationery */}
            <div className="col-span-2 row-span-2 bg-tan-200 rounded-lg shadow-md relative">
              <img
                src="https://i.pinimg.com/1200x/33/86/d4/3386d43ac6f00a71bff9961c8e55d12f.jpg"
                alt="Books & Stationery"
                className="h-full w-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
                <p className="text-white text-lg font-bold">
                  Books & Stationery
                </p>
              </div>
            </div>

            {/* Furniture */}
            <div className="col-span-1 row-span-2 bg-green-200 rounded-lg shadow-md relative">
              <img
                src="https://i.pinimg.com/1200x/72/51/d9/7251d92cc058ab65bcd2b68a22d65ea7.jpg"
                alt="Furniture"
                className="h-full w-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
                <p className="text-white text-lg font-bold">Furniture</p>
              </div>
            </div>

            {/* Food */}
            <div className="col-span-3 row-span-2 bg-red-200 rounded-lg shadow-md relative">
              <img
                src="https://i.pinimg.com/736x/b0/e7/47/b0e747a8e32385349f1e10f0dbfdcabd.jpg"
                alt="Food"
                className="h-full w-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
                <p className="text-white text-lg font-bold">Food</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Categories */}
      <section id="browse-categories" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-900 text-center">
            Browse by Categories
          </h2>
          <p className="mt-4 text-gray-600 text-center">
            Explore our diverse collection of products across multiple
            categories. Find what you need with ease!
          </p>

          {/* Swiper */}
          <div className="mt-8">
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="3"
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{ clickable: true }}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
            >
              {categories.map((category, index) => (
                <SwiperSlide
                  key={index}
                  className="group bg-white rounded-lg shadow-md p-6"
                >
                  <img
                    src={category.image} // Use the correct image path or import
                    alt={category.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-rose-500">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {category.description}
                  </p>
                  <a
                    href={`#${category.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="mt-4 inline-block text-sm font-medium text-rose-500 hover:underline"
                  >
                    Shop Now →
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Explore Our Products */}
      <section id="explore-products" className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">
            Explore Our Products
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((product) => (
              <div
                key={product.id}
                className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg"
              >
                <div className="relative p-2.5 h-96 overflow-hidden rounded-xl bg-clip-border">
                  <img
                    src={product.image || "https://via.placeholder.com/200"}
                    alt={product.name}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
                <div className="p-4 ">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <p className="text-slate-800 text-xl font-semibold leading-tight text-left break-words max-w-[70%]">
                      {product.name}
                    </p>
                    <p className="text-rose-600 text-xl font-semibold text-right whitespace-nowrap">
                      ${product.price}
                    </p>
                  </div>

                  <p className="text-slate-600 leading-normal text-left font-light">
                    {product.description || "No description available."}
                  </p>
                  <button
                    className="rounded-md w-full mt-6 bg-rose-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-rose-600 focus:shadow-none active:bg-rose-600 hover:bg-rose-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            className="mt-8 px-6 py-2 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600"
            onClick={handleExploreMore}
          >
            Explore More
          </button>
        </div>
      </section>

      {/* Best Selling Products */}
      <section id="best-sellers" className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">
            Best Selling Products
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg"
              >
                <div className="relative p-2.5 h-96 overflow-hidden rounded-xl bg-clip-border">
                  <img
                    src={product.image || "https://via.placeholder.com/300x200"}
                    alt={product.name}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
                <div className="p-2">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <p className="text-slate-800 text-xl font-semibold leading-tight break-words max-w-[70%]">
                      {product.name}
                    </p>
                    <p className="text-rose-600 text-xl font-semibold whitespace-nowrap">
                      ${product.price}
                    </p>
                  </div>

                  <p className="text-slate-600 leading-normal font-light">
                    {product.description || "No description available."}
                  </p>
                  <button
                    className="rounded-md w-full mt-6 bg-rose-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-rose-700 focus:shadow-none active:bg-rose-700 hover:bg-rose-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 px-6 py-2 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600"
          onClick={handleExploreMore}>
            Explore More
          </button>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section id="highlights" className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">
            Why Shop With Us?
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {/* Feature 1 */}
            <div className="p-6 bg-white rounded-lg shadow-md w-64">
              <img
                src={Shipping}
                alt="Free Shipping"
                className="mx-auto w-16 mb-4"
              />
              <h3 className="text-xl font-medium text-gray-900">
                Free Shipping
              </h3>
              <p className="text-sm text-gray-600">On all orders above $50.</p>
            </div>
            {/* Feature 2 */}
            <div className="p-6 bg-white rounded-lg shadow-md w-64">
              <img
                src={Guarantee}
                alt="Quality Guarantee"
                className="mx-auto w-16 mb-4"
              />
              <h3 className="text-xl font-medium text-gray-900">
                Quality Guarantee
              </h3>
              <p className="text-sm text-gray-600">Only the best products.</p>
            </div>
            {/* Feature 3 */}
            <div className="p-6 bg-white rounded-lg shadow-md w-64">
              <img
                src={Support}
                alt="24/7 Support"
                className="mx-auto w-16 mb-4"
              />
              <h3 className="text-xl font-medium text-gray-900">
                24/7 Support
              </h3>
              <p className="text-sm text-gray-600">
                We're here to help anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
