class CartItem {
    constructor(data) {
      if (!CartItem.validate(data)) {
        throw new Error("Invalid cart item data");
      }
      this.id = data.id;
      this.cartId = data.cartId;
      this.productId = data.productId;
      this.quantity = data.quantity;
      this.createdAt = data.createdAt;
    }
  
    static validate(cartItem) {
      return !!(
        cartItem.cartId &&
        cartItem.productId &&
        cartItem.quantity > 0
      );
    }
  }
  
  module.exports = CartItem;
  