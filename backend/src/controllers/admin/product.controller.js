const Product = require('../../models/Product');

class ProductController {
    static async getProducts(req, res) {
        try {
            const result = await Product.get(req);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching products', error: err.message });
        }
    }

    static async addProduct(req, res) {
        try {
            const result = await Product.addNewProduct(req);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: 'Error adding product', error: err.message });
        }
    }

    static async updateProduct(req, res) {
        try {
            const result = await Product.updateProduct(req);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: 'Error updating product', error: err.message });
        }
    }
}

module.exports = ProductController;
