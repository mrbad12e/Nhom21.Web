const productService = require('../../services/product.service');

// Lấy tất cả sản phẩm với tùy chọn tìm kiếm
const getAllProducts = async (req, res) => {
  const options = req.query; // Lấy các tham số tìm kiếm từ query string
  try {
    const { products, totalCount } = await productService.getAllProducts(options);
    res.status(200).json({ products, totalCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

// Lấy sản phẩm theo danh mục
const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const options = req.query; // Kết hợp với các tham số tìm kiếm khác
  try {
    const { products, totalCount } = await productService.getProductsByCategory(categoryId, options);
    res.status(200).json({ products, totalCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products by category', error: err.message });
  }
};

// Lấy thông tin chi tiết của một sản phẩm
const getProductById = async (req, res) => {
  const { id: productId } = req.params;
  try {
    const product = await productService.getProductById(productId);
    res.status(200).json({ product });
  } catch (err) {
    res.status(404).json({ message: 'Product not found', error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductById
};
