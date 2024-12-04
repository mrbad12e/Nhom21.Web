const db = require('../config/database');

class Product {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.price = parseFloat(data.price);
    this.stock = parseInt(data.stock);
    this.categoryId = data.category_id || data.categoryId;
    this.imageUrls = data.image_urls || data.imageUrls || [];
    this.isActive = data.is_active !== undefined ? data.is_active : true;
  }

  static validate(product) {
    return !!(
      product.name &&
      product.description &&
      parseFloat(product.price) >= 0 &&
      parseInt(product.stock) >= 0 &&
      product.categoryId
    );
  }

  isInStock() {
    return this.stock > 0 && this.isActive;
  }

  static async get({
    search = null,
    categoryId = null,
    minPrice = null,
    maxPrice = null,
    includeInactive = false,
    page = 1,
    pageSize = 10,
    sortBy = 'id',
    sortOrder = 'asc',
  } = {}) {
    try {
      const result = await db.query(
        'SELECT * FROM get_products($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [
          search,
          categoryId,
          minPrice,
          maxPrice,
          includeInactive,
          page,
          pageSize,
          sortBy,
          sortOrder,
        ]
      );
      return {
        products: result.rows.map((product) => new Product(product)),
        totalCount:
          result.rows.length > 0 ? parseInt(result.rows[0].total_count) : 0,
      };
    } catch (err) {
      console.error('Fetch products error:', err);
      throw err;
    }
  }

  static async getById(productId) {
    try {
      const result = await this.get({
        search: null,
        page: 1,
        pageSize: 1,
        includeInactive: true,
      });
      return result.products[0] || null;
    } catch (err) {
      console.error('Fetch product by ID error:', err);
      throw err;
    }
  }
  static async addNewProduct(data) {
    try {
      const result = await db.query(
        'SELECT create_product($1, $2, $3 ,$4 ,$5, $6) AS new_product',
        [
          data.name,
          data.description,
          data.price,
          data.stock,
          data.categoryId,
          data.imageUrl,
        ]
      );
      if (result.rows.length > 0) {
        const { product_id, product_name, product_price } = result.rows[0];
        console.log(
          `Product created: ID=${product_id}, Name=${product_name}, Price=${product_price}`
        );
        return result.rows[0];
      } else throw new Error('Failed to add new product!'); //throw to controller to handle
    } catch (err) {
      throw err;
    }
  }
  static async editProduct(data) {
    try {
      const result = await db.query(
        'SELECT update_product($1, $2, $3 ,$4 ,$5, $6) AS updated_product',
        [
          data.name,
          data.description,
          data.price,
          data.stock,
          data.categoryId,
          data.imageUrl,
        ]
      );
      if (result.rows.length > 0) {
        const { product_id, product_name, product_price } = result.rows[0];
        console.log(
          `Product updated: ID=${product_id}, Name=${product_name}, Price=${product_price}`
        );
        return result.rows[0];
      } else throw new Error('Failed to add new product!'); //throw to controller to handle
    } catch (error) {
      throw(error)
    }
  }
}

module.exports = Product;
