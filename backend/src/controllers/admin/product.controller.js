const ProductService = require('../../services/product.service');

exports.get = async (req, res, next) => {
    //logic idk
    try {
        res.status(200).json(await ProductService.get(req));
    } catch (err) {
        next(err);
    }
};

exports.addProduct = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            throw new Error('No file found');
        } //ignore if no file uploads

        const result = await ProductService.addProductImageService(req);

        imageUrls = result.map((result) => result.url);

        const productData = { ...req.body, imageUrls: `{${imageUrls}}` };

        const { id, name, price } = await ProductService.addNewProductService(productData);
        return res.status(200).json({
            message: `Added new product named ${name} !`,
        });
    } catch (err) {
        next(err);
    }
};

exports.editProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedProduct = req.body;
        if (updatedProduct.id != id) throw new Error('Updating wrong product,aborting...');
        else {
            const result = await ProductService.editProductService(updatedProduct);
            return res.status(200).json({ message: result });
        }
    } catch (err) {
        next(err);
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const id = req.params.id;

        const result = await ProductService.getProductById(id);
        res.status(200).json({
            message: result,
        });
    } catch (err) {
        next(err);
    }
};
