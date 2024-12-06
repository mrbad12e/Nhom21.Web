const Product = require('../models/Product');

class ProductService {
    // Lấy danh sách toàn bộ sản phẩm (bao gồm các tiêu chí tìm kiếm, phân trang, sắp xếp)
    static async getAllProducts(options = {}) {
        try {
            const { products, totalCount } = await Product.get(options);
            return { products, totalCount };
        } catch (err) {
            throw new Error('Error fetching all products: ' + err.message);
        }
    }

    // Lấy danh sách sản phẩm theo danh mục
    static async getProductsByCategory(categoryId, options = {}) {
        try {
            const { products, totalCount } = await Product.get({
                ...options,
                categoryId,
            });
            return { products, totalCount };
        } catch (err) {
            throw new Error('Error fetching products by category: ' + err.message);
        }
    }

    // Lấy thông tin sản phẩm theo ID
    static async getProductById(productId) {
        try {
            const product = await Product.getById(productId);
            if (!product) {
                throw new Error('Product not found');
            }
            return product;
        } catch (err) {
            throw new Error('Error fetching product by ID: ' + err.message);
        }
    }
}

module.exports = ProductService;
