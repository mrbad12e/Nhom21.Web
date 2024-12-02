const db = require('../config/database');

class Product {
  constructor(data) {
    if (!Product.validate(data)) {
      throw new Error("Invalid product data");
    }
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.price = parseFloat(data.price);
    this.stock = parseInt(data.stock);
    this.imageUrls = data.image_urls || data.imageUrls || [];
    this.categoryId = data.category_id || data.categoryId || null;
    this.createdAt = data.created_at || data.createdAt;
  }

  static validate(product) {
    return !!(
      product.name &&
      product.description &&
      parseFloat(product.price) >= 0 &&
      parseInt(product.stock) >= 0
    );
  }

  isInStock() {
    return this.stock > 0;
  }

  static async createProduct(data) {
    try {
      const query = `
        INSERT INTO products 
        (name, description, price, stock, image_urls, category_id) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *
      `;
      const values = [
        data.name,
        data.description,
        data.price,
        data.stock,
        data.imageUrls || [],
        data.categoryId
      ];
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Product creation error:', err);
      throw new Error('Failed to create product');
    }
  }

  static async getAllProducts() {
    try {
      const query = 'SELECT * FROM products';
      const result = await db.query(query);
      return result.rows.map(product => new Product(product));
    } catch (err) {
      console.error('Fetch products error:', err);
      throw new Error('Failed to fetch products');
    }
  }

  static async getProductsByCategory(categoryId) {
    try {
      const query = 'SELECT * FROM products WHERE category_id = $1';
      const result = await db.query(query, [categoryId]);
      return result.rows.map(product => new Product(product));
    } catch (err) {
      console.error('Fetch products by category error:', err);
      throw new Error('Failed to fetch products by category');
    }
  }
}

module.exports = Product;