const ProductModel = require('../models/product.model');

class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await ProductModel.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProductsByCategory(req, res) {
    try {
      const { category } = req.params;
      const products = await ProductModel.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async searchProducts(req, res) {
    try {
      const { query } = req.query;
      const products = await ProductModel.searchProducts(query);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ProductController();