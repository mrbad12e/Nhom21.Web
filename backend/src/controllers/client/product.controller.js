const Product = require('../../models/Product');

class productController {
    static async getProducts(req, res) {        
        try {
            const option = req.query;
            const result = await Product.get(option);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching products', error: err.message });
        }
    }
}

module.exports = productController;
