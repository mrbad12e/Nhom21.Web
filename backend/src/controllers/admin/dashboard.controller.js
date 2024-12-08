const OrderService = require('../../services/order.service');

exports.getOverview = async (req, res, next) => {
    try {
        const result = await OrderService.test();
    } catch (error) {
        next(err);
    }
};
