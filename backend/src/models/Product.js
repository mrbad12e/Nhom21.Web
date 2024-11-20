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
      return !!(
        product.name &&
        product.description &&
        product.price >= 0 &&
        product.stock >= 0
      );
    }
  
    isInStock() {
      return this.stock > 0;
    }
  }
  
  module.exports = Product;
  