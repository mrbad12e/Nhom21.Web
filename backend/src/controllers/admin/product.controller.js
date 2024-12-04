const { getById } = require('../../models/Product');
const {
  getAllProducts,
  addNewProductService,
  editProductService
} = require('../../services/product.service');

exports.getProductList = async (req, res, next) => {
  //logic idk
  try {
    const productList = await getAllProducts();
    res.status(200).json({
      message: productList,
    });
  } catch (err) {
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    const { id, name, price } = await addNewProductService(productData);
    return res.status(200).json({
      message: 'Added new product!',
    });
  } catch (err) {
    next(err);
  }
};

exports.editProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedProduct = req.body;
    if (updatedProduct.id != id)
      throw new Error('Updating wrong product,aborting...');
    else {
      const result = editProductService(updatedProduct);
    }
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await getById(id);
    res.status(200).json({
      message: result,
    });
  } catch (err) {
    next(err);
  }
};
