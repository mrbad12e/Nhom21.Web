class Category {
    constructor(data) {
      if (!Category.validate(data)) {
        throw new Error("Invalid category data");
      }
      this.id = data.id;
      this.name = data.name;
      this.parentCategoryId = data.parentCategoryId || null;
    }
  
    static validate(category) {
      return !!category.name;
    }
  }
  
  module.exports = Category;
  