const productService = require('../../services/product.service');

// Lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

// Lấy sản phẩm theo danh mục
const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await productService.getProductsByCategory(categoryId);
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products by category', error: err.message });
  }
};

module.exports = { getAllProducts, getProductsByCategory };
