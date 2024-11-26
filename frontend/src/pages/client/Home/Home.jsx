import React from "react";
import Shipping from "@/assets/images/HomePage/Shipping.png";
import Guarantee from "@/assets/images/HomePage/Guarantee.png";
import Support from "@/assets/images/HomePage/Support.png";

const Home = () => {
  const statistics = [
    {
      value: "1000+",
      label: "Products",
    },
    {
      value: "500+",
      label: "Brands",
    },
    {
      value: "1000+",
      label: "Customers",
    },
  ];

  return (
    <div className="relative bg-white isolate px-6 lg:px-8">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex flex-col-reverse lg:flex-row items-center justify-between w-full min-h-screen px-6 py-14 bg-gradient-to-r from-gray-50 via-white to-gray-100 lg:px-12"
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
            <a
              href="#shop-now"
              className="bg-rose-500 text-white px-6 py-3 rounded-md shadow hover:bg-rose-600 transition duration-300"
            >
              Shop Now
            </a>
            <a
              href="#categories"
              className="border border-rose-500 text-rose-500 px-6 py-3 rounded-md shadow hover:bg-rose-500 hover:text-white transition duration-300"
            >
              Browse Categories
            </a>
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
      <section id="browse-categories" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-900 text-center">
            Browse by Categories
          </h2>
          <p className="mt-4 text-gray-600 text-center">
            Explore our diverse collection of products across multiple
            categories. Find what you need with ease!
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Category 1 */}
            <div className="group p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
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
            <div className="group p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
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
            <div className="group p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
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
            <div className="group p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
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
