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
    sortOrder = 'asc'
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
          sortOrder
        ]
      );
      return {
        products: result.rows.map(product => new Product(product)),
        totalCount: result.rows.length > 0 ? parseInt(result.rows[0].total_count) : 0
      };
    } catch (err) {
      console.error('Fetch products error:', err);
      throw err;
    }
  }

  static async getById(productId) {
    try {
        // Sử dụng phương thức get để lấy sản phẩm theo productId
        const result = await this.get({
            search: null,              // Không tìm kiếm theo tên sản phẩm
            categoryId: null,          // Không lọc theo danh mục
            minPrice: null,            // Không lọc theo giá tối thiểu
            maxPrice: null,            // Không lọc theo giá tối đa
            includeInactive: true,     // Có thể bao gồm sản phẩm không hoạt động
            page: 1,                   // Lấy 1 sản phẩm duy nhất
            pageSize: 1,               // Chỉ lấy 1 sản phẩm
            sortBy: 'id',              // Sắp xếp theo id
            sortOrder: 'asc'           // Sắp xếp theo thứ tự tăng dần
        });
        return result.products.find(product => product.id === productId) || null;
    } catch (err) {
        console.error('Fetch product by ID error:', err);
        throw err;
    }
}

  
}

module.exports = Product;