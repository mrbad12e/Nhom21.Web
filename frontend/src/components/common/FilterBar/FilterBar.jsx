import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Slider from '@mui/material/Slider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ToggleButton from '@mui/material/ToggleButton';
import CheckIcon from '@mui/icons-material/Check';
import useCategories from '@/hooks/useCategories';

const FilterBar = ({
  priceRange,
  setPriceRange,
  selectedColors,
  setSelectedColors,
  selectedSizes,
  setSelectedSizes,
  selectedCategoryId,
  setSelectedCategoryId,
  onClose,
}) => {
    const { categories, loading, error } = useCategories();

    const colors = [
        '#00c12a',
        '#f50505',
        '#f5dd05',
        '#f57805',
        '#05c9f5',
        '#053af5',
        '#7d05f5',
        '#f505a3',
        'white',
        'black',
    ];
    const sizes = ['XX-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'];
    const brands = ['Apple', "Ben & Jerry's", 'Caliber Collection®', 'Daewoo Electricals'];

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const toggleColor = (color) => {
        setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]));
    };

    const toggleSize = (size) => {
        setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
    };

    const toggleCategory = (categoryId) => {
        setSelectedCategoryId(
            (prev) => (prev === categoryId ? null : categoryId)
        );
    };

    if (loading) return <div>Loading categories...</div>;
    if (error) return <div>{error}</div>;

    return (
      <div className="w-full md:w-96 h-auto max-h-screen px-6 py-5 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">Filters</h2>
          <button onClick={onClose}>
            <FaTimes className="text-gray-500" />
          </button>
        </div>
  
        {/* Categories */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="categories-header">
            <Typography className="text-lg font-semibold text-black">Categories</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    name="category"
                    checked={selectedCategoryId === category.id} // Check against category ID
                    onChange={() => toggleCategory(category.id)} // Toggle using ID
                    className="mr-2"
                  />
                  <label htmlFor={`category-${category.id}`} className="text-gray-700">{category.name}</label>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
  
        {/* Prices */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="prices-header">
            <Typography className="text-lg font-semibold text-black">Prices</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
                disableSwap
                color="primary"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-700">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

            {/* Colors */}
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="colors-header">
                    <Typography className="text-lg font-semibold text-black">Colors</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="flex flex-wrap gap-2">
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                onClick={() => toggleColor(color)}
                                className={`relative w-8 h-8 rounded-full border cursor-pointer ${
                                    selectedColors.includes(color) ? 'border-black' : 'border-gray-300'
                                }`}
                                style={{ backgroundColor: color }}
                            >
                                {selectedColors.includes(color) && (
                                    <CheckIcon
                                        className={`absolute ${
                                            color === 'white' ? 'text-black' : 'text-white'
                                        } w-5 h-5`}
                                        style={{
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </AccordionDetails>
            </Accordion>

            {/* Sizes */}
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="sizes-header">
                    <Typography className="text-lg font-semibold text-black">Sizes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="flex flex-wrap gap-2">
                        {sizes.map((size, index) => (
                            <ToggleButton
                                key={index}
                                value={size}
                                selected={selectedSizes.includes(size)}
                                onClick={() => toggleSize(size)}
                                className="px-3 py-1 text-sm text-gray-700"
                                style={{
                                    border: '1px solid gray',
                                    borderRadius: '8px',
                                    backgroundColor: selectedSizes.includes(size) ? '#000' : '#f5f5f5',
                                    color: selectedSizes.includes(size) ? '#fff' : '#000',
                                }}
                            >
                                {size}
                            </ToggleButton>
                        ))}
                    </div>
                </AccordionDetails>
            </Accordion>

            {/* Brands */}
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="brands-header">
                    <Typography className="text-lg font-semibold text-black">Brands</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="space-y-2">
                        {brands.map((brand, index) => (
                            <div key={index} className="flex items-center">
                                <input type="checkbox" id={`brand-${index}`} className="mr-2" />
                                <label htmlFor={`brand-${index}`} className="text-gray-700">
                                    {brand}
                                </label>
                            </div>
                        ))}
                    </div>
                </AccordionDetails>
            </Accordion>
            {/* Apply Button */}
            <button className="w-full bg-black text-white py-2 mt-2 rounded-lg">Apply Filters</button>
        </div>
    );
};

export default FilterBar;
