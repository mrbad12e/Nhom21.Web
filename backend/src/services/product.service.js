const Product = require('../models/Product');

// Lấy danh sách toàn bộ sản phẩm (bao gồm các tiêu chí tìm kiếm, phân trang, sắp xếp)
const getAllProducts = async (options = {}) => {
  try {
    const { products, totalCount } = await Product.get(options);
    return { products, totalCount };
  } catch (err) {
    throw new Error('Error fetching all products: ' + err.message);
  }
};

// Lấy sản phẩm theo danh mục
const getProductsByCategory = async (categoryId, options = {}) => {
  try {
    const { products, totalCount } = await Product.get({
      ...options,
      categoryId,
    });
    return { products, totalCount };
  } catch (err) {
    throw new Error('Error fetching products by category: ' + err.message);
  }
};

// Lấy thông tin chi tiết của một sản phẩm theo ID
const getProductById = async (productId) => {
  try {
    const product = await Product.getById(productId);
    if (!product) throw new Error('Product not found');
    return product;
  } catch (err) {
    throw new Error('Error fetching product by ID: ' + err.message);
  }
};
const addNewProductService = async (productData) => {
  try {
    const result = await Product.addNewProduct(productData);
    return result;
  } catch (err) {
    throw err;
  }
};

const editProductService = async (updatedProductData) => {
  try {
    const result = await Product.editProduct(updatedProductData);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  addNewProductService,
};
