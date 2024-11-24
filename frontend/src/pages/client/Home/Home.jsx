import React from "react";
import Shipping from "@/assets/images/HomePage/Shipping.png";
import Guarantee from "@/assets/images/HomePage/Guarantee.png";
import Support from "@/assets/images/HomePage/Support.png";

const Home = () => {
  return (
    <div className="relative bg-white isolate px-6 pt-14 lg:px-8">
      {/* Background Shape */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* Hero Section */}
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
          Discover Amazing Products
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Shop the latest trends in fashion, electronics, and more. Elevate your
          shopping experience with exclusive deals.
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <a
            href="#shop-now"
            className="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500"
          >
            Shop Now
          </a>
          <a href="#categories" className="text-sm font-semibold text-gray-900">
            Browse Categories <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Browse by Categories */}
      <section id="browse-categories" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-900 text-center">
            Browse by Categories
          </h2>
          <p className="mt-4 text-gray-600 text-center">
            Explore our diverse collection of products across multiple
            categories. Find what you need with ease!
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Category 1 */}
            <div className="group p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <img
                src="https://via.placeholder.com/300"
                alt="Fashion"
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                Fashion
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Stylish clothing and accessories for every season.
              </p>
              <a
                href="#fashion"
                className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:underline"
              >
                Shop Now →
              </a>
            </div>
            {/* Category 2 */}
            <div className="group p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <img
                src="https://via.placeholder.com/300"
                alt="Electronics"
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                Electronics
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Latest gadgets and devices to keep you connected.
              </p>
              <a
                href="#electronics"
                className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:underline"
              >
                Shop Now →
              </a>
            </div>
            {/* Category 3 */}
            <div className="group p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <img
                src="https://via.placeholder.com/300"
                alt="Home Appliances"
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                Home Appliances
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Upgrade your home with our premium appliances.
              </p>
              <a
                href="#home-appliances"
                className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:underline"
              >
                Shop Now →
              </a>
            </div>
            {/* Category 4 */}
            <div className="group p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <img
                src="https://via.placeholder.com/300"
                alt="Accessories"
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                Accessories
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Perfect additions to complement your style.
              </p>
              <a
                href="#accessories"
                className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:underline"
              >
                Shop Now →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Our Products */}
      <section id="explore-products" className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">
            Explore Our Products
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img
                src="https://via.placeholder.com/200"
                alt="Fashion"
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="mt-4 text-xl font-medium text-gray-900">
                Fashion
              </h3>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img
                src="https://via.placeholder.com/200"
                alt="Electronics"
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="mt-4 text-xl font-medium text-gray-900">
                Electronics
              </h3>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img
                src="https://via.placeholder.com/200"
                alt="Home Appliances"
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="mt-4 text-xl font-medium text-gray-900">
                Home Appliances
              </h3>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img
                src="https://via.placeholder.com/200"
                alt="Accessories"
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="mt-4 text-xl font-medium text-gray-900">
                Accessories
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Best Selling Products */}
      <section id="best-sellers" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">
            Best Selling Products
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img
                src="https://via.placeholder.com/300x200"
                alt="Product 1"
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="mt-4 text-xl font-medium text-gray-900">
                Product 1
              </h3>
              <p className="mt-2 text-sm text-gray-600">$49.99</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img
                src="https://via.placeholder.com/300x200"
                alt="Product 2"
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="mt-4 text-xl font-medium text-gray-900">
                Product 2
              </h3>
              <p className="mt-2 text-sm text-gray-600">$89.99</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img
                src="https://via.placeholder.com/300x200"
                alt="Product 3"
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="mt-4 text-xl font-medium text-gray-900">
                Product 3
              </h3>
              <p className="mt-2 text-sm text-gray-600">$29.99</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <img
                src="https://via.placeholder.com/300x200"
                alt="Product 4"
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="mt-4 text-xl font-medium text-gray-900">
                Product 4
              </h3>
              <p className="mt-2 text-sm text-gray-600">$59.99</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section id="highlights" className="py-16 bg-gray-50">
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
