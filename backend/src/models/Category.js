const db = require('../config/database');

class Category {
  constructor(data) {
    if (!Category.validate(data)) {
      throw new Error("Invalid category data");
    }
    this.id = data.id;
    this.name = data.name;
    this.parentCategoryId = data.parent_category_id || data.parentCategoryId || null;
  }

  static validate(category) {
    return !!(category.name && (category.id || category.id === 0));
  }

  static async createCategory(data) {
    try {
      const query = `
        INSERT INTO categories (id, name, parent_category_id) 
        VALUES ($1, $2, $3) 
        RETURNING *
      `;
      const values = [
        data.id,
        data.name,
        data.parentCategoryId || null
      ];
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Category creation error:', err);
      throw new Error('Failed to create category');
    }
  }

  static async getAllCategories() {
    try {
      const query = 'SELECT * FROM categories';
      const result = await db.query(query);
      return result.rows;
    } catch (err) {
      console.error('Fetch categories error:', err);
      throw new Error('Failed to fetch categories');
    }
  }
}

module.exports = Category;