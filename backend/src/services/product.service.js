const Product = require('../models/Product');

// Lấy toàn bộ sản phẩm
const getAllProducts = async () => {
  try {
    const products = await Product.getAllProducts();
    return products;
  } catch (err) {
    throw new Error('Error fetching all products: ' + err.message);
  }
};

// Lấy sản phẩm theo danh mục
const getProductsByCategory = async (categoryId) => {
  try {
    const products = await Product.getProductsByCategory(categoryId);
    return products;
  } catch (err) {
    throw new Error('Error fetching products by category: ' + err.message);
  }
};

module.exports = { getAllProducts, getProductsByCategory };
