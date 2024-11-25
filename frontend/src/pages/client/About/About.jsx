import Items from "@/assets/images/HomePage/Items.png";
import Revenue from "@/assets/images/HomePage/Revenue.png";
import Customer from "@/assets/images/HomePage/Customer.png";
import Gross from "@/assets/images/HomePage/Gross.png";
import employee1 from "@/assets/images/HomePage/employee1.png";
import employee2 from "@/assets/images/HomePage/employee2.png";
import employee3 from "@/assets/images/HomePage/employee3.png";
import Shipping from "@/assets/images/HomePage/Shipping.png";
import Guarantee from "@/assets/images/HomePage/Guarantee.png";
import Support from "@/assets/images/HomePage/Support.png";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-7xl bg-white shadow-lg rounded-lg p-8 flex flex-col gap-12">
        {/* Our Story */}
        <div className="flex flex-col lg:flex-row items-start gap-12">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Launched in 2015, Exclusive is South Asia’s premier online
              shopping marketplace with an active presence in Bangladesh.
              Supported by a wide range of tailored marketing, data, and service
              solutions, Exclusive has 10,500 sellers and 300 brands and serves
              3 million customers across the region.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Exclusive has more than 1 million products to offer, growing at a
              very fast pace. Exclusive offers a diverse assortment in
              categories ranging from consumer electronics to fashion and
              lifestyle products.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-4">
            <img
              className="h-auto w-full rounded-lg object-cover"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
              alt="Gallery Image 1"
            />
            <img
              className="h-auto w-full rounded-lg object-cover"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
              alt="Gallery Image 2"
            />
            <img
              className="h-auto w-full rounded-lg object-cover"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
              alt="Gallery Image 3"
            />
            <img
              className="h-auto w-full rounded-lg object-cover"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
              alt="Gallery Image 4"
            />
            <img
              className="h-auto w-full rounded-lg object-cover"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
              alt="Gallery Image 5"
            />
            <img
              className="h-auto w-full rounded-lg object-cover"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
              alt="Gallery Image 6"
            />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Some Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="w-64 h-56 flex flex-col items-center justify-center rounded-lg shadow-md border p-4">
            <img src={Items} alt="Items" />
            <h3 className="text-3xl font-bold">10.5k</h3>
            <p className="text-center text-gray-600 font-Poppins">
              Items on stock
            </p>
          </div>
          <div className="w-64 h-56 flex flex-col items-center justify-center rounded-lg bg-red-500 shadow-md p-4 text-white">
            <img src={Revenue} alt="Revenue" />
            <h3 className="text-3xl font-bold">33k</h3>
            <p className="text-center font-Poppins">
              Monthly Recurring Revenue
            </p>
          </div>
          <div className="w-64 h-56 flex flex-col items-center justify-center rounded-lg shadow-md border p-4">
            <img src={Customer} alt="Customer" />
            <h3 className="text-3xl font-bold">45.5k</h3>
            <p className="text-center text-gray-600 font-Poppins">
              Customers active on site
            </p>
          </div>
          <div className="w-64 h-56 flex flex-col items-center justify-center rounded-lg shadow-md border p-4">
            <img src={Gross} alt="Gross" />
            <h3 className="text-3xl font-bold">25k</h3>
            <p className="text-center text-gray-600 font-Poppins">
              Annual gross sales
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="flex flex-col items-center py-16 px-4">
          <div className="max-w-4xl w-full">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Our Team
            </h2>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={150}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 150 },
                1024: { slidesPerView: 3, spaceBetween: 150 },
              }}
              loop={true}
              className="w-full mt-6"
            >
              {[
                {
                  name: "Emma Watson",
                  position: "Managing Director",
                  img: employee1,
                },
                {
                  name: "John Doe",
                  position: "Chief Technical Officer",
                  img: employee2,
                },
                {
                  name: "Jane Smith",
                  position: "Marketing Head",
                  img: employee3,
                },
                {
                  name: "Mike Johnson",
                  position: "Operations Manager",
                  img: employee2,
                },
              ].map((member, index) => (
                <SwiperSlide key={index} className="flex justify-center">
                  <div className="flex flex-col items-center gap-6 p-6 bg-white shadow-lg rounded-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300 w-80">
                    {/* Card Image */}
                    <div className="relative w-72 h-96 overflow-hidden rounded-lg">
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    {/* Card Content */}
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold text-gray-800">
                        {member.name}
                      </h3>
                      <p className="text-gray-500">{member.position}</p>
                      {/* Social Icons */}
                      <div className="flex justify-center gap-4 mt-4 text-gray-500">
                        <a href="#" className="hover:text-blue-600">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="hover:text-pink-600">
                          <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="hover:text-blue-700">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Why Shop With Us */}
        <section id="highlights">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Why Shop With Us?
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              {/* Feature 1 */}
              <div className="p-6 bg-white rounded-lg shadow-md border w-64">
                <img
                  src={Shipping}
                  alt="Free Shipping"
                  className="mx-auto w-16 mb-4"
                />
                <h3 className="text-xl font-medium text-gray-900">
                  Free Shipping
                </h3>
                <p className="text-sm text-gray-600">
                  On all orders above $50.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="p-6 bg-white rounded-lg shadow-md border w-64">
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
              <div className="p-6 bg-white rounded-lg shadow-md border w-64">
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
    </div>
  );
};

export default About;
