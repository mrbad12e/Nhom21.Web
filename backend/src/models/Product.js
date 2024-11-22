const db = require('../config/database');

class Product {
  constructor(data) {
    if (!Product.validate(data)) {
      throw new Error("Invalid product data");
    }
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.stock = data.stock;
    this.imageUrls = data.imageUrls || [];
    this.categoryId = data.categoryId || null;
    this.createdAt = data.createdAt;
  }

  static validate(product) {
    // Kiểm tra tính hợp lệ của dữ liệu sản phẩm
    return !!(
      product.name &&
      product.description &&
      product.price >= 0 &&
      product.stock >= 0
    );
  }

  // Hàm kiểm tra nếu sản phẩm còn hàng
  isInStock() {
    return this.stock > 0;
  }

  // Gọi hàm GetAllProducts từ PostgreSQL
  static async getAllProducts() {
    const query = 'SELECT * FROM GetAllProducts();'; // Gọi hàm GetAllProducts
    try {
      const result = await db.query(query);
      return result;
    } catch (err) {
      console.error('Error fetching all products:', err.message);
      throw err;
    }
  }

  // Gọi thủ tục GetProductsByCategory từ PostgreSQL
  static async getProductsByCategory(categoryId) {
    const query = 'CALL GetProductsByCategory($1);'; // Gọi thủ tục GetProductsByCategory
    try {
      const result = await db.query(query, [categoryId]);
      return result;
    } catch (err) {
      console.error('Error fetching products by category:', err.message);
      throw err;
    }
  }
}

module.exports = Product;
