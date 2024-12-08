const {
    getAllProducts,
    addNewProductService,
    editProductService,
    getProductById,
    addProductImageService,
} = require('../../services/product.service');

exports.getProductList = async (req, res, next) => {
    //logic idk
    try {
        const option = {
            search: req.query.search,
            page: req.query.page,
            pageSize: req.query.pageSize,
            minPrice: req.query.minPrice,
            maxPrice: req.query.maxPrice,
            includeInactive: req.query.includeInactive,
            sortBy: req.query.sortBy,
            sortOrder: req.query.sortOrder,
            categoryId: req.query.categoryId,
        };
        const productList = await getAllProducts(option);
        res.status(200).json({
            message: productList,
        });
    } catch (err) {
        next(err);
    }
};

exports.addProduct = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            console.log('aborted');
            throw new Error('No file found');
        } //ignore if no file uploads

        const result = await addProductImageService(req);

        imageUrls = result.map((result) => result.url);
        console.log(imageUrls);
        
        const productData = { ...req.body, imageUrls: `{${imageUrls}}` };
        console.log(productData);

        const { id, name, price } = await addNewProductService(productData);
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
            const result = await editProductService(updatedProduct);
            return res.status(200).json({ message: result });
        }
    } catch (err) {
        next(err);
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id);

        const result = await getProductById(id);
        res.status(200).json({
            message: result,
        });
    } catch (err) {
        next(err);
    }
};
