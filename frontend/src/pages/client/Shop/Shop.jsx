import BannerImg from '@/assets/shoppage/banner.jpg';
import FilterBar from '@/components/common/FilterBar';
import { Pagination } from '@mui/material';
import { useState } from 'react';
import { FaBars, FaFilter, FaTh } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useProducts from '@/hooks/useProducts';

const Shop = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1); // Start at page 1
  const [sortOption, setSortOption] = useState("id");
  const [searchQuery, setSearchQuery] = useState("");
  
   // Track selected category as an integer ID
   const [selectedCategoryId, setSelectedCategoryId] = useState(null); 
   const [priceRange, setPriceRange] = useState([0, 10000]);
   const [selectedColors, setSelectedColors] = useState([]);
   const [selectedSizes, setSelectedSizes] = useState([]);

   // Fetch products and pagination info
   const { products, pagination, loading, error } = useProducts(
     currentPage,
     itemsPerPage,
     searchQuery,
     selectedCategoryId,
     priceRange[0],
     priceRange[1],
     sortOption
   );

   // Handle loading and error states
   if (loading) {
     return (
       <div className="min-h-screen flex justify-center items-center">
         <p>Loading products...</p>
       </div>
     );
   }

   if (error) {
     return (
       <div className="min-h-screen flex justify-center items-center">
         <p>{error}</p>
       </div>
     );
   }

    return (
        <div className="text-white min-h-screen">
            {/* Banner Section */}
            <div className="relative h-64 flex flex-col justify-center items-center">
                <div className="absolute inset-0 bg-cover bg-center" style={{ background: `url(${BannerImg})` }}></div>
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl font-medium mb-2 text-gray-200">Shop</h1>
                    <h2 className="text-xl font-light text-gray-200">
                        <Link to="/" className="hover:text-rose-500 font-medium text-gray-200">
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
                        onClick={() => setIsFilterVisible(!isFilterVisible)}
                        className="bg-primary text-white py-2 px-4 rounded flex items-center font-medium"
                    >
                        <FaFilter className="mr-2" /> Filter
                    </button>
                    <FaTh className="cursor-pointer text-xl" />
                    <FaBars className="cursor-pointer text-xl" />
                </div>
                <div className="text-gray-400">
                    Showing {(currentPage - 1) * itemsPerPage + 1} -{' '}
                    {Math.min(currentPage * itemsPerPage, pagination.total)} of {pagination.total} results
                </div>
                <div className="flex gap-4 items-center">
                    <label htmlFor="itemsPerPage">Show</label>
                    <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(parseInt(e.target.value));
                            setCurrentPage(1); // Reset to first page when items per page changes
                        }}
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
                        <option value="id">Default</option>
                        <option value="price">Price: Low to High</option>
                        <option value="price">Price: High to Low</option>
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
               selectedCategoryId={selectedCategoryId} // Pass down selectedCategoryId
               setSelectedCategoryId={setSelectedCategoryId} // Pass down function to update it
               onClose={() => setIsFilterVisible(false)}
             />
           </div>
         )}

                {/* Product Grid */}
         <div className="flex-1 container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {products.map((product) => (
             <div key={product.product_id} className="bg-white shadow-sm border rounded-lg p-4 max-h-96 hover:shadow-lg transition-shadow duration-300">
                            {/* Image */}
                            <Link to={`/products/${product.product_id}`} className="block">
                                {product.product_image_urls ? (
                                    <img
                                        src={product.product_image_urls}
                                        alt={product.product_name}
                                        className="h-48 w-full object-cover mb-4 rounded hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="h-48 w-full bg-gray-300 mb-4 rounded"></div> // Placeholder if no image is available
                                )}
                            </Link>

                            {/* Title */}
                            <Link to={`/products/${product.product_id}`} className="block mb-2">
                                <p className="text-gray-800 text-xl font-semibold leading-tight hover:text-rose-600 transition-colors duration-200">
                                    {product.product_name}
                                </p>
                            </Link>

                            {/* Price and Description */}
                            <div className="mb-2 flex items-start justify-between gap-2">
                                <p className="text-rose-600 text-xl font-semibold">
                                    ${parseFloat(product.product_price).toFixed(2)}
                                </p>{' '}
                                {/* Format price */}
                            </div>
                            <p className="text-gray-600 leading-normal font-light">{product.product_description}</p>

                            {/* Add to Cart Button */}
                            {product.product_stock > 0 ? (
                                <button className="mt-3 w-full bg-rose500 text-white py-2 rounded-lg hover:bg-rose600 transition-colors duration-200">
                                    Add to Cart
                                </button>
                            ) : (
                                <button
                                    disabled
                                    className="mt-3 w-full bg-gray500 text-white py-2 rounded-lg cursor-notallowed"
                                >
                                    Out of Stock
                                </button> // Disable button if out of stock
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
       {pagination.totalPages > 1 && ( // Only show pagination if there are multiple pages
         <div className="flex justify-center items-center py6">
           <Pagination
             count={pagination.totalPages} // Use totalPages from pagination state
             page={currentPage}
             onChange={(event, value) => {
               setCurrentPage(value); // Update current page when a new page is selected
             }}
             variant="outlined"
             shape="rounded"
           />
         </div>
       )}
     </div>
   );
};

export default Shop;
