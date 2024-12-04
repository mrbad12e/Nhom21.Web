const Cart = require('./Cart');  // Thay đổi đường dẫn phù hợp với vị trí của file Cart
const db = require('../config/database');

// Giả lập dữ liệu mẫu
const userId = 1;
const productId = 101;
const quantity = 2;
const cartId = 1;
const customerId = 1;

// Kiểm tra thêm sản phẩm vào giỏ hàng
async function testAddProductToCart() {
  try {
    console.log('Testing addProductToCart...');
    await Cart.addProductToCart(userId, productId, quantity);
    console.log('Product added to cart successfully');
  } catch (err) {
    console.error('Error in addProductToCart:', err);
  }
}

// Kiểm tra cập nhật số lượng sản phẩm trong giỏ hàng
async function testUpdateCartItemQuantity() {
  try {
    console.log('Testing updateCartItemQuantity...');
    await Cart.updateCartItemQuantity(cartId, productId, quantity);
    console.log('Cart item quantity updated successfully');
  } catch (err) {
    console.error('Error in updateCartItemQuantity:', err);
  }
}

// Kiểm tra lấy danh sách sản phẩm trong giỏ hàng
async function testGetCartItems() {
  try {
    console.log('Testing getCartItems...');
    const cartItems = await Cart.getCartItems(customerId);
    console.log('Cart items fetched:', cartItems);
  } catch (err) {
    console.error('Error in getCartItems:', err);
  }
}

// Kiểm tra xóa sản phẩm khỏi giỏ hàng
async function testRemoveProductFromCart() {
  try {
    console.log('Testing removeProductFromCart...');
    await Cart.removeProductFromCart(cartId, productId);
    console.log('Product removed from cart successfully');
  } catch (err) {
    console.error('Error in removeProductFromCart:', err);
  }
}

// Gọi tất cả các hàm để kiểm tra
async function runTests() {
  await testAddProductToCart();
  await testUpdateCartItemQuantity();
  await testGetCartItems();
  await testRemoveProductFromCart();
}

runTests();
