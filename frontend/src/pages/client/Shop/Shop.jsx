import BannerImg from "@/assets/shoppage/banner.jpg";
import FilterBar from "@/components/common/FilterBar";
import { Pagination } from "@mui/material";
import { useState } from "react";
import { FaBars, FaFilter, FaTh } from "react-icons/fa";
import { Link } from "react-router-dom";
import useProducts from "@/hooks/useProducts";

const Shop = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  // Sử dụng custom hook để lấy danh sách sản phẩm và trạng thái loading
  const { products, loading } = useProducts();

  // Lọc sản phẩm dựa trên tiêu chí
  const filteredProducts = products.filter((product) => {
    const inCategory =
      !selectedCategory || product.category === selectedCategory;

    const inPriceRange =
      product.basePrice >= priceRange[0] && product.basePrice <= priceRange[1];

    const inColor = selectedColors.length
      ? selectedColors.some((color) =>
          product.colors ? product.colors.includes(color) : false
        )
      : true;

    const inSize = selectedSizes.length
      ? selectedSizes.some((size) =>
          product.sizes ? product.sizes.includes(size) : false
        )
      : true;

    return inCategory && inPriceRange && inColor && inSize;
  });

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startResult = (currentPage - 1) * itemsPerPage;
  const endResult =
    startResult + itemsPerPage > totalProducts
      ? totalProducts
      : startResult + itemsPerPage;

  const visibleProducts = filteredProducts.slice(
    startResult,
    startResult + itemsPerPage
  );
  
  const toggleFilterVisibility = () => setIsFilterVisible(!isFilterVisible);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="text-white min-h-screen">
      {/* Banner Section */}
      <div className="relative h-64 flex flex-col justify-center items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ background: `url(${BannerImg})` }}
        ></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-medium mb-2 text-gray-200">Shop</h1>
          <h2 className="text-xl font-light text-gray-200">
            <Link
              to="/"
              className="hover:text-rose-500 font-medium text-gray-200"
            >
              Home
            </Link>
            <span className="mx-2 font-medium text-gray-200">&gt;</span>
            Shop
          </h2>
        </div>
      </div>

      {/* Filter Section */}
      <div className="py-6 bg-gray-900 px-6 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <button
            onClick={toggleFilterVisibility}
            className="bg-primary text-white py-2 px-4 rounded flex items-center font-medium"
          >
            <FaFilter className="mr-2" /> Filter
          </button>
          <FaTh className="cursor-pointer text-xl" />
          <FaBars className="cursor-pointer text-xl" />
        </div>
        <div className="text-gray-400">
          Showing {startResult + 1}-{endResult} of {totalProducts} results
        </div>
        <div className="flex gap-4 items-center">
          <label htmlFor="itemsPerPage">Show</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
            className="border px-2 py-1 rounded bg-gray-700 text-white"
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
          </select>
          <label htmlFor="sortBy">Sort by</label>
          <select
            id="sortBy"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border px-2 py-1 rounded bg-gray-700 text-white"
          >
            <option value="default">Default</option>
            <option value="basePrice">Price: Low to High</option>
            <option value="-basePrice">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product and Filter Section */}
      <div className="flex py-6">
        {/* Filter Sidebar */}
        {isFilterVisible && (
          <div className="mr-6">
            <FilterBar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              selectedSizes={selectedSizes}
              setSelectedSizes={setSelectedSizes}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onClose={() => setIsFilterVisible(false)}
            />
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1 container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {visibleProducts.map((product, index) => (
            <div
              key={product._id}
              className="bg-white shadow-sm border rounded-lg p-4 max-h-96 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <Link to={`/products/${product._id}`} className="block">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-48 w-full object-cover mb-4 rounded hover:scale-105 transition-transform duration-300"
                />
              </Link>
              {/* Title */}
              <Link to={`/products/${product._id}`} className="block mb-2">
                <p className="text-gray-800 text-xl font-semibold leading-tight hover:text-rose-600 transition-colors duration-200">
                  {product.title}
                </p>
              </Link>

              {/* Price and Description */}
              <div className="mb-2 flex items-start justify-between gap-2">
                <p className="text-rose-600 text-xl font-semibold">
                  ${product.basePrice}
                </p>
              </div>
              <p className="text-gray-600 leading-normal font-light">
                {product.description}
              </p>

              {/* Add to Cart Button */}
              <button className="mt-3 w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-colors duration-200">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center py-6">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default Shop;
